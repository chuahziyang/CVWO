class UsersController < ApplicationController
   def index
   names = User.all
   render json: names
   end
end
