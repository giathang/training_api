function User(options) {
  var module = this;
  var defaults = {
    container: $('.list-users'),
    template:{
      'list_users': $('#list-users-template')
    },
    api: {
      'index': '/api/v1/admin/users'
    },
    data: {}
  }
  module.settings = $.extend({}, defaults, options);
  module.getUsers = function (callback) {
    return $.ajax({
      url: module.settings.api.index,
      type: 'GET',
      dataType: 'json',
      success: function(res){
        if(res.code == 200){
          module.settings.data.users = res.data.users;
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
  module.renderUsers = function(){
    var template = _.template(module.settings.template.list_users.html());
    module.settings.container.html(template({users: module.settings.data.users}));
  }
  module.init = function () {
    module.getUsers(module.renderUsers);
  }

}
$(document).ready(function () {
  user = new User;
  user.init();
})