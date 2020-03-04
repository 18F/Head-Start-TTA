require "rails_helper"

RSpec.describe "Sessions", type: :request do
  describe "GET /login" do
    it "returns http success" do
      get login_path
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST /login" do
    let(:person) { create :person }
    it "redirects to root" do
      post login_path, params: {person_id: person.id}
      expect(response).to redirect_to(root_path)
    end
  end

  describe "GET /logout" do
    it "redirects to root_path" do
      get logout_path
      expect(response).to redirect_to(root_path)
    end
  end
end
