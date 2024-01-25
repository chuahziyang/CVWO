class CommentsController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :authenticate_user , only: [:index]

  def index
    comments = Comment.includes(:user, :post).all
    render json: comments.to_json(include: [:user, :post])
  end

  def create
    comment = Comment.create(content:params[:content], user_id:@current_user.id, post_id:params[:post_id])
    render json: comment
  end



   def destroy
      comment = Comment.find(params[:id])

      if comment.user_id == @current_user.id
         comment.destroy
         render json: { message: "Comment deleted successfully" }
      else
         render json: { error: "You are not authorized to delete this post" }, status: :unauthorized
      end
   end

   def update
      comment = Comment.find(params[:id])

      if comment.user_id == @current_user.id
         comment.update(content:params[:content])
         render json: comment
      else
         render json: { error: "You are not authorized to update this post" }, status: :unauthorized
      end
   end

end
