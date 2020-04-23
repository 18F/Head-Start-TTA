class DashboardController < ApplicationController
  def central_office
    @dashboard = DashboardPresenter.new(params)
  end
end
