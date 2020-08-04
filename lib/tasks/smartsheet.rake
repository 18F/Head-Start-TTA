namespace :smartsheet do
  desc "Update smartsheet column options from source sheets, configured via smartsheet.yml"
  task update: :environment do
    SmartsheetColumnSetter.new.call
  end
end
