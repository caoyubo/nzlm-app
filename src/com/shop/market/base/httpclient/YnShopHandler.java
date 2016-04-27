package com.shop.market.base.httpclient;

import android.content.Context;
import android.content.DialogInterface;
import android.util.Log;
import android.widget.Toast;

import com.shop.market.base.custom.SkyToastDialog;

import org.apache.http.Header;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.regex.Pattern;

/**
 * Created by sukunyue on 2015/11/5.
 */
abstract public class YnShopHandler extends HttpClientTransactionHandler {

    static final private String TAG = YnShopHandler.class.getSimpleName();

    private Toast toast;

    public YnShopHandler(Context context, HttpClientTransaction httpClientTransaction) {
        super(context, httpClientTransaction);
    }

    @Override
    public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
        if (!httpClientTransaction.getTransactionState().equals(TransactionState.EXECUTE)) {
            return;
        }

        Log.i(TAG, outSuccess(statusCode, response.toString()));
        try {
            int code = 1010123;
            /* 如果返回的json里code是数字字符串则强制转换为int类型 */
            if (Pattern.compile("[0-9]*").matcher(response.getString("code")).matches()) {
                code = Integer.valueOf(response.getString("code"));
            }
            if (code == 0) {
                httpClientTransaction.onSuccessRequestCallBack();
                onDataSuccess(statusCode, headers, response);
            } else {
                httpClientTransaction.onFailureRequestCallBack();
                tip(code, response);
                onDataFailure(statusCode, headers, response, code);
            }
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
        }
    }

    public void onDataSuccess(int statusCode, Header[] headers, JSONObject response) throws Exception {

    }

    public void onDataFailure(int statusCode, Header[] headers, JSONObject response, int code) throws Exception {

    }

    private void tip(int code, JSONObject response) throws JSONException {
        boolean showToast = true;
        toast = Toast.makeText(context, "", Toast.LENGTH_LONG);
        switch (code) {
            case 1000:
                break;
            case 1001:
                break;
            case 0:
                break;
            case 1002:
                break;
            case 90001: // 支付系统：订单已经支付过，请勿重复支付
                showToast = false;
                break;
            case 110001101:
                toast.setText("很抱歉，您查看的优惠套装已不存在，建议单独购买");
                break;
            case 110001102:
                toast.setText("很抱歉，加入购物车失败");
                break;
            case 110001103:
                toast.setText("很抱歉，农资已下架");
                break;
            case 110001104:
                toast.setText("库存不足");
                break;
            case 110001105:
                toast.setText("很抱歉，您查看的优惠套装已不存在，建议单独购买");
                break;
            case 110001106:
                toast.setText("农资不存在");
                break;
            case 110001201:
                toast.setText("购物车为空");
                break;
            case 110001301:
                toast.setText("删除成功");
                break;
            case 110001401:
                toast.setText("清除购物车成功");
                break;
            case 110001402:
                toast.setText("清除购物车失败");
                break;
            case 110005101:
                toast.setText("请先登陆");
                break;
            case 110005102:
                toast.setText("对不起，您的权限不足");
                break;
            case 110002301:
                toast.setText("未找到需要支付的订单");
                break;
            case 110002302:
                toast.setText("不需要支付");
                break;
            case 110002303:
                toast.setText("暂未找到合适的支付方式");
                break;
            case 110002501:
                toast.setText("地区信息不非法");
                break;
            case 110002304:
                toast.setText("订单不存在");
                break;
            case 110006102:
                toast.setText("返回的交易号不存");
                break;
            case 110006103:
                toast.setText("您好，该单已完成支付");
                break;
            case 110006104:
                toast.setText("订单处理成功");
                break;
            case 900000301:
                toast.setText("确认密码错误");
                break;
            case 900000302:
                toast.setText("用户名已经存在");
                break;
            case 900000303:
                toast.setText("注册失败");
                break;
            case 900000304:
                toast.setText("您好，请输入正确的推荐码");
                break;
            case 900000305:
                toast.setText("密码错误");
                break;
            case 120000101: // 登录凭证过期 您不是农资店会员，没有农资店信息
                showToast = false;
                SkyToastDialog.Builder builder = new SkyToastDialog.Builder(context);
                builder.setCancelable(false).setPositiveButton("确定", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                    }
                }).setMessage("您的身份验证信息已经过期，为了保证您的账户安全，请重新登录!").initView().show();
                break;
            case 120000102:
                toast.setText("您好，账户信息已停用");
                break;
            case 120000103:
                toast.setText("您好，账号审核中，请耐心等待");
                break;
            case 120000104:
                toast.setText("登录失败");
                break;
            case 120001101:
                toast.setText("您不是农资店会员，没有农资店信息");
                break;
            case 120001102:
                toast.setText("非法请求");
                break;
            case 120001103:
                toast.setText("修改失败");
                break;
            case 120001201:
                toast.setText("银行账号信息有误");
                break;
            case 110006101:
                toast.setText("订单不存在");
                break;
            case 110006120:
                toast.setText("支付方式不存在");
                break;
            case 110006121:
                toast.setText("此订单已经提交了支付请求，请先支付完");
                break;
            case 110004201:
                toast.setText("订单不存在或已经评论过");
                break;
            case 110004202:
                toast.setText("订单信息错误");
                break;
            case 110004203:
                toast.setText("会员信息错误");
                break;
            case 110004204:
                toast.setText("店铺信息错误");
                break;
            case 110004101:
                toast.setText("店铺信息错误");
                break;
            default:    // 其他状态码，默认使用后端返回来的提示信息
                toast.setText(response.getString("mes"));
                break;
        }
        if (showToast) {
            toast.show();
        }
    }
}
