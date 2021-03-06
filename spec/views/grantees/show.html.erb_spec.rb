require "rails_helper"

RSpec.describe "grantees/show.html.erb", type: :view do
  before(:each) do
    enable_pundit view, nil
    assign(:grantee, build_stubbed(:grantee))
    assign(:activity_reports, Kaminari.paginate_array([]).page(1))
    assign(:monitoring_reports, [])
  end

  it "renders attributes" do
    render
  end
end
