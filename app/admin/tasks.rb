ActiveAdmin.register Task do
  batch_action :reset_status do |ids|
    batch_action_collection.find(ids).each do |task|
      task.reset_status
    end
    redirect_to collection_path, alert: "The tasks have been reset."
  end

  permit_params :status, :title, :notes, :parent_type, :parent_id, :created_by_id, :assigned_to_id, :completed_by_id, :due_date, :completed_at, :created_at

  form do |f|
    f.inputs "Details" do
      f.input :status, as: :select, collection: %w[todo complete dropped]
      f.input :title
      f.input :notes
      f.input :parent_type
      f.input :parent_id
      f.input :due_date
      f.input :completed_at
      f.input :created_at
    end
    f.inputs "People" do
      f.input :created_by
      f.input :assigned_to
      f.input :completed_by
    end
    f.actions
  end
end
