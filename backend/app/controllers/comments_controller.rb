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
end
