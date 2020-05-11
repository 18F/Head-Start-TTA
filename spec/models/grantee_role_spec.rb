require "rails_helper"

RSpec.describe GranteeRole, type: :model do
  describe "validations" do
    it { should validate_presence_of :title }
  end
end
