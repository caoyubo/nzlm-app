/**
 * <p>自定义基础模块 自定义基础服务
 * <p>@author dragon
 * <p>@date 2015年7月7日
 * <p>@version 1.0
 */
var baseService = angular.module('base-service', []);
baseService.factory("baseService",['$http','$q', function($http,$q) {

	return {
    webRequest: function(url, params, method) {
      var deferred = $q.defer(); //得到一个延迟对象（未来完成或失败的任务）
      var request;

      //对未填写url的进行判断
      if(url == undefined)
      {
        data = {code: -1,num: '',mes: 'url is undefined',data: '',version: '1.0'} ;
        deferred.reject(data);
        return deferred.promise;
      }

      if(requestMethod.POST == method){
        if(params == undefined || ""==params)//当没有请求参数时
        {
          request = $http.post(url);
        }else
        {
          request = $http.post(url,params);
        }
      }

      if(requestMethod.GET == method){
        url = (params == undefined || params == '' || params ==null )? url : url+"?"+params ;//判断请求的参数
        request = $http.get(url);
      }
      request.success(function(data, status, headers, config) {

        //if("0" != data.code || "1111111" == data.code){
        //  deferred.reject(data);
        //  return;
        //}

        deferred.resolve(data);
      }).error(function(data, status, headers, config) {
        deferred.reject(data);
      });

      return deferred.promise;
    },
    //get 请求
    get: function(url,params){
      return this.webRequest(url, params, requestMethod.GET) ;
    },
    //post 请求
    post: function(url,params){
      return this.webRequest(url, params, requestMethod.POST) ;
    }
  }
}]);
