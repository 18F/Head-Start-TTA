FactoryBot.define do
  factory :tta_need do
    grantee
    association :requester, factory: [:person, :program_specialist]
    narrative { "We need to teach this grantee" }
    indicator { "New Program Leadership" }
    initiated_by { "Grantee" }
  end
end
