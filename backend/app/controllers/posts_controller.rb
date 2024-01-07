class PostsController < ApplicationController
   protect_from_forgery with: :null_session
   skip_before_action :authenticate_request
   def index
      posts = Post.includes(:user,  :comments).all
      render json: posts.to_json(include: [:user, :comments])
   end

   def show
      post = Post.includes(:user, :comments).find(params[:id])
      render json: post.to_json(include: [:user, :comments])
   end

   def create
      post = Post.create(name:params[:name], category:params[:category], status:params[:status], description:params[:description], created_at: DateTime.now, environment:params[:environment], content:params[:content], user_id:params[:user_id])
      render json: post.to_json(include: [:user, :comments])
   end
end
