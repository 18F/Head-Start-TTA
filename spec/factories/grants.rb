FactoryBot.define do
  factory :grant do
    sequence(:number) { |n| "03CH100#{n}" }
  end
end
