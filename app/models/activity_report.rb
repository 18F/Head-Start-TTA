class ActivityReport < ApplicationRecord
  validates_presence_of :activity_id, :region, :activity_typ, :purpose, :start_date, :end_date, :duration
  validates_uniqueness_of :activity_id
  validates_inclusion_of :report_typ, in: %w[GS EC]

  has_and_belongs_to_many :grants
  has_many :grantees, through: :grants

  acts_as_ordered_taggable_on :materials, :topics

  update_index "activity_reports_index#activity_report", :self
end
