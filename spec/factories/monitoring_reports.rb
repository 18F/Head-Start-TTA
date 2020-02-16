FactoryBot.define do
  factory :monitoring_report do
    narrative { "The grantee did not implement a program to comply with the compliance" }
    citation { ["§1302", ".101", "(a)", "(1)"] }
    citation_details do
      <<~EOD
        §1302 Program Operations.
        1302.101 Management system.
        (a) Implementation. A program must implement a management system that:
        (1) Ensures a program, fiscal, and human resource management structure that provides effective management and oversight of all program areas and fiduciary responsibilities to enable delivery of high-quality services in all of the program services described in subparts C, D, E, F, G, and H of this part
      EOD
    end
    report_date { Date.yesterday }
    due_date { 119.days.from_now }
    timeframe { "120 days" }
    status { "Noncompliance" }
    grant

    trait :deficient do
      status { "Deficient" }
      timeframe { "30 days" }
      due_date { 29.days.from_now }
    end

    trait :grantee do
      association :grant, factory: [:grant, :grantee]
    end
  end
end
