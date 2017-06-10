package org.gx.bos.exam.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.macula.core.domain.AbstractAuditable;
import org.macula.core.hibernate.audit.Auditable;

/**
 * 
 * <p>
 * <b>ItemAnswer</b> is
 * </p>
 *
 * @since 2017年6月10日
 * @author ChanJun
 * @version $Id$
 */
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "exam_item_answer")
@Auditable
public class ItemAnswer extends AbstractAuditable<Long> {

    private static final long serialVersionUID = 1L;

    /**
     * 试题ID
     */
    @Column(name = "item_id")
    private Long itemId;

    /**
     * 答案
     */
    @Column(name = "answer")
    private String answer;

    /**
     * 答案个数
     */
    @Column(name = "answer_code")
    private String answerCode;

    /**
     * 是否正确
     */
    @Column(name = "is_true")
    private String isTrue;

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getAnswerCode() {
        return answerCode;
    }

    public void setAnswerCode(String answerCode) {
        this.answerCode = answerCode;
    }

    public String getIsTrue() {
        return isTrue;
    }

    public void setIsTrue(String isTrue) {
        this.isTrue = isTrue;
    }

    /**
     * 用于关联上传附件，新增时使用
     */
    @Transient
    private String mark;

    public String getMark() {
        return mark;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }
}
