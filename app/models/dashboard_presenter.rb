class DashboardPresenter < SimpleDelegator
  def assigned_specialists_counts
    specialists = Person.tta_specialists
    assigned, available = specialists.partition { |p| assignment_sheet.has_upcoming_activity?(p.name) }
    {
      Assigned: assigned.count,
      Available: available.count
    }
  end
end
