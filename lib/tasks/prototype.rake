namespace :prototype do
  namespace :wipe_data do
    desc "Wipe Grantee and ActivityReport data"
    task really: :environment do
      Chewy.strategy(:atomic) do
        Grantee.destroy_all
        ActivityReport.destroy_all
      end
    end
  end
end
