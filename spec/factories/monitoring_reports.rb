FactoryBot.define do
  factory :monitoring_report do
    narrative { "The grantee did not implement a program to comply with the compliance" }
    citation { ["§1302", ".101", "(a)", "(1)"] }
    report_date { Date.yesterday }
    status { "Noncompliance" }
    grant

    trait :deficient do
      status { "Deficient" }
    end
  end
end
