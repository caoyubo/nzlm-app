/**
 * <p>系统模块服务
 * <p>@author dragon
 * <p>@date 2015年7月7日
 * <p>@version 1.0
 */
angular.module("golbal-service", ["base-service"])
  .provider("globalService", function(){
  this.$get = function($http, $q , baseService) {
    return {
      /**
       * commonGet
       */
      commonGet: function(url,data){
        return baseService.webRequest(url,data,requestMethod.GET);
      },
      /**
       * commonPost
       */
      commonPost: function(url,data){
        return baseService.webRequest(url,data,requestMethod.POST);
      }

    };
  };
});






