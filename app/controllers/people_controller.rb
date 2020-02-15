class PeopleController < ApplicationController
  include JsonapiMethods

  def index
    grantee = Grantee.find params[:grantee_id]
    render_models grantee.person_grantee_links
  end

  def show
    render_model PersonGranteeLink.find(params[:id])
  end
end
