class SmartsheetFacade
  attr_reader :client

  @@sheet_id_config = Rails.application.config_for(:smartsheet).freeze

  def initialize
    @client = Smartsheet::Client.new(
      token: Rails.application.credentials.smartsheet_token,
      logger: Rails.logger
    )
  end

  def request_sheet
    @request_sheet ||= client.sheets.get(sheet_id: @@sheet_id_config[:request_sheet])
  end

  def assignment_sheet
    @assignment_sheet ||= client.sheets.get(sheet_id: @@sheet_id_config[:assignment_sheet])
  end

  def plan_sheet
    @plan_sheet ||= client.sheets.get(sheet_id: @@sheet_id_config[:plan_sheet])
  end

  def report_sheet
    @report_sheet ||= client.sheets.get(sheet_id: @@sheet_id_config[:report_sheet])
  end
end
