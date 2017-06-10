package org.gx.bos.base.core.utils;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.gx.bos.base.core.exception.ElnApiBizException;

/**
 * 
 * <p>
 * <b>StringUtils</b> 字符串工具类
 * </p>
 *
 * @since 2017年6月10日
 * @author ChanJun
 * @version $Id$
 */
public class StringUtils {

	/**
	 * 
	 * */
	public static Integer parseInt(String str) {
		return parseInt(str, null);
	}

	/**
	 * 转换
	 * */
	public static Integer parseInt(String str, Integer defaultValue) {

		if (isNotBlank(str)) {
			try {
				defaultValue = Integer.parseInt(str.trim());
			} catch (NumberFormatException e) {
				//do nothing
			}
		}

		return defaultValue;
	}

	/**
	 * <p>字符串是否为 null,空白字符串,只包含空白字符.</p>
	 * <pre>
	 * StringUtils.isNotBlank(null)      = false
	 * StringUtils.isNotBlank("")        = false
	 * StringUtils.isNotBlank(" ")       = false
	 * StringUtils.isNotBlank("bob")     = true
	 * StringUtils.isNotBlank("  bob  ") = true
	 * </pre>
	 * */
	public static boolean isNotBlank(final CharSequence str) {
		return !isBlank(str);
	}

	/**
	 * <p>字符串是否为 null,空白字符串,只包含空白字符.</p>
	 *
	 * <pre>
	 * StringUtils.isBlank(null)      = true
	 * StringUtils.isBlank("")        = true
	 * StringUtils.isBlank(" ")       = true
	 * StringUtils.isBlank("bob")     = false
	 * StringUtils.isBlank("  bob  ") = false
	 * </pre>
	 */
	public static boolean isBlank(final CharSequence cs) {
		int strLen;
		if (cs == null || (strLen = cs.length()) == 0) {
			return true;
		}
		for (int i = 0; i < strLen; i++) {
			if (Character.isWhitespace(cs.charAt(i)) == false) {
				return false;
			}
		}
		return true;
	}

	public static boolean isEmpty(Object str) {
		return (str == null || "".equals(str));
	}

	public static boolean isNotEmpty(Object str) {
		return (str != null && !"".equals(str));
	}

	/**
	 * 把null转换成空白字符串
	 * */
	public static String nullToEmpty(Object obj) {
		if (obj == null)
			return "";
		return String.valueOf(obj);
	}

	/**
	 * 拼接list里实体中指定属性(默认用,分隔)
	 * 
	 * */
	public static <E> String join(final List<E> list, final BeanWrapper<E, String> wrapper) {
		return StringUtils.join(list, ",", wrapper);
	}

	/**
	 * 拼接list里实体中指定属性
	 * */
	public static <E> String join(final List<E> list, final String seperator, final BeanWrapper<E, String> wrapper) {
		StringBuffer sb = new StringBuffer();
	
		if (CollectionUtils.isNotEmpty(list)) {
			String str = wrapper.getValue(list.get(0));
			if (isNotBlank(str)) {
				sb.append(str);
			}
			for(int i=1,len=list.size();i<len;i++  ){
				str = wrapper.getValue(list.get(i));
				if( isNotBlank(str) ){
					sb.append(seperator).append(str);
				}
			}
		}
		return sb.toString();
	}

	/**
	 * 调用元素的toString,方法把数组中的所有元素拼接成一个字符串(默认使用,分隔)
	 * @param list 待拼接的集合
	 * */
	public static <E> String join(final List<E> list) {
		return join(list, ",");
	}

	/**
	 * 调用元素的toString,方法把数组中的所有元素拼接成一个字符串(默认使用,分隔)
	 * @param array 待拼接的数组
	 * */
	public static <E> String join(final E[] array) {
		return join(array, ",");
	}

	/**
	 * 调用元素的toString方法,把数组中的所有元素拼接成一个字符串
	 * @param array 待拼接的数组
	 * @param seperator 分隔符
	 * */
	public static <E> String join(final E[] array, final String seperator) {
		StringBuffer sb = new StringBuffer();
		if (CollectionUtils.isNotEmpty(array)) {
			sb.append(array[0].toString());
			for (int i = 1; i < array.length; i++) {
				sb.append(seperator).append(array[i].toString());
			}
		}
		return sb.toString();
	}

