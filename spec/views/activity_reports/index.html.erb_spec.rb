require "rails_helper"

RSpec.describe "activity_reports/index", type: :view do
  before(:each) do
    assign(:activity_reports, [
      create(:activity_report),
      create(:activity_report)
    ])
  end

  it "renders a list of activity_reports" do
    render
  end
end
