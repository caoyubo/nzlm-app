/**
 * Created by marlowe on 2016/3/8.
 * 订单页面
 */
var order = angular.module('orderCtrl', ['akoenig.deckgrid','ionic']);
order.controller('orderCtrl', function ($scope, $http, $stateParams, $q, htttpServer, $ionicPopup,$ionicLoading) {
  $ionicLoading.show({
    template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
  });
  var cart_id = $stateParams.cart_id;
  var num = $stateParams.num;
  var cart = $stateParams.cart;
  var httpType = grobalUrl.httpType;
  var total_amount = 0;
  $scope.radio_type =0;
  /*$scope.person = $cookieStore.get("name");
   var str = $scope.person;
   var cart_ids = '';
   for (x in str) {
   cart_ids += str[x].cart_id + '|' + str[x].num + ',';
   }
   $scope.cart_ids = cart_ids;*/
  $scope.if_cart = $stateParams.if_cart;
  if ($scope.if_cart != 0) {
    $scope.if_cart = 1;
    var cart_ids = cart;
  } else {
    $scope.if_cart = 0;
    var cart_ids = cart_id+'|'+num
  }
  if ($stateParams.type_id != '') {
    var promotions = $stateParams.type;
    var promotions_id = $stateParams.type_id;
  }
  var data = {
    'cart_id[]': cart_ids,
    'ifcart': $scope.if_cart,
    'promotions': promotions,
    'promotions_id': promotions_id,
  };
  var url = grobalUrl.ImgHttpUrl + grobalUrl.orderCarid;
   htttpServer.querypost(url,httpType, data).then(function (data) {
     cartinit(data);
   })
  function cartinit(data){
        $ionicLoading.hide();
        if(data.code==0){
              $scope.result = data.data.result;
              $scope.imgurl = grobalUrl.ImgUrl;
              $scope.address_id = data.data.result.address_info.address_id;
              $scope.freight_total = parseFloat(data.data.result.freight_total).toFixed(2);

              var store_cart_list = $scope.result.store_cart_list;
              var sub_total = {};
              var total_num = 0;
              var total_price = 0;
              for (store_id in store_cart_list) {
                var goods_list = store_cart_list[store_id];
                var tmp_total_num = 0;
                var tmp_total_price = 0;
                for (var i in goods_list) {
                  tmp_total_num += parseInt(goods_list[i].goods_num);
                  tmp_total_price += goods_list[i].goods_num * goods_list[i].goods_price;
                }
                sub_total[store_id] = {num: tmp_total_num, price: tmp_total_price.toFixed(2)};
                total_num += tmp_total_num;
                total_price += tmp_total_price;
              }
              $scope.sub_total = sub_total;
              $scope.total_num = total_num;
              $scope.total_price = total_price+parseInt($scope.freight_total);
              total_amount = total_price;
              $scope.voucher_list = data.data.result.store_voucher_list;
              /*$scope.voucher_list=[];*/
              /*for(var store_id in $scope.voucher_list){
                    var max_money = 0;
                    var max_t_id = 0;
                    var list = $scope.voucher_list[store_id];
                    for( var t_id in list){
                        var t = list[t_id];
                        if(t.voucher_price > max_money){
                            max_money = t.voucher_price;
                            max_t_id = t_id;
                        }
                    }
                  $scope.voucher_list[store_id][max_t_id]['is_max'] = true;
              }*/
        }else{
              $ionicPopup.alert({
                title: data.mes, // String (可选)。弹窗的子标题。
                cancelText: '取消',
                okText: '确认',
              }).then(function (res) {
                  history.back(-1);
              });

        }
  }
    var total_price_arr=[];
    var total_price_shop=[];
    var temp = 0;
    var info_array = {};
    var order = $scope.order = {
    moredata: false,
    serverSideChange:function(store_id,price,voucher_id,radio_type,info){
            if(radio_type==0){
               var total =  $('.total-price-voucher'+store_id).val();
               var total_price = priceFormat(total-price);
               $scope.total_price = priceFormat(total_amount - price+ parseInt($scope.freight_total));
              $('.total-voucher'+store_id).text(total_price);
              $scope.radio_type =1;
               total_price_arr.push(store_id);
               var i =  $.inArray(store_id, total_price_arr);
               if(i!=-1){
                    total_price_shop.push(total_price)
                    for(var i=0;i<total_price_shop.length;i++){
                               temp+=total_price_shop[i];
                    }
                  // alert(temp);

               }
            }
        info_array[store_id] = info;
    },
    buy_order: function () {
      var data = {
        'cart_id[]': cart_ids,
        'ifcart': $scope.if_cart,
        'address_id': $scope.address_id,
        'promotions': promotions,
        'promotions_id': promotions_id,
        "voucher":[]
      };
        for(var i in info_array){
            data['voucher'].push(i+'|'+info_array[i]['voucher_t_id'])
        }
        data['voucher'] = data['voucher'].join(',');
      var url = grobalUrl.ImgHttpUrl + grobalUrl.buyOrder;
            htttpServer.querypost(url,httpType, data).then(function (data) {
                orderBuy(data);
            })
         function orderBuy(data){
             if(data.code==0){
                 var pay_sn = data.data.pay_sn;
                 location.href = '#/payment/' + pay_sn;
             }else{
                 $ionicPopup.alert({
                     title: data.mes, // String (可选)。弹窗的子标题。
                     okText: '确认',
                 })
             }
         }
    }
  }


});
