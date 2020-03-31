module Monitoring
  class FindingGrant < Base
    has_many :finding_histories
  end
end
