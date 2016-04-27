package com.shop.market.bean.jsonbean;

import com.google.gson.annotations.SerializedName;

public class AccountBean {

    public static final String SP_USER_INFO_DATA = "sp_user_info_data";
    public static final String SP_USER_NAME_DATA = "sp_user_name_data";

    /* */
    @SerializedName("uid")
    private String uId;
    /* */
    @SerializedName("uname")
    private String uName;
    /* */
    @SerializedName("nname")
    private String nName;
    /* */
    @SerializedName("email")
    private String email;
    /* */
    @SerializedName("lastloginip")
    private String lastLoginIp;
    /* */
    @SerializedName("lastlogintime")
    private String lastLoginTime;
    /* */
    @SerializedName("phone")
    private String phone;
    /*  */
    @SerializedName("birthday")
    private String birthday;
    /*  */
    @SerializedName("avatar")
    private String[] avatar;
    /* */
    @SerializedName("name")
    private String name;
    /* */
    @SerializedName("idcard")
    private String idCard;
    /* qq */
    @SerializedName("qq")
    private String qq;
    /* */
    @SerializedName("user_key")
    private String userKey;

    public String getuId() {
        return uId;
    }
    public void setuId(String uId) {
        this.uId = uId;
    }
    public String getuName() {
        return uName;
    }
    public void setuName(String uName) {
        this.uName = uName;
    }
    public String getnName() {
        return nName;
    }
    public void setnName(String nName) {
        this.nName = nName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getLastLoginIp() {
        return lastLoginIp;
    }
    public void setLastLoginIp(String lastLoginIp) {
        this.lastLoginIp = lastLoginIp;
    }
    public String getLastLoginTime() {
        return lastLoginTime;
    }
    public void setLastLoginTime(String lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getBirthday() {
        return birthday;
    }
    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }
    public String[] getAvatar() {
        return avatar;
    }
    public void setAvatar(String[] avatar) {
        this.avatar = avatar;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getIdCard() {
        return idCard;
    }
    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }
    public String getQq() {
        return qq;
    }
    public void setQq(String qq) {
        this.qq = qq;
    }
    public String getUserKey() {
        return userKey;
    }
    public void setUserKey(String userKey) {
        this.userKey = userKey;
    }
}
