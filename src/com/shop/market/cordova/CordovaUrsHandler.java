package com.shop.market.cordova;

import com.shop.market.base.httpclient.MyJsonHttpHandler;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.apache.http.Header;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.regex.Pattern;

/**
 * Created by sukunyue on 2016/3/15.
 */
public class CordovaUrsHandler extends MyJsonHttpHandler {

    private CallbackContext callbackContext;

    public CordovaUrsHandler(CallbackContext callbackContext) {
        this.callbackContext = callbackContext;
        PluginResult pluginResult = new PluginResult(PluginResult.Status.NO_RESULT);
        pluginResult.setKeepCallback(true);
        this.callbackContext.sendPluginResult(pluginResult);
    }

    @Override
    public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
        try {
            int code = 1010123;
            /* 如果返回的json里code是数字字符串则强制转换为int类型 */
            if (Pattern.compile("[0-9]*").matcher(response.getString("r")).matches()) {
                code = Integer.valueOf(response.getString("r"));
            }
            if (code == 1) {
                onDataSuccess(statusCode, headers, response);
            } else {
                onDataFailure(statusCode, headers, response, code);
            }
        } catch (Exception ex) {
            callbackContext.error("数据转换出错");
        }
    }

    public void onDataSuccess(int statusCode, Header[] headers, JSONObject response) throws Exception {
        callbackContext.success(response);
    }

    public void onDataFailure(int statusCode, Header[] headers, JSONObject response, int code) throws Exception {
        callbackContext.error("账号密码有误，请重新填写");
    }

    @Override
    public void onSuccess(int statusCode, Header[] headers, JSONArray response) {
        callbackContext.error("请求失败");
    }

    @Override
    public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse) {
        callbackContext.error("请求失败");
    }

    @Override
    public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONArray errorResponse) {
        callbackContext.error("请求失败");
    }

    @Override
    public void onFailure(int statusCode, Header[] headers, String responseString, Throwable throwable) {
        callbackContext.error("请求失败");
    }
}
