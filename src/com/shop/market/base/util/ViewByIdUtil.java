package com.shop.market.base.util;

import android.content.Context;
import android.content.res.Resources;
import android.view.View;

import com.shop.market.base.annotations.ViewById;

import java.lang.reflect.Field;

/**
 * Created by sukunyue on 2015/9/15.
 */
public class ViewByIdUtil {

    /**
     * 初始化View控件
     */
    static final public void initView(Context context, View view, Object holder){
        try {
            /* 获取上下文资源 */
            Resources resources = context.getResources();

            for (Field field:holder.getClass().getDeclaredFields()) {
                if (field.isAnnotationPresent(ViewById.class)) {
                    field.setAccessible(true);
                    ViewById ViewById = field.getAnnotation(com.shop.market.base.annotations.ViewById.class);
                    Integer resourceId = ViewById.id();
                    Class<?> fieldClass = field.getType();
                    Object injectObj = null;
                    if (resourceId == -1) {
                        String fieldName = field.getName();
                        resourceId = resources.getIdentifier(fieldName, "id", context.getPackageName());
                    }
                    injectObj = fieldClass.cast(view.findViewById(resourceId));
                    if (injectObj instanceof View) {
                        try {
                            field.set(holder, injectObj);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                    field.setAccessible(false);
                }
            }
        } catch (Exception ex) {
            // ...
        }
    }

}