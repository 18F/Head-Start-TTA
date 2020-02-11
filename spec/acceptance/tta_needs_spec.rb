require "rails_helper"
require "rspec_api_documentation/dsl"

resource "TTA Needs" do
  let(:grantee) { create :grantee }

  get "/grantees/:grantee_id/tta_needs" do
    let(:grantee_id) { grantee.id }
    let!(:tta_need) { create :tta_need, grantee: grantee }

    example_request "List TTA needs for a grantee" do
      expect(status).to eq 200
    end
  end

  get "/tta_needs/:id" do
    let(:tta_need) { create :tta_need, specialist_types_needed: ["GS"] }
    let(:id) { tta_need.id }
    let!(:task) { create :task, parent: tta_need }

    example_request "Show details about a TTA need" do
      expect(status).to eq 200
    end

    example_request "Include tasks in the response", include: "tasks" do
      expect(status).to eq 200
    end
  end

  post "/grantees/:grantee_id/tta_needs" do
    let(:grantee_id) { grantee.id }

    let(:raw_post) do
      {
        data: {
          type: "tta-needs",
          attributes: {
            narrative: "Grantee would like help setting up a new fiscal system",
            indicator: "Grantee Request",
            "specialist-types-needed": ["GS"],
          },
        },
      }.to_json
    end

    example "Create a new TTA Need record" do
      expect {
        do_request
      }.to change(TtaNeed, :count).by(1)
      expect(status).to eq 201
    end

    context "with a provided monitoring report" do
      let(:report) { create :monitoring_report }
      let(:grantee) { create :grantee, grants: [report.grant] }
      let(:raw_post) do
        {
          data: {
            type: "tta-needs",
            attributes: {
              narrative: "Grantee would like help setting up a new fiscal system",
              indicator: "Grantee Request",
              "specialist-types-needed": ["GS"],
            },
            relationships: {
              "context-link": {
                data: {type: "monitoring-reports", id: report.id.to_s},
              },
            },
          },
        }.to_json
      end

      example_request "Create a new TTA Need based on a Monitoring Report" do
        expect(status).to eq 201
      end
    end
  end
end
