package com.shop.market.base.encryption;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

/**
 * 
 */
public class AES {
	public static final String bm = "GBK";

	public static String encrypt(String strKey, String strIvKey, String strContent) throws Exception {
		IvParameterSpec zeroIv = new IvParameterSpec(strIvKey.getBytes());
		SecretKeySpec key = new SecretKeySpec(strKey.getBytes(), "AES");
		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
		cipher.init(Cipher.ENCRYPT_MODE, key, zeroIv);
		byte[] encryptedData = cipher.doFinal(strContent.getBytes(bm));
		return Base64.Base64encode(encryptedData);
	}

	public static String decrypt(String strKey, String strIvKey, String strContent) throws Exception {
		byte[] byteMi = Base64.Base64decode(strContent);
		IvParameterSpec zeroIv = new IvParameterSpec(strIvKey.getBytes());
		SecretKeySpec key = new SecretKeySpec(strKey.getBytes(), "AES");
		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
		cipher.init(Cipher.DECRYPT_MODE, key, zeroIv);
		byte[] decryptedData = cipher.doFinal(byteMi);
		return new String(decryptedData, bm);
	}
}
