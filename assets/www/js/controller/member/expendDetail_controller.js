/**
 * Created by marlowe on 2016/3/22.
 * 收支明细详情
 */
var expendDetail = angular.module('expendDetailCtrl', ['ionic'])
expendDetail.controller('expendDetailCtrl', function ($scope, $http, $stateParams, $ionicLoading,htttpServer) {
  $ionicLoading.show({
    template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
  });
  var data = [$stateParams.expend_id]
  $scope.dealType = $stateParams.type;
  /*cordova.exec(function (success) { //调用原生
    $ionicLoading.hide();
    $scope.item = success.data;
  }, function (err) {
    $ionicPopup.alert({
      title: err,
      okText: '确认',
    })
  }, "ZjbPlugin", "budget_detail", data);*/
  htttpServer.commonHttp('ZjbPlugin','budget_detail','','',data).then(function (success) {
    $ionicLoading.hide();
    $scope.item = success.data;
  },function(err){
    $ionicLoading.hide();
    $ionicPopup.alert({
      title: err,
      okText: '确认',
    })
  })

});
