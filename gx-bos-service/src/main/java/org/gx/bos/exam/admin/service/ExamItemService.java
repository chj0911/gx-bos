package org.gx.bos.exam.admin.service;

import java.util.List;

import org.gx.bos.exam.domain.ExamItem;
import org.gx.bos.exam.domain.ItemExport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


/**
 * <p>
 * <b>ItemService</b>考试题目Service
 * </p>
 *
 * @since 2016年9月2日
 * @author yrs
 * @version 2.0
 */
public interface ExamItemService {

    /**
     * 查询在列表显示的试题（place=0）
     */
	Page<ExamItem> findAllOnList(Pageable pageable);

    /**
     * 放入回收站
     */
    void recycled(List<Long> ids);

    /**
     * 回收站list
     */
	Page<ExamItem> findAllInRecycled(Pageable pageable);

    /**
     * 回收站还原
     */
    void backRecycled(List<Long> ids, Long baseId);

    /**
     * 彻底删除试题按钮
     */
    void delete(List<Long> ids);

    /**
     * 根据id查询一条数据
     */
	ExamItem findById(Long id);

    /**
     * 保存试题
     *
     * @param item
     */
	public ExamItem save(ExamItem item);

    /**
     * 找到最近新增的一条
     */
	public ExamItem findCreated();

    /**
     * 查询所有试题不分页
     */
	public List<ExamItem> findByBaseId(Long baseId);

    /**
     * 根据题库,item name 查询在列表显示的试题（place=0）
     */
	public List<ExamItem> findByBaseAndName(Long baseId, String name);

    /**
     * 根据多个id查询 试题
     */
	public List<ExamItem> findItemByIds(List<Long> ids);

	/**
	 * 批量保存试题
	 */
	void save(List<ItemExport> list) throws Exception;

}
