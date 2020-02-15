class TopicSerializer < BaseSerializer
  attributes :name, :created_at, :updated_at

  def type
    "topics"
  end
end
