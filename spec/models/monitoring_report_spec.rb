require "rails_helper"

RSpec.describe MonitoringReport, type: :model do
  describe "validations" do
    it { should validate_presence_of :narrative }
    it { should validate_presence_of :report_date }
    it { should validate_presence_of :status }
  end
end
