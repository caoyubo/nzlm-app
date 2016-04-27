/**
 * Created by marlowe on 2016/2/24.
 */
var htttpServer = angular.module('htttpServer', ['ionic']);
htttpServer.factory('htttpServer', ['$http', '$q','$ionicLoading','$ionicPopup','$state','$timeout', function ($http, $q,$ionicLoading,$ionicPopup,$state,$timeout ,url ) {

  /**
  * 请求出错的处理函数
  * @param data 返回的错误数据或信息
  */
  var show_message = false;
  function errorDefaultCallback(data){
    $ionicLoading.hide();
    if(show_message){
      return ;
    }
    show_message = true;
    $ionicPopup.confirm({
      title: '获取数据失败!', // String (可选)。弹窗的子标题。
      cancelText: '取消',
      okText: '重试',
    }).then(function (res) {
        show_message = false;
        if(res){
          return $timeout(function () {
            $state.go('.', {}, { reload: true });
          }, 100);
        }
    });
  }

  /**
  * 返回方法
  */
  return {
    query: function (url, httpType) {
      var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
      var req = {
        method: 'jsonp',
        url: url+"&callback=JSON_CALLBACK",
      }
      switch (httpType) {
        case  'wx':
          $http(req)
            .success(function (data, status, headers, config) {
              deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了
            }).
            error(function (data, status, headers, config) {
              //deferred.reject(data);   // 声明执行失败，即服务器返回错误
              errorDefaultCallback(data);
            });
          return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API
          break;
        case  'android':
          cordova.exec(function (data) { //调用原生
              deferred.resolve(data);
          }, function (err) {
            //deferred.reject(data);
            errorDefaultCallback(err);
          }, "HttpPlugin", "do_get", [url]);
          return deferred.promise;
          break;
        case  'ios' :
          cordova.exec(function (data) { //调用原生
            deferred.resolve(data);
          }, function (err) {
            //deferred.reject(data);
            errorDefaultCallback(err);
          }, "HttpPlugin", "do_get", [url]);
          return deferred.promise;
          break;
      }
    }, // end query
    querypost: function (url, httpType, data) {
      var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
      switch (httpType) {
        case  'wx':
          $.post(url, data)
            .success(function (data, status, headers, config) {
              deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了
            }).
            error(function (data, status, headers, config) {
              //deferred.reject(data);   // 声明执行失败，即服务器返回错误
              errorDefaultCallback(data);
            });
          return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API
          break;
        case  'android':
          cordova.exec(function (data) { //调用原生
            deferred.resolve(data);
          }, function (err) {
            //deferred.reject(data);
            errorDefaultCallback(err);
          }, "HttpPlugin", "do_post", [url,data]);
          return deferred.promise;
          break;
        case  'ios' :
          cordova.exec(function (data) { //调用原生
            deferred.resolve(JSON.parse(data));
          }, function (err) {
            //deferred.reject(data);
            errorDefaultCallback(err);
          }, "HttpPlugin", "do_post", [url,data]);
          return deferred.promise;
          break;
      }
    },// end query
    queryPostFrom: function (url, httpType, data) {
      var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
      switch (httpType) {
        case  'wx':
          $.post(url, data)
            .success(function (data, status, headers, config) {
              deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了
            }).
            error(function (data, status, headers, config) {
              //deferred.reject(data);   // 声明执行失败，即服务器返回错误
              errorDefaultCallback(err);
            });
          return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API
          break;
        case  'android':
          cordova.exec(function (data) { //调用原生
            deferred.resolve(data);
          }, function (err) {
            //deferred.reject(data);
            errorDefaultCallback(err);
          }, "ZjbPlugin", "POST", data);
          break;
        case  'ios' :
          cordova.exec(function (data) { //调用原生
            deferred.resolve(data);
          }, function (err) {
            //deferred.reject(data);
            errorDefaultCallback(err);
          }, "HttpPlugin", "do_post", [url,data]);
          return deferred.promise;
          break;
      }
    },// end query
    commonHttp:function(pluginName,action,httpType,url,data){
        if(url==''){
          var params = data;
        }else if(data==''){
          var params=[url];
        }else if(url!='' || data!=''){
          var params =[url,data];
        }else{
          var params=[];
        }
        httpType = httpType || grobalUrl.httpType;
        var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
        cordova.exec(function (success) { //调用原生
          if(httpType=='ios'){
             deferred.resolve(JSON.parse(success));
          }else{
           deferred.resolve(success);
          }
        }, function (err) {
          if(httpType=='ios'){
            err = JSON.parse(err);
          }

          if(err!='请求失败'){
            $ionicLoading.hide();
            deferred.reject(err);
          }else{
           errorDefaultCallback(err);
          }
        }, pluginName, action, params);
        return deferred.promise;
    }
  };
}])



