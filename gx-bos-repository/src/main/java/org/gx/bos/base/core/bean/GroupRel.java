package org.gx.bos.base.core.bean;

/**
 * 
 * <p>
 * <b>GroupRel</b>用户群组关系接口,各种群组的关联关系类可实现该接口,可通过UserRuleService.fillGroupName方法填充群组名称
 * </p>
 *
 * @since 2017年6月10日
 * @author ChanJun
 * @version $Id$
 */
public interface GroupRel {

	public abstract Long getGroupId();

	public abstract void setGroupName(String name);
}
