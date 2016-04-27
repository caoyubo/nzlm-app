package com.shop.market.base;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;

import com.shop.market.base.annotations.ContentView;
import com.shop.market.base.annotations.ViewById;
import com.shop.market.base.util.ActivityHolder;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by sukunyue on 2015/12/31.
 */
@ContentView
public class BaseActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView();
        setViewById();
        startInitialize();
    }

    private void setContentView() {
        Annotation annotation = this.getClass().getAnnotation(ContentView.class);
        if (annotation != null) {
            ContentView cv = (ContentView) annotation;
            if (cv.layout() != 0) {
                setContentView(cv.layout());
            }
        }
    }

    private void setViewById() {
        try {
            /* 整合父类和子类的Field */
            List<Field> p_fields = Arrays.asList(this.getClass().getSuperclass().getDeclaredFields());
            List<Field> c_fields = Arrays.asList(this.getClass().getDeclaredFields());
            List<Field> fields = new ArrayList<Field>();
            fields.addAll(p_fields);
            fields.addAll(c_fields);

            for (Field field:fields) {
                if (field.isAnnotationPresent(ViewById.class)) {
                    field.setAccessible(true);
                    ViewById viewById = field.getAnnotation(ViewById.class);
                    int id = viewById.id();
                    if (id == 0) {
                        String fieldName = field.getName();
                        id = getResources().getIdentifier(fieldName, "id", getPackageName());
                    }
                    Object injectObj = field.getType().cast(findViewById(id));
                    if (injectObj instanceof View) {
                        field.set(this, injectObj);
                    }
                    field.setAccessible(false);
                }
            }
        } catch (Exception e) {
            // ...
        }
    }

    protected void startInitialize() {
        initData();
        initView();
        afterInit();
        initActivityStack();
    }

    private void initActivityStack() {
        ActivityHolder.addActivity(BaseActivity.this);
    }

    protected void initData() {

    }

    protected void initView() {

    }

    protected void afterInit() {

    }
}
