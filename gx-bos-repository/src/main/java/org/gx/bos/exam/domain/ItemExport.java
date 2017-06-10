package org.gx.bos.exam.domain;

import org.macula.core.domain.AbstractAuditable;


/**
 * <p>
 * <b>ItemExport</b>
 * </p>
 *
 * @since 2016/6/1.
 * @author lpc
 * @version 2.0
 */
public class ItemExport extends AbstractAuditable<Long> {

    private static final long serialVersionUID = 1L;


    /**
     * 试题编码
     */
    private String code;

    /**
     * 题干内容
     */
    private String name;

    /**
     * 题库ID
     */
    private Long baseId;

    /**
     * 类型（题型[6种]）（SINGLE：单选题，MULTIPLE：多选题，JUDGMENT：判断题，FILL：填空题，QUESTIONS：问答题，ASCERTAIN：判断改错）'
     */
    private String type;

    /**
     * 类型名称
     */
    private String typeName;

    /**
     * 题目分值
     */
    private String score;

    /**
     * 答题限时（分钟）
     */
    private String time;

    /**
     * 难度（SIMPLE:简单，RELATIVELY_SIMPLE:较简单，MEDIUM:中等，MORE_DIFFICULT:较难，DIFFICULT:困难）'
     */
    private String level;

    /**
     * 参考答案
     */
    private String answer;

    /**
     * 试题状态(可用available、禁用forbid、删除delete)
     */
    private String state;

    /**
     * 来源方式（回收站中显示该考题的来源  EXPIRED自动过期  MANUAL手动加入）
     */
    private String source;

    /**
     * 是否作为练习题
     */
    private String isPractice;

    /**
     * 是否作为考试题
     */
    private String isExam;

    /**
     * 过期时间
     */
    private String expiredDate;

    /**
     * 关联了几张试卷
     */
    private String relPaperCount;

    /**
     * 试题解析
     */
    private String questionAnalyze;

    /**
     * 语言（Chinese--中文/English--英文）
     */
    private String language;

    /**
     * 题库名
     */
    private String baseName;

    /**
     * 所属公司
     */
    private String corpCode;

    /**
     * 操作时间
     */
    private String optionTime;

    /**
     * 版本号
     */
    private String version;

    /**
     * 0可以在试题列表显示，1是在回收站，2是从回收站删除
     */
    private String place;

    /**
     * 类型是判断题或者判断改错题型，1正确，2错误
     */
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

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
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

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
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

    private String answerA;

    private String answerB;

    private String answerC;

    private String answerD;

    private String answerE;

    private String answerF;

    private String answerG;

    private String answerH;

    private String answerI;

    private String answerJ;

    public String getAnswerA() {
        return answerA;
    }

    public void setAnswerA(String answerA) {
        this.answerA = answerA;
    }

    public String getAnswerB() {
        return answerB;
    }

    public void setAnswerB(String answerB) {
        this.answerB = answerB;
    }

    public String getAnswerC() {
        return answerC;
    }

    public void setAnswerC(String answerC) {
        this.answerC = answerC;
    }

    public String getAnswerD() {
        return answerD;
    }

    public void setAnswerD(String answerD) {
        this.answerD = answerD;
    }

    public String getAnswerE() {
        return answerE;
    }

    public void setAnswerE(String answerE) {
        this.answerE = answerE;
    }

    public String getAnswerF() {
        return answerF;
    }

    public void setAnswerF(String answerF) {
        this.answerF = answerF;
    }

    public String getAnswerG() {
        return answerG;
    }

    public void setAnswerG(String answerG) {
        this.answerG = answerG;
    }

    public String getAnswerH() {
        return answerH;
    }

    public void setAnswerH(String answerH) {
        this.answerH = answerH;
    }

    public String getAnswerI() {
        return answerI;
    }

    public void setAnswerI(String answerI) {
        this.answerI = answerI;
    }

    public String getAnswerJ() {
        return answerJ;
    }

    public void setAnswerJ(String answerJ) {
        this.answerJ = answerJ;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getExpiredDate() {
        return expiredDate;
    }

    public void setExpiredDate(String expiredDate) {
        this.expiredDate = expiredDate;
    }

    public String getOptionTime() {
        return optionTime;
    }

    public void setOptionTime(String optionTime) {
        this.optionTime = optionTime;
    }

	@Override
	public String toString() {
		return "ItemExport [code=" + code + ", name=" + name + ", baseId=" + baseId + ", type=" + type + ", typeName=" + typeName + ", score=" + score + ", time=" + time + ", level=" + level + ", answer=" + answer
				+ ", state=" + state + ", source=" + source + ", isPractice=" + isPractice + ", isExam=" + isExam + ", expiredDate=" + expiredDate + ", relPaperCount=" + relPaperCount + ", questionAnalyze="
				+ questionAnalyze + ", language=" + language + ", baseName=" + baseName + ", corpCode=" + corpCode + ", optionTime=" + optionTime + ", version=" + version + ", place=" + place + ", correctAnswer="
				+ correctAnswer + ", answerA=" + answerA + ", answerB=" + answerB + ", answerC=" + answerC + ", answerD=" + answerD + ", answerE=" + answerE + ", answerF=" + answerF + ", answerG=" + answerG
				+ ", answerH=" + answerH + ", answerI=" + answerI + ", answerJ=" + answerJ + "]";
	}

}
