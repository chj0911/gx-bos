package org.gx.bos.exam.admin.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.gx.bos.base.core.utils.CollectionUtils;
import org.gx.bos.exam.admin.service.ExamItemService;
import org.gx.bos.exam.domain.ExamItem;
import org.gx.bos.exam.domain.ItemAnswer;
import org.gx.bos.exam.domain.ItemBase;
import org.gx.bos.exam.domain.ItemExport;
import org.gx.bos.exam.repository.ExamItemRepository;
import org.gx.bos.exam.repository.ItemAnswerRepository;
import org.gx.bos.exam.repository.ItemBaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



/**
 * 
 * <p>
 * <b>ExamItemServiceImpl</b>试题管理Service
 * </p>
 *
 * @since 2017年6月10日
 * @author ChanJun
 * @version $Id$
 */
@Service
public class ExamItemServiceImpl implements ExamItemService {

    @Autowired
	private ExamItemRepository itemRepository;
	@Autowired
	private ItemBaseRepository itemBaseRepository;
	@Autowired
	private ItemAnswerRepository itemAnswerRepository;

    /**
     * 查询在列表显示的试题（place=0）
     */
    @Override
	public Page<ExamItem> findAllOnList(Pageable pageable) {
        return itemRepository.findAllOnList(pageable);
    }

    @Override
    @Transactional
    public void recycled(List<Long> ids) {
		if (CollectionUtils.isNotEmpty(ids)) {
			List<ExamItem> list = itemRepository.findAll(ids);
			for (ExamItem examItem : list) {
				examItem.setPlace("1");
			}
			itemRepository.save(list);
		}
    }

    @Override
	public Page<ExamItem> findAllInRecycled(Pageable pageable) {
        return itemRepository.findAllInRecycled(pageable);
    }

    @Override
    @Transactional
    public void backRecycled(List<Long> ids, Long baseId) {
		if (CollectionUtils.isNotEmpty(ids)) {
			ItemBase base = itemBaseRepository.findOne(baseId);
			List<ExamItem> list = itemRepository.findAll(ids);
			for (ExamItem examItem : list) {
				examItem.setPlace("0");
				examItem.setState("available");
				examItem.setBaseId(baseId);
				examItem.setBaseName(base.getBaseName());
			}
			itemRepository.save(list);
		}
    }

    @Override
    @Transactional
    public void delete(List<Long> ids) {
		if (CollectionUtils.isNotEmpty(ids)) {
			List<ExamItem> list = itemRepository.findAll(ids);
			for (ExamItem examItem : list) {
				examItem.setPlace("2");
				examItem.setState("delete");
			}
			itemRepository.save(list);
		}
    }

    @Override
	public ExamItem findById(Long id) {
        return itemRepository.findOne(id);
    }

    @Override
    @Transactional
	public ExamItem save(ExamItem item) {
        return itemRepository.save(item);
    }

