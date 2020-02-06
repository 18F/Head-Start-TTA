require "rails_helper"

RSpec.describe MonitoringReport, type: :model do
  describe "validations" do
    it { should validate_presence_of :narrative }
    it { should validate_presence_of :report_date }
    it { should validate_presence_of :status }
  end

  describe "#formatted_citation" do
    subject { build_stubbed :monitoring_report, citation: ["§1302", ".101", "(a)", "(1)"] }

    it "formats the citation with a space between the subsection and rest" do
      expect(subject.formatted_citation).to eq "§1302.101 (a)(1)"
    end
  end
end
