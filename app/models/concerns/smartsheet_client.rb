module SmartsheetClient
  extend ActiveSupport::Concern

  included do
    attr_reader :client
  end

  SHEET_ID_CONFIG = Rails.application.config_for(:smartsheet).freeze

  def initialize
    @client = Smartsheet::Client.new(
      token: Rails.application.credentials.smartsheet_token,
      logger: Rails.logger,
      base_url: Smartsheet::Constants::GOV_API_URL
    )
  end
end
