Rails.application.routes.draw do
  resources :activity_reports
  resources :grantees, only: %i[index show]

  root to: "pages#home"
end
