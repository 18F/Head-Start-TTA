FactoryBot.define do
  factory :person do
    name { FFaker::Name.name }
    role { "Grantee Specialist" }
    phone_number { FFaker::PhoneNumber.short_phone_number }
    email { FFaker::Internet.safe_email }

    trait :program_specialist do
      role { "Program Specialist" }
    end

    trait :grantee_employee do
      role { "Head Start Director" }
    end

    trait :ecs do
      role { "Early Childhood Specialist" }
    end
  end
end
