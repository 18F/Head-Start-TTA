ActiveAdmin.register ActivityReport do
  permit_params :tta_need_id, :contact_method, :activity_typ, :start_date, :end_date, :duration, person_ids: []

  form do |f|
    f.inputs "Details" do
      f.input :contact_method, as: :select, collection: ["Site Visit", "Phone", "Virtual", "Other"]
      f.input :activity_typ, label: "Activity Type"
      f.input :start_date
      f.input :end_date
      f.input :duration
      f.input :people, as: :select, input_html: {multiple: true}
      f.input :tta_need, collection: TtaNeed.all.map { |t| t.id }
    end
    f.actions
  end
end
