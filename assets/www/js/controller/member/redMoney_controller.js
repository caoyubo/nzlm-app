var redMoney = angular.module('redMoneyCtrl', ['ionic'])
redMoney.controller('redMoneyCtrl', function ($scope, $http, $ionicPopup, htttpServer,$ionicLoading) {
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
                },
                voucher:function(vid){
                    $ionicLoading.show({
                      template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
                    });
                    var url = grobalUrl.ImgHttpUrl + grobalUrl.voucherTake+"&vid="+vid;
                    htttpServer.query(url, httpType).then(function (data) {
                        $ionicLoading.hide();
                        /*if(data.code==0){
                             $ionicPopup.confirm({
                                  title: '领取红包成功！', // String (可选)。弹窗的子标题。
                                  cancelText: '取消',
                                  okText: '确认',
                              })
                        }else{
                            $ionicPopup.confirm({
                              title: data.mes, // String (可选)。弹窗的子标题。
                              cancelText: '取消',
                              okText: '确认',
                          })
                        }*/
                        $ionicPopup.alert({
                            title: data.mes || '领取失败', // String (可选)。弹窗的子标题。
                            okText: '确认',
                        })
                    });

                }

        }
        function httpServer(page,curPage) {
            var url = grobalUrl.ImgHttpUrl + grobalUrl.voucher + "&page=" + page + '&curpage=' + curPage;
            htttpServer.query(url, httpType).then(function (data) {
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