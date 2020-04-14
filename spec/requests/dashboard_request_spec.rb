require "rails_helper"

RSpec.describe "Dashboards", type: :request do
  before(:each) do
    post login_path, params: {person_id: create(:person).id}
  end

  describe "GET /central_office" do
    it "returns http success" do
      get "/"
      expect(response).to have_http_status(:success)
    end
  end
end
