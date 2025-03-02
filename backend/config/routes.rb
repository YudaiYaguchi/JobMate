Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'user/index' ,to: "user#index"
    end
  end
end