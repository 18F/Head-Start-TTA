class PersonGranteeLink < ApplicationRecord
  belongs_to :person
  belongs_to :grantee
end
