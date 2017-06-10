package org.gx.bos.exam.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.macula.core.domain.AbstractAuditable;
import org.macula.core.hibernate.audit.Auditable;



/**
 * <p>
 * <b>Item</b>考试试题
 * </p>
 *
 * @since 2016年9月2日
 * @author yrs
 * @version 2.0
 */
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "exam_item")
@Auditable
public class ExamItem extends AbstractAuditable<Long> {

    private static final long serialVersionUID = 1L;

    /**
     * 试题编码
     */
    @Column(name = "code", length = 15)
    private String code;

    /**
     * 题干内容
     */
    @Column(name = "name", length = 600)
    private String name;

    /**
     * 题库ID
     */
    @Column(name = "base_id", length = 15)
    private Long baseId;

    /**
	 * 类型（题型[6种]）（SINGLE：单选题，MULTIPLE：多选题，JUDGMENT：判断题，FILL：填空题，QUESTIONS：问答题，ASCERTAIN：判断改错）
	 * @see com.infinitus.eln.base.core.enums.ExamItemTypeEnum
	 */
    @Column(name = "type", length = 50)
    private String type;

    /**
     * 类型名称
     */
    @Column(name = "type_name", length = 50)
    private String typeName;

    /**
     * 题目分值
     */
    @Column(name = "score", length = 15)
    private int score;

    /**
     * 答题限时（分钟）
     */
    @Column(name = "time", length = 15)
    private int time;

    /**
     * 参考答案
     */
    @Column(name = "answer", length = 500)
    private String answer;

    /**
     * 试题状态(可用available、禁用forbid、删除delete)
     */
    @Column(name = "state", length = 50)
    private String state;

    /**
     * 是否作为练习题
     */
    @Column(name = "is_practice", length = 50)
    private String isPractice;

    /**
     * 是否作为考试题
     */
    @Column(name = "is_exam", length = 50)
    private String isExam;

    /**
     * 关联了几张试卷
     */
    @Column(name = "rel_paper_count", length = 50)
    private String relPaperCount;

    /**
     * 试题解析
     */
    @Column(name = "question_analyze", length = 600)
    private String questionAnalyze;

    /**
	 * 语言（Chinese--中文/English--英文）
	 * @see LanguageEnum
	 */
    @Column(name = "language", length = 50)
    private String language;

    /**
     * 题库名
     */
    @Column(name = "base_name", length = 50)
    private String baseName;

    /**
     * 所属公司
     */
    @Column(name = "corp_code", length = 50)
    private String corpCode;

    /**
     * 操作时间
     */
    @Column(name = "option_time")
    private Date optionTime;

    /**
     * 版本号
     */
    @Column(name = "version", length = 50)
    private String version;

    /**
     * 0可以在试题列表显示，1是在回收站，2是从回收站删除
     */
    @Column(name = "place", length = 50)
    private String place;

    /**
	 * 判断改错题,answer为错误(0或者null)时,题目的正确参考答案
	 */
	@Column(name = "correct_answer", length = 400)
    private String correctAnswer;

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getBaseId() {
        return baseId;
    }

    public void setBaseId(Long baseId) {
        this.baseId = baseId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getIsPractice() {
        return isPractice;
    }

    public void setIsPractice(String isPractice) {
        this.isPractice = isPractice;
    }

    public String getIsExam() {
        return isExam;
    }

    public void setIsExam(String isExam) {
        this.isExam = isExam;
    }

    public String getRelPaperCount() {
        return relPaperCount;
    }

    public void setRelPaperCount(String relPaperCount) {
        this.relPaperCount = relPaperCount;
    }

    public String getQuestionAnalyze() {
        return questionAnalyze;
    }

    public void setQuestionAnalyze(String questionAnalyze) {
        this.questionAnalyze = questionAnalyze;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCorpCode() {
        return corpCode;
    }

    public void setCorpCode(String corpCode) {
        this.corpCode = corpCode;
    }

    public Date getOptionTime() {
        return optionTime;
    }

    public void setOptionTime(Date optionTime) {
        this.optionTime = optionTime;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public String getBaseName() {
        return baseName;
    }

    public void setBaseName(String baseName) {
        this.baseName = baseName;
    }

	public static enum LanguageEnum {

		Chinese("Chinese"), English("English");

		private String val;

		private LanguageEnum(String val) {
			this.val = val;
		}

		public String value() {
			return this.val;
		}
	}

	/**
	 * 试题状态
	 * */
	public static enum StateEnum {

		/**
		 * 可用
		 * */
		AVAILABLE("available"),
		/**
		 * 禁用
		 * */
		FORBID("forbid"),
		/**
		 * 删除
		 * */
		DELETE("delete");

		private String val;

		private StateEnum(String val) {
			this.val = val;
		}

		public String value() {
			return val;
		}
	}

}
