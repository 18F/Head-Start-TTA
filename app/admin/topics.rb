ActiveAdmin.register Topic do
  permit_params :name, :scope, :parent_id

  form do |f|
    f.inputs "Details" do
      f.input :scope
      f.input :name
      f.input :parent, collection: Topic.root_topics.order(:name).map { |t| [t.to_s, t.id] }
    end
    f.actions
  end
end
