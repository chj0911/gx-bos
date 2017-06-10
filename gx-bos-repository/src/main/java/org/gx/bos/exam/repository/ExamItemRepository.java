package org.gx.bos.exam.repository;

import java.util.List;

import org.gx.bos.exam.domain.ExamItem;
import org.macula.core.repository.MaculaJpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


/**
 * <p>
 * <b>ItemRepository</b>考试实体Repository
 * </p>
 *
 * @since 2016年9月2日
 * @author yrs
 * @version 2.0
 */
public interface ExamItemRepository extends MaculaJpaRepository<ExamItem, Long> {

    /**
     * 查询在列表显示的试题（place=0）
     */
	@Query("from ExamItem a where a.place = '0'")
    Page<ExamItem> findAllOnList(Pageable pageable);

    /**
     * 查出在回收站的试题
     */
	@Query("from ExamItem a where a.place = '1' ORDER BY a.lastModifiedDate DESC")
    Page<ExamItem> findAllInRecycled(Pageable pageable);

    /**
     * 找到最近新增的一条数据
     *
     * @return
     */
	@Query("FROM ExamItem a WHERE a.id = (SELECT MAX(b.id) FROM ExamItem b)")
    ExamItem findCreated();

    /**
     * 根据题库 查询在列表显示的试题（place=0）
     *
     * @return
     */
	@Query("from ExamItem a where a.place = '0' and a.baseId=:baseId")
    List<ExamItem> findByBaseId(@Param("baseId") Long baseId);


    /**
     * 根据题库,item name 查询试题（place=0）
     *
     * @return
     */
	@Query("from ExamItem a where a.place = '0' and a.baseId=:baseId and a.name like %:name%")
    List<ExamItem> findByBaseAndName(@Param("baseId") Long baseId, @Param("name") String name);

    /**
     * 根据 多个ID 查询试题（place=0）
     *
     * @return
     */
	@Query("from ExamItem a where a.place = '0' and a.id in(:ids)")
    List<ExamItem> findItemByIds(@Param("ids") List<Long> ids);

}
