class GranteesController < ApplicationController
  def index
    @grantees = Grantee.all
  end

  def show
    @grantee = Grantee.find params[:id]
  end
end
