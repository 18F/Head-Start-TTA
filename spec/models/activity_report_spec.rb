require "rails_helper"

RSpec.describe ActivityReport, type: :model do
  subject { build :activity_report }

  describe "validations" do
    it { should validate_presence_of :activity_id }
    it { should validate_uniqueness_of :activity_id }
    it { should validate_presence_of :activity_typ }
    it { should validate_presence_of :purpose }
    it { should validate_presence_of :start_date }
    it { should validate_presence_of :end_date }
    it { should validate_presence_of :duration }
    it { should allow_values("EC", "GS").for :report_typ }
    it { should_not allow_value("Other").for :report_typ }
  end
end
