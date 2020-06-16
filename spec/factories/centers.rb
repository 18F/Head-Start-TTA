FactoryBot.define do
  factory :center do
    sequence(:cid) { |n| "%06d" % n }
    grant_number { "14CH123456" }
    delegate_number { "" }
    type { "head_start_center" }
    name { "Children and Children First" }
    phone { "123-456-7890" }
  end
end
