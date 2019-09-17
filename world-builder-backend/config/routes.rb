Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      resources :sessions 
      
      resources :users do 
        resources :worlds
      end
      resources :worlds do
        resources :regions
      end
      
      resources :regions do 
        resources :terrains
      end
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
