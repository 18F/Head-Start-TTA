class TtaNeedSerializer < BaseSerializer
  has_one :grantee
  has_one :context_link
  has_many :tasks
  has_many :topics

  attributes :narrative,
    :indicator,
    :purpose,
    :specialist_types_needed,
    :start_date,
    :created_at,
    :updated_at

  def relationship_related_link(attribute_name)
    case attribute_name
    when :grantee
      path_helper.grantee_url(id: object.grantee_id, host: base_url)
    when :context_link
      if object.context_link_id.present?
        path_helper.monitoring_report_url(id: object.context_link_id, host: base_url)
      end
    else
      super
    end
  end
end
