class TopicSerializer < BaseSerializer
  has_many :tta_needs

  attribute(:name) { object.full_name }
  attributes :scope, :parent_id, :created_at, :updated_at
  attribute(:topic_group) { object.topic_group? }
end
