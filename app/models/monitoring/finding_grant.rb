module Monitoring
  class FindingGrant < Base
    property :reported_date, type: :time
    property :correction_deadline, type: :time
    has_many :finding_histories
    has_many :standards
  end
end
