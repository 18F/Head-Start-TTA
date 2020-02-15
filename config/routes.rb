Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  resources :activity_reports
  resources :grantees, only: %i[index show], shallow: true do
    resources :people, only: %i[index show]
    resources :grants, only: %i[index show] do
      resources :monitoring_reports, only: %i[index show]
    end
    resources :tta_needs, only: %i[index show create] do
      resources :tasks, only: %i[index show create]
    end
  end
  resources :topics, only: %i[index show]

  root to: "grantees#index"
end
