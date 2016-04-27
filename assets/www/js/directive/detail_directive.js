/**
 * Created by marlowe on 2016/3/7.
 */
detail.directive('rnStepper', function ($ionicPopup) {
  return {
    restrict: 'AE',
    require: '?ngModel',
    template: ' <span ng-click="decrement()" class="select_number_sub">-</span>' +
    '<span class="count"    > {{count}}</span>' +
    ' <span ng-click="increment()" class="select_number_add">+</span>',
    link: function ($scope, increment, iAttrs,ngModel) {
      $scope.count =1;
      $scope.increment = function () {
        $scope.count++;
      }
      $scope.decrement = function () {
        if ($scope.count > 0) {
          $scope.count--;
        } else {
          $ionicPopup.alert({
            title: '商品数量不能为负数！', // String (可选)。弹窗的子标题。
            okText: '确认',
          })
        }
      }
    }
  };
})
