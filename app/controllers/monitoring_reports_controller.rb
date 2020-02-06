class MonitoringReportsController < ApplicationController
  def show
    @monitoring_report = MonitoringReport.find params[:id]
  end
end
