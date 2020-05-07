require "rails_helper"

RSpec.describe ActivityPlan, type: :model do
  describe "validations" do
    it { should validate_presence_of :start_at }
    it { should allow_values("On-site", "Email", "Telephone", "Virtual").for :format }
  end
end
