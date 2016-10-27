class Admin::CompaniesController < ApplicationController

  def index

  end

  def new

  end

  def edit
    @company = Company.find(params[:id])
  end
end