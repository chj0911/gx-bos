package org.gx.bos.exam.repository;

import java.util.List;

import org.gx.bos.exam.domain.ItemAnswer;
import org.macula.core.repository.MaculaJpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * 
 * <p>
 * <b>ItemAnswerRepository</b> 试题答案
 * </p>
 *
 * @since 2017年6月10日
 * @author ChanJun
 * @version $Id$
 */
public interface ItemAnswerRepository extends MaculaJpaRepository<ItemAnswer, Long> {


    /**
     * 加载试题修改时的选择题
     *
     * @param id
     * @return
     */
    @Query("from ItemAnswer a where itemId = :id")
    List<ItemAnswer> itemContentAnswer(@Param("id") Long id);

    /**
     * 删除试题的某个答案
     *
     * @param id
     * @return
     */
    @Modifying
    @Query("DELETE FROM ItemAnswer a WHERE a.id = :id")
    int deleteAnswer(@Param("id") Long id);

    /**
     * 获取试题下面正确的选项
     * @param id
     * @return
     */
    @Query("from ItemAnswer a where itemId = :id and a.isTrue=1")
    List<ItemAnswer> listCorrectAnswerById(@Param("id") Long id);

}
