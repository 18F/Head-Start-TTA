class TaskSerializer < BaseSerializer
  has_one :parent

  attributes :status, :title, :notes, :created_at, :updated_at
end
