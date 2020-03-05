require "rails_helper"

RSpec.describe Task, type: :model do
  describe "validations" do
    it { should validate_presence_of :title }
    it { should allow_values("todo", "complete", "dropped").for :status }
  end

  describe "#overdue?" do
    context "no due date" do
      subject { build_stubbed :task }
      it { expect(subject).to_not be_overdue }
    end
    context "past due date" do
      subject { build_stubbed :task, due_date: 1.day.ago }
      it { expect(subject).to be_overdue }
    end
    context "future due date" do
      subject { build_stubbed :task, due_date: 1.day.from_now }
      it { expect(subject).to_not be_overdue }
    end
  end
end
