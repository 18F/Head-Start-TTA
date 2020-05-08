class GranteeRolesController < ApplicationController
  include JsonapiMethods

  def index
    render_models GranteeRole.all
  end

  def show
    render_model GranteeRole.find(params[:id])
  end

  private

  def per_page
    1000
  end
end
