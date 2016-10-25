class Admin::UsersController < ApplicationController
  # before_action :authenticate_user!
  def index

  end
  def new

  end
  def edit
    @user = User.find(params[:id])
  end
end