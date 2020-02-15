FactoryBot.define do
  factory :person_grantee_link do
    person
    grantee
    grantee_employee { true }
  end
end
