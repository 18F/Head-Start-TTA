require "rails_helper"

RSpec.describe "ActivityReports", type: :request do
  before(:each) do
    post login_path, params: {person_id: create(:person).id}
  end

  describe "GET /activity_reports" do
    it "works! (now write some real specs)" do
      get activity_reports_path
      expect(response).to have_http_status(200)
    end
  end
end
