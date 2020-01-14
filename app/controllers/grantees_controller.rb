class GranteesController < ApplicationController
  def index
    @grantees = Grantee.all
  end

  def show
    @grantee = Grantee.find params[:id]
    @query = params[:q]
    if @query.present?
      @activity_reports = ActivityReportsIndex.for_grantee(@grantee.id).search(@query).objects
    end
  end
end
