class MonitoringReportSerializer < BaseSerializer
  has_one :grant

  attributes :narrative, :citation, :status, :report_date, :created_at, :updated_at

  def relationship_related_link(attribute_name)
    case attribute_name
    when :grant
      path_helper.grant_url(id: object.grant_id, host: base_url)
    else
      super
    end
  end
end
