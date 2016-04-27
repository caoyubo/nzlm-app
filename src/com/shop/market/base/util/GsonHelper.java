package com.shop.market.base.util;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.shop.market.bean.jsonbean.AccountBean;
import com.shop.market.bean.jsonbean.ConfigBean;

import org.json.JSONException;

/**
 * Created by sukunyue on 2016/1/7.
 */
public class GsonHelper {

    static private Gson gson = new Gson();

    public static Gson getGson() {
        return gson;
    }

    static public ConfigBean toConfigBean(String data) throws JSONException {
        return gson.fromJson(data, new TypeToken<ConfigBean>(){}.getType());
    }

    static public AccountBean toAccountBean(String data) throws JSONException {
        return gson.fromJson(data, new TypeToken<AccountBean>(){}.getType());
    }
}
