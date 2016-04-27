package com.shop.market.base.util;

import com.shop.market.bean.jsonbean.AccountBean;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by sukunyue on 2016/1/7.
 */
public class Session {

    public static final String SESSION_USER_INFO = "session_user_info";

    private static Map<String, Object> cacheMap;

    public static void init() {
        cacheMap = new HashMap<String, Object>();
    }

    public static Object get(String key) {
        return cacheMap.get(key);
    }

    public static void put(String key, Object value) {
        cacheMap.put(key, value);
    }

    public static void clear() {
        cacheMap.clear();
    }

    public static AccountBean getAccountBean() {
        Object obj = cacheMap.get(SESSION_USER_INFO);
        if (obj instanceof AccountBean) {
            return (AccountBean) obj;
        }
        return null;
    }
}
