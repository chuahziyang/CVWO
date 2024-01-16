class PostsController < ApplicationController
   protect_from_forgery with: :null_session
   skip_before_action :authenticate_user, only: [:index, :show]
   def index
      posts = Post.includes(:user, :comments).order(created_at: :desc)
      render json: posts.to_json(include: [:user, :comments])
   end

   def show
      post = Post.includes(:user, comments: [:user]).find(params[:id])
      render json: post.to_json(include: { user: {}, comments: { include: :user, order: { created_at: :desc } } })
   end

   def create
      puts @current_user.inspect
      post = Post.create(name:params[:name], category:params[:category], status:params[:status], description:params[:description], created_at: DateTime.now, environment:params[:environment], content:params[:content], user_id:@current_user.id)
      render json: post.to_json(include: [:user, :comments])
   end

   def destroy
      post = Post.find(params[:id])

      if post.user_id == @current_user.id
         post.destroy
         render json: { message: "Post deleted successfully" }
      else
         render json: { error: "You are not authorized to delete this post" }, status: :unauthorized
      end
   end
end
