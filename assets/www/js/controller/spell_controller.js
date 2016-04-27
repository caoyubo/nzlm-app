/**
 * Created by marlowe on 2016/3/17.
 * 拼单
 */
var spell = angular.module('spellCtrl', ['akoenig.deckgrid', 'ionic']);
spell.controller('spellCtrl', function ($scope, $http, $stateParams, $q, htttpServer, $ionicLoading) {
  $ionicLoading.show({
    template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
  });
  $scope.imgurl = grobalUrl.ImgUrl;
  var httpType = grobalUrl.httpType;
  var spell = $scope.spell = {
    moredata: false,
    doRefresh: function () {
      $scope.$broadcast('scroll.refreshComplete');
    },
    loadMore: function () {
      var id = $stateParams.id;
      var url = grobalUrl.ImgHttpUrl + grobalUrl.spell + "&pindan_id=" + id;
      htttpServer.query(url, httpType).then(function (data) {
        $ionicLoading.hide();
        $scope.spell = data.data;
        $scope.items = [];
        var items = data.data.goods_list;
        for (var i in items) {
          $scope.items.push(items[i]);
        }
        spell.moredata = true;
      })
    }
  }
})
