class PeopleController < ApplicationController
  include JsonapiMethods
  before_action :load_grantee, only: %i[employees specialists]

  def employees
    render_models @grantee.employees
  end

  def specialists
    render_models @grantee.assigned_specialists
  end

  def show
    render_model Person.find(params[:id])
  end

  private

  def load_grantee
    @grantee = Grantee.find params[:grantee_id]
  end
end
