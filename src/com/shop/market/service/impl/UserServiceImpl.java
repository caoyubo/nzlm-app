package com.shop.market.service.impl;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.SystemClock;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.loopj.android.http.RequestHandle;
import com.loopj.android.http.RequestParams;
import com.shop.market.base.BaseApplication;
import com.shop.market.base.encryption.AES;
import com.shop.market.base.encryption.MD5;
import com.shop.market.base.httpclient.HttpClientHolder;
import com.shop.market.base.httpclient.MyJsonHttpHandler;
import com.shop.market.bean.jsonbean.AccountBean;
import com.shop.market.config.StaticVariable;
import com.shop.market.service.IUserService;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by sukunyue on 2016/1/6.
 */
public class UserServiceImpl implements IUserService {

    private String ursAppId = "1";
    private String ursKey1 = "jslcns9483wscdfe";
    private String ursKey2 = "jru#jsl9*lx12lxp";
    private String ursIvKey = "3s_=75jgcq!jrdwp";

    @Override
    public RequestHandle ursLogin(Context context, String username, String password, MyJsonHttpHandler handler) {
        String a = "login";
        String strTime = String.valueOf(SystemClock.currentThreadTimeMillis());
        String strSign = CreateSign(a, strTime);
        String url = BaseApplication.getConfigBean().getDomain().getUrsUrl() + "/app/login";
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.accumulate("sign", strSign);
            jsonObject.accumulate("username", username);
            jsonObject.accumulate("passwd", password);
            jsonObject.accumulate("time", strTime);
            jsonObject.accumulate("ip", "ip");
            jsonObject.accumulate("a", a);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        String data = "";
        try {
             data = AES.encrypt(ursKey1, ursIvKey, jsonObject.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        RequestParams params = new RequestParams();
        params.put("appid", ursAppId);
        params.put("data", data);
        return HttpClientHolder.getInstance().post(context, url, params, handler);
    }

    @Override
    public RequestHandle shopLogin(Context context, MyJsonHttpHandler handler) {
        String url = BaseApplication.getConfigBean().getDomain().getShopUrl() + "/yn/index.php";
        RequestParams params = new RequestParams();
        params.put("act", "login");
        return HttpClientHolder.getInstance().post(context, url, params, handler);
    }

    @Override
    public RequestHandle sendVerifyCodeByRegesiter(Context context, String phone, MyJsonHttpHandler handler) {
        String url = BaseApplication.getConfigBean().getDomain().getShopUrl() + "/app/index.php";
        RequestParams params = new RequestParams();
        params.put("act", "apply");
        params.put("op", "send_captrue");
        params.put("phone", phone);
        return HttpClientHolder.getInstance().get(context, url, params, handler);
    }

    @Override
    public RequestHandle register(Context context, String name, String phone, String verifyCode, MyJsonHttpHandler handler) {
        String url = BaseApplication.getConfigBean().getDomain().getShopUrl() + "/app/index.php";
        RequestParams params = new RequestParams();
        params.put("act", "apply");
        params.put("op", "submit_apply");
        params.put("name", name);
        params.put("phone", phone);
        params.put("captrue", verifyCode);
        return HttpClientHolder.getInstance().post(context, url, params, handler);
    }

    @Override
    public RequestHandle sendVerifyCodeByFindPwd(Context context, String phone, MyJsonHttpHandler handler) {
        String url = BaseApplication.getConfigBean().getDomain().getShopUrl() + "/app/index.php";
        RequestParams params = new RequestParams();
        params.put("act", "account");
        params.put("op", "get_findpw_code");
        params.put("account", phone);
        return HttpClientHolder.getInstance().post(context, url, params, handler);
    }

    @Override
    public RequestHandle findPwd(Context context, String phone, String verifyCode, String password, String confirmPassword, MyJsonHttpHandler handler) {
        String url = BaseApplication.getConfigBean().getDomain().getShopUrl() + "/app/index.php";
        RequestParams params = new RequestParams();
        params.put("act", "account");
        params.put("op", "findpw");
        params.put("account", phone);
        params.put("code", verifyCode);
        params.put("npasswd", password);
        params.put("rnpasswd", confirmPassword);
        return HttpClientHolder.getInstance().post(context, url, params, handler);
    }

    @Override
    public void cacheAccountInfo(Context context, String data) {
        SharedPreferences sharedPreferences = context.getSharedPreferences(StaticVariable.SP_YN_DATA, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(AccountBean.SP_USER_INFO_DATA, data);
        editor.apply();
    }

    @Override
    public AccountBean loadAccountInfo(Context context) {
        SharedPreferences sharedPreferences = context.getSharedPreferences(StaticVariable.SP_YN_DATA, Context.MODE_PRIVATE);
        String data = sharedPreferences.getString(AccountBean.SP_USER_INFO_DATA, "");
        return new Gson().fromJson(data, new TypeToken<AccountBean>() {}.getType());
    }

    @Override
    public void clearAccountInfo(Context context) {
        SharedPreferences sharedPreferences = context.getSharedPreferences(StaticVariable.SP_YN_DATA, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.clear().apply();
    }

    @Override
    public void cacheUsernames(Context context, String username) {
        String usernames = loadUsernames(context);
        if (usernames == null) {
            usernames = username;
        } else {
            if (!usernames.contains(username)) {
                usernames = usernames + "," + username;
            }
        }
        SharedPreferences sharedPreferences = context.getSharedPreferences(StaticVariable.SP_YN_DATA, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(AccountBean.SP_USER_NAME_DATA, usernames);
        editor.apply();
    }

    @Override
    public String loadUsernames(Context context) {
        SharedPreferences sharedPreferences = context.getSharedPreferences(StaticVariable.SP_YN_DATA, Context.MODE_PRIVATE);
        return sharedPreferences.getString(AccountBean.SP_USER_NAME_DATA, null);
    }

    /**
     * urs签名
     */
    private String CreateSign(String a, String time) {
        String sing = ursAppId + "@#" + ursKey2 + "@#" + a + "@#" + time + "@#" + "ip";
        return MD5.Encrypt_md5(sing);
    }
}
