class Api::V1::Admin::UsersController < ApplicationController
  before_action :get_user, only: [:show, :update, :destroy]
  skip_before_action :verify_authenticity_token


  # GET /api/v1/admin/users
  def index
    @users = User.all.page(params[:page]).per(5)
    @data = {
      users: @users,
      page: params[:page],
      total: @users.count
    }
    render json: {code: 200, data: @data, msg: 'OK'}
  end

  # GET /api/v1/admin/users/:id
  def show
    render json: {status: :ok, data: @user}
  end

  # POST /api/v1/admin/users
  def create
    puts params
    puts '<<<<<<<<<<'
    puts user_params
    @user = User.new(user_params)
    if @user.save
      render json: {status: :created, data: @user}
    else
      render json: {status: :unprocessable_entity, data: @user.errors}
    end
  end

  # PUT /api/v1/admin/users/:id
  def update
    if @user.update(user_params)
      render json: {status: :ok, data: @user}
    else
      render json: {status: :unprocessable_entity,data: @user.errors}
    end
  end

  # DELETE /api/v1/admin/users/:id
  def destroy
    @user.destroy
    render json: {head: :no_content,data: @user}
  end

  private

  def get_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end

end