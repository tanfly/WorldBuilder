class Api::V1::SessionsController < ApplicationController
    def new
        render :layout => 'login'
    end

    def create
        if auth
            user = User.find_or_create_by_omniauth(auth)
            session[:user_id] = user.id
            redirect_to user_path(user)
        else
        @user = User.find_by(username: params[:username])
            if @user && @user.authenticate(params[:password])
                session[:user_id] = @user.id 
                redirect_to user_path(@user)
            else
                flash[:error] = "Please ensure all form areas are filled out correctly."
                render :new, :layout => 'login'
            end
        end
    end

    def destroy
        reset_session
        redirect_to root_path
    end

    private

    def auth
        request.env['omniauth.auth']
    end
end