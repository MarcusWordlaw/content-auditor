class Api::V1::OrganizationsController < ApplicationController
    def index
        render json: Organization.all 
    end

    def show
        render json: Organization.find(params[:id])
    end

    def create
        organization = Organization.new(
            name: params["name"])
        if organization.save
            render json: { status: 200 }
        else
            render json: { message: "Organization not created" }
        end
    end

    def update
        organization = Organization.find(params[:id])
        organization.update(
            name: params["name"])
    end 

    def destroy
        organization = Organization.find(params[:id])
        organization.destroy
    end

    # private 

    # def organization_params
    #     params.require(:organization).permit(:name)
    # end
end
