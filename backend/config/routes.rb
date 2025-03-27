Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'users/index', to: 'users#index'
      
      get 'companies/index', to: 'companies#index'
      get 'companies/:id', to: 'companies#show'
      post 'companies/create', to: 'companies#create'
      put 'companies/:id', to: 'companies#update'
      delete 'companies/:id', to: 'companies#destroy'

      get 'entry_sheets/index', to: 'entry_sheets#index'
      get 'entry_sheets/:id', to: 'entry_sheets#show'
      post 'entry_sheets/create', to: 'entry_sheets#create'
      put 'entry_sheets/:id', to: 'entry_sheets#update'
      delete 'entry_sheets/:id', to: 'entry_sheets#destroy'
    end
  end
end