Rails.application.routes.draw do
  resources :activity_reports

  root to: "pages#home"
end
