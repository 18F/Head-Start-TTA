require "pundit/rspec"

module PunditViewHelper
  def enable_pundit(view, user)
    without_partial_double_verification do
      allow(view).to receive(:policy) { |record| Pundit.policy(user, record) }
      allow(view).to receive(:current_user) { user }
      allow(view).to receive(:user_signed_in?) { !!user }
    end
  end
end

RSpec.configure do |config|
  config.include PunditViewHelper, type: :view
end
