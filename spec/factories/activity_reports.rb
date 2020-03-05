FactoryBot.define do
  factory :activity_report do
    sequence(:activity_id) { |n| "TTA-0123#{n}" }
    report_typ { "EC" }
    state { "PA" }
    status { "Approved By Manager" }
    activity_typ { "Grantee specific" }
    contact_method { "Site Visit" }
    purpose { "PFCE Coaching" }
    start_date { 1.week.ago.to_date }
    end_date { 1.week.ago.to_date }
    duration { 1.5 }

    trait :for_need do
      tta_need
    end
  end
end
