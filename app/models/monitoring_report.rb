class MonitoringReport < ApplicationRecord
  belongs_to :grant

  validates_presence_of :narrative, :report_date, :status
end
