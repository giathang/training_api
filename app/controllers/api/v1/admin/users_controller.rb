class Api::V1::Admin::UsersController < ApplicationController
  before_action :get_user, only: [:show, :update, :destroy]
  skip_before_action :verify_authenticity_token


  # GET /api/v1/admin/users
  def index
    @users = User.search(params[:search])
    @data = {
      users: @users,
      total: @users.count
    }
    render json: {code: 200, data: @data, msg: 'OK'}
  end

  # GET /api/v1/admin/users/:id
  def show
    render json: {code: 200, data: @user, msg: 'Success'}
  end

  # POST /api/v1/admin/users
  def create
    @user = User.new(user_params)
    if @user.save
      @data = {
        redirect_url: admin_path
      }
      
      render json: {code: 200, data: @data ,msg: "Success"}
    else
      render json: {code: 200, data: @user.errors, msg: 'Errors'}
    end
  end

  # PUT /api/v1/admin/users/:id
  def update
    @data = {
      redirect_url: admin_path
    }
    if @user.update_attributes(user_params)
      render json: {code: 200, data: @data, msg: "Success"}
    else
      render json: {code: 200, msg: "Fails",data: @user.errors}
    end
  end

  # DELETE /api/v1/admin/users/:id
  def destroy
    @user.destroy
    @data = {
      redirect_url: admin_path
    }
    render json: {code: 200, data: @data, msg: "Success"}
  end

  private

  def get_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(:email, :password, :first_name, :last_name, :user_name)
  end

end