require "rails_helper"

RSpec.describe Address, type: :model do
  describe "validations" do
    it { should validate_presence_of :street1 }
    it { should validate_presence_of :longitude }
    it { should validate_presence_of :latitude }
    it { should validate_presence_of :city }
    it { should validate_presence_of :state }
    it { should validate_presence_of :postal_code }
  end
end
