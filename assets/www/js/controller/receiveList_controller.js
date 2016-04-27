/**
 * Created by marlowe on 2016/3/15.
 */
var receiveList = angular.module('receiveListCtrl', ['akoenig.deckgrid']);
receiveList.controller('receiveListCtrl', function ($scope, $http, $stateParams, $q, globalService, $ionicPopup, $cookieStore, htttpServer) {
   $scope.receive = $stateParams.obj;
  console.log($scope.receive);
  var receiveList = $scope.receiveList = {
    moredata: false,

  }

 /* var url = grobalUrl.ImgHttpUrl + grobalUrl.orderDetail + "&order_id=" + $stateParams.order_id;
  globalService.commonGet(url).then(function (data) {
    console.log(data);
    $scope.order = data.data;
  });*/

})
