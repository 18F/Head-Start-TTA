require "rails_helper"

RSpec.describe MonitoringReportsController, type: :controller do
  let(:valid_session) { {current_user_id: build_stubbed(:person).id} }
  let(:monitoring_report) { create :monitoring_report }

  describe "GET #show" do
    it "returns a success response" do
      get :show, params: {id: monitoring_report.to_param}, session: valid_session
      expect(response).to be_successful
    end
  end
end
