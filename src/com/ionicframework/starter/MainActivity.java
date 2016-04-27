/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.ionicframework.starter;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.webkit.WebView;

import com.shop.market.base.BaseApplication;
import com.shop.market.base.custom.SkyChooseDialog;
import com.shop.market.base.util.IntentHelper;
import com.shop.market.bean.jsonbean.ConfigBean;
import com.shop.market.config.StaticVariable;
import com.shop.market.uipage.activity.DownloadActivity;

import org.apache.cordova.CordovaActivity;

public class MainActivity extends CordovaActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        loadUrl(launchUrl);
        checkVersion();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        if (resultCode == StaticVariable.RESULT_REDIRECT) {
            WebView webView = (WebView) appView.getView();
            webView.loadUrl("javascript:callH5()");
        }
    }

    /**
     * 检查版本更新
     */
    private void checkVersion() {
        final ConfigBean.Version version = BaseApplication.getConfigBean().getVersion();
        int onlineVersion;
        try {
            onlineVersion = Integer.valueOf(version.getMobileAppVersion().getVersion());
        } catch (Exception e) {
            onlineVersion = 1;
        }
        if (onlineVersion > BuildConfig.VERSION_CODE) {
            SkyChooseDialog.Builder builder = new SkyChooseDialog.Builder(this);
            builder.setPositiveButton("更新", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    IntentHelper.startActivity(MainActivity.this, DownloadActivity.class);
                }
            }).setNegativeButton("取消", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    if (version.getMobileAppVersion().getRequired().equals("1")) {
                        System.exit(0);     // 强制更新点取消则退出应用
                    }
                }
            }).setTitle("版本更新").setMessage(version.getMobileAppVersion().getContent()).initView().show();
        }
    }
}
