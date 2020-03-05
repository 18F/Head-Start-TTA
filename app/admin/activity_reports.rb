ActiveAdmin.register ActivityReport do
  permit_params :activity_id, :state, :status, :contact_method, :activity_typ, :purpose, :start_date, :end_date, :duration, :primary_reason, :narrative, :next_steps, person_ids: []

  form do |f|
    f.inputs "Details" do
      f.input :activity_id
      f.input :state
      f.input :status
      f.input :contact_method, as: :select, collection: ["Site Visit", "Phone", "Virtual", "Other"]
      f.input :activity_typ, label: "Activity Type"
      f.input :purpose
      f.input :start_date
      f.input :end_date
      f.input :duration
      f.input :people, as: :select, input_html: {multiple: true}
      f.input :primary_reason
    end
    f.inputs "Markdown" do
      f.input :narrative
      f.input :next_steps
    end
    f.actions
  end
end
