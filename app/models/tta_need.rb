class TtaNeed < ApplicationRecord
  VALID_INDICATORS = [
    "Grantee Request",
    "OHS Monitoring Report",
    "Risk Management Meeting",
    "PIR Results",
    "NC Priority",
    "RO Priority",
    "New Leadership",
    "New Grantee",
  ]

  belongs_to :grantee
  belongs_to :context_link, polymorphic: true, optional: true

  has_many :tasks, as: :parent

  validates_inclusion_of :indicator, in: VALID_INDICATORS

  acts_as_taggable_on :topics
end
