class TtaNeedSerializer < BaseSerializer
  # has_one :grantee
  # has_one :context_link

  has_many :tasks

  attributes :narrative, :indicator, :specialist_types_needed, :created_at, :updated_at
end
