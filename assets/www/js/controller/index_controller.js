angular.module('indexCtrl', ['ionic'])
  .controller('indexCtrl', function ($scope, $http, $ionicPopup, htttpServer,$ionicLoading,$timeout) {


    /*$scope.$on('$stateChangeSuccess', function (evt, current, previous) {
      if(current.name!='tab.home'){
        return ;
      }
      $scope.imglist = null;
      $scope.sale_list = null;
      init();
    });*/

    init();
    function init(){
      $ionicLoading.show({
        template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
      });
console.log('power by nzlm');

      var url = grobalUrl.ImgHttpUrl + grobalUrl.imgList;
      var httpType = grobalUrl.httpType;




      htttpServer.query(url,httpType).then(function (data) {
        $scope.imglist = data.data.list;
        //console.log($scope.imglist);
        $scope.imgurl = grobalUrl.ImgUrl;
        var code = data.code;
        if (code != 0) {
          $ionicPopup.confirm({
            title: '亲，您还未登录呢,是否马上登录？', // String (可选)。弹窗的子标题。
            cancelText: '取消',
            okText: '确认',
          }).then(function (res) {
            console.log('Your password is', res);
            if (res == true) {
              location.href = '#/user/login'
            }
          });
        }
        var  url = grobalUrl.ImgHttpUrl + grobalUrl.indexList;
        return htttpServer.query(url,httpType);
      }).then(function (data) {
        $timeout(function(){
          $ionicLoading.hide();
        },100)
        $scope.imgurl = grobalUrl.ImgUrl;
        $scope.sale_list = data.data.sale;
        $scope.phone = data.data.call_center.phone;
        var code = data.code;
        if (code != 0) {
          $ionicPopup.confirm({
            title: '亲，您还未登录呢,是否马上登录？', // String (可选)。弹窗的子标题。
            cancelText: '取消',
            okText: '确认',
          }).then(function (res) {
            if (res == true) {
              location.href = '#/user/login'
            }
          });
        }
      });
    }
      $scope.news=function(){
        $ionicPopup.alert({
          title: '功能开发中!', // String (可选)。弹窗的子标题。
          okText: '确认',
        })
      }

      $scope.contact=function(){

      $ionicPopup.confirm({
        title: '是否拨打电话?', // String (可选)。弹窗的子标题。
        cancelText: '取消',
        okText: '确认',
      }).then(function (res) {
          if(res) {
            htttpServer.commonHttp('HttpPlugin','wv_links','','',[data.data.pay_url]).then(function (success) {
            },function(err){
              $ionicPopup.alert({
                title: err,
                okText: '确认',
              })
            })
          }
      })
      }

    $scope.onclick_img=function(type,id,url){
      console.log(type);
      switch (type) {
        case 'miaosha':
          location.href = '#secKill/' + id;
          console.log('11')
          break;
        case  'pindan':
          location.href = '#spell/' +id;
          break;
        default:
            if(url.indexOf('http') == 0){
              htttpServer.commonHttp('HttpPlugin','wv_links','','',[url]).then(function (success) {
              },function(err){
              });
            }else{
              location.href = '#/' + url;
            }
        break;
      }
    }

  })


