module GranteesHelper
  def list_activity_reports(grantee)
    @activity_reports || grantee.activity_reports.distinct.order(start_date: :desc)
  end

  def topic_options(grantee)
    topics = Topic.for_grantee(grantee).select(:name).order(:name)
    topics.map(&:name)
  end
end
