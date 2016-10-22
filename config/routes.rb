Rails.application.routes.draw do

    namespace :admin do
      resources :users
    end

    namespace :public do
      resources :users
    end
end
