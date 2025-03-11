Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'users/index', to: 'users#index'
      get 'companies/index', to: 'companies#index'
      post 'companies/create', to: 'companies#create'
    end
  end
end