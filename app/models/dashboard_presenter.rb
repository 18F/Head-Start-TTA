class DashboardPresenter < SimpleDelegator
  def deployments_by_month
    month_counter = Hash.new { |h,k| h[k] = 0 }
    request_sheet.each do |row|
      requested = Time.parse(row.created).in_time_zone("America/New_York")
      if requested > 1.year.ago.beginning_of_month
        month_counter[requested.strftime("%b %Y")] += 1
      end
    end
    month_counter
  end

  def assigned_specialists_counts
    specialists = Person.tta_specialists
    assigned, available = specialists.partition { |p| assignment_sheet.has_upcoming_activity?(p.name) }
    {
      Assigned: assigned.count,
      Available: available.count
    }
  end
end
