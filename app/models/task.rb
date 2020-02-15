class Task < ApplicationRecord
  belongs_to :parent, polymorphic: true

  validates_presence_of :title
  validates_inclusion_of :status, in: %w[todo complete dropped]
end
