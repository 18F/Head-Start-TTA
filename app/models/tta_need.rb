class TtaNeed < ApplicationRecord
  VALID_INDICATORS = [
    "Grantee Request",
    "OHS Monitoring Report",
    "Risk Management Meeting",
    "PIR Results",
    "NC Priority",
    "RO Priority"
  ]

  belongs_to :grantee
  delegate :name, to: :grantee, prefix: true
  belongs_to :context_link, polymorphic: true, optional: true

  belongs_to :requester, class_name: "Person"

  has_many :tasks, as: :parent

  has_many :activity_reports

  validates_inclusion_of :indicator, in: VALID_INDICATORS

  has_and_belongs_to_many :topics
end
