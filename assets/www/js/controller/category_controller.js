/**
 * Created by marlowe on 2016/2/24.
 * 分类页面
 */
var category = angular.module('categoryCtrl', ['akoenig.deckgrid','ionic'])
category.controller('categoryCtrl', function ($scope, $http, $stateParams, $q, htttpServer, $cookieStore,$ionicLoading) {
  $ionicLoading.show({
    template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
  });
  var httpType = grobalUrl.httpType;
  $scope.loading = false;
  $scope.imgurl = grobalUrl.ImgUrl;
  var vm = $scope.vm = {
    moredata: false,
    order_key: 0, //排序依据（1、销量，2、浏览量，3、价格
    order: 0, //排序方式（0、倒序，1、正序）
    pagination: {
      currentPage: 1
    },
    doRefresh: function () {
      $scope.$broadcast('scroll.refreshComplete');
    },
    order_all: function (index) {
      console.log(index);
      vm.order_key = index;
      orderTab(vm.order_key);
      $scope.bg = [];
      $scope.bg[index] = 'active o_cur';
    },
    loadMore: function () {
        if($scope.loading == true){
            return ;
        }
        $scope.loading = true;
      httpServer(cate_id, vm.pagination.currentPage, vm.order, vm.order_key);
      vm.pagination.currentPage += 1;
    }
  }
  var cate_id = $stateParams.cate_id;
  $scope.classData = grobalText.screen;
  $cookieStore.remove('cate_id');
  $cookieStore.put("cate_id", cate_id);
  $scope.arr = false;
  $scope.items = [];
  var url =grobalUrl.ImgHttpUrl + grobalUrl.goodsClass + '&id=' + cate_id;
  htttpServer.query(url,httpType).then(function (data) {
    $ionicLoading.hide();
    $scope.goodsClass = data.data.goods_class;
    $scope.classTitle = data.data.class_info.gc_name;
  });

  function orderTab(order_key) {
    console.log("order_key:" + order_key);
    $scope.arr = !$scope.arr;
    $scope.items = [];
    vm.pagination.currentPage = 1;
    if ($scope.arr == true) {
      console.log("true:" + $scope.arr);
      vm.order = 0;
    } else if ($scope.arr == false) {
      console.log('false:' + $scope.arr);
      vm.order = 1;
    }
    httpServer(cate_id, vm.pagination.currentPage, vm.order, order_key);
  }

  function httpServer(cate_id, curPage, order, order_key) {
    var url = grobalUrl.ImgHttpUrl + grobalUrl.goodslist + "&cate_id=" + cate_id + '&curpage=' + curPage + "&order=" + order + "&key=" + order_key;
    console.log(url);
    htttpServer.query(url, httpType).then(function (data) {
      var items = data.data.goods_list;
      for (var i in items) {
        items[i]['goods_image'] = grobalUrl.ImgUrl + items[i]['goods_image'];
        $scope.items.push(items[i]);
      }
      console.log($scope.items);
      $scope.imgurl = grobalUrl.ImgUrl;
      if (data.data.goods_list.length != 0) {
        $scope.$broadcast('scroll.infiniteScrollComplete');
      } else {
        vm.moredata = true;
      }
        $scope.loading = false;

    });
  }

})
