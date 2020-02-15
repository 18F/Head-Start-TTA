require "rails_helper"
require "rspec_api_documentation/dsl"

resource "Grants" do
  let(:grant) { create :grant, :grantee }
  let(:grantee) { grant.grantee }

  get "/grantees/:grantee_id/grants" do
    let(:grantee_id) { grantee.id }

    example_request "List grants for a Grantee" do
      expect(status).to eq 200
    end
  end

  get "/grants/:id" do
    let(:id) { grant.id }

    example_request "Get details for a Grant" do
      expect(status).to eq 200
    end
  end
end
