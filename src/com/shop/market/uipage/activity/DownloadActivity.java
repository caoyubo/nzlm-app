package com.shop.market.uipage.activity;

import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.ionicframework.starter.R;
import com.shop.market.base.BaseActivity;
import com.shop.market.base.BaseApplication;
import com.shop.market.base.annotations.ContentView;
import com.shop.market.base.annotations.ViewById;
import com.shop.market.base.download.DownloadTask;
import com.shop.market.base.util.IntentHelper;
import com.shop.market.bean.jsonbean.ConfigBean;
import com.shop.market.config.StaticVariable;

import java.io.File;

/**
 * Created by sukunyue on 2016/4/11.
 */
@ContentView(layout = R.layout.activity_download)
public class DownloadActivity extends BaseActivity {

    /** 显示下载进度ProgressBar */
    @ViewById(id = R.id.pbDownload)
    private ProgressBar pbDownload;
    @ViewById(id = R.id.tvDownloadMsg)
    private TextView tvDownloadMsg;

    @Override
    protected void afterInit() {
        ConfigBean.Version version = BaseApplication.getConfigBean().getVersion();
        doDownload(version.getMobileAppVersion().getUrl(), StaticVariable.APP_FILE_NAME);
    }

    /**
     * 下载准备工作，获取SD卡路径、开启线程
     */
    private void doDownload(String downloadUrl, String fileName) {
        // 获取SD卡路径
        String path = Environment.getExternalStorageDirectory() + "/ynappdownload/";
        File file = new File(path);
        // 如果SD卡目录不存在创建
        if (!file.exists()) {
            file.mkdir();
        }
        // 设置progressBar初始化
        pbDownload.setProgress(0);
        pbDownload.setMax(100);

        int threadNum = 5;
        String filepath = path + fileName;
        DownloadTask task = new DownloadTask(downloadUrl, threadNum, filepath, handler);
        task.start();
    }

    /**
     * 使用Handler更新UI界面信息
     */
    final Handler handler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            int progress = msg.getData().getInt("progress");
            pbDownload.setProgress(progress);
            if (progress == 100) {
                IntentHelper.openFile(DownloadActivity.this, msg.getData().getString("filePath"));
            }
            tvDownloadMsg.setText("下载进度:" + progress + "%");
        }
    };

}
