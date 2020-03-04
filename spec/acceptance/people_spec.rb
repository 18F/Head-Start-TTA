require "rails_helper"
require "rspec_api_documentation/dsl"

resource "People" do
  get "/grantees/:grantee_id/people/employees" do
    let(:person_link) { create :person_grantee_link, :grantee_employee }
    let(:grantee_id) { person_link.grantee.id }

    example_request "List Grantee employees" do
      expect(status).to eq 200
    end
  end

  get "/grantees/:grantee_id/people/specialists" do
    let(:person_link) { create :person_grantee_link }
    let(:grantee_id) { person_link.grantee.id }

    example_request "List TA specialists assigned to Grantee" do
      expect(status).to eq 200
    end
  end

  get "/people/:id" do
    let(:id) { create(:person).id }

    example_request "Get details for a Person" do
      expect(status).to eq 200
    end
  end
end
