class MonitoringReportsController < ApplicationController
  include JsonapiMethods

  def show
    @monitoring_report = MonitoringReport.find params[:id]
    respond_to do |format|
      format.html
      format.api_json { render_model @monitoring_report }
    end
  end
end
