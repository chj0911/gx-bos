package org.gx.bos.exam.repository;

import java.util.Collection;
import java.util.List;

import org.gx.bos.exam.domain.ItemBase;
import org.macula.core.repository.MaculaJpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * 
 * <p>
 * <b>ItemBaseRepository</b>考试题库Repository
 * </p>
 *
 * @since 2017年6月10日
 * @author ChanJun
 * @version $Id$
 */
public interface ItemBaseRepository extends MaculaJpaRepository<ItemBase, Long> {


    /**
	 * 查询全部
	 */
    @Query("from ItemBase a where 1 = 1 order by a.sort")
    List<ItemBase> findItemBase();

	@Query("from ItemBase a where a.parentId = :id and ( a.id in (:idsIn) or a.id not in (:idsNotIn) ) ")
	List<ItemBase> findByParentId(@Param("id") Long id, @Param("idsIn") Collection<Long> idsIn, @Param("idsNotIn") Collection<Long> idsNotIn);

	/**
	 * 查找指定id或不在指定id中的题库
	 * */
	@Query("from ItemBase a where a.id in (:idsIn) or a.id not in (:idsNotIn)")
	List<ItemBase> findByIds(@Param("idsIn") Collection<Long> idsIn, @Param("idsNotIn") Collection<Long> idsNotIn);

	/**
	 * 查找指定id或不在指定id中的题库
	 * */
	@Query("from ItemBase a where (a.id in (:idsIn) or a.id not in (:idsNotIn) ) and a.parentId>0 order by a.sort")
	List<ItemBase> findByIdsWithParent(@Param("idsIn") Collection<Long> idsIn, @Param("idsNotIn") Collection<Long> idsNotIn);

    /**
     * 根据题库名查询题库
     */
    @Query("from ItemBase a where a.baseName = :baseName")
    ItemBase findByBaseName(@Param("baseName") String baseName);

    /**
     * 查询没有父类的题库（可用题库）
     */
    @Query("from ItemBase a where a.parentId > 0 order by a.sort")
    List<ItemBase> findNoParent();

    /**
     * 获得排序字段最小值
     * @return
     */
    @Query("select MIN(a.sort) from ItemBase a where 1=1")
    int getMinSort();

	/**
	 * 查找排序字段最大值
	 * */
	@Query("select MAX(a.sort) from ItemBase a where 1=1")
	int getMaxSort();

    /**
     * 获得排序号最大的（跟目录）
     * @return
     */
	@Query("from ItemBase a where a.parentId is null or a.parentId=0 ")
	ItemBase findRoot();

}
