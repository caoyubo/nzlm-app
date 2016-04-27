/**
 * Created by marlowe on 2016/3/10.
 * 店铺产品搜索
 */
var storeSearch = angular.module('storeSearchCtrl', ['akoenig.deckgrid','ionic']);
storeSearch.controller('storeSearchCtrl', function ($scope, $http, $stateParams, $q, htttpServer, $ionicLoading) {
  $ionicLoading.show({
    template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
  });
  $scope.items = [];
  var httpType = grobalUrl.httpType;
  var storeSearch = $scope.storeSearch = {
    moredata: false,
    order: 0,
    pagination: {
      currentPage: 1
    },
    doRefresh: function () {
      $scope.$broadcast('scroll.refreshComplete');
    },
    loadMore: function () {
      httpServer(storeSearch.pagination.currentPage, storeSearch.order);
      storeSearch.pagination.currentPage += 1;
    }
  }

  function httpServer(curpage, order) {
    var store_id = $stateParams.store_id;
    $scope.store_id = $stateParams.store_id;
    var stc_id = $stateParams.stc_id;
    $scope.title = $stateParams.title;
    if(stc_id==0){
      var url = grobalUrl.ImgHttpUrl + grobalUrl.storeSearch + "&store_id=" + store_id + "&curpage=" + curpage + "&order=" + order;
    }else{
      var url = grobalUrl.ImgHttpUrl + grobalUrl.storeSearch + "&store_id=" + store_id + "&curpage=" + curpage + "&order=" + order+"&stc_id="+stc_id;
    }

    htttpServer.query(url,httpType).then(function (data) {
      $ionicLoading.hide();
      var items = data.data.goods_list;
      for (var i in items) {
        items[i]['goods_image'] = grobalUrl.ImgUrl + items[i]['goods_image'];
        $scope.items.push(items[i]);
      }
      console.log($scope.items);
      if (data.data.goods_list.length == 0) {
        storeSearch.moredata = true;
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  }
})
