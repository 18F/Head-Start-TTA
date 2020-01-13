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
  describe "#list_activity_reports" do
    let(:grant) { create :grant, :grantee }
    let!(:ar) { create :activity_report, grants: [grant] }

    it "returns the grantees activity reports" do
      expect(helper.list_activity_reports(grant.grantee)).to eq [ar]
    end
  end
end
