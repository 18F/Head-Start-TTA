class GranteesController < ApplicationController
  include JsonapiMethods

  def index
    @grantees = Grantee.all
    @page_title = "Grantees"
  end

  def show
    @grantee = Grantee.find params[:id]
    if request.format.html?
      @page_title = @grantee.name
      @page_has_custom_main = true
      @query = params[:q]
      @topic = params[:topic]
      @date = params[:date]
      @monitoring_reports = @grantee.monitoring_reports.order(:report_date)
      @activity_reports = find_activity_reports
    end
    respond_to do |format|
      format.html
      format.api_json { render_model @grantee }
    end
  end

  private

  def find_activity_reports
    if @query.present? || @topic.present? || @date.present?
      search = ActivityReportsIndex.for_grantee(@grantee.id)
      search = search.filter_topic(@topic) if @topic.present?
      search = search.filter_start_date(@date) if @date.present?
      search = if @query.present?
        search.search(@query)
      else
        search.order(start_date: {order: :desc})
      end
      search.page(page).per(per_page).objects
    else
      @grantee.activity_reports.distinct.page(page).per(per_page).order(start_date: :desc)
    end
  end

  def page
    params[:page].present? ? params[:page] : 1
  end

  def per_page
    params[:per_page].present? ? params[:per_page] : 25
  end
end
