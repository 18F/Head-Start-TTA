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
      resources :activity_reports, only: :index
      resources :activity_plans, only: %i[index show create]
      resources :topics, only: :index
      resources :tasks, only: %i[index show create update] do
        get "subtasks", on: :member
        post "subtasks", on: :member, to: "tasks#create"
      end
      get ":react_route", to: "tta_needs#show", constraints: { react_route: /.*/ }
    end
  end
  resources :topics, only: %i[index show], shallow: true do
    resources :tta_needs, only: :index
  end
  resources :grantee_roles, only: %i[index show]

  scope :smartsheet do
    get "tta_needs/:id", to: "dashboard#request_details", as: :smartsheet_request_details
  end
  get "dashboard", to: "dashboard#central_office"

  get "login", to: "sessions#new"
  post "login", to: "sessions#create"
  get "logout", to: "sessions#destroy"
  root to: "grantees#index"
end
