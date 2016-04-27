package com.shop.market.cordova.plugin;

import android.os.Bundle;

import com.shop.market.base.util.IntentHelper;
import com.shop.market.config.StaticVariable;
import com.shop.market.cordova.CordovaCommonHandler;
import com.shop.market.service.ICommonService;
import com.shop.market.service.impl.CommonServiceImpl;
import com.shop.market.uipage.activity.WvActivity;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;

/**
 * Created by sukunyue on 2016/3/23.
 */
public class HttpPlugin extends CordovaPlugin {

    private ICommonService commonService = new CommonServiceImpl();

    public HttpPlugin() {}

    @Override
    public boolean execute(String action, org.json.JSONArray args, CallbackContext callbackContext) throws org.json.JSONException {
        if (action.equals(StaticVariable.ACTION_DO_GET)) {
            commonService.get(cordova.getActivity(), args.getString(0), new CordovaCommonHandler(callbackContext));
        } else if (action.equals(StaticVariable.ACTION_DO_POST)) {
            commonService.post(cordova.getActivity(), args.getString(0), args.getJSONObject(1), new CordovaCommonHandler(callbackContext));
        } else if (action.equals(StaticVariable.ACTION_WV_LINKS)) {
            Bundle bundle = new Bundle();
            bundle.putString("url", args.getString(0));
            IntentHelper.startActivityForResult(cordova.getActivity(), WvActivity.class, bundle);
        }
        return true;
    }

}
