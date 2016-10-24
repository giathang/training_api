Rails.application.routes.draw do

  devise_for :users
    namespace :admin do
      resources :users
    end

    scope module: 'public' do
      root to: 'home#index'
    end
end
