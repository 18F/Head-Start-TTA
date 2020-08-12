require "English"
require "open3"

namespace :bundle do
  desc "Run bundle:audit with omniauth CVE ignored"
  task :audit do
    child_pid = fork {
      exec "bundle audit update && bundle audit check"
    }
    Process.wait(child_pid)
    status = $CHILD_STATUS.exitstatus
    exit status unless status == 0
  end
end

desc "Run brakeman with potential non-0 return code"
task :brakeman do
  # -z flag makes it return non-0 if there are any warnings
  # -q is quiet, which is on here because we don't want the output to be too large
  # when integrated into tests
  unless system("brakeman -z -q") # system is true if return is 0, false otherwise
    abort("Brakeman detected one or more code problems, please run it manually and inspect the output.")
  end
end

namespace :yarn do
  desc "Run yarn audit"
  task :audit do
    stdout, stderr, status = Open3.capture3("yarn audit")
    puts stdout
    unless status.success?
      puts stderr
      if /503 Service Unavailable/.match?(stderr)
        puts "Ignoring unavailable server"
      elsif /advisories\/1548.*1 vulnerabilities found/m.match?(stdout)
        puts "Ignoring serialize-javascript until using libraries updated"
      else
        exit status.exitstatus
      end
    end
  end
end

task default: "standard"
task default: "brakeman"
task default: "bundle:audit"
task default: "yarn:audit"
task default: "docs:generate"
