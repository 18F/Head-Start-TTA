class Grantee < ApplicationRecord
  validates_presence_of :name

  has_many :grants, dependent: :destroy
  has_many :activity_reports, through: :grants
  has_many :ta_specialists, through: :activity_reports, source: :people
  has_many :monitoring_reports, through: :grants

  has_many :tta_needs

  has_many :person_grantee_links
  has_many :people, through: :person_grantee_links

  auto_strip_attributes :name

  def employees
    people.where(person_grantee_links: {grantee_employee: true}).order(:name)
  end

  def assigned_specialists
    people.where(person_grantee_links: {grantee_employee: false}).order(:name)
  end

  def report_specialists
    ta_specialists.where.not(id: assigned_specialists.select(:id)).distinct.order(:name)
  end

  def monitoring_data
    @monitoring_data ||= Monitoring::Grantee.includes(:reviews).where(name: name).all
  end

  def reviews
    @reviews ||= if Rails.configuration.x.ohsmon.enabled
      monitoring_data.flat_map(&:reviews).sort_by(&:start_date).reverse
    else
      []
    end
  end
end
