/**
 * Created by marlowe on 2016/3/21.
 */
var accountInfo = angular.module('accountInfoCtrl', ['ionic'])
accountInfo.controller('accountInfoCtrl', function ($scope, $http, $ionicPopup, $ionicLoading,htttpServer) {
  $ionicLoading.show({
    template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
  });
  var httpType = grobalUrl.httpType;
  htttpServer.commonHttp('ZjbPlugin','get_account_info',httpType).then(function (success) {
       $ionicLoading.hide();
       $scope.accountInfoData = success.data;
  },function(err){
        $ionicLoading.hide();
        $ionicPopup.alert({
           title: err, // String (可选)。弹窗的子标题。
           okText: '确认',
         })
  })
})
