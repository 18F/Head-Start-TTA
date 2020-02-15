require "rails_helper"
require "rspec_api_documentation/dsl"

resource "People" do
  let(:person_link) { create :person_grantee_link }

  get "/grantees/:grantee_id/people" do
    let(:grantee_id) { person_link.grantee.id }

    example_request "List people associated with a Grantee" do
      expect(status).to eq 200
    end
  end

  get "/people/:id" do
    let(:id) { person_link.id }

    example_request "Get details for a Person" do
      expect(status).to eq 200
    end
  end
end
