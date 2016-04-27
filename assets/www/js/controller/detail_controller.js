/**
 * Created by marlowe on 2016/2/29.
 * 商品详情
 */
var detail = angular.module('detailCtrl', ['akoenig.deckgrid','ionic']);
detail.controller('detailCtrl', function ($scope, $http, $stateParams, $q, htttpServer, $ionicPopup, $sce,$rootScope, $ionicScrollDelegate,$ionicLoading) {
  $ionicLoading.show({
    template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
  });
  $scope.goods_Id = $stateParams.goods_Id;
   $scope.imgurl = grobalUrl.ImgUrl;
   $scope.className = true / false;
   $scope.time = "0天0小时0分0秒";
  $scope.style1 = {width:'62%'}
   var miaosha_id = $stateParams.miaosha_id;
   var pindan_id = $stateParams.pindan_id;
   var httpType = grobalUrl.httpType;
  $scope.$on('$stateChangeSuccess', function (evt, current, previous) {
      if(current.name != 'basic' && current.name!='basic-seckill' && current.name!='basic-spell'){
        return ;
      }
      $scope.goodsDetailText = grobalText.goodsDetailText;
      switch ($stateParams.type) {
        case 'seckill':
          $scope.goodsId = 'seckill/' + miaosha_id + '/' + $stateParams.miaosha_goods_id;
          var url = grobalUrl.ImgHttpUrl + grobalUrl.goodsDetailSeckill + "&miaosha_goods_id=" + miaosha_id;
          $scope.type = 2;
          break;
        case 'spell':
          var url = grobalUrl.ImgHttpUrl + grobalUrl.goodsDetailSpell + "&pindan_goods_id=" + pindan_id;
          $scope.type = 3;
          break;
        default :
          $scope.goodsId = $stateParams.goodsId;
          var url = grobalUrl.ImgHttpUrl + grobalUrl.goodsDetail + "&goods_id=" + $scope.goodsId;
          $scope.type = 1;
          break
      }

      htttpServer.query(url,httpType).then(function (data) {
        //console.log(data.data);
        $ionicLoading.hide();
        $scope.data = data.data;
        $scope.goods_info = data.data.goods_detail;
        $scope.store = data.data.store_info;
        $scope.spec_list = data.data.spec_list;
        var goods_slide = data.data.goods_detail.goods_images;
        $scope.goods_slide = [];
        for (var i in goods_slide) {
          if (goods_slide[i] != '') {
            $scope.goods_slide.push(goods_slide[i]);
            //console.log(goods_slide[i]);
          }
        }
        //console.log($scope.goods_slide);

        if ($scope.goods_info.g_body_mobile != null ) {
          //$scope.detail = '<p style="color:red;font-size=18px;">21654646</p>';
          $scope.detail = $scope.goods_info.g_body_mobile;
          //$scope.detail.description = $sce.trustAsHtml($rootScope.detail.g_body_mobile);
        } else {
          $scope.detail = '暂无信息'
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
        if ($scope.type != 1) {
          startTick(data.data.miaosha_info, data.data.pindan_info);
        }
      });
    })


  var goods = $scope.goods = {
    moredata: false,
    curr_page: 0,
    page_size: 2,
    onlabel:function(id){
      //console.log(id);
      $('.select_item label').each(function() {
        $(this).removeClass('active');
      });
      $('.spec_'+id).addClass('active');
      $scope.goodsId = $('.spec_'+id).children('input[name=spec_goodsId]').val();
      var quantity =$('.spec_'+id).children('input[name=spec_goods_storage]').val();
      $('.spec_storage').html(quantity);
    },
    goodsText: function (index) {
      $scope.bg = [];
      $scope.bg[index] = 'goods_basic_a_cur';
      switch (index) {
        case 0:
          $scope.goodsTextType = index;
          break;
        case 1:
          $scope.goodsTextType = index;
          break;
        case  2:
          $scope.goodsTextType = index;
          var url = grobalUrl.ImgHttpUrl + grobalUrl.evaluateList + "&goods_id=" + $stateParams.goodsId + "&start=" + goods.curr_page + "&end=" + goods.page_size;
          htttpServer.query(url,httpType).then(function (data) {
            $scope.evaluate = data.data.evaluate_list
          });
          break;
      }
    },
    basic: function () {
      location.href = '#goods/basic/' + $stateParams.goodsId;
    },
    doRefresh: function () {
      $scope.$broadcast('scroll.refreshComplete');
    },
    SelectAttributes: function () {
      $scope.class_pro = 'po_ab_com';
      if(!$scope.show_select){
        $scope.show_select = !$scope.show_select;
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollBy(0, 50);
      }

    },
    colse: function () { //关闭
      $scope.class_pro = '';
      $scope.show_select = false;
    },
    buyAct: function () {  //立即购买
      var quantity = $.trim($('.select_number .count').text());
      var item = [];
      if ($scope.type == 1) {
        if ($('.SelectAttributes_info').is(":visible")) {
          var typeshow = false;
          if(!$scope.show_select){
            goods.SelectAttributes();
            return ;
          }
          var spec_storage = $('.spec_storage').text();
          if ($('.select_item label').is('.active')) {
            if(parseInt(quantity)>parseInt(spec_storage)){
              $ionicPopup.alert({
                title: '库存不足！', // String (可选)。弹窗的子标题。
                okText: '确认',
              })
            }else{
              location.href = "#/order/0/" + $scope.goodsId + "/"+parseInt(quantity);
            }
          } else {
            var typeshow = true;
            $ionicPopup.alert({
              title: '请先选择商品属性！', // String (可选)。弹窗的子标题。
              okText: '确认',
            })
          }
        }
      }
      if ($scope.type == 2) {
        if (quantity > $scope.data.miaosha_info.miaosha_limit) {
          $ionicPopup.alert({
            title: '购买数量超过上限！', // String (可选)。弹窗的子标题。
            okText: '确认',
          });
          return ;
        }
        if ($scope.show_select == true) {
          location.href  = "#/order/0/miaosha/" + miaosha_id+"/"+$scope.goods_Id+"/"+quantity;
        } else {
          goods.SelectAttributes();
        }
      }
      if ($scope.type == 3) {
        if ($scope.show_select == true) {
          location.href = "#/order/0/pindan/" + pindan_id+"/"+$scope.goods_Id+"/"+quantity;
        } else {
          goods.SelectAttributes();
        }
      }
    },
    cartAdd: function () {  //加入购物车
      if ($('.SelectAttributes_info').is(":visible")) {
        if(!$scope.show_select){
          goods.SelectAttributes();
          return ;
        }
        if ($('.select_item label').is('.active')) {
          $scope.quantity = $.trim($('.count').text());
          var url = grobalUrl.ImgHttpUrl + grobalUrl.cartAdd + "&goods_id=" + $scope.goodsId + "&quantity=" + $scope.quantity;
          htttpServer.query(url,httpType).then(function (data) {
            //console.log(data);
            if (data.code == 0) {
              $ionicPopup.alert({
                title: '添加成功！', // String (可选)。弹窗的子标题。
                okText: '确认',
              })
              goods.colse();
            } else {
              $ionicPopup.alert({
                title: data.mes, // String (可选)。弹窗的子标题。
                okText: '确认',
              });
              goods.colse();
            }
          });
        }else{
          $ionicPopup.alert({
            title: '请选择规格！', // String (可选)。弹窗的子标题。
            okText: '确认',
          })
        }
      }
    },

    //申请代理
    apply_agency : function(){
      var commonid = $scope.data.agency_info.goods_commonid;
      var url = grobalUrl.ImgHttpUrl + grobalUrl.apply_agency + '&commonid=' + commonid;
      htttpServer.query(url,httpType).then(function (data) {
        $ionicPopup.alert({
          title: '申请成功', // String (可选)。弹窗的子标题。
          okText: '确认',
        }).then(function(res){
          if(res){
            //location.reload();
            $scope.data.agency_info.state = 1;
          }
        });
      });
    },

    add_favorite : function(){
      $ionicPopup.alert({
        title: '功能开发中', // String (可选)。弹窗的子标题。
        okText: '确认',
      })
    }
  }
  goods.goodsText(0);

  function startTick(miaosha_info, pindan_info) {
    var target = {};
    if ($scope.type == 2) {
      miaosha_info.is_start = false;
      target = miaosha_info;
    }
    if ($scope.type == 3) {
      pindan_info.is_start = false;
      target = pindan_info;
    }
    setInterval(function () {
      var now = Date.parse(new Date());
      var time = 0;
      var detail_time = target.detail_time ? Number(target.detail_time) + 8 * 60 * 60 : 0;
      if (!target.is_start) {
        time = Number(target.start_time) + detail_time - now / 1000;
        if (time <= 0) {
          target.is_start = true;
          $scope.state = 2;
        }
      } else {
        time = target.end_time - now / 1000;
      }
      $scope.time = formatTime(time);
      $scope.$digest();
    }, 100);
  }

})




