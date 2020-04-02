require "rails_helper"

RSpec.describe "grantees/show.html.erb", type: :view do
  let(:grantee) { build_stubbed :grantee }
  before(:each) do
    allow(grantee).to receive(:reviews).and_return []
    assign(:grantee, grantee)
    assign(:activity_reports, Kaminari.paginate_array([]).page(1))
    assign(:monitoring_reports, [])
  end

  it "renders attributes" do
    render
  end
end
