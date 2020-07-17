class DashboardController < ApplicationController
  def central_office
    @dashboard = DashboardPresenter.new(params)
    @page_title = "Central Office Dashboard"
  end

  def request_details
    @request = SmartsheetFacade.new.request_sheet.get_row(params[:id])
    @page_title = "TTA Request Details"
  end
end
