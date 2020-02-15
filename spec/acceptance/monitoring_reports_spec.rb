require "rails_helper"
require "rspec_api_documentation/dsl"

resource "Monitoring Reports" do
  let(:grant) { create :grant, :grantee }
  let(:monitoring_report) { create :monitoring_report, grant: grant }

  get "/grants/:grant_id/monitoring_reports" do
    let(:grant_id) { monitoring_report.grant_id }

    example_request "List monitoring reports for a grant" do
      expect(status).to eq 200
    end
  end

  get "/monitoring_reports/:id" do
    let(:id) { monitoring_report.id }

    example_request "Show monitoring report details" do
      expect(status).to eq 200
    end
  end
end
