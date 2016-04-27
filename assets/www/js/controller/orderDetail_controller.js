/**
 * Created by marlowe on 2016/3/14.
 */
var orderDetail = angular.module('orderDetailCtrl', ['ionic']);
orderDetail.controller('orderDetailCtrl', function ($scope, $http, $stateParams, $q, htttpServer,$ionicLoading,$state,$ionicPopup ) {
  $ionicLoading.show({
    template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
  });
  var url = grobalUrl.ImgHttpUrl + grobalUrl.orderDetail + "&order_id=" + $stateParams.orderId;
  var httpType = grobalUrl.httpType;
  $scope.priceFormat = priceFormat;
  htttpServer.query(url,httpType).then(function (data) {
  //console.log(data);
    $ionicLoading.hide();
    $scope.item = data.data;
    $scope.imgurl = grobalUrl.ImgUrl;
    console.log(data.data);
  });

  var order = $scope.order = {
      goods_cancel : function(goods_id){
          $ionicPopup.confirm({
              cancelText : '取消',
              okText     : '确定',
              title      : '确定取消商品?'
          }).then(function(res){
              if(!res){
                  return ;
              }
              $ionicLoading.show({
                  template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
              });
              var url = grobalUrl.ImgHttpUrl + grobalUrl.cancel_order_goods + '&order_id=' + $stateParams.orderId + '&goods_id=' + goods_id;
              htttpServer.query(url,grobalUrl.httpType).then(function(data){
                  $ionicLoading.hide();
                  $ionicPopup.alert({
                      title: data.mes, // String (可选)。弹窗的子标题。
                      okText: '确认',
                  }).then(function(){
                      $state.reload();
                  })
              })
          })

      }
  }
})
