package com.shop.market.service;

import android.content.Context;

import com.loopj.android.http.RequestHandle;
import com.shop.market.base.httpclient.YnShopHandler;

/**
 * Created by sukunyue on 2016/1/6.
 */
public interface IConfigService {

    public RequestHandle getConfig(Context context, YnShopHandler handler);

}
