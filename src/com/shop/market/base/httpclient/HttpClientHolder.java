package com.shop.market.base.httpclient;

import android.content.Context;
import android.util.Log;

import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.RequestHandle;
import com.loopj.android.http.RequestParams;

import org.apache.http.HttpEntity;

/**
 * Created by sukunyue on 2015/10/15.
 */
public class HttpClientHolder {

    private static final String TAG = HttpClientHolder.class.getSimpleName();

    static private volatile HttpClientHolder INSTANCE;

    private AsyncHttpClient asyncHttpClient = new BtAsyncHttpClient();

    public AsyncHttpClient getAsyncHttpClient() {
        return asyncHttpClient;
    }

    /* 私有化构造函数 */
    private HttpClientHolder() {}

    static public HttpClientHolder getInstance() {
        if (INSTANCE == null) {
            synchronized (HttpClientHolder.class) {
                if (INSTANCE == null) {
                    INSTANCE = new HttpClientHolder();
                }
            }
        }
        return INSTANCE;
    }

    /**
     *
     * @param context
     * @param url
     * @param params
     * @param handler
     * @return
     */
    public RequestHandle get(final Context context, final String url, final RequestParams params, final MyJsonHttpHandler handler) {
        Log.i(TAG, "post url: " + url);
        return asyncHttpClient.get(context, url, params, handler);
    }

    /**
     *
     * @param context
     * @param url
     * @param params
     * @param handler
     */
    public RequestHandle post(final Context context, final String url, final RequestParams params, final MyJsonHttpHandler handler) {
        Log.i(TAG, "post url: " + url);
        return asyncHttpClient.post(context, url, params, handler);
    }

    /**
     *
     * @param context
     * @param url
     * @param httpEntity
     * @param contentType
     * @param responseHandler
     * @return
     */
    public RequestHandle post(final Context context, final String url, final HttpEntity httpEntity, final String contentType, final MyJsonHttpHandler responseHandler) {
        Log.i(TAG, "post url: " + url);
        return asyncHttpClient.post(context, url, httpEntity, contentType, responseHandler);
    }

}
