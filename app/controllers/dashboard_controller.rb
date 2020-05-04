class DashboardController < ApplicationController
  def central_office
    @dashboard = DashboardPresenter.new(params)
  end

  def request_details
    @request = SmartsheetFacade.new.request_sheet.get_row(params[:id])
  end
end
