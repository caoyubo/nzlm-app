/**
 * Created by marlowe on 2016/2/26.
 * 搜索页
 */
angular.module('searchCtrl', ['ionic'])
  .controller('searchCtrl', function ($scope, $http, $stateParams, $q, htttpServer,$ionicLoading) {
    $ionicLoading.show({
      template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
    });
    var httpType = grobalUrl.httpType;
    var url = grobalUrl.ImgHttpUrl + grobalUrl.goodsIndex;
    htttpServer.query(url,httpType).then(function (data) {
      $ionicLoading.hide();
      $scope.goodsIndex = data.data.goods_class;

      var index = $scope.goodsIndex[0].gc_id;
      $scope.search.onclick_catId(index || '1');
    });

    var search = $scope.search = {
      onclick_catId: function (cat_id) {
        var child_data = [];
        for (var i  in  $scope.goodsIndex) {
          var arr = $scope.goodsIndex[i].child;
          for (var n in arr) {
            if (arr[n].gc_parent_id == cat_id) {
              child_data.push(arr[n]);
            }
          }
          if($scope.goodsIndex[i].gc_id == cat_id){
            $scope.curr_class = $scope.goodsIndex[i];
          }
        }
        $scope.bg=[];
        $scope.bg[cat_id] = 'active';
        $scope.child = child_data;
      },
      onclick_searchKeyword: function () {
        location.href='#/search/'+$scope.search_key;
      }
    }
  });
