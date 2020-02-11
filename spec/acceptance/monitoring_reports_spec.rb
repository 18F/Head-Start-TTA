require "rails_helper"
require "rspec_api_documentation/dsl"

resource "Monitoring Reports" do
  get "/monitoring_reports/:id" do
    let(:monitoring_report) { create :monitoring_report }
    let(:id) { monitoring_report.id }

    example_request "Show monitoring report details" do
      expect(status).to eq 200
    end
  end
end
