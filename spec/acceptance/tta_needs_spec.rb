require "rails_helper"
require "rspec_api_documentation/dsl"

resource "TTA Needs" do
  let(:grantee) { create :grantee }
  let(:program_specialist) { create :person, :program_specialist }

  get "/grantees/:grantee_id/tta_needs" do
    let(:grantee_id) { grantee.id }
    let!(:tta_need) { create :tta_need, grantee: grantee }

    example_request "List TTA needs for a grantee" do
      expect(status).to eq 200
    end
  end

  get "/topics/:topic_id/tta_needs" do
    let(:topic) { create :topic }
    let(:topic_id) { topic.id }
    let!(:tta_need) { create :tta_need, topics: [topic] }

    example_request "List TTA needs under a topic" do
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
    let(:topic1) { create :topic }
    let(:topic2) { create :topic, name: "School Readiness" }

    let(:raw_post) do
      {
        data: {
          type: "tta-needs",
          attributes: {
            "start-date": "2020-05-07",
            narrative: "Grantee would like help setting up a new fiscal system",
            indicator: "New Program Leadership",
            "initiated-by": "Grantee",
            "specialist-types-needed": [topic1.scope]
          },
          relationships: {
            requester: {data: {type: "people", id: program_specialist.id.to_s}},
            topics: {
              data: [
                {type: "topics", id: topic1.id.to_s},
                {type: "topics", id: topic2.id.to_s}
              ]
            }
          }
        }
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
              urgency: "Low",
              'start-date': "2020-05-07",
              narrative: "Grantee would like help setting up a new fiscal system",
              indicator: "New Program Leadership",
              "initiated-by": "Grantee",
              "specialist-types-needed": [topic1.scope]
            },
            relationships: {
              "context-link": {
                data: {type: "monitoring-reports", id: report.id.to_s}
              },
              requester: {data: {type: "people", id: program_specialist.id.to_s}},
              topics: {
                data: [{type: "topics", id: topic1.id.to_s}]
              }
            }
          }
        }.to_json
      end

      example_request "Create a new TTA Need based on a Monitoring Report" do
        expect(status).to eq 201
      end
    end
  end
end
