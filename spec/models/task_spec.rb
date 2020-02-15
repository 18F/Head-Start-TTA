require "rails_helper"

RSpec.describe Task, type: :model do
  describe "validations" do
    it { should validate_presence_of :title }
    it { should allow_values("todo", "complete", "dropped").for :status }
  end
end
