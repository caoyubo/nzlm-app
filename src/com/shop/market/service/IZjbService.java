package com.shop.market.service;

import android.content.Context;

import com.loopj.android.http.RequestHandle;
import com.shop.market.base.httpclient.MyJsonHttpHandler;

/**
 * Created by sukunyue on 2016/1/19.
 */
public interface IZjbService {

    /**
     * 转他人
     */
    RequestHandle transferOther(Context context, String account, String amount, String password, MyJsonHttpHandler handler);

    /**
     * 转卡
     */
    RequestHandle transferCard(Context context, String bank, String amount, String password, MyJsonHttpHandler handler);

    /**
     * 绑卡
     */
    RequestHandle bindCard(Context context, String bank, String phone, String name, String verifyCode, MyJsonHttpHandler handler);

    /**
     * 改绑
     */
    RequestHandle changeBind(Context context, String bank, String phone, String verifyCode, String password, MyJsonHttpHandler handler);

    /**
     * 转入
     */
    RequestHandle transferIn(Context context, String amount, int payWay, MyJsonHttpHandler handler);

    /**
     * 重置支付密码
     */
    RequestHandle resetPassword(Context context, String verifyCode, String password, String passwordConfirm, MyJsonHttpHandler handler);

    /**
     * 收支明细
     */
    RequestHandle budget(Context context, String dealType, int curPage, int pageRecord, MyJsonHttpHandler handler);

    /**
     * 收支详情
     */
    RequestHandle budgetDetail(Context context, String trsSeq, MyJsonHttpHandler handler);

    /**
     * 获取账户信息
     */
    RequestHandle getAccountInfo(Context context, MyJsonHttpHandler handler);

    /**
     * 发送手机验证码  --- msgId 验证码类型：1代表绑卡短信模块，2代表重置密码短信模块
     */
    RequestHandle sendVerifyCode(Context context, String phone, int msgId, MyJsonHttpHandler handler);

    /**
     * 查询绑卡
     */
    RequestHandle queryCard(Context context, MyJsonHttpHandler handler);

}
