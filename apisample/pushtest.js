angular.module('pushTestApp', [])
  .controller('PushTestController', function($http) {
    var pushTest = this;
    pushTest.title = "CMG Warehouse Sale";
    pushTest.message = "CMG Warehouse Sale เริ่มแล้วที่ชั้น 5 คลิกเพื่อรับสิทธิพิเศษจาก ShobShop";//วันหยุดชิลล์ๆ ไปห้างกันดีกว่า คลิกเพื่อดูสิ่งที่น่าสนใจในห้างใกล้คุณ
    pushTest.deviceId = "";//559f76d43134861f00323de6
    pushTest.openAction = "None";
    pushTest.openPageTarget = "/promotion/57d2aad8061c3a2926b4bf19";
    pushTest.result = "";

    pushTest.todos = [
      {text:'learn angular', done:true},
      {text:'build an angular app', done:false}];
 
    pushTest.addTodo = function() {
      pushTest.todos.push({text:pushTest.todoText, done:false});
      pushTest.todoText = '';
    };
 
    pushTest.remaining = function() {
      var count = 0;
      angular.forEach(pushTest.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
 
    pushTest.archive = function() {
      var oldTodos = pushTest.todos;
      pushTest.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) pushTest.todos.push(todo);
      });
    };

    pushTest.send = function () {
      var pushBody = {
        title: pushTest.title,
        message: pushTest.message,
        device: pushTest.deviceId
      };
      if(pushTest.openAction == 'openPage') {
        pushBody.openAction = {
          type: 'openPage',
          target: pushTest.openPageTarget
        };
      }
      pushTest.result = 'Sending...';
      console.log('Send ' + JSON.stringify(pushBody));
      $http.post('http://api.shobshop.com/notification', pushBody).then(function (response) {
        pushTest.result = 'Send push successfully';
        console.log('Send push successfully: ' + JSON.stringify(response));
      }, function (error) {
        pushTest.result = 'Send push failed';
        console.log('Send push failed due to error: ' + JSON.stringify(error));
      });
    };
  });