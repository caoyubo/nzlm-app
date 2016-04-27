/**
 * Created by marlowe on 2016/2/23.
 */
angular.module('loginCtrl', ['ionic'])
  .controller('loginCtrl', function ($scope, $http, $ionicPopup, $ionicLoading,htttpServer) {
        if(golbal_config.app_reload == true){
            golbal_config.app_reload = false;
            location.reload();
            return ;
        }

    var remember = false;
    $('.button-assertive').attr("disabled",true);
    $scope.user={
      userName:'',
      password:'',
    }
    $scope.change = function (flag) {
      if(flag) {
        $('input').blur();
        remember = $scope.$$childTail.remember;
      }
      if($scope.user.userName=='' ){
         $('.button-assertive').attr("disabled",true)
      }else if($scope.user.password==''){
         $('.button-assertive').attr("disabled",true)
      }else{
      $('.button-assertive').attr("disabled",false)
      }
    }
    $scope.userFrom = function () {
      var params = [
        $scope.user.userName,
        $scope.user.password,
        remember,
      ]
      $ionicLoading.show({
        template: ' <ion-spinner icon="circles" class="spinner-energized"></ion-spinner>'
      });
      var httpType = grobalUrl.httpType;
      htttpServer.commonHttp('AccountPlugin','login',httpType,'',params).then(function (data) {
          if(httpType=='ios'){
              if(data.r=='1'){
                  $ionicLoading.hide();
                  location.href = '#/tab/home';
              }else{
                  $ionicLoading.hide();
                  $ionicPopup.alert({
                      title: data.errmsg, // String (可选)。弹窗的子标题。
                      okText: '确认',
                  })
              }
          }else{
              $ionicLoading.hide();
              location.href = '#/tab/home';
          }
      },function(err){
            $ionicLoading.hide();
            $ionicPopup.alert({
               title: err, // String (可选)。弹窗的子标题。
               okText: '确认',
             })
      })
    }
  })
