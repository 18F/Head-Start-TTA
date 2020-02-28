require "rails_helper"

RSpec.describe "grantees/index.html.erb", type: :view do
  before(:each) do
    assign(:grantees, [
      create(:grantee)
    ])
  end

  it "renders a list of grantees" do
    render
  end
end
