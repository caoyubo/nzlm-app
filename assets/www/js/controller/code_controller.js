/**
 * Created by marlowe on 2016/3/16.
 */
var code = angular.module('codeCtrl', ['akoenig.deckgrid']);
code.controller('codeCtrl', function ($scope, $http, $stateParams, $q, globalService, $ionicPopup, $cookieStore) {
  $scope.code =grobalUrl.code;
  $scope.receive_list = $scope.code.data;
  $scope.imgurl = grobalUrl.ImgUrl;
})
