require "rails_helper"

RSpec.describe "activity_reports/new", type: :view do
  it "renders new activity_report form" do
    render

    assert_select "form[action=?][method=?]", activity_reports_path, "post" do
    end
  end
end
