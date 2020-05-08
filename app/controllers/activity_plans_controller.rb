class ActivityPlansController < ApplicationController
  include JsonapiMethods

  def index
    activity_plans = ActivityPlan.where(tta_need_id: params[:tta_need_id])
    render_models activity_plans
  end

  def show
    render_model ActivityPlan.find(params[:id])
  end

  def create
    tta_need = TtaNeed.find params[:tta_need_id]
    plan = tta_need.activity_plans.build activity_plan_params
    if plan.save
      render_model plan, render_options: {status: :created}
    else
      render_errors plan.errors, status: :unprocessable_entity
    end
  end

  private

  def activity_plan_params
    params.require(:data).require(:attributes).permit :start_at, :end_at, :format, :location
  end
end
