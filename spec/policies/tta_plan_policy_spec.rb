require "rails_helper"

RSpec.describe TtaPlanPolicy, type: :policy do
  subject { described_class }

  describe "ECS" do
    let(:user) { build_stubbed :person, :ecs }

    permissions :create? do
      it "allows creating a tta plan" do
        expect(subject).to permit(user, :tta_plan)
      end
    end
  end

  describe "PS" do
    let(:user) { build_stubbed :person, :program_specialist }

    permissions :create? do
      it "does not allow creating a tta request" do
        expect(subject).to_not permit(user, :tta_plan)
      end
    end
  end
end
