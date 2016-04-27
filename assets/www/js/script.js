/**
 * Created by marlowe on 2016/3/7.
 */

function formatTime(time){
  if(time>0) {
    var day = parseInt(time / (24 * 60 * 60));
    var hour = parseInt((time - day * 24 * 60 * 60) / (60 * 60));
    var min = parseInt((time - day * 24 * 60 * 60 - hour * 60 * 60) / 60);
    var sec = time - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;
    return day + "天" + hour + "小时" + min + "分" + sec + "秒";
  }else{
    return "0天0小时0分0秒";
  }
}

function priceFormat(price){
  if(!price || isNaN(price)){
    return 0.00.toFixed(2);
  }
  price = parseFloat(price);
  return price.toFixed(2);
}

function isPhone(phone){
  if(!phone){
    return false;
  }
  return /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(phone);
}

