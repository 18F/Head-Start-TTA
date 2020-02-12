FactoryBot.define do
  factory :grant do
    sequence(:number) { |n| "14CH100#{n}" }
    region { "Region 14" }

    trait :grantee do
      association :grantee
    end
  end
end
