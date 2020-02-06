Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  resources :activity_reports
  resources :grantees, only: %i[index show]
  resources :monitoring_reports, only: :show

  root to: "grantees#index"
end
