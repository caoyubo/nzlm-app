/**
 * Created by marlowe on 2016/3/16.
 */
var about = angular.module('aboutCtrl', ['ionic'])
about.controller('aboutCtrl', function ($scope, $http, $ionicPopup, htttpServer,$ionicLoading) {
  $ionicLoading.show({
    template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
  });
  var url = grobalUrl.ImgHttpUrl + grobalUrl.storeInfo;
  var httpType = grobalUrl.httpType;
  htttpServer.query(url,httpType).then(function (data) {
    $ionicLoading.hide();
    console.log(data);
    $scope.aboutInfo= data.data;
  })
})
