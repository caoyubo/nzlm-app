angular.module('starter', ['ionic', 'indexCtrl', 'loginCtrl', 'registerCtrl', 'categoryCtrl', 'htttpServer', 'akoenig.deckgrid'
  , 'searchCtrl', 'searchKeyCtrl', 'detailCtrl', 'cartCtrl', 'orderCtrl', 'storeCtrl', 'ngCookies', 'paymentCtrl', 'storeSearchCtrl', 'menberCtrl'
  , 'ngCookies', 'ngCordova', 'ngSanitize', 'ionic-native-transitions', 'waitingPayCtrl', 'orderDetailCtrl', 'golbal-service', 'codeCtrl'
  , 'aboutCtrl', 'secKillCtrl', 'spellCtrl','transferCtrl','expenditureCtrl','bindCardCtrl','transferCardCtrl','changeCardCtrl','depositCtrl','resetPasswordCtrl','accountInfoCtrl'
  ,'expendDetailCtrl','setCtrl','ngMessages','redMoneyCtrl','myRedMoneyCtrl','forgetPasswordCtrl','fundsCtrl'])
    .run(function ($ionicPlatform,htttpServer) {
      $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
        var httpType = grobalUrl.httpType;
        htttpServer.commonHttp('AccountPlugin','is_login',httpType).then(function(success){
              if(success=='false'){
                location.href = '#/user/login';
              }else{
                location.href = '#/tab/home';
              }
        })
      });

    })
    .provider('myCSRF', [function () {
      var headerName = 'X-CSRFToken';
      var cookieName = 'csrftoken';
      var allowedMethods = ['GET'];

      this.setHeaderName = function (n) {
        headerName = n;
      }
      this.setCookieName = function (n) {
        cookieName = n;
      }
      this.setAllowedMethods = function (n) {
        allowedMethods = n;
      }
      this.$get = ['$cookies', function ($cookies) {
        return {
          'request': function (config) {
            if (allowedMethods.indexOf(config.method) === -1) {
              // do something on success
              config.headers[headerName] = $cookies[cookieName];
            }
            return config;
          }
        }
      }];
    }])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider, $ionicNativeTransitionsProvider) {
      $httpProvider.interceptors.push('myCSRF');

      //设置cookies认证
      $httpProvider.defaults.withCredentials = true;
      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $ionicConfigProvider.platform.ios.tabs.style('standard');
      $ionicConfigProvider.platform.ios.tabs.position('bottom');
      $ionicConfigProvider.platform.android.tabs.style('standard');
      $ionicConfigProvider.platform.android.tabs.position('standard');

      $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
      $ionicConfigProvider.platform.android.navBar.alignTitle('center');

      $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
      $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

      $ionicConfigProvider.platform.ios.views.transition('ios');
      $ionicConfigProvider.platform.android.views.transition('android');


      // 调用原生页面切换，配置 ionic-native-transitions 属性
      $ionicNativeTransitionsProvider.setDefaultOptions({
        duration: 400, // in milliseconds (ms), default 400,
        slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default4
        iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in,default -1
        androiddelay: -1, // same as above but for Android, default -1
        winphonedelay: -1, // same as above but for Windows Phone, default -1,
        fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS andAndroid)
        fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default0 (iOS and Android)
        triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
        backInOppositeDirection: true // Takes over default back transition and state backtransition to use the opposite direction transition to go back
      });

      // 配置默认页面切换效果
      $ionicNativeTransitionsProvider.setDefaultTransition({
        type: 'slide',
        direction: 'left'
      });
      // 配置默认页面返回切换效果
      $ionicNativeTransitionsProvider.setDefaultBackTransition({
        type: 'slide',
        direction: 'right'
      });
      $stateProvider
          .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html',
            cache:'false'
          })

        //首页
          .state('tab.home', {
            url: '/home',
            views: {
              'tab-dash': {
                templateUrl: 'templates/home.html',
                controller: 'indexCtrl'
              }
            },
            cache:'false'
          })
        //购物车
          .state('tab.cart', {
            url: '/cart',
            views: {
              'tab-cart': {
                templateUrl: 'templates/cart.html',
                controller: 'cartCtrl'
              }
            },
            cache:'false'
          })
        //个人中心
          .state('tab.center', {
            url: '/center',
            views: {
              'tab-account': {
                templateUrl: 'templates/member/center.html',
                controller: 'menberCtrl'
              }
            },
            //cache:'false'
          })
        //搜索页
          .state('tab.search', {
            url: '/search',
            views: {
              'tab-search': {
                templateUrl: 'templates/search.html',
                controller: 'searchCtrl'
              }
            },
            //cache:'false'
          })

        // 分类列表
          .state('category', {
            url: '/category/:cate_id',
            templateUrl: 'templates/category.html',
            controller: 'categoryCtrl'
          })


        //关键字搜索页
          .state('search-list', {
            url: '/search/:keyword',
            templateUrl: 'templates/search_list.html',
            controller: 'searchKeyCtrl',
            cache:'false'
          })

        //秒杀
          .state('secKill', {
            url: "/secKill/:id",
            templateUrl: 'templates/secKill.html',
            controller: 'secKillCtrl',
            cache:'false'
          })
        //拼单
          .state('spell', {
            url: "/spell/:id",
            templateUrl: 'templates/spell.html',
            controller: 'spellCtrl',
            cache:'false'
          })
        //基本信息
          .state('basic', {
            url: '/goods/basic/:goodsId',
            templateUrl: 'templates/basic.html',
            controller: 'detailCtrl',
            cache:'false'
          })
        //秒杀基本信息
          .state('basic-seckill', {
            url: '/goods/basic/:type/:miaosha_id/:miaosha_goods_id/:goods_Id',
            templateUrl: 'templates/basic.html',
            controller: 'detailCtrl',
            cache:'false'
          })
        //拼单基本信息
          .state('basic-spell', {
            url: '/goods/basic/:type/:pindan_id/:goods_Id',
            templateUrl: 'templates/basic.html',
            controller: 'detailCtrl',
            cache:'false'
          })

          .state('user', {
            url: '/user',
            abstract: true,
            templateUrl: 'templates/user.html',
            //cache:'false'
          })
        //登陆
          .state('user.login', {
            url: '/login',
            views: {
              'user-login': {
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
              }
            },
            cache:'false'
          })
        //注册
          .state('user.register', {
            url: '/register',
            views: {
              'user-register': {
                templateUrl: 'templates/register.html',
                controller: 'registerCtrl'
              }
            },
            //cache:'false'
          })
          //忘记密码
          .state('forget-password', {
                url: '/forget-password',
                templateUrl: 'templates/forget-password.html',
                controller: 'forgetPasswordCtrl',
                cache:'false'
          })
        //订单页面  购物车
          .state('order-cart', {
            url: '/order/:if_cart/:cart',
            templateUrl: 'templates/order.html',
            controller: 'orderCtrl',
            cache:'false'
          })
        //订单页面
          .state('order', {
            url: '/order/:if_cart/:cart_id/:num',
            templateUrl: 'templates/order.html',
            controller: 'orderCtrl',
            cache:'false'
          })
        //订单页面  秒杀/拼单
          .state('seckill-order', {
            url: '/order/:if_cart/:type/:type_id/:cart_id/:num',
            templateUrl: 'templates/order.html',
            controller: 'orderCtrl',
            cache:'false'
          })

        //店铺
          .state('store', {
            url: '/store/:cart_id',
            templateUrl: 'templates/store.html',
            controller: 'storeCtrl',
            cache:'false'
          })
        //支付
          .state('payment', {
            url: '/payment/:pay_sn',
            templateUrl: 'templates/payment.html',
            controller: 'paymentCtrl',
            //cache:'false'
          })
        //店铺产品搜索
          .state('store_search', {
            url: '/store/search/:store_id/:stc_id/:title',
            templateUrl: 'templates/storeSearch.html',
            controller: 'storeSearchCtrl',
            cache:'false'
          })

        //订单列表
          .state('order-list', {
            url: '/order-list',
            templateUrl: 'templates/member/order-list.html',
            controller: '',
            cache:'false'
          })
        //订单详情
          .state('order-detail', {
            url: '/order-detail/:orderId',
            templateUrl: 'templates/member/order-detail.html',
            controller: 'orderDetailCtrl',
            cache:'false'
          })
        //个人信息
          .state('personal-info', {
            url: '/personal-info',
            templateUrl: 'templates/member/personal-info.html',
            controller: '',
            //cache:'false'
          })
        //设置
          .state('set', {
            url: '/set',
            templateUrl: 'templates/member/set.html',
            controller: 'setCtrl',
            //cache:'false'
          })
        //资金宝
          .state('funds', {
            url: '/funds',
            templateUrl: 'templates/member/funds.html',
            controller: 'fundsCtrl',
            //cache:'false'
          })
        //转他人
          .state('transfer-others', {
            url: '/transfer-others',
            templateUrl: 'templates/member/transfer-others.html',
            controller: 'transferCtrl',
            //cache:'false'
          })
        //转卡
          .state('transfer-card', {
            url: '/transfer-card',
            templateUrl: 'templates/member/transfer-card.html',
            controller: 'transferCardCtrl',
            cache:'false'
          })
        //绑卡
          .state('bound-card', {
            url: '/bound-card',
            templateUrl: 'templates/member/boundCard.html',
            controller: 'bindCardCtrl',
            cache:'false'
          })
        //改绑
          .state('change-bound-card', {
            url: '/change-bound-card',
            templateUrl: 'templates/member/change-bound-card.html',
            controller: 'changeCardCtrl',
            cache:'false'
          })
        //转入
          .state('deposit', {
            url: '/deposit',
            templateUrl: 'templates/member/deposit.html',
            controller: 'depositCtrl',
            //cache:'false'
          })
        //重置支付宝密码
          .state('reset-password', {
            url: '/reset-password',
            templateUrl: 'templates/member/reset-password.html',
            controller: 'resetPasswordCtrl',
            //cache:'false'
          })
        //账户信息
          .state('account-info', {
            url: '/account-info',
            templateUrl: 'templates/member/account-info.html',
            controller: 'accountInfoCtrl',
            //cache:'false'
          })
        //收支明细
          .state('income-and-expenditure', {
            url: '/income-and-expenditure',
            templateUrl: 'templates/member/income-and-expenditure.html',
            controller: 'expenditureCtrl',
            cache:'false'
          })
        //收支明细详情
          .state('expend-detail', {
            url: '/expend-detail/:expend_id/:type',
            templateUrl: 'templates/member/expend-detail.html',
            controller: 'expendDetailCtrl',
            cache:'false'
          })
        //待收货
          .state('waiting-goods', {
            url: '/waiting-goods/:state_type',
            templateUrl: 'templates/member/waiting-pay.html',
            controller: 'waitingPayCtrl',
            cache:'false'
          })
        //待付款
          .state('waiting-pay', {
            url: '/waiting-pay/:state_type',
            templateUrl: 'templates/member/waiting-pay.html',
            controller: 'waitingPayCtrl',
            cache:'false'
          })
        //已完成
          .state('finish-pay', {
            url: '/finish-pay/:state_type',
            templateUrl: 'templates/member/waiting-pay.html',
            controller: 'waitingPayCtrl',
            cache:'false'
          })
        //扫描二维码
          .state('code', {
            url: '/code',
            templateUrl: 'templates/member/code.html',
            controller: 'codeCtrl',
            cache:'false'
          })
        //我的主页
          .state('user-home', {
            url: '/user-home',
            templateUrl: 'templates/member/user-home.html',
            controller: 'aboutCtrl',
            //cache:'false'
          })
        //版本信息
          .state('version-info', {
            url: '/version-info',
            templateUrl: 'templates/member/version-info.html',
            controller: '',
            //cache:'false'
          })
        //关于我们
          .state('about-us', {
            url: '/about-us',
            templateUrl: 'templates/member/about-us.html',
            controller: '',
            //cache:'false'
          })
        //领红包
          .state('red-money', {
            url: '/red-money',
            templateUrl: 'templates/member/red-money.html',
            controller: 'redMoneyCtrl',
            cache:'false'
          })
        //我的红包
          .state('myRed-money', {
            url: '/myRed-money',
            templateUrl: 'templates/member/myRed-money.html',
            controller: 'myRedMoneyCtrl',
            cache:'false'
          })

    });