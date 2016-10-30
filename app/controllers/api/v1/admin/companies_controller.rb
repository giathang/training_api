class Api::V1::Admin::CompaniesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_page, only: [:index]
  before_action :get_company, only: [:update, :destroy]

  PER_PAGE = 10

  def index
    @companies = Company.search(params[:search]).limit(PER_PAGE).offset(@page.to_i * PER_PAGE)
    @total = @companies.count / PER_PAGE

    @data = {
      companies: @companies,
      total_paginate: @total,
      total: @companies.count
    }
    render json: {code: 200, data: @data, msg: 'Success'}
  end

  def create
    @company = Company.new(company_params)
    @data = {
      company: @company
    }
    if @company.save
      render json: {code: 200, data: @data, msg: 'Success'}
    else
      render json: {conde: 200, data: @company.errors, msg: "Error"}
    end
  end

  def update
    if @company.update_attributes(company_params)
      render json: {code: 200, data: @company, msg: 'Success'}
    else
      render json: {conde: 200, data: @company.errors, msg: "Error"}
    end
  end

  def destroy
    @company.destroy
    @data = @company
    render json: {code: 200, data: @data, msg: 'Success'}
  end

  private

  def set_page
    @page = params[:page] || 0
  end

  def get_company
    @company = Company.find(params[:id])
  end

  def company_params
    params.permit(:name,:phone,:address)
  end
end