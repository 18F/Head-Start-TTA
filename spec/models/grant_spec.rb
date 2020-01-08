require "rails_helper"

RSpec.describe Grant, type: :model do
  subject { build :grant }

  describe "validations" do
    it { should validate_presence_of :number }
    it { should validate_uniqueness_of :number }
  end
end
