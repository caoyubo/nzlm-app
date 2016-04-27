package com.shop.market.uipage.activity;

import android.os.CountDownTimer;

import com.ionicframework.starter.MainActivity;
import com.ionicframework.starter.R;
import com.loopj.android.http.RequestHandle;
import com.shop.market.base.BaseActivity;
import com.shop.market.base.BaseApplication;
import com.shop.market.base.annotations.ContentView;
import com.shop.market.base.httpclient.HttpClientTransaction;
import com.shop.market.base.httpclient.RequestInterface;
import com.shop.market.base.httpclient.YnShopHandler;
import com.shop.market.base.util.GsonHelper;
import com.shop.market.base.util.IntentHelper;
import com.shop.market.base.util.Session;
import com.shop.market.bean.jsonbean.AccountBean;
import com.shop.market.bean.jsonbean.ConfigBean;
import com.shop.market.service.IConfigService;
import com.shop.market.service.IUserService;
import com.shop.market.service.impl.ConfigServiceImpl;
import com.shop.market.service.impl.UserServiceImpl;

import org.apache.http.Header;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by sukunyue on 2015/12/31.
 */
@ContentView(layout = R.layout.activity_start)
public class StartActivity extends BaseActivity {

    private IUserService userService = new UserServiceImpl();
    private IConfigService configService = new ConfigServiceImpl();

    private HttpClientTransaction getConfigTransaction;
    private HttpClientTransaction loginShopTransaction;

    private final String getConfigTransactionTitle = "获取配置信息，请稍后···";
    private final String loginShopTransactionTitle = "用户身份认证，请稍等···";

    private YnShopHandler getConfigHandler;
    private YnShopHandler loginShopHandler;

    @Override
    protected void initData() {
        getConfigTransaction = new HttpClientTransaction(this);
        getConfigHandler = new YnShopHandler(this, getConfigTransaction) {
            @Override
            public void onDataSuccess(int statusCode, Header[] headers, JSONObject response) throws Exception {
                ConfigBean configBean = GsonHelper.toConfigBean(response.getJSONObject("data").toString());
                BaseApplication.setConfigBean(configBean);

                /* 读取保存的用户信息 */
                AccountBean accountBean = userService.loadAccountInfo(StartActivity.this);
                Session.put(Session.SESSION_USER_INFO, accountBean);
                if (BaseApplication.isLogin()) {
                    loginShopTransaction.start(new RequestInterface() {
                        @Override
                        public List<RequestHandle> makeRequest() {
                            List<RequestHandle> list = new ArrayList<RequestHandle>();
                            list.add(userService.shopLogin(StartActivity.this, loginShopHandler));
                            return list;
                        }
                    }, loginShopTransactionTitle);
                } else {
                    BaseApplication.cookie.clear();
                    IntentHelper.startActivityForResult(StartActivity.this, MainActivity.class);
                    StartActivity.this.finish();
                }
            }
        };

        loginShopTransaction = new HttpClientTransaction(this);
        loginShopHandler = new YnShopHandler(this, loginShopTransaction) {
            @Override
            public void onDataSuccess(int statusCode, Header[] headers, JSONObject response) throws Exception {
                IntentHelper.startActivityForResult(StartActivity.this, MainActivity.class);
                StartActivity.this.finish();
            }
            @Override
            public void onDataFailure(int statusCode, Header[] headers, JSONObject response, int code) throws Exception {
                userService.clearAccountInfo(StartActivity.this);
                BaseApplication.cookie.clear();
                IntentHelper.startActivity(StartActivity.this, MainActivity.class);
                StartActivity.this.finish();
            }
        };
    }

    @Override
    protected void initView() {

    }

    @Override
    protected void afterInit() {
        new CountDownTimer(1000L, 1000L) {
            @Override
            public void onTick(long millisUntilFinished) {
                // ...
            }
            @Override
            public void onFinish() {
                /* 关闭倒计时 */
                this.cancel();
                getConfigUrl();
            }
        }.start();
    }

    /* 读取配置信息 */
    private void getConfigUrl() {
        getConfigTransaction.start(new RequestInterface() {
            @Override
            public List<RequestHandle> makeRequest() {
                List<RequestHandle> list = new ArrayList<RequestHandle>();
                list.add(configService.getConfig(StartActivity.this, getConfigHandler));
                return list;
            }
        }, getConfigTransactionTitle);
    }
}
