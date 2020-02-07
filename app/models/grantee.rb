class Grantee < ApplicationRecord
  validates_presence_of :name

  has_many :grants, dependent: :destroy
  has_many :activity_reports, through: :grants
  has_many :monitoring_reports, through: :grants

  has_many :person_grantee_links
  has_many :people, through: :person_grantee_links

  auto_strip_attributes :name

  def specialists
    specialists = Set.new
    activity_reports.each do |ar|
      specialists.merge ar.specialists
    end
    specialists.sort
  end
end
