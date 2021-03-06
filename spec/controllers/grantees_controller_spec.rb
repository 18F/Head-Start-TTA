require "rails_helper"

RSpec.describe GranteesController, type: :controller do
  let(:valid_session) { {current_user_id: build_stubbed(:person).id} }

  describe "GET #index" do
    it "returns http success" do
      get :index, session: valid_session
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #show" do
    let(:grantee) { create :grantee }

    it "returns http success" do
      get :show, params: {id: grantee.id}, session: valid_session
      expect(response).to have_http_status(:success)
    end

    context "with a search query" do
      let(:grant) { create :grant, grantee: grantee }
      let!(:activity_report) { create :activity_report, grants: [grant] }

      it "returns success" do
        ActivityReportsIndex.import
        get :show, params: {id: grantee.id, q: "PFCE"}, session: valid_session
        expect(response).to have_http_status(:success)
      end
    end
  end
end
