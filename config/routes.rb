Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  resources :activity_reports
  get "/tta_needs/tracker", to: "tta_needs#activity_tracker"
  resources :grantees, only: %i[index show], shallow: true do
    resources :people, only: %i[show] do
      get "employees", on: :collection
      get "specialists", on: :collection
    end
    resources :grants, only: %i[index show] do
      resources :monitoring_reports, only: %i[index show]
    end
    resources :tta_needs, only: %i[index show new create] do
      resources :topics, only: :index
      resources :tasks, only: %i[index show create]
    end
  end
  resources :topics, only: %i[index show], shallow: true do
    resources :tta_needs, only: :index
  end

  root to: "grantees#index"
end
