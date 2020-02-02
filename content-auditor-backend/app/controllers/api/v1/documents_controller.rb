class Api::V1::DocumentsController < ApplicationController
    def index
        render json: Document.all 
    end

    def show
        render json: Document.find(params[:id])
    end

    def edit
        Document.find(params[:id]) 
    end

    def create
        document = Document.create!(
            content: params["document"]["content"], 
            hashedmessage: params["document"]["hashedmessage"], 
            user_id: params["document"]["user_id"]
        )
        if document
            render json: { status: 200 }
        else
            render json: { status: 500 }
        end
    end

    def update
        document = Document.find(params[:id])
        document.update(
            content: params["document"]["content"], 
            hashedmessage: params["document"]["hashedmessage"], 
            user_id: params["document"]["user_id"])
        if document
            render json: { status: 200 }
        else
            render json: { status: 500 }
        end
    end 

    def destroy
        document = Document.find(params[:id])
        document.destroy
    end

    # private 

    # def document_params
    #     params.require(:document).permit(:content, :hashedmessage, :user_id)
    # end
end