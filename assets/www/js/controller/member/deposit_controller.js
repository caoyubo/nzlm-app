/**
 * Created by marlowe on 2016/3/21.
 * 转入
 */
var deposits = angular.module('depositCtrl', ['ionic'])
deposits.controller('depositCtrl', function ($scope, $http, $ionicPopup,$ionicLoading,htttpServer ) {
  //转入
  $scope.depositext = {
    money: '',
    payType: '',
  }
  var tran_ctrl = $scope.tran_ctrl = {
    depositPay: function () {
      //$ionicLoading.show({
      //  template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
      //});
      var data = [$scope.depositext.money, $scope.depositext.payType];

      htttpServer.commonHttp('ZjbPlugin','transfer_in','','',data).then(function (success) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: '转入成功！', // String (可选)。弹窗的子标题。
          okText: '确认',
        })
      },function(err){
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: err.mes, // String (可选)。弹窗的子标题。
          okText: '确认',
        })
      })
    },
  }
})
