/**
 * Created by marlowe on 2016/3/19.
 * 转他人
 */
var transfer = angular.module('transferCtrl', ['ionic','ngMessages'])
transfer.controller('transferCtrl', function ($scope, $http, $ionicPopup,$ionicLoading ,htttpServer ) {
  $scope.typeCode = 0;
  $scope.transfer = {
    account: '',
    money: '',
    password: '',
  }
  var tran_ctrl = $scope.tran_ctrl = {
    time: '',
    classType: 'calm-bg',
    registerText: '获取验证码',
    others: function () {  //转他人

      $ionicLoading.show({
        template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
      });
      var data = [$scope.transfer.account, $scope.transfer.money, $scope.transfer.password];
      /*cordova.exec(function (success) { //调用原生
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: '成功',
          template: '转帐成功！'
        })
         $scope.transfer.password='';
      }, function (err) {
      //console.log(err);
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: err.mes || '转帐失败！', // String (可选)。弹窗的子标题。
          okText: '确认',
        })
      }, "ZjbPlugin", "transfer_other", data);*/
      htttpServer.commonHttp('ZjbPlugin','transfer_other',grobalUrl.httpType,'',data).then(function (success) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: '成功',
          template: '转帐成功！'
        })
        $scope.transfer.password='';
      },function(err){
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: err.mes || '转帐失败！', // String (可选)。弹窗的子标题。
          okText: '确认',
        })
      })
    },
  }
})


