/**
 * Created by marlowe on 2016/3/20.
 * 资金宝
 */
var funds = angular.module('fundsCtrl', ['ionic'])
funds.controller('fundsCtrl', function ($scope, $http, $ionicPopup, htttpServer, $interval, $ionicLoading) {
     $scope.funds_get=function(){
         htttpServer.commonHttp('ZjbPlugin','get_account_info','','',[]).then(function (success) {
             $ionicLoading.hide();
             if (success.data.bankNums && success.data.bankNums.length > 0) {
                 location.href = '#/change-bound-card';
             }else{
                 location.href = '#/bound-card';
             }
         },function(err){
             $ionicLoading.hide();
             $ionicPopup.alert({
                 title: err, // String (可选)。弹窗的子标题。
                 okText: '确认',
             })
         })
     }
})