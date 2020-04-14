class DashboardController < ApplicationController
  def central_office
    @request_sheet = SmartsheetFacade.new.request_sheet
  end
end
