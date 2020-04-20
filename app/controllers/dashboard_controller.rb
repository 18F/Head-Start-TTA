class DashboardController < ApplicationController
  def central_office
    @sheet = SmartsheetFacade.new
  end
end
