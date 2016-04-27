package com.shop.market.service.impl;

import android.content.Context;

import com.ionicframework.starter.BuildConfig;
import com.loopj.android.http.RequestHandle;
import com.loopj.android.http.RequestParams;
import com.shop.market.base.httpclient.HttpClientHolder;
import com.shop.market.base.httpclient.YnShopHandler;
import com.shop.market.config.ApiUrlConfig;
import com.shop.market.service.IConfigService;

/**
 * Created by sukunyue on 2016/1/6.
 */
public class ConfigServiceImpl implements IConfigService {

    @Override
    public RequestHandle getConfig(Context context, YnShopHandler handler) {
        String url;
        if (BuildConfig.Type.equals("NW")) {
            url = ApiUrlConfig.NW_CONFIG_URL;
        } else if (BuildConfig.Type.equals("TY")) {
            url = ApiUrlConfig.TY_CONFIG_URL;
        } else if (BuildConfig.Type.equals("ZS")){
            url = ApiUrlConfig.ZS_CONFIG_URL;
        } else {
            url = ApiUrlConfig.ZS_CONFIG_URL;
        }
        RequestParams params = new RequestParams();
        params.put("act", "version");
        params.put("op", "index");
        return HttpClientHolder.getInstance().get(context, url, params, handler);
    }
}