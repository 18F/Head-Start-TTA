FactoryBot.define do
  factory :person do
    name { FFaker::Name.name }
    role { "Grantee Specialist" }
    phone_number { FFaker::PhoneNumber.short_phone_number }
    email { FFaker::Internet.safe_email }
  end
end
