package com.shop.market.base.download;

/**
 * Created by sukunyue on 2016/2/3.
 */

import android.os.Handler;
import android.os.Message;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

/**
 * 多线程文件下载
 */
public class DownloadTask extends Thread {
    /* 每一个线程的下载量 */
    private int blockSize;
    /* 下载链接地址 */
    private String downloadUrl;
    /* 开启的线程数 */
    private int threadNum;
    /* 保存文件路径地址 */
    private String filePath;
    /* UI界面信息交互的Handler */
    private Handler handler;

    public DownloadTask(String downloadUrl, int threadNum, String filePath, Handler handler) {
        this.downloadUrl = downloadUrl;
        this.threadNum = threadNum;
        this.filePath = filePath;
        this.handler = handler;
    }

    @Override
    public void run() {
        FileDownloadThread[] threads = new FileDownloadThread[threadNum];
        try {
            URL url = new URL(downloadUrl);
            URLConnection conn = url.openConnection();
            // 读取下载文件总大小
            int fileSize = conn.getContentLength();
            if (fileSize <= 0) {
                System.out.println("读取文件失败");
                return;
            }

            // 计算每条线程下载的数据长度
            blockSize = (fileSize % threadNum) == 0 ? fileSize / threadNum : fileSize / threadNum + 1;

            File file = new File(filePath);
            for (int i = 0; i < threads.length; i++) {
                // 启动线程，分别下载每个线程需要下载的部分
                threads[i] = new FileDownloadThread(url, file, blockSize, (i + 1));
                threads[i].setName("Thread:" + i);
                threads[i].start();
            }

            boolean isfinished = false;
            int downloadedSize = 0;
            while (!isfinished) {
                isfinished = true;
                // 当前所有线程下载总量
                downloadedSize = 0;
                for (int i = 0; i < threads.length; i++) {
                    downloadedSize += threads[i].getDownloadLength();
                    if (!threads[i].isCompleted()) {
                        isfinished = false;
                    }
                }
                // 下载的百分比
                float percent = (float) downloadedSize / (float) fileSize;
                int progress = (int) (percent * 100);
                // 通知handler去更新视图组件
                Message msg = new Message();
                msg.getData().putInt("progress", progress);
                msg.getData().putString("filePath", filePath);
                handler.sendMessage(msg);
                Thread.sleep(100); // 休息100毫秒后再读取下载进度
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
