class ActivityPlan < ApplicationRecord
  belongs_to :tta_need

  validates_presence_of :start_at
  validates_inclusion_of :format, in: ["On-site", "Email", "Telephone", "Virtual"]
end
