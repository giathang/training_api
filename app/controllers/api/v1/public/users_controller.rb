class Api::V1::Public::UsersController < ApplicationController
  # GET /api/v1/users
  def index
    @users = User.all.page(params[:page]).per(5)
    @data = {
      users: @users,
      page: params[:page],
      total: @users.count
    }
    render json: {code: 200, data: @data, msg: 'OK'}
  end

  # GET /api/v1/users/:id
  def show
    @user = User.find(params[:id])
    render json: {status: :ok, data: @user}
  end
end