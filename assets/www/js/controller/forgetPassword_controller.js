/**
 * Created by marlowe on 2016/3/8.
 * 忘记密码
 */
var forget = angular.module('forgetPasswordCtrl', ['ionic']);
forget.controller('forgetPasswordCtrl', function ($scope, $http, $stateParams, $q, htttpServer, $ionicPopup,$ionicLoading,$interval) {
     $scope.registerText = '获取验证码';
      $scope.type = 0;
      $scope.classType = 'button-calm';  //button-outline
      var httpType = grobalUrl.httpType;
      $scope.forgetFrom = {
          account: '',
          code: '',
          npasswd: '',
          rnpasswd: '',
        }
      var forgetPassword = $scope.forgetPassword = {
          verifyCode: function () {
            if ($scope.type == 0) {
              var url = grobalUrl.ImgHttpUrl + grobalUrl.findpw_code + "&account=" +$scope.forgetFrom.account;
              console.log(url);
              htttpServer.query(url,httpType).then(function (data) {
                console.log(data);
                if (data.code == 0) {
                  verifyCode_yz();
                }else{
                  $ionicPopup.alert({
                    title: '提示框',
                    template: data.mes
                  })
                }
              })
            }
          },
          registerClick: function () {
            var url = grobalUrl.ImgHttpUrl + grobalUrl.forget_password;
            console.log($scope.forgetFrom);
            htttpServer.querypost(url,httpType, $scope.forgetFrom).then(function (data) {
              console.log(data);
              if (data.code == 0) {
                $ionicPopup.alert({
                  title: '提示框',
                  template: '重置密码成功！'
                }).then(function(){
                  location.href='#/user/login';
                })
              }else{
                    $ionicPopup.alert({
                       title: data.mes || '更改失败！', // String (可选)。弹窗的子标题。
                       okText: '确认',
                     })
              }
            })
          },
          keyUp:function(){
                var passwd=$scope.forgetFrom.npasswd;
                var rpasswd = $scope.forgetFrom.rnpasswd;
                //alert(rpasswd.length)
                if(passwd.length!=rpasswd.length){
                    $('.error').text('重复输入密码与密码长度不一致!');
                    $('.button-assertive').attr("disabled",true)
                }else if(passwd!=rpasswd){
                    $('.error').text('重复输入密码与密码不一致!');
                     $('.button-assertive').attr("disabled",true)
                }else{
                $('.error').text('');
                 $('.button-assertive').attr("disabled",false)
                }
          }
        }

        function verifyCode_yz() {
            $scope.type = 1;
            $scope.time = 60;
            $scope.classType = 'button-outline';
            var timer = $interval(function (count) {
              $scope.time -= 1;
              $scope.registerText = '秒后重发验证码';
              if (count == 59) {
                $scope.type = 0;
                $scope.time = '';
                $scope.registerText = '获取验证码';
                $scope.classType = 'button-calm';
              }
            }, 1000, 60);
        }

})