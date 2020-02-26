class TopicSerializer < BaseSerializer
  attributes :name, :scope, :parent_id, :created_at, :updated_at

  def type
    "topics"
  end
end
