class Program < ApplicationRecord
  include HasType

  validates_presence_of :pid,
    :grant_number,
    :region,
    :name,
    :grantee_name,
    :identifier
  validates_uniqueness_of :pid, case_sensitive: false

  has_many :centers
  has_one :address, as: :addressable
end
