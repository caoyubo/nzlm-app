package com.shop.market.bean.jsonbean;

import com.google.gson.annotations.SerializedName;

/**
 * Created by sukunyue on 2016/1/7.
 */
public class ConfigBean {

    @SerializedName("version")
    private Version version;
    @SerializedName("domain")
    private Domain domain;

    public ConfigBean() {
        setVersion(new Version());
        setDomain(new Domain());
        getVersion().setClazzVersion(new ClazzVersion());
        getVersion().setMobileAppVersion(new MobileAppVersion());
    }

    public Version getVersion() {
        return version;
    }
    public void setVersion(Version version) {
        this.version = version;
    }
    public Domain getDomain() {
        return domain;
    }
    public void setDomain(Domain domain) {
        this.domain = domain;
    }

    public class Version {
        @SerializedName("class_version")
        private ClazzVersion clazzVersion;
        @SerializedName("mobile_app_version")
        private MobileAppVersion mobileAppVersion;
        public ClazzVersion getClazzVersion() {
            return clazzVersion;
        }
        public void setClazzVersion(ClazzVersion clazzVersion) {
            this.clazzVersion = clazzVersion;
        }
        public MobileAppVersion getMobileAppVersion() {
            return mobileAppVersion;
        }
        public void setMobileAppVersion(MobileAppVersion mobileAppVersion) {
            this.mobileAppVersion = mobileAppVersion;
        }
    }

    public class Domain {
        @SerializedName("SHOP_URL")
        private String shopUrl;
        @SerializedName("URS_URL")
        private String ursUrl;
        @SerializedName("IMAGE_URL")
        private String imageUrl;
        @SerializedName("YN_PAY_URL")
        private String ynPayUrl;
        @SerializedName("PUSH_URL")
        private String pushUrl;
        @SerializedName("APP_LOG_URL")
        private String appLogUrl;
        @SerializedName("APP_HOME_URL")
        private String appHomeUrl;
        @SerializedName("APP_CART_URL")
        private String appCartUrl;
        public String getShopUrl() {
            return shopUrl;
        }
        public void setShopUrl(String shopUrl) {
            this.shopUrl = shopUrl;
        }
        public String getUrsUrl() {
            return ursUrl;
        }
        public void setUrsUrl(String ursUrl) {
            this.ursUrl = ursUrl;
        }
        public String getImageUrl() {
            return imageUrl;
        }
        public void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }
        public String getYnPayUrl() {
            return ynPayUrl;
        }
        public void setYnPayUrl(String ynPayUrl) {
            this.ynPayUrl = ynPayUrl;
        }
        public String getPushUrl() {
            return pushUrl;
        }
        public void setPushUrl(String pushUrl) {
            this.pushUrl = pushUrl;
        }
        public String getAppLogUrl() {
            return appLogUrl;
        }
        public void setAppLogUrl(String appLogUrl) {
            this.appLogUrl = appLogUrl;
        }
        public String getAppHomeUrl() {
            return appHomeUrl;
        }
        public void setAppHomeUrl(String appHomeUrl) {
            this.appHomeUrl = appHomeUrl;
        }
        public String getAppCartUrl() {
            return appCartUrl;
        }
        public void setAppCartUrl(String appCartUrl) {
            this.appCartUrl = appCartUrl;
        }
    }

    public class ClazzVersion {
        @SerializedName("name")
        private String name;
        @SerializedName("version")
        private String version;
        @SerializedName("content")
        private String content;
        @SerializedName("up_time")
        private String upTime;
        @SerializedName("required")
        private String required;
        @SerializedName("url")
        private String url;
        public String getName() {
            return name;
        }
        public void setName(String name) {
            this.name = name;
        }
        public String getVersion() {
            return version;
        }
        public void setVersion(String version) {
            this.version = version;
        }
        public String getContent() {
            return content;
        }
        public void setContent(String content) {
            this.content = content;
        }
        public String getUpTime() {
            return upTime;
        }
        public void setUpTime(String upTime) {
            this.upTime = upTime;
        }
        public String getRequired() {
            return required;
        }
        public void setRequired(String required) {
            this.required = required;
        }
        public String getUrl() {
            return url;
        }
        public void setUrl(String url) {
            this.url = url;
        }
    }

    public class MobileAppVersion {
        @SerializedName("name")
        private String name;
        @SerializedName("version")
        private String version;
        @SerializedName("content")
        private String content;
        @SerializedName("up_time")
        private String upTime;
        @SerializedName("required")
        private String required;
        @SerializedName("url")
        private String url;
        public String getName() {
            return name;
        }
        public void setName(String name) {
            this.name = name;
        }
        public String getVersion() {
            return version;
        }
        public void setVersion(String version) {
            this.version = version;
        }
        public String getContent() {
            return content;
        }
        public void setContent(String content) {
            this.content = content;
        }
        public String getUpTime() {
            return upTime;
        }
        public void setUpTime(String upTime) {
            this.upTime = upTime;
        }
        public String getRequired() {
            return required;
        }
        public void setRequired(String required) {
            this.required = required;
        }
        public String getUrl() {
            return url;
        }
        public void setUrl(String url) {
            this.url = url;
        }
    }
}
