package com.shop.market.cordova.plugin;

import android.os.Bundle;

import com.shop.market.base.util.IntentHelper;
import com.shop.market.config.StaticVariable;
import com.shop.market.cordova.CordovaHandler;
import com.shop.market.service.IZjbService;
import com.shop.market.service.impl.ZjbServiceImpl;
import com.shop.market.uipage.activity.WvActivity;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.http.Header;
import org.json.JSONObject;

import java.util.regex.Pattern;

/**
 * Created by sukunyue on 2016/3/14.
 */
public class ZjbPlugin extends CordovaPlugin {

    private IZjbService zjbService = new ZjbServiceImpl();

    /**
     * 注意 构造方法不能为
     * <p/>
     * Plugin_intent(){}
     * <p/>
     * 可以不写或者 定义为如下
     */
    public ZjbPlugin() {}

    @Override
    public boolean execute(String action, org.json.JSONArray args, CallbackContext callbackContext) throws org.json.JSONException {
        if (action.equals(StaticVariable.ACTION_TRANSFER_OTHER)) {
            transferOther(callbackContext, args.getString(0), args.getString(1), args.getString(2));
        } else if (action.equals(StaticVariable.ACTION_TRANSFER_CARD)) {
            transferCard(callbackContext, args.getString(0), args.getString(1), args.getString(2));
        } else if (action.equals(StaticVariable.ACTION_QUERY_CARD)) {
            queryCard(callbackContext);
        } else if (action.equals(StaticVariable.ACTION_GET_ACCOUNT_INFO)) {
            getAccountInfo(callbackContext);
        } else if (action.equals(StaticVariable.ACTION_SEND_VERIFY_CODE)) {
            if (args.getInt(0) == 0) {
                sendVerifyCode(callbackContext, null, args.getInt(1));
            } else {
                sendVerifyCode(callbackContext, args.getString(0), args.getInt(1));
            }
        } else if (action.equals(StaticVariable.ACTION_BIND_CARD)) {
            bindCard(callbackContext, args.getString(0), args.getString(1), args.getString(2), args.getString(3));
        } else if (action.equals(StaticVariable.ACTION_CHANGE_BIND)) {
            changeBind(callbackContext, args.getString(0), args.getString(1), args.getString(2), args.getString(3));
        } else if (action.equals(StaticVariable.ACTION_TRANSFER_IN)) {
            transferIn(callbackContext, args.getString(0), args.getInt(1));
        } else if (action.equals(StaticVariable.ACTION_RESET_PWD)) {
            resetPwd(callbackContext, args.getString(0), args.getString(1), args.getString(2));
        } else if (action.equals(StaticVariable.ACTION_BUDGET)) {
            budget(callbackContext, args.getString(0), args.getInt(1), args.getInt(2));
        } else if (action.equals(StaticVariable.ACTION_BUDGET_DETAIL)) {
            budgetDetail(callbackContext, args.getString(0));
        }
        return true;
    }

    private void transferOther(final CallbackContext callbackContext, final String account, final String amount, final String password) {
        CordovaHandler transferOtherHandler = new CordovaHandler(callbackContext);
        zjbService.transferOther(cordova.getActivity(), account, amount, password, transferOtherHandler);
    }

    private void transferCard(final CallbackContext callbackContext, final String bank, final String amount, String password) {
        CordovaHandler transferCardHandler = new CordovaHandler(callbackContext);
        zjbService.transferCard(cordova.getActivity(), bank, amount, password, transferCardHandler);
    }

