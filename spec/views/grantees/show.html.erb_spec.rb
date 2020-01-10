require "rails_helper"

RSpec.describe "grantees/show.html.erb", type: :view do
  before(:each) do
    assign(:grantee, create(:grantee))
  end

  it "renders attributes" do
    render
  end
end
