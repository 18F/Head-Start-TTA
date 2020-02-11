require "rails_helper"

RSpec.describe "TtaNeeds", type: :request do
  let(:need) { create :tta_need }

  describe "GET show" do
    it "responds with http success" do
      get tta_need_path(need.id)
      expect(response).to have_http_status(:success)
    end
  end
end
