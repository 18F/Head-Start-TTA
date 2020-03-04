class GranteeSerializer < BaseSerializer
  has_many :tta_needs
  has_many :grants
  has_many :employees
  has_many :specialists do
    object.assigned_specialists
  end

  attributes :name, :created_at, :updated_at

  def relationship_related_link(attribute_name)
    case attribute_name
    when :employees
      path_helper.employees_grantee_people_url(grantee_id: object.id, host: base_url)
    when :specialists
      path_helper.specialists_grantee_people_url(grantee_id: object.id, host: base_url)
    else
      super
    end
  end
end
