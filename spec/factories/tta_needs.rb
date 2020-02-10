FactoryBot.define do
  factory :tta_need do
    grantee { nil }
    narrative { "We need to teach this grantee" }
    indicator { "Grantee Request" }
  end
end
