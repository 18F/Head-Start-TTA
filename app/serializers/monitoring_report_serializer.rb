class MonitoringReportSerializer < BaseSerializer
  has_one :grant
  has_one :grantee

  attributes :narrative,
    :citation,
    :citation_details,
    :formatted_citation,
    :status,
    :report_date,
    :due_date,
    :timeframe,
    :created_at,
    :updated_at

  def relationship_related_link(attribute_name)
    case attribute_name
    when :grant
      path_helper.grant_url(id: object.grant_id, host: base_url)
    when :grantee
      if object.grant.grantee_id.present?
        path_helper.grantee_url(id: object.grant.grantee_id, host: base_url)
      end
    else
      super
    end
  end
end
