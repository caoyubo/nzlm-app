package com.shop.market.service.impl;

import android.content.Context;

import com.loopj.android.http.RequestHandle;
import com.loopj.android.http.RequestParams;
import com.shop.market.base.BaseApplication;
import com.shop.market.base.encryption.MD5;
import com.shop.market.base.httpclient.HttpClientHolder;
import com.shop.market.base.httpclient.MyJsonHttpHandler;
import com.shop.market.service.IZjbService;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

/**
 * Created by sukunyue on 2016/1/19.
 */
public class ZjbServiceImpl implements IZjbService {

    private RequestParams sign(RequestParams params, String key) {
        String timeStamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
        params.add("timeStamp", timeStamp);
        String uuid = UUID.randomUUID().toString();
        params.put("UUID", uuid);
        params.put("sign", MD5.Encrypt_md5(timeStamp + key + uuid));
        return params;
    }

    @Override
    public RequestHandle transferOther(Context context, String account, String amount, String password, MyJsonHttpHandler handler) {
        String url = BaseApplication.getConfigBean().getDomain().getYnPayUrl() + "/transfer/account";
        RequestParams params = new RequestParams();
        params.put("payeeAcctName", account);
        params.put("amount", amount);
        params.put("passwd", password);
        params.put("terminal_flag", "mobile");
        return HttpClientHolder.getInstance().post(context, url, params, handler);
    }

    @Override
    public RequestHandle transferCard(Context context, String bank, String amount, String password, MyJsonHttpHandler handler) {
        String url = BaseApplication.getConfigBean().getDomain().getYnPayUrl() + "/withdraw/pay";
        RequestParams params = new RequestParams();
        params.put("bankNum", bank);
        params.put("amount", amount);
        params.put("passwd", password);
        params.put("terminal_flag", "mobile");
        return HttpClientHolder.getInstance().post(context, url, params, handler);
    }

    @Override
    public RequestHandle bindCard(Context context, String bank, String phone, String name, String verifyCode, MyJsonHttpHandler handler) {
        String url = BaseApplication.getConfigBean().getDomain().getYnPayUrl() + "/account/bank/binding";
        RequestParams params = new RequestParams();
        params.put("bankNum", bank);
        params.put("bankPhone", phone);
        params.put("bankName", name);
        params.put("phoneCode", verifyCode);
        return HttpClientHolder.getInstance().post(context, url, params, handler);
    }

    @Override
    public RequestHandle changeBind(Context context, String bank, String phone, String verifyCode, String password, MyJsonHttpHandler handler) {
        String url = BaseApplication.getConfigBean().getDomain().getYnPayUrl() + "/account/bank/update";
        RequestParams params = new RequestParams();
        params.put("newBankNum", bank);
        params.put("newBankPhone", phone);
        params.put("phoneCode", verifyCode);
        params.put("password", password);
        return HttpClientHolder.getInstance().post(context, url, params, handler);
    }

    @Override
    public RequestHandle transferIn(Context context, String amount, int payWay, MyJsonHttpHandler handler) {
        String channelCode = "", serviceType = "";
        if (payWay == 0) {
            channelCode = "ag";
            serviceType = "charge";
        } else if (payWay == 1) {
            channelCode = "pos";
            serviceType = "charge";
        } else if (payWay == 2) {
            channelCode = "ag";
            serviceType = "charge.orther";
        }
        String url = BaseApplication.getConfigBean().getDomain().getYnPayUrl() + "/charge/account";
        RequestParams params = new RequestParams();
        params.put("amount", amount);
        params.put("pay_type", "2");
        params.put("action", "ebanks");
        params.put("channel_code", channelCode);
        params.put("service_type", serviceType);
        params.put("terminal_flag", "mobile");
        return HttpClientHolder.getInstance().post(context, url, params, handler);
    }

    @Override
    public RequestHandle resetPassword(Context context, String verifyCode, String password, String passwordConfirm, MyJsonHttpHandler handler) {
        String url = BaseApplication.getConfigBean().getDomain().getYnPayUrl() + "/account/reset/pay/passwd";
        RequestParams params = new RequestParams();
        params.put("passwd", password);
        params.put("passwdComfirm", passwordConfirm);
        params.put("phoneCode", verifyCode);
        return HttpClientHolder.getInstance().post(context, url, params, handler);
    }

    @Override
    public RequestHandle budget(Context context, String dealType, int curPage, int pageRecord, MyJsonHttpHandler handler) {
        String url = BaseApplication.getConfigBean().getDomain().getYnPayUrl() + "/mobile/trans/flow";
        RequestParams params = new RequestParams();
        if (dealType != null) {
            params.put("dealType", dealType);
        }
        if (curPage != 0) {
            params.put("curPage", curPage);
        }
        if (pageRecord != 0) {
            params.put("pageRecord", pageRecord);
        }
        return HttpClientHolder.getInstance().post(context, url, params, handler);
    }

    @Override
    public RequestHandle budgetDetail(Context context, String trsSeq, MyJsonHttpHandler handler) {
        String url = BaseApplication.getConfigBean().getDomain().getYnPayUrl() + "/order/pay";
        RequestParams params = new RequestParams();
        params.put("trsSeq", trsSeq);
        return HttpClientHolder.getInstance().post(context, url, params, handler);
    }

    @Override
    public RequestHandle getAccountInfo(Context context, MyJsonHttpHandler handler) {
        String url = BaseApplication.getConfigBean().getDomain().getYnPayUrl() + "/account/bankinfo/query";
        return HttpClientHolder.getInstance().post(context, url, null, handler);
    }

    @Override
    public RequestHandle sendVerifyCode(Context context, String phone, int msgId, MyJsonHttpHandler handler) {
        String url = BaseApplication.getConfigBean().getDomain().getYnPayUrl() + "/message/phonecode";
        RequestParams params = new RequestParams();
        if (phone != null) {
            params.put("bankPhone", phone);
        }
        params.put("phoneMsgID", msgId);
        return HttpClientHolder.getInstance().post(context, url, params, handler);
    }

    @Override
    public RequestHandle queryCard(Context context, MyJsonHttpHandler handler) {
        String url = BaseApplication.getConfigBean().getDomain().getYnPayUrl() + "/account/bank/query";
        return HttpClientHolder.getInstance().post(context, url, null, handler);
    }
}
