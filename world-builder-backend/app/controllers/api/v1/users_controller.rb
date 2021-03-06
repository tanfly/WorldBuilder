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

    def create
        user = User.new(user_params)
        if user.save
          render json: UserSerializer.new(user)
        end
    end

    def update
        user = User.find(params[:id])
        user.update(user_params)
        if user.save
            render json: UserSerializer.new(user), status: :accepted
          else
            render json: { errors: user.errors.full_messages }, status: :unprocessible_entity
          end
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
        head 204
      end

    private
  
    def user_params
      params.require(:user).permit(:username, :email, :password, :avatar)
    end
        

    
end
