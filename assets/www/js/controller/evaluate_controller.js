/**
 * Created by marlowe on 2016/3/4.
 */
angular.module('evaluateCtrl', ['akoenig.deckgrid'])
  .controller('evaluateCtrl', function ($scope, $http, $stateParams, $q, htttpServer) {
    $scope.goodsId = $stateParams.goodsId;
    var httpType = grobalUrl.httpType;
    var goods = $scope.goods = {
      moredata: false,
      curr_page: 0,
      page_size: 2,
      doRefresh: function () {
        $scope.$broadcast('scroll.refreshComplete');
      },
      loadMore: function () {

      },
    }

    var url = grobalUrl.ImgHttpUrl + grobalUrl.evaluateList + "&goods_id=" + $scope.goodsId + "&start=" + goods.curr_page + "&end=" + goods.page_size;
    htttpServer.query(url,httpType).then(function (data) {
      console.log(data);
      $scope.evaluate = data.data.evaluate_list
    });

  });
