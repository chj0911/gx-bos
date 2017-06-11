package org.gx.bos.admin.exam.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.gx.bos.admin.base.exception.AdminManageException;
import org.gx.bos.admin.base.exception.ItemExcel;
import org.gx.bos.admin.base.result.FileResult;
import org.gx.bos.admin.base.result.ItemFileRequest;
import org.gx.bos.base.core.utils.CollectionUtils;
import org.gx.bos.base.core.utils.DateUtils;
import org.gx.bos.base.core.utils.NumberUtils;
import org.gx.bos.base.core.utils.QueryUtil;
import org.gx.bos.base.core.utils.StringUtils;
import org.gx.bos.base.core.utils.UploadUtils;
import org.gx.bos.exam.admin.service.ExamItemService;
import org.gx.bos.exam.admin.service.ItemAnswerService;
import org.gx.bos.exam.admin.service.ItemBaseService;
import org.gx.bos.exam.admin.service.ItemFileService;
import org.gx.bos.exam.domain.ExamItem;
import org.gx.bos.exam.domain.ItemAnswer;
import org.gx.bos.exam.domain.ItemBase;
import org.gx.bos.exam.domain.ItemExport;
import org.gx.bos.exam.domain.ItemFile;
import org.macula.ApplicationContext;
import org.macula.base.data.util.DataSetUtils;
import org.macula.base.security.util.SecurityUtils;
import org.macula.core.controller.BaseController;
import org.macula.core.mvc.annotation.FormBean;
import org.macula.core.mvc.annotation.OpenApi;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.google.common.collect.Lists;



/**
 * 试题管理
 * @author JunChen
 *
 */

@Controller
@RequestMapping(value = "/admin/exam")
public class ItemManagerController extends BaseController {

	private static final Logger logger = LoggerFactory.getLogger(ItemManagerController.class);

    @Autowired
    private ExamItemService itemService;
    @Autowired
    private ItemBaseService itemBaseService;
    @Autowired
    private ItemAnswerService itemAnswerService;
    @Autowired
    private ItemFileService itemFileService;

    /**
     * 试题中心页面跳转
     *
     * @return
     */
    @RequestMapping(value = "/item/list")
    public String list() {
        return getRelativePath("/item/list");
    }

    /**
     * 首页查询题库
     */
    @OpenApi
    @RequestMapping(value = "/item/findItemBase")
    public List<ItemBase> findItemBase(Model model) throws AdminManageException {
    	
    	String userName = ApplicationContext.getRequest().getUserPrincipal().getName();
		List<ItemBase> list = itemBaseService.findByUserName(userName, true);
        if (CollectionUtils.isEmpty(list)) {
            list = new ArrayList<>();
        }
        model.addAttribute("orgTreeTypes", list);
        return list;
    }

    /**
     * 新增页面
     *
     * @return
     */
    @RequestMapping(value = "item/createUI")
    public String createUI(Model model) {
        //model.addAttribute("token", UploadUtils.getToken());
        return getRelativePath("/item/create");
    }

    /**
     * 试题筛选
     */
    @OpenApi
    @RequestMapping(value = "/item/search", method = RequestMethod.GET)
    public Page<Map<String, Object>> search(@RequestParam(required = false) Map<String, Object> paraMap, Pageable pageable) {
        paraMap = QueryUtil.filterParam2Decode(paraMap);

        // 当查询全部题库时内容，获取所有题库的id
		String userName = ApplicationContext.getRequest().getUserPrincipal().getName();
        if (paraMap.containsKey("baseId")) {
            Long baseId = Long.parseLong((String)paraMap.get("baseId"));
			List<ItemBase> list = itemBaseService.findByParentId(baseId, userName);
			List<Long> ids = Lists.newArrayList(baseId);
			ids.addAll(CollectionUtils.getIdSet(list));
            paraMap.put("baseId", ids);
		} else {
			//未指定题库时,查询所有(只能显示用户有权限的题库)
			List<Long> ids = CollectionUtils.getIdList(itemBaseService.findByUserName(userName, true));
			ids.add(0L); //防止空集合
			paraMap.put("baseId", ids);
        }
		return DataSetUtils.queryByDefaultContext("ExamItem", paraMap, pageable);
    }

    @RequestMapping(value = "/item/questionBank")
    public String questionBank() {
        return getRelativePath("/item/questionBank");
    }

    /**
     * 题库页面加载题库下拉树
     */
    @OpenApi
    @RequestMapping(value = "/item/itemBaseTree")
    public Page<ItemBase> itemBaseTree(Pageable pageable) {

		String userName = ApplicationContext.getRequest().getUserPrincipal().getName();
		List<ItemBase> list = itemBaseService.findByUserName(userName, true);
		return new PageImpl<ItemBase>(list, pageable, list.size());
    }

