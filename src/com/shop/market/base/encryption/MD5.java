package com.shop.market.base.encryption;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

/**
 * @Description
 * @Author czm
 * @Version V0.1
 * @CreateDate 2014-9-17 下午2:21:14
 * @ModifyAuthor
 * @ModifyDescri
 * @ModifyDate
 */
public class MD5 {

    /**
     * md5加密
     * @param val 加密前的字符串
     * @return 加密后的字符串
     * @throws NoSuchAlgorithmException
     */
	/*public static String encrypt(String val) throws NoSuchAlgorithmException {
		MessageDigest md5 = MessageDigest.getInstance("MD5");
		md5.update(val.getBytes());
		byte[] m = md5.digest();// 加密
		return String.valueOf(m);
	}*/

    public static final String ENCODE = "utf-8";  //UTF-8

    public static String hmacSign(String aValue, String aKey) {
        byte k_ipad[] = new byte[64];
        byte k_opad[] = new byte[64];
        byte keyb[];
        byte value[];
        try {
            keyb = aKey.getBytes(ENCODE);
            value = aValue.getBytes(ENCODE);
        } catch (UnsupportedEncodingException e) {
            keyb = aKey.getBytes();
            value = aValue.getBytes();
        }
        Arrays.fill(k_ipad, keyb.length, 64, (byte) 54);
        Arrays.fill(k_opad, keyb.length, 64, (byte) 92);
        for (int i = 0; i < keyb.length; i++) {
            k_ipad[i] = (byte) (keyb[i] ^ 0x36);
            k_opad[i] = (byte) (keyb[i] ^ 0x5c);
        }

        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
        md.update(k_ipad);
        md.update(value);
        byte dg[] = md.digest();
        md.reset();
        md.update(k_opad);
        md.update(dg, 0, 16);
        dg = md.digest();
        return MD5.toHex(dg);
    }

    public static String toHex(byte input[]) {
        if (input == null)
            return null;
        StringBuffer output = new StringBuffer(input.length * 2);
        for (int i = 0; i < input.length; i++) {
            int current = input[i] & 0xff;
            if (current < 16)
                output.append("0");
            output.append(Integer.toString(current, 16));
        }

        return output.toString();
    }

    public static String Encrypt_md5(String strSrc) {
        MessageDigest md = null;
        String strDes = null;

        try {
            md = MessageDigest.getInstance("MD5");  //获取MD5加密实例
            md.update(strSrc.getBytes());  //得到加密对象,MD5加密算法只是对字节数组进行加密计算
            byte[] bt = md.digest();       //进行加密运算，返回字节数组
            strDes = bytes2Hex(bt);        //字节数组转换成十六进制字符串，形成最终的密文
        } catch (NoSuchAlgorithmException e) {
            System.out.println("Invalid algorithm.");
            return null;
        }
        return strDes;
    }

    public static String bytes2Hex(byte[] bts)     //加密字节数组转十六进制字符串
    {
        String des = "";
        String tmp = null;
        for (int i = 0; i < bts.length; i++) {
            tmp = (Integer.toHexString(bts[i] & 0xFF));  //转十六进制字符
            if (tmp.length() == 1) {
                des += "0";
            }
            des += tmp;
        }
        return des;
    }


    /*MD5加密后的长度默认是32位的字符串，被加密字符串长度可以任意长，如果要提高加密强度，如加密后为64位，可以自行处理一下：
    把你的待加密内容分成两部分，分别得到32的加密串，然后连接起来凑足64，
    或者把加密串再加密一次，新、旧合成64，组合的方式也可以千变万化。
    或者自定义待加密内容的分割方式。*/
}
