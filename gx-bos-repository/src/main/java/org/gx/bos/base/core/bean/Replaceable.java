package org.gx.bos.base.core.bean;

/**
 * 可互换排序位置的实体
 * */
public interface Replaceable<T> {

	/**
	 * 必须实现替换位置的方法
	 * */
	public void replace(T t1, T t2);

}
