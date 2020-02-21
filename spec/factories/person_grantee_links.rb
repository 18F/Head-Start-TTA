FactoryBot.define do
  factory :person_grantee_link do
    person
    grantee
    grantee_employee { false }

    trait :grantee_employee do
      grantee_employee { true }
      association :person, factory: [:person, :grantee_employee]
    end
  end
end
