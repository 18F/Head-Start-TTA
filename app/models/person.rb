class Person < ApplicationRecord
  validates_presence_of :name, :role

  has_many :person_grantee_links
  has_many :grantees, through: :person_grantee_links
end
