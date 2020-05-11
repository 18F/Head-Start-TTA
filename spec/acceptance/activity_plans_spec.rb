require "rails_helper"
require "rspec_api_documentation/dsl"

resource "Activity Plans" do
  let(:tta_need) { create :tta_need }
  let(:tta_need_id) { tta_need.id }

  get "/tta_needs/:tta_need_id/activity_plans" do
    let!(:activity_plan) { create :activity_plan, tta_need: tta_need }

    example_request "List activity plans for a TTA need" do
      expect(status).to eq 200
    end
  end

  get "/activity_plans/:id" do
    let(:activity_plan) { create :activity_plan }
    let(:id) { activity_plan.id }

    example_request "Show details about an activity plan" do
      expect(status).to eq 200
    end
  end

  post "/tta_needs/:tta_need_id/activity_plans" do
    let!(:grantee_role) { create :grantee_role }
    let(:start_date) { 1.day.from_now }
    let(:end_date) { start_date + 1.hour }
    let(:raw_post) do
      {
        data: {
          type: "activity-plans",
          attributes: {
            "start-at": start_date.iso8601,
            "end-at": end_date.iso8601,
            format: "Virtual",
            location: "https://video.service.com/meetingid",
            "grantee-role-ids": [grantee_role.id.to_s]
          }
        }
      }.to_json
    end

    example "Create a new activity plan" do
      expect {
        do_request
      }.to change(ActivityPlan, :count).by(1)
      expect(status).to eq 201
    end
  end
end
