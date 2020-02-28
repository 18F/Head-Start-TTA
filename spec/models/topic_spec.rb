require "rails_helper"

RSpec.describe Topic, type: :model do
  subject { build :topic }

  describe "validations" do
    it { should validate_presence_of :name }
    it { should validate_presence_of :scope }
    it { should validate_uniqueness_of(:name).scoped_to :scope }
  end
end
