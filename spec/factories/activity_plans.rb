FactoryBot.define do
  factory :activity_plan do
    tta_need
    start_at { 1.hour.from_now }
    format { "Virtual" }
    location { "https://video.service.com/meetingid" }
  end
end
