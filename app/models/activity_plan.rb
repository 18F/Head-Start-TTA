class ActivityPlan < ApplicationRecord
  belongs_to :tta_need
  has_one :activity_report
  has_and_belongs_to_many :grantee_roles

  validates_presence_of :start_at
  validates_inclusion_of :format, in: ["On-site", "Email", "Telephone", "Virtual"]
end
