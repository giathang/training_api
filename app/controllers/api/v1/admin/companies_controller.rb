class Api::V1::Admin::CompaniesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :get_company, only: [:update, :destroy]
  def index
    @companies = Company.search(params[:search])
    @data = {
      companies: @companies,
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

  def get_company
    @company = Company.find(params[:id])
  end

  def company_params
    params.permit(:name,:phone,:address)
  end
end