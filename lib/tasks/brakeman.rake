desc 'Run brakeman with potential non-0 return code'
task :brakeman do
  # -z flag makes it return non-0 if there are any warnings
  # -q is quiet, which is on here because we don't want the output to be too large
  # when integrated into tests
  unless system('brakeman -z -q') # system is true if return is 0, false otherwise
    abort("Brakeman detected one or more code problems, please run it manually and inspect the output.")
  end
end

task default: [:brakeman] # this is cumulative, so it won't drop other things added to the default
