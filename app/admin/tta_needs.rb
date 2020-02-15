ActiveAdmin.register TtaNeed do
  permit_params :narrative

  form do |f|
    f.inputs "Markdown" do
      f.input :narrative
    end
    f.actions
  end
end
