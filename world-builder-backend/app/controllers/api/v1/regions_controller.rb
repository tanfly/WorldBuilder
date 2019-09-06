class Api::V1::RegionsController < ApplicationController
    
    def index 
        regions = current_user.worlds
        render json: WorldSerializer.new(worlds)
    end

    def show
        world = World.find(params[:id])
        render json: WorldSerializer.new(world)
    end

end
