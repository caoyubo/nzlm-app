package com.shop.market.base.util;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import java.io.File;

/**
 * Created by sukunyue on 2016/1/4.
 */
public class IntentHelper {

    static public void startActivity(Context fromActivity, Class toActivity) {
        startActivity(fromActivity, toActivity, null);
    }

    static public void startActivity(Context fromActivity, Class toActivity, Bundle bundle) {
        Intent intent = new Intent();
        intent.setClass(fromActivity, toActivity);
        if (bundle != null) {
            intent.putExtra("bundle", bundle);
        }
        fromActivity.startActivity(intent);
    }

    static public void startActivityForResult(Activity fromActivity, Class toActivity) {
        startActivityForResult(fromActivity, toActivity, null);
    }

    static public void startActivityForResult(Activity fromActivity, Class toActivity, Bundle bundle) {
        Intent intent = new Intent();
        intent.setClass(fromActivity, toActivity);
        if (bundle != null) {
            intent.putExtra("bundle", bundle);
        }
        fromActivity.startActivityForResult(intent, 0);
    }

    /**
     * 打开Apk文件
     */
    static public void openFile(Context context, String filePath) {
        File file = new File(filePath);
        Intent intent = new Intent();
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setAction(Intent.ACTION_VIEW);
        intent.setDataAndType(Uri.fromFile(file), "application/vnd.android.package-archive");
        context.startActivity(intent);
    }
}
