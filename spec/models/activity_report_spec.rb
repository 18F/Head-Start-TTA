require "rails_helper"

RSpec.describe ActivityReport, type: :model do
  subject { build :activity_report }

  describe "validations" do
    it { should validate_presence_of :start_date }
    it { should validate_presence_of :duration }
  end
end
