package org.gx.bos.base.core.utils;


import java.util.List;

import org.gx.bos.base.core.exception.ElnApiBizException;

/**
 * 
 * <p>
 * <b>Assert</b> is
 * </p>
 *
 * @since 2017年6月10日
 * @author ChanJun
 * @version $Id$
 */
public class Assert {

	/**
	 * 判断参数非空
	 * @param arg 参数
	 * @param argName 参数名 
	 * */
	public static void notNull(Object arg, String argName) {
		if (arg == null) {
			throw new ElnApiBizException("eln.api.impl.param.mustNotBeNull", argName);
		}
	}

	/**
	 * 判断所有参数非空
	 * @param args 判断的参数数组
	 * @param argsName 参数名数组
	 * */
	public static void allNotNull(Object[] args, String[] argsName) {
		if( args==null || argsName==null )
			throw new ElnApiBizException("eln.api.impl.param.mustNotBeNull");
		if( args.length!=argsName.length )
			throw new ElnApiBizException("args.length is not equals to argsName.length");
		for (int i = 0, len = args.length; i < len; i++)
			if (args[i] == null)
				throw new ElnApiBizException("eln.api.impl.param.mustNotBeNull", argsName[i]);
	}

	/**
	 * 非空白字符串
	 * @param text 参数
	 * @param argName 参数名称
	 * */
	public static void hasText(String text, String argName) {
		if (StringUtils.isBlank(text)) {
			throw new ElnApiBizException("eln.api.impl.param.mustNotBeNullOrEmpty", argName);
		}
	}

	/**
	 * 判断所有参数非空白字符串
	 * @param args 判断的参数数组
	 * @param argsName 参数名数组
	 * */
	public static void allHasText(String[] args, String[] argsName) {
		if (args == null || argsName == null)
			throw new ElnApiBizException("eln.api.impl.param.mustNotBeNull");
		if (args.length != argsName.length)
			throw new ElnApiBizException("args.length is not equals to argsName.length");
		for (int i = 0, len = args.length; i < len; i++)
			if (StringUtils.isBlank(args[i]))
				throw new ElnApiBizException("eln.api.impl.param.mustNotBeNullOrEmpty", argsName[i]);
	}

	/**
	 * @param condition 判断表达式
	 * @param message 对应国际化信息编码
	 * */
	public static void isTrue(boolean condition, String message) {
		if (!condition) {
			throw new ElnApiBizException(message);
		}
	}

	/**
	 * 判断集合不为空,且集合中所有元素都不为空白字符串
	 * @param list 待判断非空的字符串集合
	 * @param argsName 参数名称
	 * */
	public static void allHasText(List<String> list, String argsName) {
		if (list == null || list.isEmpty())
			throw new ElnApiBizException("eln.api.impl.param.mustNotBeNull", argsName);

		for (String str : list) {
			if (StringUtils.isBlank(str)) {
				throw new ElnApiBizException("eln.api.impl.param.mustNotBeNullOrEmpty", argsName);
			}
		}
	}


}
