module Monitoring
  class Review < Base
    property :start_date, type: :time
    property :end_date, type: :time
    property :report_delivery_date, type: :time
    has_many :finding_histories
    has_many :finding_grants
    has_one :status, class_name: "Monitoring::ReviewStatus"

    def full_status
      if outcome.present?
        "#{status_name} / #{outcome}"
      else
        status_name
      end
    end
  end
end
