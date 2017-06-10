<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ page import="org.infinitus.eln.general.utils.UploadUtils" %>
<%@ page import="org.infinitus.eln.webapp.controller.com.baidu.ueditor.ActionEnter" %>
<%@ page import="org.json.JSONObject" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%
    request.setCharacterEncoding("utf-8");
    response.setHeader("Content-Type", "text/html");
    String rootPath = application.getRealPath("/");
    String actionType = request.getParameter("action");
    if(actionType.equals("uploadimage")){
        ActionEnter editor = new ActionEnter(request, rootPath);
        String returnStr = editor.exec();
        JSONObject json = new JSONObject(returnStr);
        UploadUtils uploadUtils = new UploadUtils();
        String key = uploadUtils.uploadToQiNiu(rootPath+json.get("url").toString(), null);
        String url = uploadUtils.getUrl(UploadUtils.auth,key);
        json.put("url",url);
        out.write(json.toString());
        return;
    }else{
     out.write( new ActionEnter( request, rootPath ).exec() );
    }

%>