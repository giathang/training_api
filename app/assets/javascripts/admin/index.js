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
    module.clickDestroy();
  }

  module.clickDestroy = function () {
    $('.js-destroy-user').on('click',function (e) {
      e.preventDefault();
      userId = $(this).parents('tr').data('id');
      console.log(userId)
      module.destroyUser(userId);
    });
  }

  module.destroyUser = function (userId) {
    return $.ajax({
      url: '/api/v1/admin/users/' + userId,
      type: 'DELETE',
      success: function (res) {
        if(res.code == 200){
          module.getUsers(module.renderUsers);
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
      console.log(currentContainer);
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
          module.settings.data.users = res.data.users;
          module.renderUsers();
        }else{
          $.notify(data.message);
        }
      },
      error: function(){
      }
    });
  }

  module.init = function () {
    module.getUsers(module.renderUsers);
  }

}
$(document).ready(function () {
  user = new User;
  user.init();
  user.actionSearch();
})