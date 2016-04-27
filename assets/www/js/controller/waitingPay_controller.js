/**
 * Created by marlowe on 2016/3/11.
 */
var waitingPay = angular.module('waitingPayCtrl', ['akoenig.deckgrid']);
waitingPay.controller('waitingPayCtrl', function ($scope, $http, $stateParams, $q, $ionicPopup, $cookieStore,$ionicScrollDelegate,htttpServer) {
    var state = $stateParams.state_type;
    var httpType = grobalUrl.httpType;
    switch (state) {
      case 'state_new':
        $scope.title = '待付款';
        break;
      case 'state_pay':
        $scope.title = '待收货';
        break;
      case 'state_success':
        $scope.title = '已完成';
        break
    }
    $scope.items = [];
    $scope.imgurl = grobalUrl.ImgUrl;
    var orderPay = $scope.orderPay = {
      moredata: false,
      start: 0,
      end: 10,
      state_type: $stateParams.state_type,
      doRefresh: function () {
        $scope.$broadcast('scroll.refreshComplete');
      },
      loadMore: function () {
        httpServer(orderPay.state_type, orderPay.start, orderPay.end);
        orderPay.start += orderPay.end + 1;
        orderPay.end += orderPay.end + 1;
      },
      orderDetail: function (order_id) {
        location.href = '#/order-detail/' + order_id
      },
      payment: function (pay_sn) {
        location.href = '#/payment/' + pay_sn
      },
      receiveOrder: function (pay_id) {
        $scope.class_pro = 'po_ab_com';
        $scope.show_select = !$scope.shop_select;
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollBy(0, 50);
        var receive = $scope.items;
        $scope.receive_list =[];
        $scope.receive_list.push(receive[pay_id]);
      },
      colse: function () {
        $scope.class_pro = '';
        $scope.show_select = false;
      },
      decrement: function (counts) {
        $scope.counts = $('.num' + counts).text();
        if ($scope.counts > 0) {
          $scope.counts--;
          $('.num' + counts).text($scope.counts);
          $('input[name=receive_number' + counts + ']').val($scope.counts)
        } else {
          $ionicPopup.alert({
            title: '收货数量不能小于零！',
            okText: '确认',
          })
        }
      },
      increment: function (counts, goods_num) {
        $scope.counts = $('.num' + counts).text();
        if ($scope.counts < goods_num) {
          $scope.counts++;
          $('.num' + counts).text($scope.counts);
          $('input[name=receive_number' + counts + ']').val($scope.counts)
        } else {
          $ionicPopup.alert({
            title: '收货数量不能大于购买数量！',
            okText: '确认',
          })
        }
      },
      countersign: function () {
        var item = [];
        var pay_id ='';
        $('.receive').each(function () {
          var goods_id = $(this).children('input[name=goods_id]').val();
          var order_id = $(this).children('input[name=order_id]').val();
          var receive_number = $(this).children('input[name=receive_number' + goods_id + ']').val();
           pay_id = $(this).children('input[name=pay_id]').val();
          item.push(jQuery.parseJSON('{"goods_id":' + goods_id + ',"order_id":' + order_id + ',"receive_number":' + receive_number + ',"pay_id":' + pay_id +' } '));
        })
        var driver_rank = $('input:radio[name=my]:checked').val();
        var data = {
          "data": {
            "receive_list": item,
            "driver_rank": driver_rank
          }
        }
        var params = {
          "data": JSON.stringify(data),
          "pay_id": pay_id
        }
        var url = grobalUrl.ImgHttpUrl  + grobalUrl.receiveOrder;

          htttpServer.querypost(url,httpType, params).then(function (data) {
            codes(data);
          })
        function codes(data){
          grobalUrl.code  = data;
          /*$cookieStore.remove('code');
           $cookieStore.put("code", data);*/
          location.href = '#/code';
        }
      }

    }


    function httpServer(state_type, start, end) {
      var url = grobalUrl.ImgHttpUrl + grobalUrl.waitingPay + '&state_type=' + state_type + '&start=' + start + '&end=' + end;
      htttpServer.query(url,httpType).then(function (data) {
        $scope.state = state_type;
        var items = data.data.pay_list;
        for (var i in items) {
          $scope.items.push(items[i]);
        }
        if (data.data.pay_list.length != 0) {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        } else {
          orderPay.moredata = true;
        }
      })
    }

  }
)
;
