Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'users/index', to: 'users#index'
      get 'companies/index', to: 'companies#index'
      get 'companies/:id', to: 'companies#show'
      post 'companies/create', to: 'companies#create'
      put 'companies/:id', to: 'companies#update'
      delete 'companies/:id', to: 'companies#destroy'
    end
  end
end