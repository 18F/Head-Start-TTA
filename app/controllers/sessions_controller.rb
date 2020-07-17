class SessionsController < ApplicationController
  skip_before_action :require_user!

  def new
    @people = Person.all.order(:name)
    @page_title = "Login"
  end

  def create
    return_path = session[:return_to] || root_path
    reset_session
    if params[:person_id].present?
      session[:current_user_id] = params[:person_id]
    elsif params[:name].present?
      new_person = Person.find_or_create_by(name: params[:name], role: params[:role])
      session[:current_user_id] = new_person.id
    end
    redirect_to return_path
  end

  def destroy
    reset_session
    redirect_to root_path
  end
end
