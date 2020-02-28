require "rails_helper"

RSpec.describe "TtaNeeds", type: :request do
  let!(:need) { create :tta_need }
  let(:grantee) { need.grantee }

  describe "GET index" do
    it "responds with http success" do
      get grantee_tta_needs_path(grantee_id: grantee.id)
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET show" do
    it "responds with http success" do
      get tta_need_path(need.id)
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET new" do
    it "responds with http success" do
      get new_grantee_tta_need_path(grantee_id: grantee.id)
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET tracker" do
    let!(:report) { create :monitoring_report, :grantee }
    it "responds with http success" do
      get tta_needs_tracker_path
      expect(response).to have_http_status(:success)
    end
  end
end
