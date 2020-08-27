class SmartsheetColumnSetter
  include SmartsheetClient

  def call
    update_grantees
    update_topics
  end

  def update_grantees
    each_region do |region|
      grantee_name_column_title = column_title_for(region, :ar_details_grantee_column)
      body = {type: "MULTI_PICKLIST", options: grantee_name_options(region), validation: true}
      sheet_id = SHEET_ID_CONFIG[:regions][region][:ar_combined_sheet]
      if sheet_id.present?
        sheet = client.sheets.get(sheet_id: sheet_id)
        grantee_name_column_id = sheet[:columns].find { |c| c[:title] == grantee_name_column_title }.try(:[], :id)
        client.sheets.columns.update(sheet_id: sheet_id, column_id: grantee_name_column_id, body: body) unless grantee_name_column_id.nil?
      end
    end
  end

  def update_topics
    each_region do |region|
      topics_column_title = column_title_for(region, :ar_objectives_topics_column)
      body = {type: "MULTI_PICKLIST", options: topics_options, validation: true}
      sheet_id = SHEET_ID_CONFIG[:regions][region][:ar_combined_sheet]
      if sheet_id.present?
        sheet = client.sheets.get(sheet_id: sheet_id)
        topic_column_id = sheet[:columns].find { |c| c[:title] == topics_column_title }.try(:[], :id)
        client.sheets.columns.update(sheet_id: sheet_id, column_id: topic_column_id, body: body) unless topic_column_id.nil?
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
    }
  end

  def grantee_names_sheet(region)
    client.sheets.get(sheet_id: grantee_names_sheet_id(region))
  end

  def grantee_names_sheet_id(region)
    SHEET_ID_CONFIG[:regions][region][:grantee_names_sheet]
  end
end
