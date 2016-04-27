/**
 * Created by marlowe on 2016/3/4.
 */
var cart = angular.module('cartCtrl', ['ionic'])
cart.controller('cartCtrl', function ($scope, $http, $ionicPopup, htttpServer,$ionicLoading,$timeout,$location ) {
  $ionicLoading.show({
    template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
  });

  $scope.$on('$stateChangeSuccess', function (evt, current, previous) {
    if(current.name!='tab.cart'){
      return ;
    }
   // init(); //路由那里加了cache：false 所以这里就不用再执行了
  });

  var httpType = grobalUrl.httpType;
  init();
  function init(callback){

    // 数据reload
    var url = grobalUrl.ImgHttpUrl + grobalUrl.cartList;
    $scope.itemst = [];
    htttpServer.query(url,httpType).then(function (data) {
      $ionicLoading.hide();
      $scope.store = data.data.store_cart_list;
      $scope.imgurl = grobalUrl.ImgUrl;
      //console.log(data);
      $scope.sum = 0.00;
      $timeout(function () {
        $($scope.store).each(function (i, datas) {
          $(datas.goods_list).each(function (n, data) {
            squaredFoursum(data.cart_id, $scope);
            //cart.doRefresh();
          })
        })
        if(typeof callback == 'function'){
          callback();
        }
      }, 100);
    });
  }


  var cart = $scope.cart = {
    moredata: false,
    doRefresh: function () {
      init(function(){
        $scope.$broadcast('scroll.refreshComplete');
        $('#SelectAll').prop("checked", true);
      });

    },
    total: function () {
      var item = [];
      var sumt = 0;
      $("input[type=checkbox]:checkbox:checked").each(function (i) {
        item.push(parseFloat($(this).val()));
      });
      $.each(item, function (i) {
        sumt += item[i];
      });
      $scope.sum = priceFormat(sumt);//sumt.toFixed(2)
    },
    totalCart: function () {
      var item = '';
      $(".cart_id:checked").each(function (i) {
        var cart_id = parseFloat($(this).next().next().val());
        var num = parseFloat($(this).next().next().next().val());
        item += cart_id + "|" + num + ","
      });
      if (item != '') {
        //location.href = '#/order/1/' + item
        $location.path('/order/1/' + item)
      } else {
        $ionicPopup.alert({
          title: '请先选择商品！', // String (可选)。弹窗的子标题。
          okText: '确认',
        })
      }

    },
    cart_Delete: function (cart_id) {
      $ionicLoading.show({
        template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
      });
      var url = grobalUrl.ImgHttpUrl + grobalUrl.carDeletl + "&cart_id=" + cart_id;
      htttpServer.query(url,httpType).then(function (data) {
        $ionicLoading.hide();
        if (data.code == 0) {
          var parent_ul = $('.cart_' + cart_id).parent();
          $('.cart_' + cart_id).remove();
          if(parent_ul.find('li').length<=0){
            parent_ul.parents('.store').remove();
          }
          $ionicPopup.alert({
            title: '删除成功', // String (可选)。弹窗的子标题。
            okText: '确认',
          })
        } else {
          $ionicPopup.alert({
            title: data.mes, // String (可选)。弹窗的子标题。
            okText: '确认',
          })
        }
      })
    },
    //选择单个商品
    checkbox : function () {
      if ($("#SelectAll").is(':checked')) {
        $(".store :checkbox").prop("checked", true);
        cart.total();
      } else {
        $(".store :checkbox").attr("checked", false);
        cart.total();
      }
    },
    //选择全部
    checkboxList : function () {
      cart.total();
    },
    //商店选择
    storeCheckbox : function(store_id){
      if ($("#squaredFour" + store_id).is(':checked')) {
        $("input[name=check" + store_id + "]").prop("checked", true);
        cart.total();
      } else {
        $("input[name=check" + store_id + "]").attr("checked", false);
        cart.total();
      }
    },
    //增加数量
    increment : function (cart_id) {
      $scope.counts = $('.cart' + cart_id).text();
      $scope.counts++;
      cart_num(cart_id, $scope.counts, htttpServer, $scope,$ionicPopup);
    },
    //减少数量
    decrement : function (cart_id) {
      $scope.counts = $('.cart' + cart_id).text();
      if ($scope.counts > 1) {
        $scope.counts--;
        $('.cart' + cart_id).text($scope.counts);
        $('.cart_num'+cart_id).val($scope.counts);
        cart_num(cart_id, $scope.counts, htttpServer, $scope,$ionicPopup);
      } else {
        $ionicPopup.alert({
          title: '商品数量必须大于0！', // String (可选)。弹窗的子标题。
          okText: '确认',
        })
      }
    }
  };

  function squaredFoursum(cart_id, $scope) {
    var proice = $('.store_proice' + cart_id + " span").text();
    var num = $('.cart' + cart_id).text();
    var nums = parseInt(num);
    var tal = $('#squaredFour' + cart_id).val(proice * nums);
    cart.total($scope);
  }


  function cart_num(cart_id, quantity, htttpServer, $scope,$ionicPopup) {
    var url = grobalUrl.ImgHttpUrl + grobalUrl.carUpdate + "&cart_id=" + cart_id + "&quantity=" + quantity;
    htttpServer.query(url,grobalUrl.httpType).then(function (data) {
      if (data.code == 0) {
        $('.cart' + cart_id).text($scope.counts);
        $('.cart_num'+cart_id).val($scope.counts);
        squaredFoursum(cart_id,$scope);
      }else{
        $ionicPopup.alert({
          title: data.mes, // String (可选)。弹窗的子标题。
          okText: '确认',
        })
      }
    });
  }

})

