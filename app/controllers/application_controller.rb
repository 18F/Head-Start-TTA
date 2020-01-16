class ApplicationController < ActionController::Base
  include ActiveSupport::SecurityUtils

  before_action :basic_auth_authenticate

  private

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
