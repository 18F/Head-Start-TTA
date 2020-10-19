class SmartsheetColumnSetter
  include SmartsheetClient

  def call
    update_grantees
    update_topics
    update_specialists
  end

  def update_all_grantee_names(centers_excel_directory)
    each_region do |region|
      centers_file = File.join(centers_excel_directory, "R#{region}.xlsx")
      update_grantee_names(region, centers_file)
      no_centers_file = File.join(centers_excel_directory, "R#{region}b.xlsx")
      update_grantee_names_no_centers(region, no_centers_file)
    end
  end

  def update_grantee_names(region, centers_excel_filename)
    region = region.to_s
    grantees = {}
    excel = Creek::Book.new centers_excel_filename
    excel.sheets[1].simple_rows.each do |row|
      next if row["A"] == "Grant Number"
      grantees[row["A"]] = row["B"]
    end
    names_smartsheet = grantee_names_sheet(region)
    clear_grantee_names_rows(names_smartsheet)
    return if grantees.empty?
    add_grantee_names_rows(names_smartsheet, grantees)
  end

  def update_grantee_names_no_centers(region, no_centers_excel_filename)
    region = region.to_s
    grantees = {}
    excel = Creek::Book.new no_centers_excel_filename
    excel.sheets[0].simple_rows.each do |row|
      next if row["A"] == "Grant"
      grantees[row["A"]] = row["C"]
    end
    return if grantees.empty?
    names_smartsheet = grantee_names_sheet(region)
    add_grantee_names_rows(names_smartsheet, grantees)
  end

  def update_grantees
    each_region do |region|
      grantee_name_column_title = column_title_for(region, :ar_grantee_column)
      options = grantee_name_options(region)

      sheet_id = SHEET_ID_CONFIG[:regions][region][:ar_combined_sheet]
      if sheet_id.present?
        sheet = client.sheets.get(sheet_id: sheet_id)
        grantee_name_column_id = sheet[:columns].find { |c| c[:title] == grantee_name_column_title }.try(:[], :id)
        body = {type: "MULTI_PICKLIST", options: options, validation: true}
        client.sheets.columns.update(sheet_id: sheet_id, column_id: grantee_name_column_id, body: body) unless grantee_name_column_id.nil?
      end

      sheet_id = SHEET_ID_CONFIG[:regions][region][:grantee_tta_plan_sheet]
      if sheet_id.present?
        sheet = client.sheets.get(sheet_id: sheet_id)
        grantee_name_column_id = sheet[:columns].find { |c| c[:title] == grantee_name_column_title }.try(:[], :id)
        body = {type: "PICKLIST", options: options, validation: true}
        client.sheets.columns.update(sheet_id: sheet_id, column_id: grantee_name_column_id, body: body) unless grantee_name_column_id.nil?
      end
    end
  end

  def update_topics
    each_region do |region|
      body = {type: "MULTI_PICKLIST", options: topics_options, validation: true}

      sheet_id = SHEET_ID_CONFIG[:regions][region][:ar_combined_sheet]
      if sheet_id.present?
        sheet = client.sheets.get(sheet_id: sheet_id)
        topics_column_title = column_title_for(region, :ar_topics_column)
        topic_column_id = sheet[:columns].find { |c| c[:title] == topics_column_title }.try(:[], :id)
        client.sheets.columns.update(sheet_id: sheet_id, column_id: topic_column_id, body: body) unless topic_column_id.nil?
      end

      sheet_id = SHEET_ID_CONFIG[:regions][region][:grantee_tta_plan_sheet]
      if sheet_id.present?
        sheet = client.sheets.get(sheet_id: sheet_id)
        (1..5).each do |goal_number|
          topics_column_title = "Goal #{goal_number}: Topics"
          topic_column_id = sheet[:columns].find { |c| c[:title] == topics_column_title }.try(:[], :id)
          client.sheets.columns.update(sheet_id: sheet_id, column_id: topic_column_id, body: body) unless topic_column_id.nil?
        end
      end
    end
  end

  def update_specialists
    each_region do |region|
      specialist_options = specialists_options(region)
      next if specialist_options.empty?
      body = {type: "MULTI_PICKLIST", options: specialist_options, validation: true}

      sheet_id = SHEET_ID_CONFIG[:regions][region][:ar_combined_sheet]
      if sheet_id.present?
        sheet = client.sheets.get(sheet_id: sheet_id)
        specialists_column_title = column_title_for(region, :ar_specialists_column)
        specialists_column_id = sheet[:columns].find { |c| c[:title] == specialists_column_title }.try(:[], :id)
        client.sheets.columns.update(sheet_id: sheet_id, column_id: specialists_column_id, body: body) unless specialists_column_id.nil?
      end

      sheet_id = SHEET_ID_CONFIG[:regions][region][:grantee_tta_plan_sheet]
      if sheet_id.present?
        sheet = client.sheets.get(sheet_id: sheet_id)
        specialists_column_title = "TTA Specialists"
        specialists_column_id = sheet[:columns].find { |c| c[:title] == specialists_column_title }.try(:[], :id)
        client.sheets.columns.update(sheet_id: sheet_id, column_id: specialists_column_id, body: body) unless specialists_column_id.nil?
      end
    end
  end

  private

  def column_title_for(region, title_type)
    SHEET_ID_CONFIG[:regions][region][title_type] || SHEET_ID_CONFIG[title_type]
  end

  def each_region(&block)
    SHEET_ID_CONFIG[:regions].keys.each(&block)
  end

  def topics_sheet
    @topics_sheet ||= client.sheets.get(sheet_id: SHEET_ID_CONFIG[:topics_sheet])
  end

  def topics_options
    @topics_options ||= topics_sheet[:rows].map { |row| row[:cells] }.map { |cells|
      [
        cells[0][:display_value],
        cells[2][:display_value]
      ].select(&:present?).join(" | ")
    }
  end

  def grantee_name_options(region)
    return [] if grantee_names_sheet_id(region).blank?
    grantee_names_sheet(region)[:rows].map { |row| row[:cells] }.map { |cells|
      "#{cells[1][:display_value]} | #{cells[0][:display_value]}"
    }.sort
  end

  def grantee_names_sheet(region)
    client.sheets.get(sheet_id: grantee_names_sheet_id(region))
  end

  def grantee_names_sheet_id(region)
    SHEET_ID_CONFIG[:regions][region][:grantee_names_sheet]
  end

  def clear_grantee_names_rows(sheet)
    row_ids = sheet[:rows].map { |row| row[:id] }
    client.sheets.rows.delete(sheet_id: sheet[:id], row_ids: row_ids) unless row_ids.empty?
  end

  def add_grantee_names_rows(sheet, grantees)
    number_column_id = sheet[:columns].find { |c| c[:title] == "Grant Number" }[:id]
    name_column_id = sheet[:columns].find { |c| c[:title] == "Grantee Name" }[:id]
    body = grantees.map { |number, name|
      {
        to_bottom: true,
        cells: [{column_id: number_column_id, value: number}, {column_id: name_column_id, value: name}],
        locked: true
      }
    }
    client.sheets.rows.add(sheet_id: sheet[:id], body: body)
  end

  def specialists_options(region)
    return [] if specialists_sheet_id(region).blank?
    sheet = specialists_sheet(region)
    name_column_id = sheet[:columns].find { |c| c[:title] == "Specialist Name" }[:id]
    type_column_id = sheet[:columns].find { |c| c[:title] == "Role" }[:id]
    sheet[:rows].map { |row| row[:cells] }.map { |cells|
      name = cells.find { |c| c[:column_id] == name_column_id }[:display_value]
      type = cells.find { |c| c[:column_id] == type_column_id }[:display_value]
      name.present? && type.present? ? "#{name} (#{type})" : nil
    }.compact
  end

  def specialists_sheet(region)
    client.sheets.get(sheet_id: specialists_sheet_id(region))
  end

  def specialists_sheet_id(region)
    SHEET_ID_CONFIG[:regions][region][:specialists_sheet]
  end
end
