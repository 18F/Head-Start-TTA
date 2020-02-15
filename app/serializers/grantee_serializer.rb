class GranteeSerializer < BaseSerializer
  has_many :tta_needs
  has_many :grants
  has_many :people do
    object.person_grantee_links
  end

  attributes :name, :created_at, :updated_at
end
