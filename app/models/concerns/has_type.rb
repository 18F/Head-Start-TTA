module HasType
  extend ActiveSupport::Concern

  included do
    validates_presence_of :type

    enum type: {
      head_start_center: 1,
      early_head_start_center: 2,
      migrant_and_seasonal_head_start_center: 3,
      migrant_and_seasonal_early_head_start_center: 4,
      american_indian_and_alaskan_native_head_start_center: 5,
      american_indian_and_alaskan_native_early_head_start_center: 6
    }
  end
end
