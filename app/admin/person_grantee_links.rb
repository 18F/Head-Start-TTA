ActiveAdmin.register PersonGranteeLink do
  menu parent: "People"

  permit_params :person_id, :grantee_id, :grantee_employee
end
