class SessionsController < ApplicationController
  skip_before_action :require_user!

  def new
    @people = Person.all.order(:name)
  end

  def create
    return_path = session[:return_to] || root_path
    reset_session
    session[:current_user_id] = params[:person_id]
    redirect_to return_path
  end

  def destroy
    reset_session
    redirect_to root_path
  end
end
