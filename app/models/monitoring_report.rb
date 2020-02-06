class MonitoringReport < ApplicationRecord
  belongs_to :grant

  validates_presence_of :narrative, :report_date, :status

  def formatted_citation
    section, subsection, *rest = citation
    "#{section}#{subsection} #{rest.join}"
  end
end
