require "rails_helper"
require "rspec_api_documentation/dsl"

resource "Grantees" do
  let(:grantee) { create :grantee, grants: [create(:grant)] }

  get "/grantees/:id" do
    let(:id) { grantee.id }

    example_request "Get Grantee details" do
      expect(status).to eq 200
    end

    context "with people" do
      let!(:person_link) { create :person_grantee_link, grantee: grantee }

      example_request "Grantee includes associated people", include: "people" do
        expect(status).to eq 200
      end
    end
  end
end
