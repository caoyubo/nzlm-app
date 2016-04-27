/**
 * Created by marlowe on 2016/2/29.
 */
angular.module('searchKeyCtrl', ['ionic'])
  .controller('searchKeyCtrl', function ($scope, $http, $stateParams, $q, htttpServer,$ionicLoading) {
    $ionicLoading.show({
      template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
    });
    var httpType = grobalUrl.httpType;
    $scope.search_key = $stateParams.keyword;
    $scope.items = [];
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
      order_all: function () {
        vm.order_key=0;
        orderTab(vm.order_key);
        $scope.all_class =!$scope.all_class;
        $scope.price_class=false;
        $scope.sale_class=false;
        $scope.pageViews_class=false
      },
      order_sale:function(){
        vm.order_key=1;
        orderTab(vm.order_key);
        $scope.sale_class =!$scope.sale_class;
        $scope.all_class=false;
        $scope.price_class=false;
        $scope.pageViews_class=false
      },
      order_PageViews:function(){
        vm.order_key=2;
        orderTab(vm.order_key);
        $scope.pageViews_class =! $scope.pageViews_class;
        $scope.sale_class=false;
        $scope.price_class=false;
        $scope.all_class=false;
      },
      order_price:function(){
        vm.order_key=3;
        orderTab(vm.order_key);
        $scope.price_class =! $scope.price_class;
        $scope.pageViews_class=false;
        $scope.all_class=false;
        $scope.sale_class=false
      },
      loadMore: function () {
        httpServer($stateParams.keyword, vm.pagination.currentPage, vm.order, vm.order_key);
        vm.pagination.currentPage += 1;
      },
      onclick_searchKeyword:function(){
        location.href='#/search/'+$scope.search_key;
      }
    }

    function  orderTab(order_key){
      console.log("order_key:"+order_key);
      $scope.arr = !$scope.arr;
      $scope.items = [];
      vm.pagination.currentPage=1;
      if ($scope.arr == true) {
        console.log("true:"+$scope.arr);
        vm.order=0;
      }else if($scope.arr == false){
        console.log('false:'+$scope.arr);
        vm.order=1;
      }
      httpServer($stateParams.keyword, vm.pagination.currentPage, vm.order, order_key);
    }

    function httpServer(cate_id, curPage, order, order_key) {
      var url = grobalUrl.ImgHttpUrl + grobalUrl.searchKeyword + "&keyword=" + cate_id + '&curpage=' + curPage + "&order=" + order + "&key=" + order_key;
      htttpServer.query(url,httpType).
        then(function (data) {
          $ionicLoading.hide();
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
        });
    }
  });
