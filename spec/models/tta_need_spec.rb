require "rails_helper"

RSpec.describe TtaNeed, type: :model do
  describe "validations" do
    it { should allow_values(*TtaNeed::VALID_INDICATORS).for :indicator }
  end
end
