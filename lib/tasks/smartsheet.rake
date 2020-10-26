namespace :smartsheet do
  desc "Update smartsheet column options from source sheets, configured via smartsheet.yml"
  task update: :environment do
    puts "Updating Smartsheet column options"
    SmartsheetColumnSetter.new.call
  end

  desc "Update grantee names sheets from ~/Downloads/Centers"
  task grantees: :environment do
    puts "Updating Grantee Names sheet"
    SmartsheetColumnSetter.new.update_all_grantee_names("/Users/ryancahearn/Downloads/Centers")
  end

  desc "Update all smartsheet sheets"
  task all: ["smartsheet:grantees", "smartsheet:update"]
end
