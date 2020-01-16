FactoryBot.define do
  factory :grant do
    sequence(:number) { |n| "03CH100#{n}" }

    trait :grantee do
      association :grantee
    end
  end
end
