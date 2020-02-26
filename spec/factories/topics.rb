FactoryBot.define do
  factory :topic do
    name { "Leadership" }
    scope { "GS" }
    parent { nil }
  end
end
