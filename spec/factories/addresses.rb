FactoryBot.define do
  factory :address do
    street1 { "1800 F St. NW" }
    street2 { "" }
    longitude { -77.042570 }
    latitude { 38.897120 }
    city { "Washington" }
    state { "DC" }
    postal_code { "20405" }
    postal_code_four { "" }
    map_zoom_level { "" }
    county { "" }
  end
end
