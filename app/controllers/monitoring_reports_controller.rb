class MonitoringReportsController < ApplicationController
  include JsonapiMethods

  def index
    grant = Grant.find params[:grant_id]
    render_models grant.monitoring_reports
  end

  def show
    @monitoring_report = MonitoringReport.find params[:id]
    respond_to do |format|
      format.html
      format.api_json { render_model @monitoring_report }
    end
  end
end
