class ApplicationController < ActionController::Base
  include ActiveSupport::SecurityUtils
  include Pundit

  before_action :basic_auth_authenticate
  before_action :require_user!

  helper_method :user_signed_in?, :current_user

  def user_signed_in?
    current_user_id.present?
  end

  def current_user_id
    session[:current_user_id]
  end

  def current_user
    @current_user ||= Person.find(current_user_id) if user_signed_in?
  end

  private

  def require_user!
    if request.format.html? && !user_signed_in?
      session[:return_to] = request.env["PATH_INFO"]
      redirect_to login_path
    end
  end

  def basic_auth_authenticate
    return unless Rails.env.production?

    authenticate_or_request_with_http_basic do |username, password|
      secure_compare_user(username) && secure_compare_pass(password)
    end
  end

  def secure_compare_user(username)
    secure_compare(username, Rails.application.credentials.basic_auth_user)
  end

  def secure_compare_pass(password)
    secure_compare(password, Rails.application.credentials.basic_auth_pass)
  end
end
