package com.shop.market.base.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by sukunyue on 2015/12/18.
 */
public class DateUtil {
    /**
     * 返回unix时间戳 (1970年至今的秒数)
     */
    public static long getUnixStamp() {
        return System.currentTimeMillis() / 1000;
    }

    /**
     * 得到昨天的日期
     */
    public static String getYestryDate() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, -1);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String yestoday = sdf.format(calendar.getTime());
        return yestoday;
    }

    /**
     * 得到今天的日期
     */
    public static String getTodayDate() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String date = sdf.format(new Date());
        return date;
    }

    /**
     * 将时间字符串转换为long型（传入long类型的时间字符串）
     */
    public static Long stringFormatLong(String timeStamp) {
        try {
            return Long.valueOf(timeStamp);
        } catch (Exception e) {
            return 0L;
        }
    }

    /**
     * 时间戳转化为时间格式
     */
    public static String timeStampFormatTime(long timeStamp, SimpleDateFormat sdf) {
        return sdf.format(timeStamp * 1000);
    }

    /**
     * 时间戳转化为时间格式 (传入long类型的时间字符串)
     */
    public static String timeStampFormatDate(String timeStamp, SimpleDateFormat sdf) {
        return sdf.format(stringFormatLong(timeStamp) * 1000);
    }

    /**
     * 将传入时间字符串（如 2015-12-25 12:00：00）获取年月日（即 2015-12-25）
     */
    public static String getYmd(String dateString) {
        String time = "1970-1-1";
        String[] split = dateString.split("\\s");
        if (split.length > 1) {
            time = split[0];
        }
        return time;
    }

    /**
     * 得到时间  HH:mm:ss
     */
    public static String getTime(long timeStamp) {
        String time = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date = sdf.format(timeStamp * 1000);
        String[] split = date.split("\\s");
        if (split.length > 1) {
            time = split[1];
        }
        return time;
    }

    /**
     * 将一个时间戳转换成提示性时间字符串，如刚刚，1秒前
     */
    public static String convertTimeToFormat(long timeStamp) {
        long curTime = System.currentTimeMillis() / (long) 1000;
        long time = curTime - timeStamp;
        if (time < 60 && time >= 0) {
            return "刚刚";
        } else if (time >= 60 && time < 3600) {
            return time / 60 + "分钟前";
        } else if (time >= 3600 && time < 3600 * 24) {
            return time / 3600 + "小时前";
        } else if (time >= 3600 * 24 && time < 3600 * 24 * 30) {
            return time / 3600 / 24 + "天前";
        } else if (time >= 3600 * 24 * 30 && time < 3600 * 24 * 30 * 12) {
            return time / 3600 / 24 / 30 + "个月前";
        } else if (time >= 3600 * 24 * 30 * 12) {
            return time / 3600 / 24 / 30 / 12 + "年前";
        } else {
            return "刚刚";
        }
    }

    /**
     * 把时间转换成倒计时提示性信息，如 5天10小时
     */
    public static String convertTimeToCountDown(long countDownTime) {
        long day = countDownTime / 24 / 3600;
        long hour = countDownTime % (24 * 3600) / 3600;
        long minute = countDownTime % 3600 / 60;
        long second = countDownTime % 60;
        return day + "天" + hour + "时" + minute + "分" + second + "秒";
    }

    /**
     * 获取传入日期是周几
     */
    public static String getWeekOfDate(Date dt) {
        String[] weekDays = {"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"};
        Calendar cal = Calendar.getInstance();
        cal.setTime(dt);
        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
        if (w < 0)
            w = 0;
        return weekDays[w];
    }

    /**
     * 获取传入日期是周几 (传入格式 2015-12-31 12:00:00)
     */
    public static String getWeekOfDate(String timeStamp) {
        String[] weekDays = {"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"};
        try {
            Calendar cal = Calendar.getInstance();
            cal.setTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(timeStamp));
            int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
            if (w < 0)
                w = 0;
            return weekDays[w];
        } catch (Exception e) {
            return weekDays[0] + "err";
        }
    }
}
