FactoryBot.define do
  factory :tta_need do
    grantee
    narrative { "We need to teach this grantee" }
    indicator { "Grantee Request" }
    topic_list { ["Program Governance", "School Readiness"] }
  end
end
