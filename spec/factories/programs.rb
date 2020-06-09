FactoryBot.define do
  factory :program do
    sequence(:pid) { |n| "%06d" % n }
    grant_number { "14CH123456" }
    type { "head_start_center" }
    region { "14" }
    name { "Children and Children First" }
    grantee_name { "Children and Children First" }
    phone { "" }
    registration_phone { "" }
    fax { "" }
    email { "" }
    website { "" }
    identifier { "children_and_children_first" }
  end
end
