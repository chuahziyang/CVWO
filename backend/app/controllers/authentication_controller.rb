class AuthenticationController < ApplicationController
  skip_before_action :authenticate_request
  protect_from_forgery with: :null_session

  # POST /auth/login
  def login
    @user = User.find_by_email(params[:email])
    if @user&.authenticate(params[:password])
      token = jwt_encode({ user_id: @user.id })
      time = Time.now + 24.hours.to_i
      render json: {
        token: token,
        exp: time.strftime("%m-%d-%Y %H:%M"),
      }
    else
      render json: { errors: 'unauthorized' }, status: :unauthorized
    end
  end
end