	@Override
	@Transactional
	public void save(List<ItemExport> list) throws Exception {

		if (CollectionUtils.isNotEmpty(list)) {

			List<ItemBase> baseList = itemBaseRepository.findAll();
			Map<String, ItemBase> baseIdMap = CollectionUtils.getMap(baseList, new ItemBase.BaseNameWrapper());
			for (ItemExport itemExport : list) {
				// 获取baseName,查找对应题库
				String baseName = itemExport.getBaseName();
				ItemBase base = baseIdMap.get(baseName);
				if (base == null) {
					throw new Exception("题库名【" + baseName + "】不存在");
				}

				ExamItem item = new ExamItem();
				item.setBaseId(base.getId());
				item.setBaseName(baseName);

				String amswer = itemExport.getAnswer();// 答案

				List<ItemAnswer> itemAnswersList = new ArrayList<>();

				item.setType(itemExport.getType());// 题型
				item.setName(itemExport.getName());// 题干名称
				item.setScore(Integer.parseInt(itemExport.getScore()));// 分数（默认等于3）
				item.setQuestionAnalyze(itemExport.getQuestionAnalyze());// 试题解析
				item.setLanguage(itemExport.getLanguage());// 语言属性
				item.setAnswer(itemExport.getAnswer());// 答案

				this.save(item);
				Long itemId = item.getId();

				if (!itemExport.getAnswerA().isEmpty()) {
					ItemAnswer itemAnswer = new ItemAnswer();
					itemAnswer.setItemId(itemId);
					itemAnswer.setAnswer(itemExport.getAnswerA());
					if (amswer.indexOf("A") != -1 || amswer.indexOf("a") != -1) {
						itemAnswer.setIsTrue("1");
					}
					itemAnswersList.add(itemAnswer);
				}
				if (!itemExport.getAnswerB().isEmpty()) {
					ItemAnswer itemAnswer = new ItemAnswer();
					itemAnswer.setItemId(itemId);
					itemAnswer.setAnswer(itemExport.getAnswerB());
					if (amswer.indexOf("B") != -1 || amswer.indexOf("b") != -1) {
						itemAnswer.setIsTrue("1");
					}
					itemAnswersList.add(itemAnswer);
				}
				if (!itemExport.getAnswerC().isEmpty()) {
					ItemAnswer itemAnswer = new ItemAnswer();
					itemAnswer.setItemId(itemId);
					itemAnswer.setAnswer(itemExport.getAnswerC());
					if (amswer.indexOf("C") != -1 || amswer.indexOf("c") != -1) {
						itemAnswer.setIsTrue("1");
					}
					itemAnswersList.add(itemAnswer);
				}
				if (!itemExport.getAnswerD().isEmpty()) {
					ItemAnswer itemAnswer = new ItemAnswer();
					itemAnswer.setItemId(itemId);
					itemAnswer.setAnswer(itemExport.getAnswerD());
					if (amswer.indexOf("D") != -1 || amswer.indexOf("d") != -1) {
						itemAnswer.setIsTrue("1");
					}
					itemAnswersList.add(itemAnswer);
				}
				if (!itemExport.getAnswerE().isEmpty()) {
					ItemAnswer itemAnswer = new ItemAnswer();
					itemAnswer.setItemId(itemId);
					itemAnswer.setAnswer(itemExport.getAnswerE());
					if (amswer.indexOf("E") != -1 || amswer.indexOf("e") != -1) {
						itemAnswer.setIsTrue("1");
					}
					itemAnswersList.add(itemAnswer);
				}
				if (!itemExport.getAnswerF().isEmpty()) {
					ItemAnswer itemAnswer = new ItemAnswer();
					itemAnswer.setItemId(itemId);
					itemAnswer.setAnswer(itemExport.getAnswerF());
					if (amswer.indexOf("F") != -1 || amswer.indexOf("f") != -1) {
						itemAnswer.setIsTrue("1");
					}
					itemAnswersList.add(itemAnswer);
				}
				if (!itemExport.getAnswerG().isEmpty()) {
					ItemAnswer itemAnswer = new ItemAnswer();
					itemAnswer.setItemId(itemId);
					itemAnswer.setAnswer(itemExport.getAnswerG());
					if (amswer.indexOf("G") != -1 || amswer.indexOf("g") != -1) {
						itemAnswer.setIsTrue("1");
					}
					itemAnswersList.add(itemAnswer);
				}
				if (!itemExport.getAnswerH().isEmpty()) {
					ItemAnswer itemAnswer = new ItemAnswer();
					itemAnswer.setItemId(itemId);
					itemAnswer.setAnswer(itemExport.getAnswerH());
					if (amswer.indexOf("H") != -1 || amswer.indexOf("h") != -1) {
						itemAnswer.setIsTrue("1");
					}
					itemAnswersList.add(itemAnswer);
				}
				if (!itemExport.getAnswerI().isEmpty()) {
					ItemAnswer itemAnswer = new ItemAnswer();
					itemAnswer.setItemId(itemId);
					itemAnswer.setAnswer(itemExport.getAnswerI());
					if (amswer.indexOf("I") != -1 || amswer.indexOf("i") != -1) {
						itemAnswer.setIsTrue("1");
					}
					itemAnswersList.add(itemAnswer);
				}
				if (!itemExport.getAnswerJ().isEmpty()) {
					ItemAnswer itemAnswer = new ItemAnswer();
					itemAnswer.setItemId(itemId);
					itemAnswer.setAnswer(itemExport.getAnswerJ());
					if (amswer.indexOf("J") != -1 || amswer.indexOf("j") != -1) {
						itemAnswer.setIsTrue("1");
					}
					itemAnswersList.add(itemAnswer);
				}
				if (itemAnswersList.size() > 0) {
					itemAnswerRepository.save(itemAnswersList);
				}
			}
		}
	}

    @Override
	public ExamItem findCreated() {
        return itemRepository.findCreated();
    }

    @Override
	public List<ExamItem> findByBaseId(Long baseId) {
        return itemRepository.findByBaseId(baseId);
    }

    @Override
	public List<ExamItem> findByBaseAndName(Long baseId, String name) {
        return itemRepository.findByBaseAndName(baseId,name);
    }

    @Override
	public List<ExamItem> findItemByIds(List<Long> ids) {
        return itemRepository.findItemByIds(ids);
    }

}
