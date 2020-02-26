# Head-Start-TTA
Head Start TTA Data Platform PA + E&amp;I + Assisted Acquisition

# Welcome!
This repo contains documentation describing the Head Start - Training and Technical Assistance (TTA) Data Platform Path Analysis (PA), Experiment & Iterate (E&I), and Assisted Acquisition (AA) project from 18F. It is intended to be a public place where project participants can keep track of the overall project goals, progress to date, and learnings as we work. This is also intended to be a project 'home page' where members can access important and up-to-date project information that exists somewhere else.

It also contains the prototype application developed as part of the E&I phase of the project.

## Project Description

The Head Start program promotes school readiness for children under 5 years old from low-income families. HHS's Administration for Children and Families (ACF)’s Office of Head Start (OHS) oversees grant funding to local agencies providing Head Start services. OHS’s federal oversight responsibilities require significant grants management and a robust system of Training and Technical Assistance (TTA), designed to strengthen grantee performance in accordance with federal standards so every enrolled child is prepared for success in school. However, TTA data collection is fragmented, and data is housed in 27 disconnected platforms, including a limited and unscalable legacy system.

OHS is engaging 18F to help OHS procure a centralized system for relevant TTA data, to track and analyze their work through a combined Path Analysis and Experimentation and Iteration approach, with the potential to also execute an assisted acquisition. OHS is engaging 18F to help them identify and define the scope of the procurement for a new, modular TTA platform.

## Team

- Matt Dobson - Experience Designer
- Robert Jolly - Product Manager
- Ryan Ahearn - Engineer
- Carrie Feher - Account Manager
- Randy Hart - Acquisitions Consultant

## Important Resources

- [Living Deck 🔐](https://docs.google.com/presentation/d/1a59WpiUm2NW3tebcZqrMqo8Zj6Ofcfip8bOd_E2u5UI/edit)
- [OHS Shared Drive 🔐](https://drive.google.com/drive/folders/1BIK02y1GYK1tkm6kd-3DIzWmnqB8EO-E)
- [OHS Background Docs 🔐](https://drive.google.com/drive/folders/11apiF-CWn_g5onI5N6oPnUcJjM265BjH)
- [Weekly Ships 🔐](https://drive.google.com/drive/folders/1vLnTtDS3R6rv3ygCqwtUuETyFhU4kGIl)
- [Presentation to OHS Core Leadership Team 11/6/2019 🔐](https://docs.google.com/presentation/d/1PP75rICohC61V7RctEuE8Vq4V9CtKHf7iAC5uymSiXE/edit?usp=sharing)
- [Research Folder (interview notes and related documentation) 🔐](https://drive.google.com/drive/folders/1FU3YKgBKriNXQjqytAE-z6RJ7QsnTukI)
- [Presentation for OHS Stakeholder Research Findings 11/6/2019 🔐](https://docs.google.com/presentation/d/1f9nIKmyIRZ3g4To12seq3OTDWnihfmPfapDhWZrFg8Q/edit?usp=sharing)

# Prototype Application

## Continuous Integration and cloud.gov Deployment

[![18F CircleCI](https://circleci.com/gh/18F/Head-Start-TTA.svg?style=shield)](https://circleci.com/gh/18F/Head-Start-TTA)

The prototype app is automatically deployed to cloud.gov on a successful CircleCI build of the master branch.

### Deployment Helper

`.circleci/Dockerfile` is used to create the Docker image used for the `deploy` CircleCI job.

It consists of the standard CircleCI Ruby image with the `cf` command line tool installed

To rebuild: `docker build -t rcahearn/rubycf:2.6.5-node .circleci/`

## Getting started

### Install dependencies

The following tools must be installed:

* [Ruby 2.6.5](https://www.ruby-lang.org/en/)
* [Node.js 12.x LTS](https://nodejs.org/en/)
* [Bundler 2.1.1](https://rubygems.org/gems/bundler)
* [Yarn 1.21](https://yarnpkg.com/lang/en/)
* [PostgreSQL](https://www.postgresql.org/)

Install required ruby gems with: `$ bundle install`

Install required javascript libraries with: `$ yarn install`

### Database setup

1. Ensure that postgresql is running
1. create the database with: `$ bundle exec rake db:create`
1. load the schema: `$ bundle exec rake db:schema:load`
1. load required data: `$ bundle exec rake db:seed`

### Running tests

The full suite of tests and code scans can be run with: `$ bundle exec rake`

The full suite of only tests can be run with: `$ bundle exec rake spec`

### Run the server

`$ bundle exec rails server`

Then you can visit `http://localhost:3000` to view the application.

## API Documentation

Run `bundle exec rake docs:generate`, start the server, and then visit `http://localhost:3000/docs/api` to
view the API docs. These are also available from the deployed prototype application

## Technologies
### Frameworks
* [Ruby on Rails](https://rubyonrails.org/) backend framework
* [Reactjs](https://reactjs.org/) frontend framework

### Data stores
* [PostgreSQL](https://www.postgresql.org/) database

### Tools
* [RSpec](https://rspec.info/) ruby unit tests
* [Standard Ruby](https://github.com/testdouble/standard) ruby style scanner
* [Brakeman](https://brakemanscanner.org/) ruby static code analysis
* [bundle audit](https://github.com/rubysec/bundler-audit) ruby dependency scanner
* [yarn audit](https://yarnpkg.com/lang/en/docs/cli/audit/) javascript dependency scanner

### Services
* [CircleCI](https://circleci.com/) continuous integration server
