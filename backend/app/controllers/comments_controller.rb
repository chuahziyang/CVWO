class CommentsController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :authenticate_request
  def index
    comments = Comment.includes(:user, :post).all
    render json: comments.to_json(include: [:user, :post])
  end
end
