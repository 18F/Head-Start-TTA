require "rails_helper"

RSpec.describe GranteesController, type: :controller do
  describe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #show" do
    let(:grantee) { create :grantee }

    it "returns http success" do
      get :show, params: {id: grantee.id}
      expect(response).to have_http_status(:success)
    end

    context "with a search query" do
      let(:grant) { create :grant, grantee: grantee }
      let!(:activity_report) { create :activity_report, grants: [grant] }

      it "returns success" do
        ActivityReportsIndex.import
        get :show, params: {id: grantee.id, q: "PFCE"}
        expect(response).to have_http_status(:success)
      end
    end
  end
end
