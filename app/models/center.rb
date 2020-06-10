class Center < ApplicationRecord
  include HasType

  validates_presence_of :cid,
    :grant_number,
    :name
  validates_uniqueness_of :cid, case_sensitive: false

  belongs_to :program
  has_one :address, as: :addressable
end
