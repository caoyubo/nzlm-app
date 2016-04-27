package com.shop.market.cordova.plugin;

import android.content.Intent;
import android.net.Uri;

import com.shop.market.base.BaseApplication;
import com.shop.market.base.util.Session;
import com.shop.market.config.StaticVariable;
import com.shop.market.cordova.CordovaHandler;
import com.shop.market.cordova.CordovaUrsHandler;
import com.shop.market.service.IUserService;
import com.shop.market.service.impl.UserServiceImpl;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.http.Header;
import org.json.JSONObject;

/**
 * Created by sukunyue on 2016/3/14.
 */
public class AccountPlugin extends CordovaPlugin {

    private IUserService userService = new UserServiceImpl();

    /**
     * 注意 构造方法不能为
     * <p/>
     * Plugin_intent(){}
     * <p/>
     * 可以不写或者 定义为如下
     */
    public AccountPlugin() {

    }

    @Override
    public boolean execute(String action, org.json.JSONArray args, CallbackContext callbackContext) throws org.json.JSONException {
        if (action.equals(StaticVariable.ACTION_LOGIN)) {
            ursLogin(callbackContext, args.getString(0), args.getString(1), args.getBoolean(2));
        } else if (action.equals(StaticVariable.ACTION_IS_LOGIN)) {
            callbackContext.success(BaseApplication.isLogin() ? "true":"false");
        } else if (action.equals(StaticVariable.ACTION_LOGOUT)) {
            logout(callbackContext);
        } else if (action.equals(StaticVariable.ACTION_CONTACT_US)) {
            cordova.getActivity().startActivity(new Intent(Intent.ACTION_CALL, Uri.parse("tel:" + args.getString(0))));
        }
        return true;
    }

    private void ursLogin(final CallbackContext callbackContext, final String username, final String password, final Boolean cbRememberPsw) {
        CordovaUrsHandler ursLoginHandler = new CordovaUrsHandler(callbackContext) {
            @Override
            public void onDataSuccess(int statusCode, Header[] headers, JSONObject response) throws Exception {
                String account_data = response.getJSONObject("data").toString();
                shopLogin(callbackContext, username, password, cbRememberPsw, account_data);
            }
        };
        userService.ursLogin(cordova.getActivity(), username, password, ursLoginHandler);
    }

    private void shopLogin(final CallbackContext callbackContext, final String username, final String password, final Boolean cbRememberPsw, final String account_data) {
        CordovaHandler shopLoginHandler = new CordovaHandler(callbackContext) {
            @Override
            public void onDataSuccess(int statusCode, Header[] headers, JSONObject response) throws Exception {
                if ("1".equals(response.getJSONObject("data").getJSONObject("user_info").getString("member_role"))) {
                    if (cbRememberPsw) {
                        userService.cacheUsernames(cordova.getActivity(), username);
                        userService.cacheAccountInfo(cordova.getActivity(), account_data);
                    }
                    callbackContext.success(account_data);
                    BaseApplication.initCookie();
                } else {
                    if ("2".equals(response.getJSONObject("data").getJSONObject("user_info").getString("member_role"))) {
                        callbackContext.error("您登录的账号角色是非农资店会员，不是物流司机，请您联系客服。");
                    } else if("3".equals(response.getJSONObject("data").getJSONObject("user_info").getString("member_role"))) {
                        callbackContext.error("您登录的账号角色是物流司机，不是物流司机，请您联系客服。");
                    } else if("4".equals(response.getJSONObject("data").getJSONObject("user_info").getString("member_role"))) {
                        callbackContext.error("您登录的账号角色是商家，不是物流司机，请您联系客服。");
                    }
                }
            }
        };
        userService.shopLogin(cordova.getActivity(), shopLoginHandler);
    }

    private void logout(CallbackContext callbackContext) {
        userService.clearAccountInfo(cordova.getActivity());
        Session.clear();
        BaseApplication.cookie.clear();
        callbackContext.success();
    }
}