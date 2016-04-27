package com.shop.market.base.httpclient;

import com.loopj.android.http.RequestHandle;

import java.util.List;

/**
 * Created by sukunyue on 2015/10/16.
 */
public interface RequestInterface {

    /**
     *
     */
    List<RequestHandle> makeRequest();

}
