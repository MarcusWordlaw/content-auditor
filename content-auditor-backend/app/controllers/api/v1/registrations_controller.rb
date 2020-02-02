class Api::V1::RegistrationsController < ApplicationController
    def create
        #Need to add name, address, etc to registration create method
        user = User.create!(
            name: params['user']['name'],
            email: params['user']['email'],
            password: params['user']['password'],
            password_confirmation: params['user']['password_confirmation'],
            admin: params['user']['admin'],
            organization_id: params['user']['organization_id']
        )
        if user
            session[:user_id] = user.id
            render json: {
                status: :created,
                user: user
            }
        else
            render json: { status: 500 }
        end
    end
end