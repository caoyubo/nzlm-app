package com.shop.market.service.impl;

import android.content.Context;

import com.loopj.android.http.RequestParams;
import com.shop.market.base.httpclient.HttpClientHolder;
import com.shop.market.base.httpclient.MyJsonHttpHandler;
import com.shop.market.service.ICommonService;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

/**
 * Created by sukunyue on 2016/3/23.
 */
public class CommonServiceImpl implements ICommonService {

    @Override
    public void get(Context context, String url, MyJsonHttpHandler handler) {
        HttpClientHolder.getInstance().get(context, url, null, handler);
    }

    @Override
    public void post(Context context, String url, JSONObject jsonObject, MyJsonHttpHandler handler) {
        RequestParams params = new RequestParams();
        Iterator iterator = jsonObject.keys();
        while (iterator.hasNext()) {
            String key = (String) iterator.next();
            try {
                String value = jsonObject.getString(key);
                params.put(key, value);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        HttpClientHolder.getInstance().post(context, url, params,handler);
    }

}
