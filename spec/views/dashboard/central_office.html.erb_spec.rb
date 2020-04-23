require "rails_helper"

RSpec.describe "dashboard/central_office.html.erb", type: :view do
  before(:each) do
    assign(:dashboard, DashboardPresenter.new({}))
  end

  it "renders the view" do
    render
  end
end
