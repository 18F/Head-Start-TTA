Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  resources :activity_reports
  resources :grantees, only: %i[index show]
  resources :monitoring_reports, only: :show

  resources :tta_needs, only: %i[show], shallow: true do
    resources :tasks, only: %i[index]
  end

  root to: "grantees#index"
end
