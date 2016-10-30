function Company(options) {
  var module = this;
  var defaults = {
    container: $('.list-companies'),
    container_pagination: $('.pagination'),
    template:{
      'list_companies': $('#list-companies-template'),
      'pagination_template': $('#paginate-template')
    },
    api: {
      'index': '/api/v1/admin/companies'
    },
    data: {}
  }
  module.settings = $.extend({}, defaults, options);
  module.getCompanies = function (callback) {
    return $.ajax({
      url: module.settings.api.index,
      type: 'GET',
      dataType: 'json',
      success: function(res){
        if(res.code == 200){
          module.settings.data.companies = res.data.companies;
          module.settings.data.total_paginate = res.data.total_paginate;
          if(callback) {
            callback()
          }
        }else{
          $.notify(data.message);
        }
      },
      error: function(){
      }
    });
  }

  module.renderCompanies = function(){
    var template = _.template(module.settings.template.list_companies.html());
    module.settings.container.html(template({companies: module.settings.data.companies}));
    module.clickDestroy();
  }

  module.renderPaginate = function () {
    var template_pagi = _.template(module.settings.template.pagination_template.html());
    module.settings.container_pagination.html(template_pagi({total_paginate: module.settings.data.total_paginate}))
    module.actionClickPaginate();
  }
  module.actionClickPaginate = function () {
    $('.pagi').on('click',function (e) {
      e.preventDefault();
      var current_container = $(this).parents('ul'),
        dataPage = {};
      current_container.find('li.active').removeClass('active');
      $(this).addClass('active');

      dataPage.page = $(this).find('a').data('page');
      module.ajaxPaginate(dataPage);
    });
  }
  module.ajaxPaginate = function (data) {
    return $.ajax({
      url: module.settings.api.index,
      data: data,
      type: 'GET',
      dataType: 'json',
      success: function (res) {
        if(res.code == 200){
          module.settings.data.companies = res.data.companies;
          module.renderCompanies();
        }else{
          $.notify(data.message);
        }
      },
      error: function(){
      }
    });
  }

  module.clickDestroy = function () {
    $('.js-destroy-company').on('click',function (e) {
      e.preventDefault();
      companyId = $(this).parents('tr').data('id');
      module.destroyUser(companyId);
    });
  }

  module.destroyUser = function (companyId) {
    return $.ajax({
      url: '/api/v1/admin/companies/' + companyId,
      type: 'DELETE',
      success: function (res) {
        if(res.code == 200){
          module.getCompanies(module.renderCompanies);
          console.log('Success')
        }else{
          console.log('Fails')
        }
      }
    })
  }

  module.actionSearch = function () {
    $('.js-search').on('click',function (e) {
      e.preventDefault();
      var dataCompany = {},
        currentContainer = $(this).parents('form');
      var parentContainer = currentContainer.parent();
      parentContainer.find('ul.pagination > li.active').removeClass('active');
      parentContainer.find('ul.pagination > li:first').addClass('active');
      dataCompany.search = currentContainer.find('input#search').val();

      module.getSearchCompanies(dataCompany);

    })
  }

  module.getSearchCompanies = function (data) {
    return $.ajax({
      url: module.settings.api.index,
      type: 'GET',
      data: data,
      dataType: 'json',
      success: function(res){
        if(res.code == 200){
          module.settings.data.companies = res.data.companies;
          module.settings.data.total_paginate = res.data.total_paginate;

          module.renderCompanies();
          module.renderPaginate();

        }else{
          $.notify(data.message);
        }
      },
      error: function(){
      }
    });
  }

  module.init = function () {
    module.getCompanies(module.renderCompanies);
    module.getCompanies(module.renderPaginate);
  }

}
$(document).ready(function () {
  var company = new Company;
  company.init();
  company.actionSearch();
})