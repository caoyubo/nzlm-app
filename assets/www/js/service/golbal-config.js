/**
 * Created by marlowe on 16-02-23
 */
var requestMethod={
  POST:"POST",
  GET:"GET",
  PUT:"PUT",
  DELETE:"DELETE",
  HEAD:"HEAD",
  OPTION:"OPTION"
};

var grobalUrl = {
  httpType:'wx',  //android  // ios
  appId: '20014',
  appSecret: '3uiIKFvjkfkldsax',

   ImgUrl: "http://image.yn.com/",
    ImgHttpUrl: "http://shop.yn.com/",
    payment_code: "yngateway",
    acctweb:"http://acctweb.yn.com/",
 /* ImgUrl: "http://tyimage.nzlm.cn/",
  ImgHttpUrl: "http://tyshop.nzlm.cn/",
  payment_code: "yngateway",
  acctweb:"http://tyacctweb.nzlm.cn/",*/

  code:'',
  //资金宝
  transfer_account:"transfer/account",//转他人

  imgList: "app/index.php?act=activity&op=activity_list", // 首页切换图
  indexList: "app/index.php?act=index&op=index", // 首页推荐
  goodsClass: "app/index.php?act=goods_class&op=index", //分类
  goodslist: "app/index.php?act=goodslist&op=goods_list&page=8", //搜索列表
  goodsIndex: "app/index.php?act=goods_class&op=index", //主分类
  searchKeyword: "app/index.php?act=goodslist&op=goods_list&page=8", //关键字搜索列表
  goodsDetail: "app/index.php?act=goods&op=goods_detail",//商品详情
  goodsDetailSeckill: "app/index.php?act=miaosha&op=miaosha_goods",//秒杀商品详情
  goodsDetailSpell:"app/index.php?act=pindan&op=pindan_goods",//拼单商品详情
  cartAdd: "app/index.php?act=cart&op=add",//添加购物车
  evaluateList: "app/index.php?act=goods&op=evaluate_list", //评价
  cartList: "app/index.php?act=cart&op=index", //购物车
  carUpdate: "app/index.php?act=cart&op=update",//购物车数据更新
  carDeletl: "app/index.php?act=cart&op=delete",// 购物车商品删除
  storeIndex: "app/index.php?act=store&op=index",//店铺主页
  orderCarid: "app/index.php?act=buy&op=buy_step1",  //购买第一步（选择收货地址）
  buyOrder: "app/index.php?act=buy&op=buy_step2",   // 购买第二步（下单）
  payMent: "app/index.php?act=payment&op=index", //支付
  storeSearch: "app/index.php?act=store_goodslist&op=index&page=8",//店铺全部商品
  login: "app/index.php?callback=JSON_CALLBACK&act=login", //用户角色
  waitingPay:"app/index.php?act=order&op=index",//订单列表
  orderDetail:"app/index.php?act=order&op=order_detail", // 订单详情
  receiveOrder:'app/index.php?act=order&op=receive_order',//确认收货
  storeInfo:"app/index.php?act=member&op=am_store",//农资店信息
  secKill:"app/index.php?act=miaosha&op=miaosha_goods_list",//秒杀商品列表
  spell:"app/index.php?act=pindan&op=pindan_goods_list", //拼单商品列表
  capTrue:"app/index.php?act=apply&op=send_captrue", // 获取验证码
  submitApply:"app/index.php?act=apply&op=submit_apply",  //注册
  historyGoods:"app/index.php?act=member&op=member_center_goods",//物品查询  历史查询
  voucher:"app/index.php?act=voucher&op=get_voucher",//获取红包
  voucherTake:"app/index.php?act=voucher&op=take_voucher",//领取红包
  myVoucher:"app/index.php?act=voucher&op=get_my_voucher",//我的红包
  apply_agency : "app/index.php?act=goods&op=agency_apply", //申请代理
  forget_password:"app/index.php?act=account&op=findpw",//忘记密码
  findpw_code:"app/index.php?act=account&op=get_findpw_code",//重设密码-获取验证码

  cancel_order_goods : 'app/index.php?act=order&op=cancel_order_goods',  //取消订单商品
};
var grobalText = {
  screen: ['默认', '销量', '人气', '价格'],
  storeNav: ['店铺首页', '全部商品', '新品上市', '店铺分类'],
  goodsDetailText:['基本信息','商品详情','评价'],
  expenditureText:['全部','收入','支出']
};

var golbal_config = {
  app_reload : false,
};



function  verification(item,$ionicPopup){
 console.log(item)
  for(var i in item){
    if (!item[i].name) {
      console.log('111');
      $ionicPopup.alert({
        title: item[i].mes, // String (可选)。弹窗的子标题。
        okText: '确认',
      });
      return;
    }
  }



}
