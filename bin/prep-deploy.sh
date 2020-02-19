#!/usr/bin/env bash

bundle exec rake docs:generate
bundle exec rake assets:clobber
env NODE_ENV=production RAILS_ENV=production bundle exec rake assets:precompile
