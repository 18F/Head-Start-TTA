require "rails_helper"

RSpec.describe ActivityReportsController, type: :controller do
  let(:valid_attributes) { attributes_for :activity_report }

  let(:invalid_attributes) { {duration: nil} }

  let!(:valid_session) { {current_user_id: build_stubbed(:person).id} }

  let(:activity_report) { create :activity_report }

  describe "GET #index" do
    it "returns a success response" do
      activity_report
      get :index, params: {}, session: valid_session
      expect(response).to be_successful
    end
  end

  describe "GET #show" do
    it "returns a success response" do
      get :show, params: {id: activity_report.to_param}, session: valid_session
      expect(response).to be_successful
    end
  end

  describe "GET #edit" do
    it "returns a success response" do
      get :edit, params: {id: activity_report.to_param}, session: valid_session
      expect(response).to be_successful
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) { {duration: 4} }

      it "updates the requested activity_report" do
        put :update, params: {id: activity_report.to_param, activity_report: new_attributes}, session: valid_session
        activity_report.reload
        expect(activity_report.duration).to eq 4
      end

      it "redirects to the activity_report" do
        put :update, params: {id: activity_report.to_param, activity_report: valid_attributes}, session: valid_session
        expect(response).to redirect_to(activity_report)
      end
    end

    context "with invalid params" do
      it "returns a success response (i.e. to display the 'edit' template)" do
        put :update, params: {id: activity_report.to_param, activity_report: invalid_attributes}, session: valid_session
        expect(response).to be_successful
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested activity_report" do
      activity_report
      expect {
        delete :destroy, params: {id: activity_report.to_param}, session: valid_session
      }.to change(ActivityReport, :count).by(-1)
    end

    it "redirects to the activity_reports list" do
      delete :destroy, params: {id: activity_report.to_param}, session: valid_session
      expect(response).to redirect_to(activity_reports_url)
    end
  end
end
