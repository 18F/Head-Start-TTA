module ApplicationHelper
  def login_role_options
    Person::TTA_ROLES + Person::OTHER_ROLES
  end
end
