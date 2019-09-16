class Api::V1::RegionsController < ApplicationController
    
    def index 
        regions = current_user.regions
        render json: RegionSerializer.new(regions)
    end

    def show
        region = Region.find(params[:id])
        render json: RegionSerializer.new(region)
    end

    def create
        region = Region.new(region_params)
        if region.save
          render json: RegionSerializer.new(region)
        end
    end

    def update
        region = Region.find(params[:id])
        region.update(region_params)
        if region.save
            render json: RegionSerializer.new(region), status: :accepted
          else
            render json: { errors: region.errors.full_messages }, status: :unprocessible_entity
          end
    end

    def destroy
        region = Region.find(params[:id])
        region.destroy
        head 204
      end


    private

    def region_params
        params.require(:region).permit(:name, :image, :world_id)
    end


end
