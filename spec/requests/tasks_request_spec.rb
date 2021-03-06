require "rails_helper"

RSpec.describe "Tasks", type: :request do
  let(:tta_need) { create :tta_need }
  let(:task) { create :task, parent: tta_need }

  before(:each) do
    post login_path, params: {person_id: build_stubbed(:person).id}
  end

  describe "GET index" do
    it "responds with http success" do
      post login_path, params: {person_id: create(:person).id}
      get tta_need_tasks_path(tta_need_id: tta_need.id)
      expect(response).to have_http_status(:success)
    end
  end
end
