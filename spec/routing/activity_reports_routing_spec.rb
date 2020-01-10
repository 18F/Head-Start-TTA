require "rails_helper"

RSpec.describe ActivityReportsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/activity_reports").to route_to("activity_reports#index")
    end

    it "routes to #new" do
      expect(get: "/activity_reports/new").to route_to("activity_reports#new")
    end

    it "routes to #show" do
      expect(get: "/activity_reports/1").to route_to("activity_reports#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/activity_reports/1/edit").to route_to("activity_reports#edit", id: "1")
    end

    it "routes to #create" do
      expect(post: "/activity_reports").to route_to("activity_reports#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/activity_reports/1").to route_to("activity_reports#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/activity_reports/1").to route_to("activity_reports#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/activity_reports/1").to route_to("activity_reports#destroy", id: "1")
    end
  end
end
