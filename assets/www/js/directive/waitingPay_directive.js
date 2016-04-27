/**
 * Created by marlowe on 2016/3/15.
 */
waitingPay.directive('rnPayment', function ($ionicPopup,globalService,$stateParams) {
  return {
    restrict: 'A',
    link: function(scope, element){
      console.log('4');
      var state = $stateParams.state_type;
      console.log(state);
    }
  };
})
