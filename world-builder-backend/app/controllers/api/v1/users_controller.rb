class Api::V1::UsersController < ApplicationController

    def index 
        users = User.all 
        options = {
            include: [:worlds]
        }
        render json: UserSerializer.new(users, options)
    end

    def show
        user = User.find(params[:id])
        options = {
            include: [:worlds]
        }
        render json: UserSerializer.new(user, options)
    end

    
end
