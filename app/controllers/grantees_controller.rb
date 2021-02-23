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
      @monitoring_reports = @grantee.monitoring_reports.order(:report_date)
      @activity_reports = find_activity_reports.distinct.page(page).per(per_page).order(start_date: :desc)
    end
    respond_to do |format|
      format.html
      format.api_json { render_model @grantee }
    end
  end

  private

  def find_activity_reports
    search = @grantee.activity_reports
    search = search.where("contact_method ilike '?%'", @query) if @query.present?
    search
  end

  def page
    params[:page].present? ? params[:page] : 1
  end

  def per_page
    params[:per_page].present? ? params[:per_page] : 25
  end
end
