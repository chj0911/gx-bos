package org.gx.bos.base.core.bean;

import org.macula.core.domain.AbstractAuditable;

public abstract class ReplaceableBean extends AbstractAuditable<Long> implements Replaceable<ReplaceableBean> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public abstract Integer getOrdered();

	public abstract void setOrdered(Integer ordered);

	@Override
	public void replace(ReplaceableBean t1, ReplaceableBean t2) {
		Integer temp = t1.getOrdered();
		t1.setOrdered(t2.getOrdered());
		t2.setOrdered(temp);
	}

}
