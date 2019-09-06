class Api::V1::UsersController < ApplicationController


    def show
        user = User.find(params[:id])
        options = {
            include: [:worlds]
        }
        render json: UserSerializer.new(user, options)
    end

    
end
