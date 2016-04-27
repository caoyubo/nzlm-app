package com.shop.market.base.httpclient;

import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Context;
import android.os.CountDownTimer;
import android.support.annotation.NonNull;
import android.widget.TextView;
import android.widget.Toast;

import com.ionicframework.starter.R;
import com.loopj.android.http.RequestHandle;
import com.shop.market.base.util.NetworkStatus;

import java.util.List;

/**
 * Created by sukunyue on 2015/10/16.
 */
public class HttpClientTransaction {

    private static final String TAG = HttpClientTransaction.class.getSimpleName();

    private static final Integer REQUEST_FLAG_SUCCESS = 0;      // 请求成功的标志
    private static final Integer REQUEST_FLAG_FAILURE = 1;      // 请求失败的标志

    private static final int REQUEST_MIN_TIME = 500;   // 最小的请求时间，单位：ms（在此之前不关闭请求窗口）

    private Context context;

    private RequestInterface requestInterface;

    private String loadingStr;

    /* 是否在事务进行过程中显示对话框 */
    private boolean isShowDialog;

    private Dialog dialog;

    private CountDownTimer countDownTimer;

    /* 倒计时结束的标志 */
    private boolean isTimerCountDown;

    private Integer unFinishReqCount = 0;

    private List<RequestHandle> requestHandleList;

    private TransactionState transactionState;

    public HttpClientTransaction(Context context) {
        this.context = context;
    }

    /**
     * requestInterface 网络请求事务
     */
    public void start(RequestInterface requestInterface) {
        start(requestInterface, null, true);
    }

    /**
     * requestInterface 网络请求事务
     * loadingStr 传入弹出加载对话框显示内容
     */
    public void start(RequestInterface requestInterface, String loadingStr) {
        start(requestInterface, loadingStr, true);
    }

    /**
     * requestInterface 网络请求事务
     * isShowDialog  事务请求过程中是否显示加载对话框
     */
    public void start(RequestInterface requestInterface, boolean isShowDialog) {
        start(requestInterface, null, isShowDialog);
    }


    /**
     * requestInterface 网络请求事务
     * loadingStr 传入弹出加载对话框显示内容
     * isShowDialog  事务请求过程中是否显示加载对话框
     */
    public void start(@NonNull RequestInterface requestInterface, String loadingStr, boolean isShowDialog) {
        // 网络是否可用
        if (!NetworkStatus.isNetworkAvailable(context)) {
            Toast.makeText(context, "请检查您的网络是否已连接后重试", Toast.LENGTH_SHORT).show();
            return;
        }

        this.requestInterface = requestInterface;
        this.loadingStr = loadingStr;
        this.isShowDialog = isShowDialog;

        executeTransaction();
    }

    /**
     * 执行事务
     */
    public void executeTransaction() {
        showLoadingDialog(loadingStr);
        // 将事务请求状态设置为执行中
        transactionState = TransactionState.EXECUTE;

        // 开启倒计时器
        startCountDownTimer();

        requestHandleList = requestInterface.makeRequest();
        // 记下事务中发起的请求个数
        unFinishReqCount = requestHandleList == null ? 0 : requestHandleList.size();
    }

    /**
     * 在倒计时器倒数完最小请求时间前不会关闭对话框（优化用户体验）
     */
    public void startCountDownTimer() {
        // 将倒计时完成标志设为false
        setIsTimerCountDown(false);

        countDownTimer = new CountDownTimer(REQUEST_MIN_TIME, REQUEST_MIN_TIME) {
            @Override
            public void onTick(long millisUntilFinished) {
                // ...
            }
            @Override
            public void onFinish() {
                setIsTimerCountDown(true); // 将倒计时完成标志设为true
                termination();
                if (countDownTimer != null) {
                    this.cancel();
                }
            }
        }.start();
    }

    public void showLoadingDialog(String loadingStr) {
        if (!isShowDialog) {
            return;
        }
        if (dialog == null) {
            dialog = new AlertDialog.Builder(context).setCancelable(false).create();
            dialog.show();
            dialog.getWindow().setContentView(R.layout.dialog_loading);
            // 设置加载的文字
            if (loadingStr != null) {
                TextView tvLoading = (TextView)dialog.findViewById(R.id.tvLoading);
                tvLoading.setText(loadingStr);
            }
        }
        dialog.show();
    }

    public void closeLoadingDialog() {
        if (!isShowDialog) {
            return;
        }
        if (dialog != null) {
            dialog.dismiss();
        }
    }

    /* 事务结束 */
    public void termination() {
        // 倒计时结束标志为true, 且事务的状态不是在进行中
        if (isTimerCountDown && !transactionState.equals(TransactionState.EXECUTE)) {
            closeLoadingDialog();
            if (transactionState.equals(TransactionState.FINISH_SUCCESS)) {
                onTransactionSuccess();
            }
        }
    }

    /**
     *  请求成功回调
     */
    public void onSuccessRequestCallBack() {
        if (transactionState.equals(TransactionState.EXECUTE)) {
            dealUnFinishRequestCount(REQUEST_FLAG_SUCCESS);
            if (unFinishReqCount == 0) {
                setTransactionState(TransactionState.FINISH_SUCCESS);
                termination();
            }
        }
    }

    /**
     *  请求失败回调
     */
    public void onFailureRequestCallBack() {
        dealUnFinishRequestCount(REQUEST_FLAG_FAILURE);
        // 取消请求
        for(RequestHandle requestHandle:requestHandleList) {
            requestHandle.cancel(true);
        }
        setTransactionState(TransactionState.FINISH_FAILURE);
        termination();
    }

    /**
     * 事务成功结束后，执行..
     */
    public void onTransactionSuccess() {}

    /**
     * 同步方法，处理未完成请求数
     *
     * @param flag  0代表请求成功，1代表请求失败
     */
    synchronized public void dealUnFinishRequestCount(int flag) {
        if (flag == REQUEST_FLAG_SUCCESS) {
            unFinishReqCount--;
        } else if (flag == REQUEST_FLAG_FAILURE) {
            unFinishReqCount = 0;
        }
    }

    /*
    *   关闭transaction
    */
    public void destroy() {
        if (dialog != null ) {
            dialog.dismiss();
        }
        if (requestHandleList != null) {
            for (RequestHandle requestHandle:requestHandleList) {
                requestHandle.cancel(true);
            }
        }
    }

    public TransactionState getTransactionState() {
        return transactionState;
    }

    public boolean getIsShowDialog() {
        return isShowDialog;
    }

    /**
     * 同步方法，设置事务当前状态
     *
     * @param transactionState
     */
    synchronized public void setTransactionState(TransactionState transactionState) {
        this.transactionState = transactionState;
    }

    synchronized public void setIsTimerCountDown(boolean isTimerCountDown) {
        this.isTimerCountDown = isTimerCountDown;
    }
}