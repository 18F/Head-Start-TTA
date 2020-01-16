require "rails_helper"

# Specs in this file have access to a helper object that includes
# the GranteesHelper. For example:
#
# describe GranteesHelper do
#   describe "string concat" do
#     it "concats two strings with spaces" do
#       expect(helper.concat_strings("this","that")).to eq("this that")
#     end
#   end
# end
RSpec.describe GranteesHelper, type: :helper do
  describe "#topic_options" do
    let(:grant) { create :grant, :grantee }
    let!(:ar) { create :activity_report, topic_list: %w[TopicA TopicB], grants: [grant] }

    it "returns the grantees activity reports" do
      expect(helper.topic_options(grant.grantee)).to eq [
        ["Any", ""],
        ["TopicA", "TopicA"],
        ["TopicB", "TopicB"],
      ]
    end
  end

  describe "#date_options" do
    it "returns past filtering options with ElasticSearch date math values" do
      expect(helper.date_options).to eq [
        ["All", ""],
        ["Last Month", "1M"],
        ["Last 6 Months", "6M"],
        ["Last Year", "1y"],
      ]
    end
  end
end
