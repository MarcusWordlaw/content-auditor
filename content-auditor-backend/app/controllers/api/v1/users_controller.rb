class Api::V1::UsersController < ApplicationController
    
    def index
        render json: User.all
    end

    def show
        render json: User.find(params[:id])
    end

    def create
        user = User.new(user_params)
        if user.save
            render json: { status: 200 }
        else
            render json: { message: "User not created"}
        end
    end

    def update
        user = User.find(params[:id])
        user.update(user_params)
    end 

    def destroy
        user = User.find(params[:id])
        user.destroy
    end

    private 

    def user_params
        params.require(:user).permit(:name, :email, :password_digest, :address, :admin, :organization_id)
    end
end