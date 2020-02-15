ActiveAdmin.register Person do
  permit_params :name, :role, :phone_number, :email
end
