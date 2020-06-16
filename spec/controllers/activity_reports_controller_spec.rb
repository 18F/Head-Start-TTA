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

  describe "GET #new" do
    it "returns a success response" do
      get :new, params: {}, session: valid_session
      expect(response).to be_successful
    end
  end

  describe "GET #edit" do
    it "returns a success response" do
      get :edit, params: {id: activity_report.to_param}, session: valid_session
      expect(response).to be_successful
    end
  end

  describe "POST #create" do
    context "with valid params" do
      context "EC reports" do
        let(:file) { fixture_file_upload Rails.root.join("spec/support/ec_grantee_report.xlsx"), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }
        it "creates new ActivityReports" do
          expect {
            post :create, params: {file_type: "ec", file: file}, session: valid_session
          }.to change(ActivityReport, :count).by(3)
        end

        it "sets the AR topics" do
          post :create, params: {file_type: "ec", file: file}, session: valid_session
          ar = ActivityReport.first
          expect(ar.topic_list).to eq ["Parent and Family Engagement", "Program Planning and Assessment", "Training"]
        end

        it "sets the AR materials" do
          post :create, params: {file_type: "ec", file: file}, session: valid_session
          ar = ActivityReport.first
          expect(ar.material_list).to eq [
            "PFCE",
            "Building Partnerships: Guide to Developing Relationship with Families",
            "Parenting Curricula Review Databases"
          ]
        end

        it "creates new Grantees" do
          expect {
            post :create, params: {file_type: "ec", file: file}, session: valid_session
          }.to change(Grantee, :count).by(1)
        end

        it "creates new People" do
          expect {
            post :create, params: {file_type: "ec", file: file}, session: valid_session
          }.to change(Person, :count).by(2)
        end

        it "creates new Grants" do
          expect {
            post :create, params: {file_type: "ec", file: file}, session: valid_session
          }.to change(Grant, :count).by(7)
        end

        it "redirects to the activity_report index" do
          post :create, params: {file_type: "ec", file: file}, session: valid_session
          expect(response).to redirect_to(activity_reports_path)
        end
      end

      context "GS reports" do
        let(:file) { fixture_file_upload Rails.root.join("spec/support/gs_grantee_report.xlsx"), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }

        it "creates new ActivityReports" do
          expect {
            post :create, params: {file_type: "gs", file: file}, session: valid_session
          }.to change(ActivityReport, :count).by(1)
        end
      end
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
