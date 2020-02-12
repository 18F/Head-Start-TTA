class GranteeSerializer < BaseSerializer
  has_many :tta_needs
  has_many :grants

  attributes :name, :created_at, :updated_at
end
