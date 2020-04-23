module DashboardHelper
  def link_to_grantee(grant_number)
    grantee = Grantee.find_grant_number(grant_number).first
    if grantee.nil?
      grant_number
    else
      link_to grant_number, grantee_path(grantee.id), class: "usa-link"
    end
  end

  def region_filter_options
    [
      ["All", ""],
      ["Region 1", "1"],
      ["Region 2", "2"],
      ["Region 3", "3"],
      ["Region 4", "4"],
      ["Region 5", "5"],
      ["Region 6", "6"],
      ["Region 7", "7"],
      ["Region 8", "8"],
      ["Region 9", "9"],
      ["Region 10", "10"],
      ["Region 11", "11"],
      ["Region 12", "12"],
      ["Region CDI", "CDI"],
      ["Region 14", "14"]
    ]
  end

  def purpose_filter_options
    [
      ["All", ""],
      "New Grantee/Program Leadership",
      "New Grantee/Program",
      "Area of Concern",
      "Monitoring - Deficiency",
      "Monitoring - Noncompliance",
      "National Office Priority",
      "Regional Office Priority",
      "Planning",
      "Professional Development",
      "Promoting Quality",
      "School Readiness"
    ]
  end

  def specialist_filter_options
    [
      ["All", ""],
      "Early Childhood Specialist",
      "Grantee Specialist",
      "Family Engagement Specialist",
      "Health Specialist",
      "System Specialist"
    ]
  end
end
