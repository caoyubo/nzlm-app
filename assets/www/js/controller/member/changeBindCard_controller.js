/**
 * Created by marlowe on 2016/3/21.
 */
var bindCard = angular.module('changeCardCtrl', ['ionic'])
bindCard.controller('changeCardCtrl', function ($scope, $http, $ionicPopup, htttpServer, $interval,$ionicLoading) {
  /*cordova.exec(function (success) { //调用原生
    $scope.boundCard = {
      account: success.data.bankNums[0],
      phone: success.data.bankPhone,
      change_account: '',
      new_phone: '',
      password: '',
      code: '',
    }

    if (!success.data.bankNums || success.data.bankNums.length == 0) {
      location.href = '#/bound-card'
    }
  }, function (err) {
    $ionicPopup.alert({
      title: err, // String (可选)。弹窗的子标题。
      okText: '确认',
    })
  }, "ZjbPlugin", "get_account_info", []);*/
  htttpServer.commonHttp('ZjbPlugin','get_account_info').then(function (success) {
    $scope.boundCard = {
      account: success.data.bankNums[0],
      phone: success.data.bankPhone,
      change_account: '',
      new_phone: '',
      password: '',
      code: '',
    }

    if (!success.data.bankNums || success.data.bankNums.length == 0) {
      location.href = '#/bound-card'
    }
  },function(err){
    $ionicPopup.alert({
      title: err, // String (可选)。弹窗的子标题。
      okText: '确认',
    })
  });

  $scope.typeCode = 0;
  var tran_ctrl = $scope.tran_ctrl = {
    time: '',
    classType: 'calm-bg',
    registerText: '获取验证码',
    bound_card: function () { //绑卡
      $ionicLoading.show({
        template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
      });
      var data = [$scope.boundCard.change_account, $scope.boundCard.new_phone, $scope.boundCard.code, $scope.boundCard.password]
      /*cordova.exec(function (success) { //调用原生
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: success.mes, // String (可选)。弹窗的子标题。
          okText: '确认',
        })
      }, function (err) {
        $ionicLoading.hide();
        console.log(err);
        $ionicPopup.alert({
          title: err.mes || '改绑失败!', // String (可选)。弹窗的子标题。
          okText: '确认',
        })
      }, "ZjbPlugin", "change_bind", data);*/
      htttpServer.commonHttp('ZjbPlugin','change_bind','','',data).then(function (success) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: success.mes, // String (可选)。弹窗的子标题。
          okText: '确认',
        })
      },function(err){
        $ionicLoading.hide();
        console.log(err);
        $ionicPopup.alert({
          title: err.mes || '改绑失败!', // String (可选)。弹窗的子标题。
          okText: '确认',
        })
      })
    },
    code: function () {
      $ionicLoading.show({
        template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
      });
      if ($scope.typeCode == 0) {
        //console.log($scope.typeCode);

        /*cordova.exec(function (success) { //调用原生
          //console.log(success);
          $ionicLoading.hide();
          code_yz();
        }, function (err) {
          $ionicPopup.alert({
            title: err.mes,
            okText: '确认',
          })
        }, "ZjbPlugin", "send_verify_code", [0, 1]);*/
        htttpServer.commonHttp('ZjbPlugin','send_verify_code','','',[0, 1]).then(function (success) {
          tran_ctrl.time = '60';
          $ionicLoading.hide();
          code_yz();
        },function(err){
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: err.mes,
            okText: '确认',
          })
        })
      }
    }
  }


  function code_yz() {
    if ($scope.typeCode == 0) {
      $scope.typeCode = 1;
      tran_ctrl.registerText = '秒后重发验证码';
      tran_ctrl.classType = 'button-calm';
      var timer = $interval(function (count) {
        tran_ctrl.time -= 1;
        if (count == 59) {
          $scope.typeCode = 0;
          tran_ctrl.time = '';
          tran_ctrl.registerText = '获取验证码';
          tran_ctrl.classType = 'calm-bg';
        }
      }, 1000, 60);
    }
  }

})
