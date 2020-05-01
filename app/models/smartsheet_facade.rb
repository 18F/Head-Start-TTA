class SmartsheetFacade
  attr_reader :client

  SHEET_ID_CONFIG = Rails.application.config_for(:smartsheet).freeze

  def initialize
    @client = Smartsheet::Client.new(
      token: Rails.application.credentials.smartsheet_token,
      logger: Rails.logger
    )
  end

  def request_sheet
    @request_sheet ||= Sheet.new(client.sheets.get(sheet_id: SHEET_ID_CONFIG[:request_sheet]), client)
  end

  def assignment_sheet
    @assignment_sheet ||= AssignmentSheet.new(client.sheets.get(sheet_id: SHEET_ID_CONFIG[:assignment_sheet]), client)
  end

  def plan_sheet
    @plan_sheet ||= PlanSheet.new(client.sheets.get(sheet_id: SHEET_ID_CONFIG[:plan_sheet]), client)
  end

  def report_sheet
    @report_sheet ||= ReportSheet.new(client.sheets.get(sheet_id: SHEET_ID_CONFIG[:report_sheet]), client)
  end

  class Sheet
    include Enumerable

    attr_reader :sheet, :header_map, :client
    def initialize(sheet, client)
      @sheet = sheet
      @header_map = sheet[:columns].map { |c| [c[:title].underscore.gsub(/[^a-z\s_]/, "").gsub(/\s+/, "_"), c[:index]] }.to_h.with_indifferent_access
      @client = client
    end

    def get_row(row_id)
      find { |r| r.row_id.to_s == row_id.to_s } || fetch_row(row_id)
    end

    def each(&block)
      rows.each(&block)
    end

    def filter_region!(region)
      @rows = rows.select { |r| r.region == region } if region.present?
      self
    end

    def filter_dates!(start_date, end_date)
      if start_date.present?
        @rows = rows.select { |r| r.proposed_start_date.nil? || Date.parse(r.proposed_start_date).after?(Date.parse(start_date)) }
        if end_date.present?
          @rows = rows.select { |r| r.proposed_start_date.nil? || Date.parse(r.proposed_start_date).before?(Date.parse(end_date)) }
        end
      end
      self
    end

    def filter_source!(source)
      @rows = rows.select { |r| r.initiated_by == source } if source.present?
      self
    end

    def filter_purpose!(purpose)
      @rows = rows.select { |r| r.reason_for_request&.include?(purpose) } if purpose.present?
      self
    end

    def filter_specialist_type!(specialist_type)
      @rows = rows.select { |r| r.type_of_specialist_needed&.include?(specialist_type) } if specialist_type.present?
      self
    end

    def find_request_id(request_id)
      find { |r| r.request_id == request_id }
    end

    private

    def fetch_row(row_id)
      SheetRow.new(
        client.sheets.rows.get(sheet_id: sheet[:id], row_id: row_id),
        header_map
      )
    end

    def rows
      @rows ||= sheet[:rows].lazy.map { |r| SheetRow.new(r, header_map) }
    end
  end

  class AssignmentSheet < Sheet
    def has_upcoming_activity?(specialist_name)
      rows.find do |row|
        row.assigned_tta_specialists&.include?(specialist_name) &&
          (
            row.proposed_start_date.blank? ||
            !Date.parse(row.proposed_start_date).past?
          )
      end
    end
  end

  module FiltersFromRequest
    def filter_source!(source)
      if source.present?
        @rows = rows.select { |r| request(r.request_id)&.initiated_by == source }
      end
      self
    end

    def filter_purpose!(purpose)
      if purpose.present?
        @rows = rows.select { |r| request(r.request_id)&.reason_for_request&.include?(purpose) }
      end
      self
    end

    def filter_specialist_type!(specialist_type)
      if specialist_type.present?
        @rows = rows.select { |r| request(r.request_id)&.type_of_specialist_needed&.include?(specialist_type) }
      end
      self
    end

    private

    def request(request_id)
      request_sheet.find_request_id(request_id)
    end

    def request_sheet
      @request_sheet ||= SmartsheetFacade.new.request_sheet
    end
  end

  module FilterDates
    def filter_dates!(start_date, end_date)
      if start_date.present?
        @rows = rows.select { |r| Date.parse(r.start_date).after?(Date.parse(start_date)) }
        if end_date.present?
          @rows = rows.select { |r| Date.parse(r.end_date).before?(Date.parse(end_date)) }
        end
      end
      self
    end
  end

  class PlanSheet < Sheet
    include FiltersFromRequest
    include FilterDates

    def each_upcoming_activity(&block)
      select { |row| !Date.parse(row.start_date).past? }.each(&block)
    end
  end

  class ReportSheet < Sheet
    include FiltersFromRequest
    include FilterDates

    def most_recent_activities(n = 10)
      rows.sort_by { |row| Date.parse(row.start_date) }.last(n)
    end
  end

  class SheetRow
    attr_reader :row, :header_map
    def initialize(row, header_map)
      @row = row
      @header_map = header_map
    end

    def to_param
      row_id.to_s
    end

    def row_id
      row[:id]
    end

    def method_missing(method_name, *args, &block)
      if header_map.has_key? method_name
        cell = row[:cells][header_map[method_name]]
        cell[:display_value] || cell[:value]
      else
        super
      end
    end

    def respond_to_missing?(method_name, include_private = false)
      header_map.has_key?(method_name) || super
    end
  end
end
