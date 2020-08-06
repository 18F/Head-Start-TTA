class SmartsheetColumnSetter
  include SmartsheetClient

  def call
    update_grantees
    update_topics
  end

  def update_grantees
    each_region do |region|
      sheet_id = SHEET_ID_CONFIG[:regions][region][:ar_details_sheet]
      sheet = client.sheets.get(sheet_id: sheet_id)
      grantee_name_column_title = column_title_for(region, :ar_details_grantee_column)
      grantee_name_column_id = sheet[:columns].find { |c| c[:title] == grantee_name_column_title }.try(:[], :id)
      next if grantee_name_column_id.nil?
      body = {type: "MULTI_PICKLIST", options: grantee_name_options(region), validation: true}
      client.sheets.columns.update(sheet_id: sheet_id, column_id: grantee_name_column_id, body: body)

      sheet_id = SHEET_ID_CONFIG[:regions][region][:ar_combined_sheet]
      sheet = client.sheets.get(sheet_id: sheet_id)
      grantee_name_column_id = sheet[:columns].find { |c| c[:title] == grantee_name_column_title }.try(:[], :id)
      next if grantee_name_column_id.nil?
      client.sheets.columns.update(sheet_id: sheet_id, column_id: grantee_name_column_id, body: body)
    end
  end

  def update_topics
    each_region do |region|
      sheet_id = SHEET_ID_CONFIG[:regions][region][:ar_objectives_sheet]
      sheet = client.sheets.get(sheet_id: sheet_id)
      topics_column_title = column_title_for(region, :ar_objectives_topics_column)
      topic_column_id = sheet[:columns].find { |c| c[:title] == topics_column_title }.try(:[], :id)
      next if topic_column_id.nil?
      body = {type: "MULTI_PICKLIST", options: topics_options, validation: true}
      client.sheets.columns.update(sheet_id: sheet_id, column_id: topic_column_id, body: body)

      sheet_id = SHEET_ID_CONFIG[:regions][region][:ar_combined_sheet]
      sheet = client.sheets.get(sheet_id: sheet_id)
      topic_column_id = sheet[:columns].find { |c| c[:title] == topics_column_title }.try(:[], :id)
      next if topic_column_id.nil?
      client.sheets.columns.update(sheet_id: sheet_id, column_id: topic_column_id, body: body)
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
      # "#{cells[1][:display_value]} | #{cells[0][:display_value]}"
      cells[0][:display_value]
    }
  end

  def grantee_name_options(region)
    grantee_names_sheet(region)[:rows].map { |row| row[:cells] }.map { |cells|
      "#{cells[1][:display_value]} | #{cells[0][:display_value]}"
    }
  end

  def grantee_names_sheet(region)
    client.sheets.get(sheet_id: SHEET_ID_CONFIG[:regions][region][:grantee_names_sheet])
  end
end
