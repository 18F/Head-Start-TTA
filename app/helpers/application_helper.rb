module ApplicationHelper
  def page_has_custom_main?
    !!@page_has_custom_main
  end

  def login_role_options
    Person::TTA_ROLES + Person::OTHER_ROLES
  end
end
