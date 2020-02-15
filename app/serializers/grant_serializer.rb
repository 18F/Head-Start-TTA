class GrantSerializer < BaseSerializer
  has_one :grantee
  has_many :monitoring_reports

  attributes :number, :region, :created_at, :updated_at

  def relationship_related_link(attribute_name)
    case attribute_name
    when :grantee
      path_helper.grantee_url(id: object.grantee_id, host: base_url)
    else
      super
    end
  end
end
