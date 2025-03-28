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

      get 'questions/index', to: 'questions#index'
      get 'questions/:id', to: 'questions#show'
      post 'questions/create', to: 'questions#create'
      put 'questions/:id', to: 'questions#update'
      delete 'questions/:id', to: 'questions#destroy'
    end
  end
end