class Api::V1::WorldsController < ApplicationController

    def index 
        user = User.find(params[:user_id])
        worlds = user.worlds
        render json: WorldSerializer.new(worlds)
    end

    def show
        world = World.find(params[:id])
        options = {
            include: [:regions]
        }
        render json: WorldSerializer.new(world, options)
    end

    def create
        world = World.new(world_params)
        if world.save
          render json: WorldSerializer.new(world)
        end
    end


    private

    def world_params
        params.require(:world).permit(:name, :image, :user_id)
    end

end
