module DashboardHelper
  def link_to_grantee(grant_number)
    grantee = Grantee.find_grant_number(grant_number).first
    if grantee.nil?
      grant_number
    else
      link_to grant_number, grantee_path(grantee.id), class: "usa-link"
    end
  end
end
