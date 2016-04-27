/**
 * Created by marlowe on 2016/3/21.
 * 转卡
 */
var transferCard = angular.module('transferCardCtrl', ['ionic'])
transferCard.controller('transferCardCtrl', function ($scope, $http, $ionicPopup, $ionicLoading,htttpServer) {
  $ionicLoading.show({
    template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
  });
  $scope.card = {
    account: '',
    money: '',
    password: '',
  }
  /*cordova.exec(function (success) { //调用原生
    $ionicLoading.hide()
    if (success.code == 0) {
      if (success.data.length > 0) {
        $scope.card = {
          account: success.data[0],
        }
      }
    } else if (success.code == 30010) {
      $ionicPopup.alert({
        title: '您还没有绑卡，请先绑卡。', // String (可选)。弹窗的子标题。
        okText: '确认',
      })
    }
  }, function (err) {
    $ionicPopup.alert({
      title: err, // String (可选)。弹窗的子标题。
      okText: '确认',
    })
  }, "ZjbPlugin", "query_card", []);*/
  htttpServer.commonHttp('ZjbPlugin','query_card','','',[]).then(function (success) {
    $ionicLoading.hide()
    if (success.code == 0) {
      if (success.data.length > 0) {
        $scope.card = {
          account: success.data[0],
        }
      }
    } else if (success.code == 30010) {
      $ionicPopup.alert({
        title: '您还没有绑卡，请先绑卡。', // String (可选)。弹窗的子标题。
        okText: '确认',
      })
    }
  },function(err){
    $ionicLoading.hide();
    $ionicPopup.alert({
      title: err, // String (可选)。弹窗的子标题。
      okText: '确认',
    })
  })


  var tran_ctrl = $scope.tran_ctrl = {
    card: function () { //转卡
      console.log('***************************');
      $ionicLoading.show({
        template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
      });
      var data = [$scope.card.account, $scope.card.money, $scope.card.password];
      /*cordova.exec(function (success) { //调用原生
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: '提示框',
          template: '您已经成功。'
        })
        $scope.transfer.password='';
      }, function (err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: err.mes, // String (可选)。弹窗的子标题。
          okText: '确认',
        })
      }, "ZjbPlugin", "transfer_card",data);*/
      htttpServer.commonHttp('ZjbPlugin','transfer_card','','',data).then(function (success) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: '提示框',
          template: '您已经成功。'
        })
        $scope.transfer.password='';
      },function(err){
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: err.mes, // String (可选)。弹窗的子标题。
          okText: '确认',
        })
      })


    }
  }
});
