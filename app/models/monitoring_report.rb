class MonitoringReport < ApplicationRecord
  belongs_to :grant
  has_one :grantee, through: :grant
  delegate :name, to: :grantee, prefix: true, allow_nil: true

  validates_presence_of :narrative, :report_date, :status

  def formatted_citation
    section, subsection, *rest = citation
    "#{section}#{subsection} #{rest.join}"
  end
end
