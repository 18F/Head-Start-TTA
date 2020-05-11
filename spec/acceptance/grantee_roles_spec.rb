require "rails_helper"
require "rspec_api_documentation/dsl"

resource "Grantee Roles" do
  let!(:grantee_role) { create :grantee_role }

  get "/grantee_roles" do
    example_request "List all grantee roles" do
      expect(status).to eq 200
    end
  end

  get "/grantee_roles/:id" do
    let(:id) { grantee_role.id }

    example_request "Get Grantee Role details" do
      expect(status).to eq 200
    end
  end
end
