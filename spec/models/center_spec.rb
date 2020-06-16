require "rails_helper"

RSpec.describe Center, type: :model do
  subject { build :center }

  describe "validations" do
    it { should validate_presence_of :cid }
    it { should validate_presence_of :grant_number }
    it { should validate_presence_of :type }
    it { should validate_presence_of :name }
    it { should validate_uniqueness_of(:cid).case_insensitive }
  end
end
