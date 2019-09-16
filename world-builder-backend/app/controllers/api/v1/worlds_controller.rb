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

    def update
        world = World.find(params[:id])
        world.update(world_params)
        if world.save
            render json: WorldSerializer.new(world), status: :accepted
          else
            render json: { errors: world.errors.full_messages }, status: :unprocessible_entity
          end
    end

    def destroy
        world = World.find(params[:id])
        world.destroy
        head 204
      end


    private

    def world_params
        params.require(:world).permit(:name, :image, :user_id)
    end

end
