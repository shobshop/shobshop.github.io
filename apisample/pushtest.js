angular.module('pushTestApp', [])
  .controller('PushTestController', function($http) {
    var pushTest = this;
    pushTest.title = "CMG Warehouse Sale";
    pushTest.message = "CMG Warehouse Sale เริ่มแล้วที่ชั้น 5 คลิกเพื่อรับสิทธิพิเศษจาก ShobShop";//วันหยุดชิลล์ๆ ไปห้างกันดีกว่า คลิกเพื่อดูสิ่งที่น่าสนใจในห้างใกล้คุณ
    pushTest.deviceId = "";//559f76d43134861f00323de6
    pushTest.openAction = "None";
    pushTest.promotionId = "57d2aad8061c3a2926b4bf19";
    pushTest.result = "";

    pushTest.send = function () {
      var pushBody = {
        type: 'push',
        data: {
          title: pushTest.title,
          message: pushTest.message,
          device: pushTest.deviceId,
          type: 'test'
        }
      };
      if(pushTest.openAction == 'openPage') {
        pushBody.data.promotion = pushTest.promotionId;
      }
      pushTest.result = 'Sending...';
      console.log('Send ' + JSON.stringify(pushBody));
      $http.post('http://104.199.221.245:3000/job', pushBody).then(function (response) {
        pushTest.result = 'Send push successfully';
        console.log('Send push successfully: ' + JSON.stringify(response));
      }, function (error) {
        pushTest.result = 'Send push failed';
        console.log('Send push failed due to error: ' + JSON.stringify(error));
      });
    };
  });