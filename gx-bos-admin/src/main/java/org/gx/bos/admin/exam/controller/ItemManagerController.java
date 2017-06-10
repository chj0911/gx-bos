package org.gx.bos.admin.exam.controller;
import org.macula.core.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 试题管理
 * @author JunChen
 *
 */

@Controller
@RequestMapping(value = "/admin/exam")
public class ItemManagerController extends BaseController {
    /**
     * 试题中心页面跳转 /admin/exam/item/list
     * @return
     */
    @RequestMapping(value = "/item/list", method=RequestMethod.GET)
    public String list() {
    	System.out.println("===========");
        return getRelativePath("/item/list");
    }
    
}    