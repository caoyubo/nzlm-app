package com.shop.market.base.util;

/**
 * Created by sukunyue on 2016/1/18.
 */
public class StringHelper {

    /**
     * 判断字符串是否为null或空字符串
     */
    public static boolean isNullOrEmpty(String str) {
        return str == null || "".equals(str.trim());
    }

}
