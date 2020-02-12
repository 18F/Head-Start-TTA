require "rails_helper"
require "rspec_api_documentation/dsl"

resource "Grantees" do
  let(:grantee) { create :grantee, grants: [create(:grant)] }

  get "/grantees/:id" do
    let(:id) { grantee.id }

    example_request "Get Grantee details" do
      expect(status).to eq 200
    end
  end
end
