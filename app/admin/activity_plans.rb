ActiveAdmin.register ActivityPlan do
  permit_params :tta_need_id, :start_at, :end_at, :format, :location
end
