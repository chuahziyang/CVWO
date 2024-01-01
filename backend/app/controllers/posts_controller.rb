class PostsController < ApplicationController
   def index
      posts = Post.includes(:user).all
      render json: posts.to_json(include: :user)
   end

   def show
      post = Post.includes(:user).find(params[:id])
      render json: post.to_json(include: :user)
   end
end
