package com.shop.market.uipage.activity;

import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.ionicframework.starter.R;
import com.shop.market.base.BaseActivity;
import com.shop.market.base.annotations.ContentView;
import com.shop.market.base.annotations.ViewById;
import com.shop.market.base.custom.SkyWebView;
import com.shop.market.base.util.StringHelper;
import com.shop.market.config.StaticVariable;

/**
 * Created by sukunyue on 2016/3/25.
 */
@ContentView(layout = R.layout.layout_webview_topbar)
public class WvActivity extends BaseActivity {

    @ViewById(id = R.id.llWvMain)
    private LinearLayout llWvMain;
    @ViewById(id = R.id.rlWvCover)
    private RelativeLayout rlWvCover;
    @ViewById(id = R.id.llWvMenu)
    private LinearLayout llWvMenu;
    @ViewById(id = R.id.ivBack)
    private ImageView ivBack;
    @ViewById(id = R.id.wvShow)
    private SkyWebView wvShow;
    @ViewById(id = R.id.ivMenu)
    private ImageView ivMenu;
    @ViewById(id = R.id.ivActionRefresh)
    private ImageView ivActionRefresh;

    @Override
    protected void initView() {
        ivBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setResult(StaticVariable.RESULT_REDIRECT);
                finish();
            }
        });
        ivMenu.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                rlWvCover.setVisibility(View.VISIBLE);
                llWvMenu.setVisibility(View.VISIBLE);
            }
        });
        rlWvCover.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                closeCover();
            }
        });
        ivActionRefresh.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                wvShow.reload();
                closeCover();
            }
        });
    }

    @Override
    protected void afterInit() {
        String url = getIntent().getBundleExtra("bundle").getString("url");
        if (StringHelper.isNullOrEmpty(url)) {
            Toast.makeText(this, "没有传入跳转链接", Toast.LENGTH_SHORT).show();
            return;
        }
        wvShow.loadUrl(url);
    }

    private void closeCover() {
        rlWvCover.setVisibility(View.GONE);
        llWvMenu.setVisibility(View.GONE);
    }
}
