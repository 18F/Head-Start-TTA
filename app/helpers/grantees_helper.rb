module GranteesHelper
  def recent_tta_request?
    TtaNeed.where("created_at > ?", 1.hour.ago).exists?
  end

  def topic_options(grantee)
    topics = Topic.for_grantee(grantee).select(:name).order(:name)
    topics = topics.map { |t| [t.name, t.name] }
    [["Any", ""], *topics]
  end

  def date_options
    [
      ["All", ""],
      ["Last Month", "1M"],
      ["Last 6 Months", "6M"],
      ["Last Year", "1y"]
    ]
  end

  def past_activity_timeline_list(activity_report)
    content_tag(:ul, class: "usa-list") do
      concat content_tag(:li, activity_report.activity_id)
      while (activity_report = activity_report.previous_activity_report)
        concat content_tag(:li, activity_report.activity_id)
      end
    end
  end
end
