class PersonGranteeLinkSerializer < BaseSerializer
  has_one :grantee

  attribute(:name) { object.person.name }
  attribute(:role) { object.person.role }
  attribute(:phone_number) { object.person.phone_number }
  attribute(:email) { object.person.phone_number }
  attribute(:created_at) { object.person.created_at }
  attribute(:updated_at) { object.person.updated_at }
  attribute :grantee_employee

  def type
    "people"
  end
  
  def relationship_related_link(attribute_name)
    case attribute_name
    when :grantee
      path_helper.grantee_url(id: object.grantee_id, host: base_url)
    else
      super
    end
  end
end
