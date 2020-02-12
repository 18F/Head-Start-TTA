class GrantsController < ApplicationController
  include JsonapiMethods

  def index
    grantee = Grantee.find params[:grantee_id]
    render_models grantee.grants
  end

  def show
    render_model Grant.find(params[:id])
  end
end
