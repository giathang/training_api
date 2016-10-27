function Company(options) {
  var module = this;
  var defaults = {
    container: $('.list-companies'),
    template:{
      'list_companies': $('#list-companies-template')
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

  module.init = function () {
    module.getCompanies(module.renderCompanies);
  }

}
$(document).ready(function () {
  var company = new Company;
  company.init();
})