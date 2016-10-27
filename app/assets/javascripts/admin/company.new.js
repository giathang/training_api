function Company(options) {
  var module = this;
  var defaults = {
    api: {
      'create': '/api/v1/admin/companies'
    },
    data: {}
  }
  module.settings = $.extend({}, defaults, options);

  module.onSubmitCreate = function () {
    $('.js-company-create').off('click').on('click', function (e) {
      e.preventDefault();
      var dataComany ={},
        currentContainer = $(this).parents('form');
      dataComany.name = currentContainer.find('input#company_name').val();
      dataComany.address = currentContainer.find('input#company_address').val();
      dataComany.phone = currentContainer.find('input#user_name').val();

      module.createCompany(dataComany);
    })
  }
  module.createCompany = function (data) {
    return $.ajax({
      url: module.settings.api.create,
      type: 'POST',
      data: data,
      dataType: 'json',
      success: function(res){
        if(res.code === 200){
          console.log('Create Success');
          // window.location.href = res.data.redirect_url;
        }else{
          console.log('Error');
        }
      },
      error: function(){
      }
    });
  }

}
$(document).ready(function () {
  var company = new Company
  company.onSubmitCreate();
})