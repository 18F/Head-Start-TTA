FactoryBot.define do
  factory :activity_report do
    activity_typ { "Grantee specific" }
    contact_method { "Site Visit" }
    start_date { 1.week.ago.to_date }
    end_date { 1.week.ago.to_date }
    duration { 1.5 }

    trait :for_need do
      tta_need
    end
  end
end
