/**
 * Created by marlowe on 2016/3/21.
 * 重置密码
 */
var resetPassword = angular.module('resetPasswordCtrl', ['ionic'])
resetPassword.controller('resetPasswordCtrl', function ($scope, $http, $ionicPopup, htttpServer, $interval, $ionicLoading) {
  $scope.typeCode = 0;
  $scope.reset = {
    codes: '',
    password: '',
    passwords: '',
  }
  var tran_ctrl = $scope.tran_ctrl = {
    time: '',
    classType: 'calm-bg',
    registerText: '获取验证码',
    resets: function (resetFrom) {
      $ionicLoading.show({
        template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
      });
      var data = [$scope.reset.codes, $scope.reset.password, $scope.reset.passwords]
      /*cordova.exec(function (success) { //调用原生
        $ionicLoading.hide();
        if (success.code == 0) {
          $ionicPopup.alert({
            title: success.mes, // String (可选)。弹窗的子标题。
            okText: '确认',
          })
        } else if (success.code == 30010) {
          $ionicPopup.alert({
            title: "验证码错误！", // String (可选)。弹窗的子标题。
            okText: '确认',
          })
        }
      }, function (err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: err.mes || "重置密码失败，请重试！", // String (可选)。弹窗的子标题。
          okText: '确认',
        })
      }, "ZjbPlugin", "reset_pwd", data);*/
      htttpServer.commonHttp('ZjbPlugin','reset_pwd','','',data).then(function (success) {
        $ionicLoading.hide();
        if (success.code == 0) {
          $ionicPopup.alert({
            title: success.mes, // String (可选)。弹窗的子标题。
            okText: '确认',
          })
        } else if (success.code == 30010) {
          $ionicPopup.alert({
            title: "验证码错误！", // String (可选)。弹窗的子标题。
            okText: '确认',
          })
        }
      },function(err){
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: err.mes || "两次密码不一致，请确认！", // String (可选)。弹窗的子标题。
          okText: '确认',
        })
      })


    },
    codes: function () {
      if ($scope.typeCode == 0) {
        //console.log($scope.typeCode);

        /*cordova.exec(function (success) { //调用原生
          code_yz();
        }, function (err) {
          tran_ctrl.time = '';
          if(err.code == '30010'){
            $ionicPopup.alert({
              title: '请先到资金宝处进行绑卡！', // String (可选)。弹窗的子标题。
              okText: '确认',
            })
          }else{
            $ionicPopup.alert({
              title: err.mes, // String (可选)。弹窗的子标题。
              okText: '确认',
            })
          }

        }, "ZjbPlugin", "send_verify_code", [0, 1]);*/
        htttpServer.commonHttp('ZjbPlugin','send_verify_code','','',[0, 1]).then(function (success) {
          tran_ctrl.time = '60';
          code_yz();
        },function(err){
          tran_ctrl.time = '';
          if(err.code == '30010'){
            $ionicPopup.alert({
              title: '请先到资金宝处进行绑卡！', // String (可选)。弹窗的子标题。
              okText: '确认',
            })
          }else{
            $ionicPopup.alert({
              title: err.mes, // String (可选)。弹窗的子标题。
              okText: '确认',
            })
          }
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
