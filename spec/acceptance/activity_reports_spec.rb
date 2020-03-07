require "rails_helper"
require "rspec_api_documentation/dsl"

resource "Activity Reports" do
  let(:tta_need) { create :tta_need }
  let(:tta_need_id) { tta_need.id }

  get "/tta_needs/:tta_need_id/activity_reports" do
    let!(:activity_report) { create :activity_report, tta_need: tta_need }

    example_request "List activity reports for a TTA need" do
      expect(status).to eq 200
    end
  end

  get "/activity_reports/:id" do
    let(:activity_report) { create :activity_report, :for_need }
    let(:id) { activity_report.id }

    example_request "Show details about an activity report" do
      expect(status).to eq 200
    end
  end
end
