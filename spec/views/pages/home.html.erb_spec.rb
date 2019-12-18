require 'rails_helper'

RSpec.describe "pages/home.html.erb", type: :view do
  it "displays the header" do
    render
    expect(rendered).to match "TTA Data Platform"
  end
end
