module GranteesHelper
  def list_activity_reports(grantee)
    grantee.activity_reports.distinct.order(start_date: :desc)
  end
end
