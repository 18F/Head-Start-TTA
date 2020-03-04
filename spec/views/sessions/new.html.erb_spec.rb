require "rails_helper"

RSpec.describe "sessions/new.html.erb", type: :view do
  before(:each) do
    assign(:people, [
      create(:person)
    ])
  end

  it "renders the login form" do
    render
    assert_select "form[action=?][method=?]", login_path, "post" do
      assert_select "select[name=?]", "person_id"
    end
  end
end
