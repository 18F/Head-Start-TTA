class Topic < ApplicationRecord
  validates_presence_of :name, :scope
  validates_uniqueness_of :name, scope: :scope
  
  has_many :child_topics, class_name: "Topic", foreign_key: "parent_id"
  belongs_to :parent, class_name: "Topic", optional: true
end
