require "rails_helper"

RSpec.describe "activity_reports/edit", type: :view do
  before(:each) do
    @activity_report = assign(:activity_report, create(:activity_report))
  end

  it "renders the edit activity_report form" do
    render

    assert_select "form[action=?][method=?]", activity_report_path(@activity_report), "post" do
    end
  end
end
