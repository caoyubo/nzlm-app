package com.shop.market.base.util;

import android.app.Activity;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by sukunyue on 2015/7/29.
 */
public class ActivityHolder {

    public static List<Activity> activities = new ArrayList<Activity>();

    public static void addActivity(Activity activity) {
        activities.add(activity);
    }

    public static void removeActivity(Activity activity) {
        activities.remove(activity);
    }

    /** finish所有activity **/
    public static void finishAllActivities() {
        for (Activity activity:activities) {
            if (!activity.isFinishing()) {
                activity.finish();
            }
        }
    }
}
