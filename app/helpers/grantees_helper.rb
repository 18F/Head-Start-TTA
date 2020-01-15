module GranteesHelper
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
      ["Last Year", "1y"],
    ]
  end
end
