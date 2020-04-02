module Monitoring
  class FindingHistory < Base
    property :ordinal, type: :int
    has_many :finding_grants
  end
end
