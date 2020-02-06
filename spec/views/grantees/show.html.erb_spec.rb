require "rails_helper"

RSpec.describe "grantees/show.html.erb", type: :view do
  before(:each) do
    assign(:grantee, create(:grantee))
    assign(:activity_reports, Kaminari.paginate_array([]).page(1))
    assign(:monitoring_reports, [])
  end

  it "renders attributes" do
    render
  end
end
