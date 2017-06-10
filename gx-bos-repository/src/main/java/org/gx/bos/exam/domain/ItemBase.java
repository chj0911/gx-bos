package org.gx.bos.exam.domain;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.gx.bos.base.core.utils.BeanWrapper;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.macula.core.domain.AbstractAuditable;
import org.macula.core.hibernate.audit.Auditable;


/**
 * 
 * <p>
 * <b>ItemBase</b>题库
 * </p>
 *
 * @since 2017年6月10日
 * @author ChanJun
 * @version $Id$
 */
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "exam_item_base")
@Auditable
public class ItemBase extends AbstractAuditable<Long> {

    private static final long serialVersionUID = 1L;
    /**
     * 题库编码
     */
    @Column(name = "base_code", length = 50)
    private String baseCode;

    /**
     * 排序字段（递减）
     */
    @Column(name = "sort", length = 15)
    private int sort;

    /**
     * 父节点（所有的题库都有一个人共同的父节点）
     */
    @Column(name = "parent_id", length = 15)
    private Long parentId;

    /**
     * 题库名字
     */
    @Column(name = "base_name", length = 50)
    private String baseName;

    @Column(name = "base_desc", length = 50)
    private String baseDesc;

    /**
     * 公司编码
     */
    @Column(name = "corp_code", length = 50)
    private String corpCode;

    @Column(name = "show_order", length = 50)
    private String showOrder;

    /**
     * 操作时间
     */
    @Column(name = "opt_time")
    private Date optTime;

    public int getSort() {
        return sort;
    }

    public void setSort(int sort) {
        this.sort = sort;
    }

    public String getBaseCode() {
        return baseCode;
    }

    public void setBaseCode(String baseCode) {
        this.baseCode = baseCode;
    }

    public String getBaseName() {
        return baseName;
    }

    public void setBaseName(String baseName) {
        this.baseName = baseName;
    }

    public String getCorpCode() {
        return corpCode;
    }

    public void setCorpCode(String corpCode) {
        this.corpCode = corpCode;
    }

    public String getShowOrder() {
        return showOrder;
    }

    public void setShowOrder(String showOrder) {
        this.showOrder = showOrder;
    }

    public Date getOptTime() {
        return optTime;
    }

    public void setOptTime(Date optTime) {
        this.optTime = optTime;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getBaseDesc() {
        return baseDesc;
    }

    public void setBaseDesc(String baseDesc) {
        this.baseDesc = baseDesc;
    }

	public static class BaseNameWrapper extends BeanWrapper<ItemBase, String> {

		@Override
		public String getValue(ItemBase t) {
			return t.getBaseName();
		}

	}

}
