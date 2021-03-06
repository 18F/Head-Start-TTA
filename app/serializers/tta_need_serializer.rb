class TtaNeedSerializer < BaseSerializer
  has_one :grantee
  has_one :context_link
  has_many :tasks
  has_many :topics
  has_one :requester
  has_many :activity_reports
  has_many :activity_plans

  attributes :narrative,
    :indicator,
    :purpose,
    :initiated_by,
    :specialist_types_needed,
    :urgency,
    :start_date,
    :created_at,
    :updated_at

  def relationship_related_link(attribute_name)
    case attribute_name
    when :grantee
      path_helper.grantee_url(id: object.grantee_id, host: base_url)
    when :requester
      path_helper.person_url(id: object.requester_id, host: base_url)
    when :context_link
      if object.context_link_id.present?
        path_helper.monitoring_report_url(id: object.context_link_id, host: base_url)
      end
    else
      super
    end
  end
end