    /**
     * 查询题库是否存在
     */
    @OpenApi
    @RequestMapping(value = "/item/isExist")
    public Boolean isExist(@RequestParam(required = false) String baseName, @RequestParam String type) {
        try {
            baseName=java.net.URLDecoder.decode(baseName, "UTF-8");
            if (type != null) {
                type = java.net.URLDecoder.decode(type, "UTF-8");
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        ItemBase itemBase = itemBaseService.findByBaseName(baseName);
        if (itemBase == null || itemBase.getBaseName().equals(type)) {
            return true;
        }
        return false;
    }

    /**
     * 新增题库
     */
    @OpenApi
    @RequestMapping(value = "/item/addBase")
    public Boolean addBase(@RequestParam String baseName) {
		baseName = StringUtils.decode(baseName);
		ItemBase itemBase = itemBaseService.findByBaseName(baseName);
		if (itemBase != null) {
            throw new AdminManageException("添加失败,题库名称["+ baseName +"]已存在");
		} else {
			int minSort = itemBaseService.getMinSort();
			ItemBase maxSotrBase = itemBaseService.findRoot();
			itemBase = new ItemBase();
			itemBase.setParentId(maxSotrBase.getId());
			itemBase.setBaseName(baseName);
			itemBase.setSort(++minSort);
			itemBaseService.save(itemBase);
			return true;
		}
    }

    /**
     * 保存修改题库名
     */
    @RequestMapping(value = "/item/editBase")
    @OpenApi
	public Boolean editBase(@RequestParam String baseName, @RequestParam Long id) {
		baseName = StringUtils.decode(baseName);
		boolean result = false;
		if (StringUtils.isNotBlank(baseName) && id != null) {
			ItemBase old = itemBaseService.findOne(id);
			ItemBase itemBase = itemBaseService.findByBaseName(baseName);
			if (itemBase == null || old.getId() - itemBase.getId() == 0) {
				old.setBaseName(baseName);
				itemBaseService.save(old);
				result = true;
			}
		}
		return result;
    }

    /**
     * 删除题库
     */
    @OpenApi
    @RequestMapping(value = "/item/deleteBase")
    public Boolean deleteBase(@RequestParam Long id) {
        List<ExamItem> itemList = itemService.findByBaseId(id);
        if(itemList.size() == 0) {
            itemBaseService.delete(id);
            return true;
        } else {
            return false;
        }
    }

    /**
     * 放入回收站
     */
    @OpenApi
    @RequestMapping(value = "/item/recycled/{ids}")
    public Boolean putRecycled(@PathVariable("ids") String ids) {
        if (StringUtils.isNotBlank(ids)) {
			itemService.recycled(NumberUtils.split(ids));
        }
        return true;
    }

    /**
     * 回收站页面跳转
     *
     * @return
     */
    @RequestMapping(value = "/item/recycled")
    public String recycled() {
        return getRelativePath("/item/recycled");
    }

    /**
     * 回收站list
     */
    @OpenApi
    @RequestMapping(value = "/item/findAllInRecycled")
    public Page<ExamItem> findAllInRecycled(Pageable pageable) {
        return itemService.findAllInRecycled(pageable);
    }

    /**
     * 回收站还原
     *
     * @param ids
     * @return
     */
    @OpenApi
    @RequestMapping(value = "/item/backRecycled/{ids}")
    public Boolean backRecycled(@PathVariable("ids") String ids, @RequestParam Long baseId) {
		List<Long> idList = NumberUtils.split(ids);
        itemService.backRecycled(idList, baseId);
        return true;
    }

    /**
     * 彻底删除试题按钮
     */
    @OpenApi
    @RequestMapping(value = "/item/delete/{ids}")
    public Boolean delete(@PathVariable("ids") String ids) {
        List<Long> idList = new ArrayList<>();
        if (StringUtils.isNotBlank(ids)) {
            String[] id = ids.split(",");
            for (int i = 0; i < id.length; i++) {
                idList.add(Long.parseLong(id[i]));
            }
        }
        itemService.delete(idList);
        return true;
    }

    /**
     * 回收站筛选功能
     *
     * @param paraMap
     * @param pageable
     * @return
     */
    @OpenApi
    @RequestMapping(value = "/item/recycledSearch")
    public Page<ExamItem> recycledSearch(@RequestParam(required = false) Map<String, Object> paraMap, Pageable pageable) {
        paraMap = QueryUtil.filterParam2Decode(paraMap);
        Page<ExamItem> page = DataSetUtils.query("RecycledSearch", SecurityUtils.getUserContext(), paraMap, pageable);
        return page;
    }

    /**
     * 试题修改页面跳转
     */
    @RequestMapping(value = "/item/edit/{id}")
    public String editUI(@PathVariable("id") Long id, Model model) {
        model.addAttribute("token", UploadUtils.getToken());
        model.addAttribute("id", id);
        model.addAttribute("pageType", "edit");
        model.addAttribute("language", itemService.findById(id).getLanguage());
        return getRelativePath("/item/edit");
    }

    /**
     * 试题修改页面数据回显
     */
    @OpenApi
    @RequestMapping(value = "/item/editInit/{id}")
    public ExamItem editInit(@PathVariable("id") Long id) {
        ExamItem item = itemService.findById(id);
        if (item == null) {
            item = new ExamItem();
        } else {
            ItemBase itemBase = itemBaseService.findOne(item.getBaseId());
            item.setBaseName(itemBase.getBaseName());
        }
        return item;
    }

    /**
     * 异步加载“所属题库”下拉列表
     */
    @ResponseBody
    @RequestMapping(value = "/item/itemBaseList")
	public List<Map<String, Object>> testList() {
    	
		String userName = ApplicationContext.getRequest().getUserPrincipal().getName();
    	
		List<Map<String, Object>> list = new ArrayList<>();
		for (ItemBase itemBase : itemBaseService.findByUserName(userName, false)) {
			Map<String, Object> map = new HashMap<>();
            map.put("code", itemBase.getId());
            map.put("label", itemBase.getBaseName());
            map.put("continent", itemBase.getId());
            list.add(map);
        }
        return list;
    }

    /**
     * 试题编辑页面加载试题内容
     */
    @ResponseBody
    @RequestMapping(value = "/item/itemContent/{type}")
    public String itemContent(@PathVariable("type") String type) {
        return getRelativePath("/item/itemContent/itemContent");
    }

    /**
     * 加载试题修改时的选择题
     */
    @ResponseBody
    @RequestMapping(value = "/item/itemContent/answer/{id}")
	public List<ItemAnswer> itemContentAnswer(@PathVariable("id") Long id) {
        return itemAnswerService.itemContentAnswer(id);
    }

    /**
     * 删除试题的某个答案
     */
    @OpenApi
    @RequestMapping(value = "/item/deleteAnswer/{id}")
    public Boolean deleteAnswer(@PathVariable("id") Long id) {
        // TODO 还需删除相关的附件
		itemAnswerService.deleteAnswer(id);
        return true;
    }

    /**
     * 保存修改
     */
    @OpenApi
    @RequestMapping(value = "/item/edit")
    public Long edit(@FormBean("item") ExamItem item) {
        itemService.save(item);
        return item.getId();
    }

    /**
     * 保存新增
     */
    @ResponseBody
    @RequestMapping(value = "/item/create")
    public long create(@FormBean("item") ExamItem item) {
        ExamItem item1 = itemService.save(item);
        return item1.getId();
    }

    /**
     * 保存答案和附件
     */
    @ResponseBody
    @RequestMapping(value = "/item/saveAnswer", method=RequestMethod.POST)
    public Boolean saveAnswer(@RequestBody ItemFileRequest itemrequest) {
        List<ItemAnswer> answerList = itemrequest.getItemAnswerList();
        List<ItemFile> itemFileList = itemrequest.getItemFileList();
        List<ItemAnswer> answerList1 = itemAnswerService.save(answerList);// 保存答案，保存完了之后才会有id，ItemFile需要存答案id
        List<ItemFile> list = new ArrayList<>();
        if(itemFileList != null && itemFileList.size() > 0) {
            for (ItemFile itemFile : itemFileList) {
                if (!itemFile.getFileKey().isEmpty()) {
                    // place等于“answer”的是答案的附件，需要保存itemAnswerId
                    if ("answer".equals(itemFile.getPlace())) {
                        String mark = itemFile.getMark();
                        Long answerId = null;
                        for (int i = 0; i < answerList.size(); i++) {
                            if (mark.equals(answerList.get(i).getMark())) {
                                answerId = answerList1.get(i).getId();
                            }
                        }
                        itemFile.setItemAnswerId(answerId);
                    } else {
                        itemFile.setMark(null);
                    }
                    list.add(itemFile);
                }
            }
        }
        itemFileService.save(list);
        return true;
    }

    /**
     * 导出
     */
    @OpenApi
    @RequestMapping(value = "/item/export")
	public void export(@RequestParam(required = false) Map<String, Object> paraMap, HttpServletRequest request, HttpServletResponse response) throws ParseException {
        paraMap = QueryUtil.filterParam2Trim(paraMap);
		Page<Map<String, Object>> page = this.search(paraMap, null);

		List<ItemBase> baseList = itemBaseService.findItemBase();
		Map<Long, ItemBase> baseIdMap = CollectionUtils.getIdMap(baseList);
		for (Map<String, Object> row : page) {

			//转换题库名称
			ItemBase base = baseIdMap.get(row.get("baseId"));
			if (base != null) {
				row.put("baseName", base.getBaseName());
			}

			String[] stro = { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J" };
			Long id = (Long) row.get("id");
            List<ItemAnswer> itemAnswer = itemAnswerService.itemContentAnswer(id);
            for (int p = 0; p < 10; p++) {
				row.put("answer" + stro[p], "");
            }
            for (int o = 0; o < itemAnswer.size(); o++) {
				row.put("answer" + stro[o], itemAnswer.get(o).getAnswer());
            }

		}

		String fileName = "试题列表" + DateUtils.getCurrentDateTimeSuffix() + ".xls";
		List<String> headers = Arrays.asList("所属题库", "题型", "题目分数", "题干", "试题解析", "语言属性", "答案", "选项A", "选项B", "选项C", "选项D", "选项E", "选项F", "选项G", "选项H", "选项I", "选项J");
		List<String> cols = Arrays.asList("baseName", "type", "score", "name", "questionAnalyze", "language", "answer", "answerA", "answerB", "answerC", "answerD", "answerE", "answerF", "answerG", "answerH", "answerI",
				"answerJ");
		new ItemExcel().exportExcel(page, headers, cols, fileName, request, response);

    }

    /**
     * 试题导入模板下载
     */
    @RequestMapping(value = "/item/downloadUpdateFile", method = RequestMethod.GET)
    @OpenApi
    public void downloadUpdateFile(HttpServletResponse response) throws AdminManageException {
        InputStream inputStream = null;
        OutputStream out = null;
        String fileName = "试题导入模板.xls";
        try {
            inputStream = ItemManagerController.class.getResourceAsStream("/file/upload_item.xls");
            byte[] bytes = IOUtils.toByteArray(inputStream);

            out = response.getOutputStream();
            response.setHeader("Content-disposition", "attachment; filename=" + new String(fileName.getBytes(), "ISO8859-1"));// 设定输出文件头
            out.write(bytes);
            out.flush();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /**
     * 试题导入页面
     */
    @RequestMapping(value = "/item/itemInput")
    public String inputUI() {
        return super.getRelativePath("/item/itemInput");
    }

    /**
	 * 试题导入
	 * */
    @OpenApi
    @RequestMapping(value = "/item/readUpdateExcel", method = RequestMethod.POST)
	public FileResult<ItemExport> readUpdateExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
        MultipartFile multipartFile = multipartRequest.getFile("uploadFile");
        try {
			List<String> cols = Arrays.asList("BaseName", "Type", "Name", "Score", "QuestionAnalyze", "Language", "Answer", "AnswerA", "AnswerB", "AnswerC", "AnswerD", "AnswerE", "AnswerF", "AnswerG", "AnswerH",
					"AnswerI", "AnswerJ");
			FileResult<ItemExport> result = new ItemExcel().readXls_Item(ItemExport.class, multipartFile.getInputStream(), cols);

			if (logger.isDebugEnabled()) {
				logger.debug("试题导入,Result:{}", StringUtils.allToString(result.getList()));
			}
            List<ItemExport> list = result.getList();
			if (CollectionUtils.isNotEmpty(list)) {
				itemService.save(list);
            }
			return result;
        } catch (Exception e) {
            throw new AdminManageException(e.getMessage());
        }
    }

    /**
     * 查看试题详情
     */
    @RequestMapping(value = "/item/detailUI")
    public String detailUI(@RequestParam("id") Long id, Model model) {
        ExamItem item = itemService.findById(id);
        ItemBase itemBase = itemBaseService.findOne(item.getBaseId());
        item.setBaseName(itemBase.getBaseName());
        model.addAttribute("item", item);
        return getRelativePath("/item/detail");
    }


    /**
     * 根据试题id拿到file
     */
    @OpenApi
    @RequestMapping(value = "/item/getFile/{id}")
    public List<ItemFile> getFile(@PathVariable("id") Long id) {
        if(id != null) {
            List<ItemFile> fileList = itemFileService.getFileByItemId(id);
            return fileList;
        }
        return null;
    }


    /**
     * 根据试题id拿到file
     */
    @OpenApi
    @RequestMapping(value = "/item/delFile/{id}")
    public Boolean delFile(@PathVariable("id") Long id) {
        if(id != null) {
            itemFileService.delete(id);
            return true;
        }
        return false;
    }

}
