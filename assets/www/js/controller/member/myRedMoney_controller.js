var myRedMoney = angular.module('myRedMoneyCtrl', ['ionic'])
myRedMoney.controller('myRedMoneyCtrl', function ($scope, $http, $ionicPopup, htttpServer,$ionicLoading) {
         var httpType = grobalUrl.httpType;
        $scope.items = [];
        var red_money= $scope.red_money={
                page:10,
                curpage:1,
                moredata: false,
                doRefresh: function () {
                  $scope.$broadcast('scroll.refreshComplete');
                },
                loadMore: function () {
                    httpServer(red_money.page,red_money.curpage);
                    red_money.curpage += 1;
                }

        }
        function httpServer(page,curPage) {
            var url = grobalUrl.ImgHttpUrl + grobalUrl.myVoucher + "&page=" + page + '&curpage=' + curPage;
            htttpServer.query(url, httpType).then(function (data) {
            console.log('*************')
            console.log(data);
              var items = data.data.voucher_list;
              for (var i in items) {
                $scope.items.push(items[i]);
              }
              console.log($scope.items);
              $scope.imgurl = grobalUrl.ImgUrl;
              if (data.data.voucher_list.length != 0) {
                $scope.$broadcast('scroll.infiniteScrollComplete');
              } else {
                red_money.moredata = true;
              }

            });
          }
});