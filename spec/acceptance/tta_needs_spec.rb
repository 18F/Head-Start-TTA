require "rails_helper"
require "rspec_api_documentation/dsl"

resource "TTA Needs" do
  get "/tta_needs/:id" do
    let(:tta_need) { create :tta_need, specialist_types_needed: ["GS"] }
    let(:id) { tta_need.id }
    let!(:task) { create :task, parent: tta_need }

    example "Show details about a TTA need" do
      do_request
      expect(status).to eq 200
    end

    example "Include tasks in the response" do
      do_request(include: "tasks")
      expect(status).to eq 200
    end
  end
end
