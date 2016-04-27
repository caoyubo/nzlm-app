package com.shop.market.cordova;

import com.shop.market.base.httpclient.MyJsonHttpHandler;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.apache.http.Header;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by sukunyue on 2016/3/15.
 */
public class CordovaCommonHandler extends MyJsonHttpHandler {

    private CallbackContext callbackContext;

    public CordovaCommonHandler(CallbackContext callbackContext) {
        this.callbackContext = callbackContext;
        PluginResult pluginResult = new PluginResult(PluginResult.Status.NO_RESULT);
        pluginResult.setKeepCallback(true);
        this.callbackContext.sendPluginResult(pluginResult);
    }

    @Override
    public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
        callbackContext.success(response);
    }

    @Override
    public void onSuccess(int statusCode, Header[] headers, JSONArray response) {
        callbackContext.success(response);
    }

    @Override
    public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse) {
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("statusCode", statusCode);
            jsonObject.put("errMsg", "请求失败");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        callbackContext.error(jsonObject);
    }

    @Override
    public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONArray errorResponse) {
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("statusCode", statusCode);
            jsonObject.put("errMsg", "请求失败");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        callbackContext.error(jsonObject);
    }

    @Override
    public void onFailure(int statusCode, Header[] headers, String responseString, Throwable throwable) {
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("statusCode", statusCode);
            jsonObject.put("errMsg", "请求失败");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        callbackContext.error(jsonObject);
    }
}
