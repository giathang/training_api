function Company(options) {
  var module = this;
  var defaults = {
    data: {}
  }
  module.settings = $.extend({}, defaults, options);

  module.onSubmitCreate = function () {
    $('.js-company-create').on('click', function (e) {
      e.preventDefault();
      var dataComany = {},
        currentContainer = $(this).parents('form');
      companyId = currentContainer.data('id');
      dataComany.name = currentContainer.find('input#company_name').val();
      dataComany.address = currentContainer.find('input#company_address').val();
      dataComany.phone = currentContainer.find('input#company_phone').val();

      module.createCompany(companyId,dataComany);
    })
  }
  module.createCompany = function (companyId,data) {
    return $.ajax({
      url: '/api/v1/admin/companies/' + companyId,
      type: 'PUT',
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
  var company = new Company;
  company.onSubmitCreate();
});