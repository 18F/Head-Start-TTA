class ActivityReport < ApplicationRecord
  validates_presence_of :start_date, :duration

  has_and_belongs_to_many :grants
  has_many :grantees, through: :grants
  has_and_belongs_to_many :grantee_roles

  has_and_belongs_to_many :people

  belongs_to :tta_need, optional: true
  has_many :topics, through: :tta_need

  belongs_to :activity_plan, optional: true

  update_index "activity_reports_index#activity_report", :self

  def region
    grants.map(&:region).uniq.compact.join(", ")
  end
end
