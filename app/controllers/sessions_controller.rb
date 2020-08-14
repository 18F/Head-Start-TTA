class SessionsController < ApplicationController
  skip_before_action :require_user!
  before_action :save_return_path, only: %i[create omniauth]

  def new
    @people = Person.all.order(:name)
    @page_title = "Login"
  end

  def create
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

  def omniauth
    auth = request.env["omniauth.auth"]
    Rails.logger.debug <<~EOM
      hses auth raw_info:
      #{auth[:extra][:raw_info].inspect}
    EOM
    person = Person.find_or_create_by(email: auth[:info][:email]) { |p|
      p.name = auth[:info][:name]
      p.role = auth[:info][:authorities].join(", ")
    }
    session[:current_user_id] = person.id
    redirect_to return_path
  end

  def return_path
    @return_path ||= session[:return_to] || root_path
  end

  def save_return_path
    return_path
    reset_session
  end
end
