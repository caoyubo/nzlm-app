package com.shop.market.base.httpclient;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.util.Log;

import org.apache.http.Header;
import org.json.JSONArray;
import org.json.JSONObject;


/**
 * Created by sukunyue on 2015/10/16.
 */
abstract public class HttpClientTransactionHandler extends MyJsonHttpHandler {

    private static final String TAG = HttpClientTransactionHandler.class.getSimpleName();

    protected Context context;

    protected HttpClientTransaction httpClientTransaction;

    private AlertDialog retryDialog;

    public HttpClientTransactionHandler() {}

    public HttpClientTransactionHandler(Context context, HttpClientTransaction httpClientTransaction) {
        this.context = context;
        this.httpClientTransaction = httpClientTransaction;
    }

    @Override
    public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
        if (!httpClientTransaction.getTransactionState().equals(TransactionState.EXECUTE)) {
            return;
        }
        Log.i(TAG, outSuccess(statusCode, response.toString()));
        httpClientTransaction.onSuccessRequestCallBack();
    }

    @Override
    public void onSuccess(int statusCode, Header[] headers, JSONArray response) {
        if (!httpClientTransaction.getTransactionState().equals(TransactionState.EXECUTE)) {
            return;
        }
        Log.i(TAG, outSuccess(statusCode, response.toString()));
        httpClientTransaction.onSuccessRequestCallBack();
    }

    @Override
    public void onFailure(int statusCode, Header[] headers, String responseString, Throwable throwable) {
        if (!httpClientTransaction.getTransactionState().equals(TransactionState.EXECUTE)) {
            return;
        }
        Log.e(TAG, outFailure(statusCode, throwable));
        httpClientTransaction.onFailureRequestCallBack();
        showRetryDialog();
    }

    @Override
    public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse) {
        if (!httpClientTransaction.getTransactionState().equals(TransactionState.EXECUTE)) {
            return;
        }
        Log.e(TAG, outFailure(statusCode, throwable));
        httpClientTransaction.onFailureRequestCallBack();
        showRetryDialog();
    }

    @Override
    public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONArray errorResponse) {
        if (!httpClientTransaction.getTransactionState().equals(TransactionState.EXECUTE)) {
            return;
        }
        Log.e(TAG, outFailure(statusCode, throwable));
        httpClientTransaction.onFailureRequestCallBack();
        showRetryDialog();
    }

    private void showRetryDialog() {
        /* 如果事务的状态为不显示对话框则返回 */
        if (!httpClientTransaction.getIsShowDialog()) {
            return;
        }
        if (retryDialog == null) {
            retryDialog = new AlertDialog.Builder(context).setPositiveButton("重试", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    httpClientTransaction.executeTransaction();
                }
            }).setNegativeButton("取消", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    closeRetryDialog();
                    onCancel();
                }
            }).setMessage("很抱歉请求失败了，点击重试可以重新发起请求。").create();
        }
        retryDialog.show();
    }

    private void closeRetryDialog() {
        if (retryDialog != null) {
            retryDialog.dismiss();
        }
    }

    /**
     * 点击取消调用的方法
     */
    public void onCancel() {}

    protected String outSuccess(Integer code, String response) {
        return "statusCode is " + code + ", response is " + response;
    }

    protected String outFailure(Integer code, Throwable throwable) {
        return "statusCode is " + code + ", throwableMsg is " + throwable.getMessage();
    }
}
