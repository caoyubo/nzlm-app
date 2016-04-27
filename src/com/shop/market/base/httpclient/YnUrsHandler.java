package com.shop.market.base.httpclient;

import android.content.Context;
import android.util.Log;
import android.widget.Toast;

import org.apache.http.Header;
import org.json.JSONObject;

import java.io.PrintWriter;
import java.io.StringWriter;

/**
 * Created by sukunyue on 2015/11/5.
 */
abstract public class YnUrsHandler extends HttpClientTransactionHandler {

    static final private String TAG = YnUrsHandler.class.getSimpleName();

    public YnUrsHandler(Context context, HttpClientTransaction httpClientTransaction) {
        super(context, httpClientTransaction);
    }

    @Override
    public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
        if (!httpClientTransaction.getTransactionState().equals(TransactionState.EXECUTE)) {
            return;
        }

        Log.i(TAG, outSuccess(statusCode, response.toString()));
        try {
            int code = response.getInt("r");
            if (code == 1) {
                httpClientTransaction.onSuccessRequestCallBack();
                onDataSuccess(statusCode, headers, response);
            } else {
                httpClientTransaction.onFailureRequestCallBack();
                Toast.makeText(context, response.getString("errmsg"), Toast.LENGTH_SHORT).show();
                onDataFailure(statusCode, headers, response, code);
            }
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
        }
    }

    public void onDataSuccess(int statusCode, Header[] headers, JSONObject response) throws Exception {

    }

    public void onDataFailure(int statusCode, Header[] headers, JSONObject response, int code) throws Exception {

    }
}
