require "rails_helper"

RSpec.describe "dashboard/central_office.html.erb", type: :view do
  let(:dashboard) do
    double(
      deployments_by_month: [],
      request_sheet: [],
      plan_sheet: double(each_upcoming_activity: []),
      assigned_specialists_counts: 0,
      report_sheet: double(most_recent_activities: [])
    )
  end
  before(:each) do
    assign(:dashboard, dashboard)
  end

  it "renders the view" do
    render
  end
end
