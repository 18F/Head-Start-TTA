require "rails_helper"

RSpec.describe Program, type: :model do
  subject { build :program }

  describe "validations" do
    it { should validate_presence_of :pid }
    it { should validate_presence_of :grant_number }
    it { should validate_presence_of :type }
    it { should validate_presence_of :region }
    it { should validate_presence_of :name }
    it { should validate_presence_of :grantee_name }
    it { should validate_presence_of :identifier }
    it { should validate_uniqueness_of(:pid).case_insensitive }
  end
end
