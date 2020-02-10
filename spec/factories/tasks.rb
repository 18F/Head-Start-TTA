FactoryBot.define do
  factory :task do
    status { "todo" }
    title { "Grantee will refine their policies and practices around teaching math" }
    notes { "" }
    parent { nil }
  end
end
