class Person < ApplicationRecord
  validates_presence_of :name, :role

  has_many :person_grantee_links
  has_many :grantees, through: :person_grantee_links

  has_many :requested_tta_needs, foreign_key: :requester_id, class_name: "TtaNeed"

  has_many :created_tasks, foreign_key: :created_by_id, class_name: "Task"
  has_many :assigned_tasks, foreign_key: :assigned_to_id, class_name: "Task"
  has_many :completed_tasks, foreign_key: :completed_by_id, class_name: "Task"

  def name_and_role
    "#{name} - #{role}"
  end
end
