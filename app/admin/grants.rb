ActiveAdmin.register Grant do
  permit_params :number, :region, :grantee_id
end
