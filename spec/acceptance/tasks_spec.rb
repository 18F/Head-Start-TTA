require "rails_helper"
require "rspec_api_documentation/dsl"

resource "Tasks" do
  get "/tta_needs/:tta_need_id/tasks" do
    let(:tta_need) { create :tta_need }
    let(:tta_need_id) { tta_need.id }
    let!(:task) { create :task, parent: tta_need }

    with_options scope: :page do
      parameter :number, "Page number to retrieve, defaults to 1"
      parameter :size, "Records to include on each page, defaults to 25"
    end

    example_request "List tasks for a TTA need" do
      expect(status).to eq 200
    end
  end

  get "/tasks/:id" do
    let(:task) { create :task }
    let(:id) { task.id }

    example_request "Show details about a task" do
      expect(status).to eq 200
    end
  end
end
