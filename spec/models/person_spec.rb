require "rails_helper"

RSpec.describe Person, type: :model do
  describe "validations" do
    it { should validate_presence_of :name }
    it { should validate_presence_of :role }
  end
end
