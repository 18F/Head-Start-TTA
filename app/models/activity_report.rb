class ActivityReport < ApplicationRecord
  validates_presence_of :activity_id, :region, :activity_typ, :purpose, :start_date, :end_date, :duration
  validates_uniqueness_of :activity_id
  validates_inclusion_of :report_typ, in: %w[GS EC]
end
