/**
 * Created by marlowe on 2016/2/23.
 * 注册
 */
var register = angular.module('registerCtrl', [])
register.controller('registerCtrl', function ($scope, $http, $ionicPopup, $rootScope, $interval, globalService, htttpServer) {
  $scope.registerText = '获取验证码';
  $scope.type = 0;
  $scope.send_code = false;
  $('.button-assertive').attr("disabled",true);
  $scope.classType = 'button-calm';  //button-outline
  var httpType = grobalUrl.httpType;
  var register = $scope.register = {
    verifyCode: function () {
      var result = verification();
      if(!result){
        return ;
      }
      if ($scope.type == 0) {
        var url = grobalUrl.ImgHttpUrl + grobalUrl.capTrue + "&phone=" + $scope.$$childTail.phone;
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
      var flag = verification();
      if(!flag){
        return ;
      }
      var url = grobalUrl.ImgHttpUrl + grobalUrl.submitApply;
      var data = {
        'name': $scope.$$childTail.username,
        'phone': $scope.$$childTail.phone,
        'captrue': $scope.$$childTail.code,
        'password' : $scope.$$childTail.password,
      }
        htttpServer.querypost(url,httpType, data).then(function (data) {
          registers(data);
        })
      function registers(data){
        //console.log(data);
        if (data.code == 0) {
          $ionicPopup.alert({
            title: '提示框',
            template: '已经申请成功,请等待审核通过。'
          }).then(function(){
            location.href='#/user/login';
          })
        }else{
          $ionicPopup.alert({
            title: '提示框',
            template: data.mes || '失败'
          })
        }
      }
    },

    change : function(){
      if(!$scope.send_code || !$scope.$$childTail.username || !$scope.$$childTail.phone || !$scope.$$childTail.password || !$scope.$$childTail.repassword || !$scope.$$childTail.code){
        $('.button-assertive').attr("disabled",true);
      }else{
        $('.button-assertive').attr("disabled",false);
      }
    }
  }

  function verifyCode_yz() {
      $scope.type = 1;
      $scope.time = 60;
      $scope.classType = 'button-outline';
    $scope.send_code = true;
    register.change();
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


  function verification() {
    if (!$scope.$$childTail.username) {
      $ionicPopup.alert({
        title: '提示框',
        template: '用户名不能为空！'
      })
      return false;
    }
    if (!$scope.$$childTail.phone) {
      $ionicPopup.alert({
        title: '提示框',
        template: '手机号不能为空！'
      })
      return false;
    }
    if (!$scope.$$childTail.password) {
      $ionicPopup.alert({
        title: '提示框',
        template: '密码不能为空！'
      })
      return false;
    }
    if ($scope.$$childTail.password != $scope.$$childTail.repassword ) {
      $ionicPopup.alert({
        title: '提示框',
        template: '两次密码不一致！'
      })
      return false;
    }
    var myreg = /^1[3|4|5|7|8]\d{9}$/;
    if (!myreg.test($scope.$$childTail.phone)) {
      $ionicPopup.alert({
        title: '提示框',
        template: '请先输入有效的手机号！'
      });
      return false;
    }
    return true;
  }

})
