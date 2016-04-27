/**
 * Created by marlowe on 2016/3/18.
 */
register.directive('ensureUnique', ['$http', function($http) {
  return {
    require: 'ngModel',
    link: function(scope, ele, attrs, c) {
      scope.$watch(attrs.ngModel, function() {

      });
    }
  }
}]);
