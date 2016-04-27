/**
 * Created by marlowe on 2016/3/20.
 */
var changeCard = angular.module('bindCardCtrl', ['ionic'])
changeCard.controller('bindCardCtrl', function ($scope, $http, $ionicPopup, htttpServer, $interval, $ionicLoading) {
  $ionicLoading.show({
    template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
  });
  $scope.typeCode = 0;


  $scope.boundCard = {
    account: '',
    phone: '',
    cardname: '',
    codes: '',
  };
  $ionicLoading.hide()
  var tran_ctrl = $scope.tran_ctrl = {
    time: '',
    classType: 'calm-bg',
    registerText: '获取验证码',
    bound_card: function () { //绑卡
      console.log($scope.boundCard);
      var data = [$scope.boundCard.account, $scope.boundCard.phone, $scope.boundCard.cardname, $scope.boundCard.codes];
      /*cordova.exec(function (success) { //调用原生
        $ionicPopup.alert({
          title: success.mes, // String (可选)。弹窗的子标题。
          okText: '确认',
        }).then(function (res) {
          location.href = '#/change-bound-card'
        });
      }, function (err) {
        $ionicPopup.alert({
          title: err.mes, // String (可选)。弹窗的子标题。
          okText: '确认',
        })
      }, "ZjbPlugin", "bind_card", data);*/
      htttpServer.commonHttp('ZjbPlugin','bind_card',grobalUrl.httpType,'',data).then(function (success) {
        $ionicPopup.alert({
          title: success.mes, // String (可选)。弹窗的子标题。
          okText: '确认',
        }).then(function (res) {
          location.href = '#/change-bound-card'
        });
      },function(err){
        $ionicPopup.alert({
          title: err.mes, // String (可选)。弹窗的子标题。
          okText: '确认',
        })
      })

    },
    codes: function () {

      if ($scope.typeCode == 0) {
        if(!isPhone($scope.boundCard.phone)){
          $ionicPopup.alert({
            title:  '请填写正确的手机号!', // String (可选)。弹窗的子标题。
            okText: '确认',
          })
          return ;
        }


        $ionicLoading.show({
          template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
        });
        /*cordova.exec(function (success) { //调用原生
          $ionicLoading.hide();
          code_yz();
        }, function (err) {
         $ionicLoading.hide();
          $ionicPopup.alert({
            title: err.mes, // String (可选)。弹窗的子标题。
            okText: '确认',
          })
        }, "ZjbPlugin", "send_verify_code", [$scope.boundCard.phone, 1]);*/
        htttpServer.commonHttp('ZjbPlugin','send_verify_code',grobalUrl.httpType,'',[$scope.boundCard.phone, 1]).then(function (success) {
          $ionicLoading.hide();
          tran_ctrl.time = '60';
          code_yz();
        },function(err){
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: err.mes || '请检查手机号码和网络是否正常!', // String (可选)。弹窗的子标题。
            okText: '确认',
          })
        })

      }
    }
  }
//绑卡


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

