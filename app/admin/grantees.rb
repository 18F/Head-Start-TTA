ActiveAdmin.register Grantee do
  show do
    attributes_table do
      row :name
      row :grants do |grantee|
        ul do
          grantee.grants.each do |g|
            li link_to(g.number, admin_grant_path(g))
          end
        end
      end
      row :created_at
      row :updated_at
    end
  end

  permit_params :name
end
