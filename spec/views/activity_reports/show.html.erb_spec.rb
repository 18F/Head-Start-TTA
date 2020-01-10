require "rails_helper"

RSpec.describe "activity_reports/show", type: :view do
  before(:each) do
    @activity_report = assign(:activity_report, create(:activity_report))
  end

  it "renders attributes in <p>" do
    render
  end
end
