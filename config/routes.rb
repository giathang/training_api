Rails.application.routes.draw do

  devise_for :users
  namespace :admin do
    get '' => 'users#index'
    resources :users, except: :index
    resources :companies
  end

  scope module: 'public' do
    root to: 'home#index'
  end
  namespace :api do
    namespace :v1 do
      namespace :admin do
        resources :users
        resources :companies
      end
      scope module: 'public' do
        get '/users' => 'users#index'
      end
    end
  end
end
