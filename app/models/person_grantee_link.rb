class PersonGranteeLink < ApplicationRecord
  belongs_to :person
  belongs_to :grantee

  validates_uniqueness_of :person_id, scope: :grantee_id

  scope :employees, -> { where grantee_employee: true }
end
