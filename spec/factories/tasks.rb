FactoryBot.define do
  factory :task do
    status { "todo" }
    title { "Grantee will refine their policies and practices around teaching math" }
    notes { "" }
    association :parent, factory: :tta_need
    association :created_by, factory: :person
  end
end
