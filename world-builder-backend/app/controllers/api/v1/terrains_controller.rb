class Api::V1::TerrainsController < ApplicationController
    def index 
        terrains = current_user.terrains
        render json: TerrainSerializer.new(terrains)
    end

    def show
        terrain = Terrain.find(params[:id])
        render json: TerrainSerializer.new(terrain)
    end

    def create
        terrain = Terrain.new(terrain_params)
        if terrain.save
          render json: TerrainSerializer.new(terrain)
        end
    end

    def update
        terrain = Terrain.find(params[:id])
        terrain.update(terrain_params)
        if terrain.save
            render json: TerrainSerializer.new(terrain), status: :accepted
          else
            render json: { errors: terrain.errors.full_messages }, status: :unprocessible_entity
          end
    end

    def destroy
        terrain = Terrain.find(params[:id])
        terrain.destroy
        head 204
      end


    private

    def terrain_params
        params.require(:terrain).permit(:description, :image, :region_id)
    end


end

