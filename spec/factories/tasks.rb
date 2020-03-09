FactoryBot.define do
  factory :task do
    status { "todo" }
    title { "Grantee will refine their policies and practices around teaching math" }
    notes { "" }
    association :parent, factory: :tta_need
    association :created_by, factory: :person

    trait :subtask do
      association :parent, factory: :task
    end

    trait :complete do
      status { "complete" }
      association :completed_by, factory: :person
      completed_at { Time.now }
    end
  end
end
