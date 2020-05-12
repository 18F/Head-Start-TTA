class GranteeRole < ApplicationRecord
  has_and_belongs_to_many :activity_plans
  has_and_belongs_to_many :activity_reports

  validates_presence_of :title
end
