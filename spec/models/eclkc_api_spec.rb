require "rails_helper"

RSpec.describe EclkcApi, type: :model do
  describe "#centers" do
    it "returns a list of centers" do
      expect(subject.centers.class.name).to eq "Array"
    end
  end
end
