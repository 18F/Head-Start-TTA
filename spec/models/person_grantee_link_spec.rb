require "rails_helper"

RSpec.describe PersonGranteeLink, type: :model do
  subject { build :person_grantee_link }

  describe "validations" do
    it { should validate_uniqueness_of(:person_id).scoped_to :grantee_id }
  end
end
