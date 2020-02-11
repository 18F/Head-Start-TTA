Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  resources :activity_reports
  resources :grantees, only: %i[index show], shallow: true do
    resources :tta_needs, only: %i[index show create] do
      resources :tasks, only: %i[index show]
    end
  end
  resources :monitoring_reports, only: :show

  root to: "grantees#index"
end
