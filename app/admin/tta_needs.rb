ActiveAdmin.register TtaNeed do
  permit_params :narrative, :created_at

  form do |f|
    f.inputs "Markdown" do
      f.input :narrative
      f.input :created_at
    end
    f.actions
  end
end
