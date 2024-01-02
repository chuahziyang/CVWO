class UsersController < ApplicationController
   protect_from_forgery with: :null_session
   skip_before_action :authenticate_request
   # /users
   def index
   names = User.all
   render json: names
   end


   def create
   name = User.create(name:params[:name], email:params[:email], created_at: DateTime.now, password:params[:password])
   render json: name
   end
end
