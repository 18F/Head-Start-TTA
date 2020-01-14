class GranteesController < ApplicationController
  def index
    @grantees = Grantee.all
  end

  def show
    @grantee = Grantee.find params[:id]
    @query = params[:q]
    @topic = params[:topic]
    if @query.present? || @topic.present?
      @activity_reports = ActivityReportsIndex.for_grantee(@grantee.id)
      @activity_reports = @activity_reports.filter_topic(@topic) if @topic.present?
      @activity_reports = @activity_reports.search(@query) if @query.present?
      @activity_reports = @activity_reports.objects
    end
  end
end
