class ActivityReport < ApplicationRecord
  validates_presence_of :activity_id, :activity_typ, :purpose, :start_date, :end_date, :duration
  validates_uniqueness_of :activity_id
  validates_inclusion_of :report_typ, in: %w[GS EC]

  has_and_belongs_to_many :grants
  has_many :grantees, through: :grants

  has_and_belongs_to_many :people

  has_many :follow_up_reports, class_name: "ActivityReport", foreign_key: "previous_activity_report_id"
  belongs_to :previous_activity_report, class_name: "ActivityReport", optional: true

  belongs_to :tta_need, optional: true

  acts_as_ordered_taggable_on :materials, :topics

  auto_strip_attributes :activity_id

  update_index "activity_reports_index#activity_report", :self

  def linked?
    previous_activity_report.present? || follow_up_reports.any?
  end

  def region
    grants.map(&:region).uniq.compact.join(", ")
  end
end
