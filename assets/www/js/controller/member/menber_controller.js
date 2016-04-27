/**
 * Created by marlowe on 2016/3/10.
 * 个人中心
 */
var menber = angular.module('menberCtrl', ['ionic'])
menber.controller('menberCtrl', function ($scope, $http, $ionicPopup, htttpServer,$ionicLoading) {
  $ionicLoading.show({
    template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
  });
  var httpType = grobalUrl.httpType;
  var menber = $scope.menber = {
    start:0,
    end:6,
    moredata: false,
    doRefresh: function () {
      $scope.$broadcast('scroll.refreshComplete');
    },
    loadMore: function () {
      var url = grobalUrl.ImgHttpUrl + grobalUrl.historyGoods+"&start="+menber.start+"&end="+menber.end;
      htttpServer.query(url,httpType).then(function (data) {
        $ionicLoading.hide();
        $scope.items = [];
        var data = data.data.goods_list;
        for (var i in data) {
          $scope.items.push(data[i]);
        }
        menber.moredata = true;
      })
    },
    red_packets: function () {
      $ionicPopup.alert({
        title: '红包功能正在开发中！',
        okText: '确认',
      })
    },
    pre_buy: function () {
      $ionicPopup.alert({
        title: '预购通知功能正在开发中！',
        okText: '确认',
      })
    }
  }

})
