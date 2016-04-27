/**
 * Created by marlowe on 2016/3/20.
 * 收支明细
 */
var expenditure = angular.module('expenditureCtrl', [])
expenditure.controller('expenditureCtrl', function ($scope, $http, $ionicPopup, htttpServer, $interval, globalService, $cookieStore) {
  $scope.classData = grobalText.expenditureText;
  $scope.dealType = null;
  $scope.httpType = grobalUrl.httpType;
  var expendditureScope = $scope.expendditureScope = {
    moredata: false,
    currentPage: 1,
    pageNum: 10,
    doRefresh: function () {
      $scope.$broadcast('scroll.refreshComplete');
    },
    loadMore: function () {
      var data = [$scope.dealType, expendditureScope.currentPage, expendditureScope.pageNum];
      hrrpcordova(data);
      expendditureScope.currentPage += 1;
    },
    onclickItem:function(trsSeq,type){
       location.href = '#/expend-detail/' +trsSeq+'/'+type;
    },
    expendiNav: function (index) {
      $scope.bg = [];
      $scope.bg[index] = 'active';
      if (index == 0) {
        $scope.type = index;
        $scope.dealType = null;
        $scope.items = [];
        expendditureScope.currentPage = 1;
        expendditureScope.moredata = false;
        expendditureScope.loadMore();
      } else if (index == 1) {
        $scope.type = index;
        $scope.dealType = '0002';
        $scope.items = [];
        expendditureScope.currentPage = 1;
        expendditureScope.moredata = false;
        expendditureScope.loadMore();
      } else if (index == 2) {
        $scope.type = index;
        $scope.dealType = '0001';
        $scope.items = [];
        expendditureScope.currentPage = 1;
        expendditureScope.moredata = false;
        expendditureScope.loadMore();
      }
    }
  }
  expendditureScope.expendiNav('0');

  function hrrpcordova(data) {
    /*cordova.exec(function (success) { //调用原生
      var items = success.data.content;

      for (var i in items) {
        $scope.items.push(items[i]);
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
      if (items.length != 10) {
        expendditureScope.moredata = true;
      }
    }, function (err) {
      $ionicPopup.alert({
        title: err,
        okText: '确认',
      })
    }, "ZjbPlugin", "budget", data);*/
    htttpServer.commonHttp('ZjbPlugin','budget','','',data).then(function (success) {
      var items = success.data.content;

      for (var i in items) {
        $scope.items.push(items[i]);
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
      if (items.length != 10) {
        expendditureScope.moredata = true;
      }
    },function(err){
      $ionicPopup.alert({
        title: err,
        okText: '确认',
      })
    })

  }

})
