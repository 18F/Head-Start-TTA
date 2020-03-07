class Task < ApplicationRecord
  belongs_to :parent, polymorphic: true
  belongs_to :created_by, class_name: "Person"
  belongs_to :assigned_to, class_name: "Person", optional: true
  belongs_to :completed_by, class_name: "Person", optional: true

  has_many :subtasks, class_name: "Task", as: :parent

  validates_presence_of :title
  validates_inclusion_of :status, in: %w[todo complete dropped]

  def overdue?
    due_date.present? && due_date.past?
  end

  def complete?
    status == "complete"
  end
end
