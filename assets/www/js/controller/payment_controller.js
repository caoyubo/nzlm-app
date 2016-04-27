/**
 * Created by marlowe on 2016/3/9.
 * 支付
 */
var cart = angular.module('paymentCtrl', [])
cart.controller('paymentCtrl', function ($scope, $http, $ionicPopup, htttpServer, $stateParams, $ionicLoading) {
  var httpType = grobalUrl.httpType;
  var pay = $scope.pay = {
    moredata: false,
    payAct: function (channel) {
      $ionicLoading.show({
        template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
      });
      var pay_sn = $stateParams.pay_sn;
      var data = {
        pay_sn: pay_sn,
        payment_code: grobalUrl.payment_code,
      };
      if (channel) {
        data.channel = channel;
      }
      var url = grobalUrl.ImgHttpUrl + grobalUrl.payMent;
        htttpServer.querypost(url,httpType, data).then(function (data) {
          payMents(data);
        })
      function payMents(data){
        $ionicLoading.hide();
        location.href = '#/order-list';
        /*cordova.exec(function (success) { //调用原生
        }, function (err) {
        }, "HttpPlugin", "wv_links", [data.data.pay_url]);*/
        htttpServer.commonHttp('HttpPlugin','wv_links','','',[data.data.pay_url]).then(function (success) {
        },function(err){
        })
      }
    }
  }
})
