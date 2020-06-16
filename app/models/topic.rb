class Topic < ApplicationRecord
  validates_presence_of :name, :scope
  validates_uniqueness_of :name, scope: :scope

  has_many :child_topics, class_name: "Topic", foreign_key: "parent_id"
  belongs_to :parent, class_name: "Topic", optional: true

  has_and_belongs_to_many :tta_needs

  scope :root_topics, -> { where parent_id: nil }
  scope :leaf_topics, -> { where.not(id: select(:parent_id).distinct.where.not(parent_id: nil)) }
  scope :for_grantee, ->(grantee) { joins(:tta_needs).where(tta_needs: {grantee_id: grantee.id}) }

  def topic_group?
    child_topics.any?
  end

  def sub_topic?
    parent.present?
  end

  def full_name
    if sub_topic?
      "#{parent.name} - #{name}"
    else
      name
    end
  end

  def to_s
    "#{scope}: #{full_name}"
  end
end
