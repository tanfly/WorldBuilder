class Api::V1::SessionsController < ApplicationController
    def new
    end
  
    def create
      user_params = params[:user]
      username = (user_params[:username])
      password = (user_params[:password])
      user = User.find_by(username: username)
        if user && user.authenticate(password)
            session[:user_id] = user.id 
            render json: UserSerializer.new(user)
        end
    end
  
    def destroy
      session.delete(params[:id])
    end
  
end