	/**
	 * 调用元素的toString方法,把数组中的所有元素拼接成一个字符串
	 * @param list 待拼接的集合
	 * @param seperator 分隔符
	 * */
	public static <E> String join(final List<E> list, final String seperator) {
		StringBuffer sb = new StringBuffer();
		if (CollectionUtils.isNotEmpty(list)) {
			Iterator<E> it = list.iterator();
			sb.append(it.next().toString());
			while (it.hasNext()) {
				sb.append(seperator).append(it.next().toString());
			}
		}
		return sb.toString();
	}

	/**
	 * 转换为String集合
	 * */
	public static <E> List<String> convert(List<E> list) {
		if (list == null)
			return null;
		List<String> StringList = new ArrayList<>();
		for (E e : list) {
			StringList.add(String.valueOf(e));
		}
		return StringList;
	}

	/**
	 * 转换首字母为小写
	 * */
	public static final String convertFirstLetterToLowwerCase(String str) {
		if (str == null || str.trim().length() == 0)
			return str;

		str = str.trim();
		if (str.length() == 1)
			return str.toLowerCase(java.util.Locale.ENGLISH);
		else
			return str.substring(0, 1).toLowerCase(java.util.Locale.ENGLISH) + str.substring(1);
	}

	/**
	 * 中文转码，解决查询数据库时出现中文乱码问题，附件地址中的中文问题
	 */
	public static String getChName(String name) {
		String chName = "";
		if (name != null && name.length() != 0) {
			try {
				chName = URLDecoder.decode(name, "UTF-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}
		return chName;
	}

	/**
	 * 解码前台通过get方法传递的参数
	 * */
	public static String decode(String param) {
		String result = null;
		if (param != null && param.length() != 0) {
			try {
				result = URLDecoder.decode(param, "UTF-8");
			} catch (UnsupportedEncodingException e) {
				//nope
			}
		}
		return result;
	}

	public static String encodeURL(String url) {
		if (isNotBlank(url))
			return com.mysema.commons.lang.URLEncoder.encodeURL(url);
		return url;
	}

	/**
	 * 迭代调用iterable中元素的toString
	 * */
	public static final <T> String allToString(Iterable<T> iterable) {
		if (iterable == null)
			return null;

		StringBuffer sb = new StringBuffer("{");
		Iterator<T> it = iterable.iterator();
		//第一个元素直接添加
		if (it.hasNext()) {
			sb.append(it.next().toString());
		}
		//第二个开始添加分号,不换行方便日志搜索
		while (it.hasNext()) {
			sb.append(";" + it.next().toString());
		}
		sb.append("}");
		return sb.toString();

	}

	/**
	 * 拼装包含Map的集合中,map里的指定key的值,以,连接
	 * @param iterable 包含Map的集合
	 * @param key 指定map中属性的key
	 * */
	public static String join(Iterable<Map<String, Object>> iterable, String key) {
		return join(iterable, key, ",");
	}

	/**
	 * 拼装包含Map的集合中,map里的指定key的值,以,连接
	 * @param iterable 包含Map的集合
	 * @param key 指定map中属性的key
	 * @param seperator 分隔符
	 * */
	public static String join(Iterable<Map<String, Object>> iterable, String key, String seperator) {
		StringBuffer sb = new StringBuffer();

		if (iterable != null) {
			Iterator<Map<String, Object>> it = iterable.iterator();
			if (it.hasNext()) {
				sb.append(it.next().get(key).toString());
				while (it.hasNext()) {
					sb.append(seperator).append(it.next().get(key).toString());
				}
			}
		}

		return sb.toString();
	}

	/**
	 * 获取文件后缀名
	 * */
	public static String getFileNameStufix(String filename) {
		if (isNotBlank(filename))
			return filename.substring(filename.lastIndexOf("."));
		return null;
	}

	public static void main(String[] args) {

		try {
			throw new ElnApiBizException("eln.api.impl.noPermissions");
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

}
