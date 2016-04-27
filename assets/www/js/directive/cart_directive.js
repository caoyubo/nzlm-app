/**
 * Created by marlowe on 2016/3/8.
 */
cart.directive('rnCheck', function () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      scope.checkbox = function () {
        if ($("#SelectAll").is(':checked')) {
          $(".store :checkbox").prop("checked", true);
          totalCart();
        } else {
          $(".store :checkbox").attr("checked", false);
          totalCart();
        }
      }
    }
  }
})

cart.directive('rnChecklist', function () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      scope.checkboxList = function () {
          totalCart();
      }
    }
  }
})

cart.directive('rnStore', function ($ionicPopup) {
  return {
    restrict: 'A',
    link: function (scope, $element) {
      scope.storeCheckbox = function (store_id) {
        if ($("#squaredFour" + store_id).is(':checked')) {
          $("input[name=check" + store_id + "]").prop("checked", true);
          totalCart();
        } else {
          $("input[name=check" + store_id + "]").attr("checked", false);
          totalCart();
        }
      }
    }
  }
})
cart.directive('rnCount', function ($ionicPopup, htttpServer, $http) {
  return {
    restrict: 'A',
    link: function ($scope, increment, iAttrs, ngModel) {
      $scope.count = 0;
      $scope.sum =0;
      $scope.increment = function (cart_id) {
        $scope.counts = $('.cart' + cart_id).text();
        $scope.counts++;
        cart_num(cart_id, $scope.counts, htttpServer, $scope,$ionicPopup);
        squaredFoursum(cart_id,$scope);
      }
      $scope.decrement = function (cart_id) {
        $scope.counts = $('.cart' + cart_id).text();
        if ($scope.counts > 1) {
          $scope.counts--;
          $('.cart' + cart_id).text($scope.counts);
          $('.cart_num'+cart_id).val($scope.counts);
          cart_num(cart_id, $scope.counts, htttpServer, $scope,$ionicPopup);
          squaredFoursum(cart_id,$scope);
        } else {
          $ionicPopup.alert({
            title: '商品数量必须大于0！', // String (可选)。弹窗的子标题。
            okText: '确认',
          })
        }
      }
    }
  };
})

function cart_num(cart_id, quantity, htttpServer, $scope,$ionicPopup) {
  var url = grobalUrl.ImgHttpUrl + grobalUrl.carUpdate + "&cart_id=" + cart_id + "&quantity=" + quantity;
  htttpServer.query(url,grobalUrl.httpType).then(function (data) {
    if (data.code == 0) {
      $('.cart' + cart_id).text($scope.counts);
      $('.cart_num'+cart_id).val($scope.counts);
    }else{
      $ionicPopup.alert({
        title: data.mes, // String (可选)。弹窗的子标题。
        okText: '确认',
      })
    }
  });
}

function totalCart() {
  var item = [];
  $("input[type=checkbox]:checkbox:checked").each(function (i) {
    item.push(parseFloat($(this).val()));
  })
  var sum = 0;
  $.each(item, function (i) {
    sum += item[i];
  });
  //console.log(sum);
  sum = isNaN(sum) ? 0.00 : sum;
  $('.store_js  span').text(sum.toFixed(2));
}

function squaredFoursum(cart_id,$scope){
  var  proice = $('.store_proice'+cart_id+" span").text();
  var  num = $('.cart'+cart_id).text();
  var  nums = parseInt(num) + 1;
  var tal = $('#squaredFour'+cart_id).val(proice*nums);
  totalCart($scope);
}


