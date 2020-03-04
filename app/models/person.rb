class Person < ApplicationRecord
  validates_presence_of :name, :role

  has_many :person_grantee_links
  has_many :grantees, through: :person_grantee_links

  has_many :requested_tta_needs, foreign_key: :requester_id, class_name: "TtaNeed"

  def name_and_role
    "#{name} - #{role}"
  end
end
