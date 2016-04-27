/**
 * Created by marlowe on 2016/3/8.
 * 店铺
 */
var store = angular.module('storeCtrl', ['akoenig.deckgrid','ionic']);
store.controller('storeCtrl', function ($scope, $http, $stateParams, $q, htttpServer, $ionicPopup,$ionicLoading) {

  $scope.$on('$stateChangeSuccess', function (evt, current, previous) {
    if(current.name!='store'){
      return ;
    }
    $scope.store_info = null;
    $scope.store = null;
    $scope.homeClass = null;
    $scope.classData = null;
    $scope.bg = null;
    $scope.type = null;
    $scope.store_slide = null;
    init();
  });
  //init();
  function init(){
    $ionicLoading.show({
      template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
    });
    var cart_id = $stateParams.cart_id;
    var httpType = grobalUrl.httpType;
    $scope.homeClass = !$scope.homeClass;
    $scope.classData =grobalText.storeNav;
    var storeIndex = $scope.storeIndex = {
      moredata: false,
      storeNav: function (index) {
        $scope.bg = [];
        $scope.bg[index] = 'active';
        if(index ==0){
          $scope.type =index;
        } else if(index==1){
          location.href = '#/store/search/'+cart_id+"/"+0+"/全部商品";
        }else if(index==2){
          $ionicPopup.alert({
            title: '功能开发中！', // String (可选)。弹窗的子标题。
            okText: '确认',
          })
        }else if(index==3){
          $scope.type =index;
        }
      },
    };
    storeIndex.storeNav('0')
    var url = grobalUrl.ImgHttpUrl + grobalUrl.storeIndex + "&store_id=" + cart_id;
    htttpServer.query(url,httpType).then(function (data) {
    console.log(data);
      $ionicLoading.hide();
      $scope.store_info = data.data.store_info;
      var store_slide = data.data.store_info.store_slide;
      $scope.store = data.data;
      $scope.store_slide = [];
      for (var i in store_slide) {
        if (store_slide[i] != '') {
          $scope.store_slide.push(store_slide[i]);
        }
      }
      $scope.imgurl = grobalUrl.ImgUrl;
      if (data.data.sale_goods_list.length != 0) {
        $scope.store = data.data;
      } else {
        storeIndex.moredata = true;
      }
    });
  }


});
