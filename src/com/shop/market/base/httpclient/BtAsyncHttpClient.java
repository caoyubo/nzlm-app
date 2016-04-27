package com.shop.market.base.httpclient;

import android.util.Log;

import com.loopj.android.http.AsyncHttpClient;

import org.apache.http.HttpResponse;
import org.apache.http.client.params.ClientPNames;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.DefaultRedirectHandler;
import org.apache.http.protocol.HttpContext;

/**
 * Created by sukunyue on 2015/10/15.
 */
public class BtAsyncHttpClient extends AsyncHttpClient {

    private Integer MAX_CONNECTION = 10;

    public BtAsyncHttpClient() {
        super();

        setTimeout(10000);
        setMaxConnections(MAX_CONNECTION);
        getHttpClient().getParams().setParameter(ClientPNames.MAX_REDIRECTS, 3);
        getHttpClient().getParams().setParameter(ClientPNames.ALLOW_CIRCULAR_REDIRECTS, true);  /* 允许重定向回环 */
    }

    @Override
    public void setEnableRedirects(final boolean enableRedirects) {
        ((DefaultHttpClient) getHttpClient()).setRedirectHandler(new DefaultRedirectHandler() {
            @Override
            public boolean isRedirectRequested(HttpResponse response, HttpContext context) {
                int statusCode = response.getStatusLine().getStatusCode();
                Log.i("setEnableRedirects", "code:" + statusCode);
                if (statusCode == 301 || statusCode == 302) {
                    Log.i("setEnableRedirects", "enableRedirects: true");
                    return enableRedirects;
                }
                return false;
            }
        });
    }

}
