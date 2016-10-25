function User(options) {
  var module = this;
  var defaults = {
    api: {
      'create': '/api/v1/admin/users'
    },
    data: {}
  }
  module.settings = $.extend({}, defaults, options);

  module.onSubmitCreate = function () {
    $('.js-user-create').off('click').on('click', function (e) {
      var dataUser ={},
        currentContainer = $(this).parents('form');
      dataUser.first_name = currentContainer.find('input#first_name').val();
      dataUser.last_name = currentContainer.find('input#last_name').val();
      dataUser.user_name = currentContainer.find('input#user_name').val();
      dataUser.email = currentContainer.find('input#email').val();
      dataUser.password = currentContainer.find('input#password').val();

      module.createUser(dataUser);
    })
  }
  module.createUser = function (data) {
    return $.ajax({
      url: module.settings.api.create,
      type: 'POST',
      data: data,
      dataType: 'json',
      success: function(res){
        if(res.code === 200){
          $.notify(res.message, "success");
        }else{
          $.notify(res.message);
        }
      },
      error: function(){
      }
    });
  }

}
$(document).ready(function () {
  var user = new User
  user.onSubmitCreate();
})