package org.gx.bos.base.core.utils;

import java.util.ArrayList;
import java.util.List;

/**
 * 
 * <p>
 * <b>NumberUtils</b> is
 * </p>
 *
 * @since 2017年6月10日
 * @author ChanJun
 * @version $Id$
 */
public class NumberUtils {

	/**
	 * 计算数组中的最小值
	 * */
	public static int min(int... array) {
		if (array != null && array.length == 0)
			throw new IllegalArgumentException("parameters must be not null or empty!");
		return compare(false, array);
	}

	/**
	 * 计算数组中的最大值
	 * */
	public static int max(int... array) {
		if (array != null && array.length == 0)
			throw new IllegalArgumentException("parameters must be not null or empty!");
		return compare(true, array);
	}

	/**
	 * 计算数组中的极值
	 * @param operator 比较操作(true:获取最大值,false:获取最小值)
	 * */
	private static int compare(boolean operator, final int[] array) {
		int current = array[0];
		for (int i = 1; i < array.length; i++) {
			if (operator == array[i] > current) {
				current = array[i];
			}
		}
		return current;
	}

	public static List<Long> split(String str) {
		return split(str, ",");
	}

	public static List<Long> split(String str, String seperator) {
		List<Long> list = new ArrayList<>();
		if (StringUtils.isNotBlank(str)) {
			for (String s : str.split(seperator)) {
				list.add(Long.parseLong(s));
			}
		}
		return list;
	}

	public static List<Integer> splitInt(String str) {
		return splitInt(str, ",");
	}

	public static List<Integer> splitInt(String str, String seperator) {
		List<Integer> list = new ArrayList<>();
		if (StringUtils.isNotBlank(str)) {
			for (String s : str.split(seperator)) {
				list.add(Integer.parseInt(s));
			}
		}
		return list;
	}

	/**
	 * 转换String集合为Long集合
	 **/
	public static List<Long> parseLong(List<String> list) {
		List<Long> resultList = null;
		if (CollectionUtils.isNotEmpty(list)) {
			resultList = new ArrayList<>(list.size());
			for (String str : list)
				resultList.add(Long.parseLong(str));
		}
		return resultList;
	}

	public static Integer parseInt(String str) {
		if (StringUtils.isNotBlank(str)) {
			return Integer.parseInt(str);
		}
		return null;
	}

	public static Integer parseInt(String str, Integer defaultValue) {
		if (StringUtils.isNotBlank(str)) {
			try {
				defaultValue = Integer.parseInt(str);
			} catch (Exception e) {
				//nope
			}
		}
		return defaultValue;
	}

	public static Long parseLong(String str, Long defaultValue) {
		if (StringUtils.isNotBlank(str)) {
			try {
				defaultValue = Long.parseLong(str);
			} catch (Exception e) {
				//nope
			}
		}
		return defaultValue;
	}


}
