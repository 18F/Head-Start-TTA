class Grant < ApplicationRecord
  validates_presence_of :number
  validates_uniqueness_of :number

  belongs_to :grantee, optional: true
  delegate :name, to: :grantee, prefix: true, allow_nil: true

  has_and_belongs_to_many :activity_reports

  auto_strip_attributes :number
end
