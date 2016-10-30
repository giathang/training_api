class Api::V1::Admin::UsersController < ApplicationController
  before_action :get_user, only: [:show, :update, :destroy]
  before_action :set_page, only: [:index]
  skip_before_action :verify_authenticity_token

  PER_PAGE = 10
  # GET /api/v1/admin/users
  def index
    @users = User.search(params[:search]).limit(PER_PAGE).offset(@page.to_i * PER_PAGE)
    @total = @users.count / PER_PAGE
    @data = {
      users: @users,
      total_paginate: @total + 1,
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

  def set_page
    @page = params[:page] || 0
  end


  def get_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(:email, :password, :first_name, :last_name, :user_name)
  end

end