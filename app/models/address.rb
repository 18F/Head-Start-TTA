class Address < ApplicationRecord
  validates_presence_of :street1,
    :longitude,
    :latitude,
    :city,
    :state,
    :postal_code

  belongs_to :addressable, polymorphic: true
end
