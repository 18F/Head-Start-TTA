require "rails_helper"

RSpec.describe "monitoring_reports/show", type: :view do
  let(:monitoring_report) { create(:monitoring_report, grant: create(:grant, :grantee)) }
  before(:each) do
    assign(:monitoring_report, monitoring_report)
  end

  it "renders attributes" do
    render
  end
end
