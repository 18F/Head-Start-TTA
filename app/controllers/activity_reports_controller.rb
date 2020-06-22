class ActivityReportsController < ApplicationController
  include JsonapiMethods

  before_action :set_activity_report, only: [:show, :edit, :update, :destroy]

  def index
    @activity_reports = if params[:tta_need_id].present?
      ActivityReport.where(tta_need_id: params[:tta_need_id]).order(:start_date)
    else
      ActivityReport.all
    end
    respond_to do |format|
      format.html
      format.api_json { render_models @activity_reports }
    end
  end

  def show
    respond_to do |format|
      format.html
      format.api_json { render_model @activity_report }
    end
  end

  def edit
  end

  def create
    tta_need = TtaNeed.find params[:tta_need_id]
    report = tta_need.activity_reports.build json_api_params
    if report.save
      report.grants << tta_need.grants
      render_model report, render_options: {status: :created}
    else
      render_errors report.errors, status: :unprocessable_entity
    end
  end

  def update
    respond_to do |format|
      if @activity_report.update(activity_report_params)
        format.html { redirect_to @activity_report, notice: "Activity report was successfully updated." }
        format.json { render :show, status: :ok, location: @activity_report }
      else
        format.html { render :edit }
        format.json { render json: @activity_report.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @activity_report.destroy
    respond_to do |format|
      format.html { redirect_to activity_reports_url, notice: "Activity report was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  def json_api_params
    params.require(:data).require(:attributes).permit(
      :start_date,
      :end_date,
      :duration,
      :contact_method,
      :activity_plan_id,
      grantee_role_ids: []
    ).tap do |attrs|
      attrs[:activity_typ] = "Single Grantee"
    end
  end

  def set_activity_report
    @activity_report = ActivityReport.find(params[:id])
  end

  def activity_report_params
    params.require(:activity_report).permit %i[activity_typ start_date end_date duration]
  end
end
