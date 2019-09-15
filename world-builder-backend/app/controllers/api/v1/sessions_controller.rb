class Api::V1::SessionsController < ApplicationController
    def new
    end
  
    def create
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
            session[:user_id] = user.id 
        end
    end
  
    def destroy
      reset_session
    end
  end
  
end