    private void queryCard(final CallbackContext callbackContext) {
        CordovaHandler queryCardHandler = new CordovaHandler(callbackContext) {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                try {
                    int code = 1010123;
                    /* 如果返回的json里code是数字字符串则强制转换为int类型 */
                    if (Pattern.compile("[0-9]*").matcher(response.getString("code")).matches()) {
                        code = Integer.valueOf(response.getString("code"));
                    }
                    if (code == 0 || code == 30010) {
                        onDataSuccess(statusCode, headers, response);
                    } else {
                        onDataFailure(statusCode, headers, response, code);
                    }
                } catch (Exception ex) {
                    callbackContext.error("数据转换出错");
                }
            }
        };
        zjbService.queryCard(cordova.getActivity(), queryCardHandler);
    }

    private void getAccountInfo(final CallbackContext callbackContext) {
        CordovaHandler getAccountInfoHandler = new CordovaHandler(callbackContext);
        zjbService.getAccountInfo(cordova.getActivity(), getAccountInfoHandler);
    }

    private void sendVerifyCode(final CallbackContext callbackContext, final String phone, final int msgId) {
        CordovaHandler sendVerifyCodeHandler = new CordovaHandler(callbackContext);
        zjbService.sendVerifyCode(cordova.getActivity(), phone, msgId, sendVerifyCodeHandler);
    }

    private void bindCard(final CallbackContext callbackContext, final String bank, final String phone, final String name, final String verifyCode) {
        CordovaHandler bindCardHandler = new CordovaHandler(callbackContext);
        zjbService.bindCard(cordova.getActivity(), bank, phone, name, verifyCode, bindCardHandler);
    }

    private void changeBind(final CallbackContext callbackContext, final String bank, final String phone, final String verifyCode, final String password) {
        CordovaHandler changeBindHandler = new CordovaHandler(callbackContext);
        zjbService.changeBind(cordova.getActivity(), bank, phone, verifyCode, password, changeBindHandler);
    }

    private void transferIn(final CallbackContext callbackContext, final String amount, final int payWay) {
        CordovaHandler transferInHandler = new CordovaHandler(callbackContext) {
            @Override
            public void onDataSuccess(int statusCode, Header[] headers, JSONObject response) throws Exception {
                Bundle bundle = new Bundle();
                bundle.putString("url", response.getJSONObject("data").get("url").toString());
                IntentHelper.startActivity(cordova.getActivity(), WvActivity.class, bundle);
            }
        };
        CordovaHandler transferInByPosHandler = new CordovaHandler(callbackContext) {
            @Override
            public void onDataSuccess(int statusCode, Header[] headers, JSONObject response) throws Exception {
                callbackContext.success();
            }
        };
        if (payWay == 1) {
            zjbService.transferIn(cordova.getActivity(), amount, payWay, transferInByPosHandler);
        } else {
            zjbService.transferIn(cordova.getActivity(), amount, payWay, transferInHandler);
        }
    }

    private void resetPwd(final CallbackContext callbackContext, final String verifyCode, final String password, final String passwordConfirm) {
        CordovaHandler resetPwdHandler = new CordovaHandler(callbackContext) {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                try {
                    int code = 1010123;
                    /* 如果返回的json里code是数字字符串则强制转换为int类型 */
                    if (Pattern.compile("[0-9]*").matcher(response.getString("code")).matches()) {
                        code = Integer.valueOf(response.getString("code"));
                    }
                    if (code == 0 || code == 30010) {
                        onDataSuccess(statusCode, headers, response);
                    } else {
                        onDataFailure(statusCode, headers, response, code);
                    }
                } catch (Exception ex) {
                    callbackContext.error("数据转换出错");
                }
            }
        };
        zjbService.resetPassword(cordova.getActivity(), verifyCode, password, passwordConfirm, resetPwdHandler);
    }

    private void budget(final CallbackContext callbackContext, final String dealType, final int curPage, final int pageRecord) {
        CordovaHandler budgetHandler = new CordovaHandler(callbackContext);
        if (dealType.equals("null")) {
            zjbService.budget(cordova.getActivity(), null, curPage, pageRecord, budgetHandler);
        } else {
            zjbService.budget(cordova.getActivity(), dealType, curPage, pageRecord, budgetHandler);
        }
    }

    private void budgetDetail(final CallbackContext callbackContext, final String trsSeq) {
        CordovaHandler budgetDetailHanlder = new CordovaHandler(callbackContext);
        zjbService.budgetDetail(cordova.getActivity(), trsSeq, budgetDetailHanlder);
    }
}