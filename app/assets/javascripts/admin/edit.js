function User(options) {
  var module = this;
  var defaults = {
    data: {}
  }
  module.settings = $.extend({}, defaults, options);

  module.onSubmitCreate = function () {
    $('.js-user-create').off('click').on('click', function (e) {
      e.preventDefault();
      var dataUser ={},
        currentContainer = $(this).parents('form');

      userId = currentContainer.data("id");

      dataUser.first_name = currentContainer.find('input#user_first_name').val();
      dataUser.last_name = currentContainer.find('input#user_last_name').val();
      dataUser.user_name = currentContainer.find('input#user_user_name').val();
      dataUser.email = currentContainer.find('input#user_email').val();
      dataUser.password = currentContainer.find('input#user_password').val();

      module.createUser(userId,dataUser);
    })
  }
  module.createUser = function (user_id,data) {
    return $.ajax({
      url: '/api/v1/admin/users/' + user_id,
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
  var user = new User
  user.onSubmitCreate();
})