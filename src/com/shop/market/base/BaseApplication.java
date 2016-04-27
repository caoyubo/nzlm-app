package com.shop.market.base;

import android.app.Application;
import android.webkit.CookieManager;

import com.loopj.android.http.PersistentCookieStore;
import com.shop.market.base.httpclient.HttpClientHolder;
import com.shop.market.base.util.CrashHandler;
import com.shop.market.base.util.Session;
import com.shop.market.bean.jsonbean.ConfigBean;
import com.shop.market.service.IUserService;
import com.shop.market.service.impl.UserServiceImpl;

import org.apache.http.cookie.Cookie;

import java.util.List;

/**
 * Created by sukunyue on 2016/1/5.
 */
public class BaseApplication extends Application {

    public static PersistentCookieStore cookie;

    private static ConfigBean configBean;

    private IUserService userService = new UserServiceImpl();

    @Override
    public void onCreate() {
        super.onCreate();
        // initCrash();
        initSession();
        initHttpClientCookie();
    }

    private void initCrash() {
        CrashHandler.getInstance().init(getApplicationContext());
    }

    private void initSession() {
        Session.init();
    }

    private void initHttpClientCookie() {
        cookie = new PersistentCookieStore(getApplicationContext());
        HttpClientHolder.getInstance().getAsyncHttpClient().setCookieStore(cookie);
    }

    public static boolean isLogin() {
        return Session.getAccountBean() != null;
    }

    public static ConfigBean getConfigBean() {
        return configBean == null ? new ConfigBean() : configBean;
    }

    public static void setConfigBean(ConfigBean configBean) {
        BaseApplication.configBean = configBean;
    }

    public static void initCookie() {
        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.setAcceptCookie(true);
        cookieManager.removeAllCookie();
        List<Cookie> cookieList = cookie.getCookies();
        for (int i = 0; i < cookieList.size(); i++) {
            Cookie cookie = cookieList.get(i);
            String strCookie = cookie.getName() + "=" + cookie.getValue() + ";"
                    + "domain=" + cookie.getDomain() + ";"
                    + "path=" + cookie.getPath() + ";"
                    + "expiry=" + cookie.getExpiryDate();
            cookieManager.setCookie(cookie.getDomain(), strCookie);
        }
    }
}