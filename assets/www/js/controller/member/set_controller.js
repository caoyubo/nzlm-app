/**
 * Created by marlowe on 2016/3/25.
 * 设置
 */
var set = angular.module('setCtrl', ['ionic']);
set.controller('setCtrl', function ($scope, $ionicLoading,htttpServer) {
    var setController = $scope.setController={
        logout:function(){
          /*cordova.exec(function (success) { //调用原生
              location.href = '#/user/login';
          }, function (err) {
          }, "AccountPlugin", "logout", []);*/
            htttpServer.commonHttp('AccountPlugin','logout','','',[]).then(function (success) {
                golbal_config.app_reload = true;
                location.href = '#/user/login';
            },function(err){
            })
        },
    }
});
