/**
 * Created by marlowe on 2016/3/16.
 * 秒杀
 */
var secKill = angular.module('secKillCtrl', ['akoenig.deckgrid','ionic']);
secKill.controller('secKillCtrl', function ($scope, $http, $stateParams, $q, htttpServer, $ionicLoading) {
  $ionicLoading.show({
    template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
  });
  $scope.imgurl = grobalUrl.ImgUrl;
  var id = $stateParams.id;
  var url = grobalUrl.ImgHttpUrl + grobalUrl.secKill + "&miaosha_id=" + id;
  var httpType = grobalUrl.httpType;
  htttpServer.query(url,httpType).then(function (data) {
    $ionicLoading.hide();
    $scope.imgurl = grobalUrl.ImgUrl;
    $scope.secKill = data.data;
    var goods_list = data.data.goods_list;
    for(var key in goods_list){
      console.log(key);
      $scope.times = '0天0小时0分0秒';
    }
    startTick(goods_list);
  })
  $scope.onbuttom=function(miaosha_goods_id,goods_id){
    location.href = '#/goods/basic/seckill/'+miaosha_goods_id+'/'+id+"/"+goods_id;
  }
  function startTick(goods_list){
    setInterval(function () {
      for(var key in goods_list){
        var temp = goods_list[key];
        var now  = Date.parse(new Date());
        var time = 0
        if(!temp.is_start){
          time = Number(temp.start_time) + Number(temp.detail_time) + 8*60*60 - now/1000;
          if(time <= 0){
            temp.is_start = true;
          }
        }else{
          time = temp.end_time - now/1000;
        }
        //console.log(formatTime(time));
        $scope.times=formatTime(time);
        $scope.$digest();
      }
    },100);
  }

})
