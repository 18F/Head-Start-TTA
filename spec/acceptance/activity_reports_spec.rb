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

  post "/tta_needs/:tta_need_id/activity_reports" do
    let!(:grantee_role) { create :grantee_role }
    let(:start_date) { 1.day.ago }
    let(:end_date) { start_date + 1.hour }
    let(:raw_post) do
      {
        data: {
          type: "activity-reports",
          attributes: {
            "start-date": start_date.iso8601,
            "end-date": end_date.iso8601,
            "duration": "1",
            "contact-method": "Virtual",
            "grantee-role-ids": [grantee_role.id.to_s]
          }
        }
      }.to_json
    end

    example "Create a new Activity Report" do
      expect {
        do_request
      }.to change(ActivityReport, :count).by 1
      expect(status).to eq 201
    end
  end
end
