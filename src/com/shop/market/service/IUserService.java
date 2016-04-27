package com.shop.market.service;

import android.content.Context;

import com.loopj.android.http.RequestHandle;
import com.shop.market.base.httpclient.MyJsonHttpHandler;
import com.shop.market.bean.jsonbean.AccountBean;

/**
 * Created by sukunyue on 2016/1/6.
 */
public interface IUserService {

    RequestHandle ursLogin(Context context, String username, String password, MyJsonHttpHandler handler);

    RequestHandle shopLogin(Context context, MyJsonHttpHandler handler);

    RequestHandle sendVerifyCodeByRegesiter(Context context, String phone, MyJsonHttpHandler handler);

    RequestHandle register(Context context, String name, String phone, String verifyCode, MyJsonHttpHandler handler);

    RequestHandle sendVerifyCodeByFindPwd(Context context, String phone, MyJsonHttpHandler handler);

    RequestHandle findPwd(Context context, String verifyCode, String phone, String password, String confirmPassword, MyJsonHttpHandler handler);

    void cacheAccountInfo(Context context, String data);

    AccountBean loadAccountInfo(Context context);

    void clearAccountInfo(Context context);

    void cacheUsernames(Context context, String username);

    String loadUsernames(Context context);

}
