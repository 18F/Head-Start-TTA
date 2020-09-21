ActiveAdmin.register Task do
  batch_action :reset_status do |ids|
    batch_action_collection.find(ids).each do |task|
      task.reset_status
    end
    redirect_to collection_path, alert: "The tasks have been reset."
  end

  permit_params :status, :title, :notes, :parent_type, :parent_id, :created_by_id, :assigned_to_id, :completed_by_id, :due_date, :completed_at, :created_at, links: []

  controller do
    def create
      parse_links
      super
    end

    def update
      parse_links
      super
    end

    private def parse_links
      params["task"]["links"] = begin
        JSON.parse(params["task"]["links"])
      rescue
        []
      end
    end
  end

  form do |f|
    f.inputs "Details" do
      f.input :status, as: :select, collection: %w[todo complete dropped]
      f.input :parent_type
      f.input :parent_id
      f.input :due_date
      f.input :completed_at
      f.input :created_at
      f.input :links
    end
    f.inputs "Markdown" do
      f.input :title, as: :text
      f.input :notes
    end
    f.inputs "People" do
      f.input :created_by
      f.input :assigned_to
      f.input :completed_by
    end
    f.actions
  end
end
