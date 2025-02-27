Rails.application.routes.draw do
  namespace :api do
    get 'user/index' ,to: "user#index"
  end
end