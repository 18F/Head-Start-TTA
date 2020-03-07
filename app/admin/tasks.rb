ActiveAdmin.register Task do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :status, :title, :notes, :parent_type, :parent_id, :created_by_id, :assigned_to_id, :completed_by_id, :due_date, :completed_at, :created_at
  #
  # or
  #
  # permit_params do
  #   permitted = [:status, :title, :notes, :parent_type, :parent_id, :created_by_id, :assigned_to_id, :completed_by_id, :due_date, :completed_at]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end


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
