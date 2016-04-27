package com.shop.market.service;

import android.content.Context;

import com.shop.market.base.httpclient.MyJsonHttpHandler;

import org.json.JSONObject;

/**
 * Created by sukunyue on 2016/3/23.
 */
public interface ICommonService {

    void get(Context context, String url, MyJsonHttpHandler handler);

    void post(Context context, String url, JSONObject jsonObject, MyJsonHttpHandler handler);

}
