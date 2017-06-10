package org.gx.bos.base.core.utils;

/**
 * 
 * <p>
 * <b>BeanWrapper</b> 实体包装类,用于获取实体中某一属性
 * </p>
 *
 * @since 2017年6月10日
 * @author ChanJun
 * @version $Id$
 */
public abstract class BeanWrapper<E, V> {
	public abstract V getValue(E t);
}
