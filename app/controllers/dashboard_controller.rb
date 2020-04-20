class DashboardController < ApplicationController
  def central_office
    @dashboard = DashboardPresenter.new(SmartsheetFacade.new)
  end
end
