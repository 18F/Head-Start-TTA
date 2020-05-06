require "rails_helper"
require "rspec_api_documentation/dsl"

resource "Tasks" do
  let(:tta_need) { create :tta_need }
  let(:tta_need_id) { tta_need.id }

  get "/tta_needs/:tta_need_id/tasks" do
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

  get "/tasks/:id/subtasks" do
    let(:task) { create :task }
    let(:id) { task.id }
    let!(:subtask) { create :task, title: "Subtask", parent: task }

    example_request "List subtasks of a task" do
      expect(status).to eq 200
    end
  end

  post "/tta_needs/:tta_need_id/tasks" do
    let(:raw_post) do
      {
        data: {
          type: "tasks",
          attributes: {
            status: "todo",
            title: "Grantee will send meeting notes to GS by April 1",
            notes: ""
          },
          relationships: {
            "created-by": {
              data: {type: "people", id: create(:person, :program_specialist).id.to_s}
            }
          }
        }
      }.to_json
    end

    example "Create a new task" do
      expect {
        do_request
      }.to change(Task, :count).by(1)
      expect(status).to eq 201
    end
  end

  post "/tasks/:id/subtasks" do
    let!(:goal) { create :task }
    let(:id) { goal.id }
    let(:raw_post) do
      {
        data: {
          type: "tasks",
          attributes: {
            status: "todo",
            title: "An objective to meet goal #{id}",
            notes: ""
          },
          relationships: {
            "created-by": {
              data: {type: "people", id: create(:person).id.to_s}
            }
          }
        }
      }.to_json
    end

    example "Greate a new objective" do
      expect {
        do_request
      }.to change(Task, :count).by(1)
      expect(status).to eq 201
    end
  end

  patch "/tasks/:id" do
    let(:task) { create :task }
    let(:id) { task.id }

    let(:raw_post) do
      {
        data: {
          type: "tasks",
          id: id.to_s,
          attributes: {
            status: "complete"
          },
          relationships: {
            "completed-by": {
              data: {type: "people", id: create(:person).id.to_s}
            }
          }
        }
      }.to_json
    end

    example_request "Update task completion" do
      expect(status).to eq 200
    end
  end
end
