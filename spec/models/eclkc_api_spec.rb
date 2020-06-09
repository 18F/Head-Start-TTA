require "rails_helper"

RSpec.describe EclkcApi, :vcr, type: :model do
  describe "#centers" do
    it "returns a list of centers" do
      centers_response = subject.centers state: "MD"
      expect(centers_response.keys).to eq %w[results documents]
      expect(centers_response[:results]).to eq 231
    end
  end

  describe "#programs" do
    it "returns a list of programs" do
      programs_response = subject.programs state: "MD"
      expect(programs_response.keys).to eq %w[results documents]
      expect(programs_response[:results]).to eq 60
    end
  end
end
