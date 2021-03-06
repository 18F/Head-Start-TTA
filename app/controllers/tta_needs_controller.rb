class TtaNeedsController < ApplicationController
  include JsonapiMethods

  def index
    @tta_needs = if params[:grantee_id].present?
      TtaNeed.where(grantee_id: params[:grantee_id]).order(id: :desc)
    elsif params[:topic_id].present?
      TtaNeed.joins(:topics).where(topics: {id: params[:topic_id]})
    end
    @page_title = "TTA Needs"
    respond_to do |format|
      format.html
      format.api_json { render_models @tta_needs }
    end
  end

  def show
    @page_title = "TTA Progress Tracker"
    @page_has_custom_main = true
    respond_to do |format|
      format.html
      format.api_json { render_model TtaNeed.find(params[:id]) }
    end
  end

  def new
    @page_title = "Request TTA Deployment"
    @page_has_custom_main = true
  end

  def create
    grantee = Grantee.find params[:grantee_id]
    need = grantee.tta_needs.build create_params
    if need.save
      render_model need, render_options: {status: :created}
    else
      render_errors need.errors, status: :unprocessable_entity
    end
  end

  def activity_tracker
    @monitoring_report = ENV["EXP3_MONITORING_REPORT_ID"].present? ? MonitoringReport.find(ENV["EXP3_MONITORING_REPORT_ID"]) : MonitoringReport.first
    @grant = @monitoring_report.grant
    @grantee = @monitoring_report.grantee
  end

  private

  def create_params
    data = params.require(:data)
    attributes = data.require(:attributes).permit(
      :narrative,
      :indicator,
      :purpose,
      :initiated_by,
      :urgency,
      :start_date,
      specialist_types_needed: []
    )
    context = data.dig(:relationships, :context_link, :data)
    unless context.nil?
      attributes[:context_link_type] = context[:type].underscore.classify
      attributes[:context_link_id] = context[:id]
    end
    topics = data.dig(:relationships, :topics, :data)
    unless topics.nil?
      attributes[:topic_ids] = topics.map { |t| t[:id] }
    end
    attributes[:requester_id] = data.dig(:relationships, :requester, :data, :id) || current_user_id
    attributes
  end
end
