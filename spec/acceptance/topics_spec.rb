require "rails_helper"
require "rspec_api_documentation/dsl"

resource "Topics" do
  let!(:topic) { create :topic }

  get "/topics" do
    example_request "List available topics" do
      expect(status).to eq 200
    end
  end
  get "/topics/:id" do
    let(:id) { topic.id }

    example_request "Get details for a Topic" do
      expect(status).to eq 200
    end
  end
end
