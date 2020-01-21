Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  resources :activity_reports
  resources :grantees, only: %i[index show]

  root to: "grantees#index"
end
