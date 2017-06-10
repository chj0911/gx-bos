
<#-- 人员信息选择弹出框 assignId：弹出框关联模块id  assignType：弹出框关联模块类型 parentTableId：保存之后刷新表格数据id-->
<#macro findUser parentTableId="" assignId="" assignType="" callback="" >
<div class="modal fade bs-example-modal-lg" role="dialog" aria-labelledby="findUserModalLabel" id="myAssignModal">
    <input type="hidden" id="myAssignId" value="${assignId}"/>
    <input type="hidden" id="myAssignType" value="${assignType}"/>
    <input type="hidden" id="parentTableId" value="${parentTableId}"/>
    <input type="hidden" id="findUserCallback" value="${callback}"/>

    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="findUserModalLabel">选择人员</h4>
            </div>

            <div class="col-xs-12 col-md-12" style="text-align:right; margin-top: 10px">
                <div class="row">姓名/卡号:
                    <input type="text" class="input-sm" id="findUser_userName" maxlength="20"/>
                    <a id="findUser_search" class="btn btn-default" style="margin-right: 10px">
                        <i class="fa fa-search fa-lg"></i>查询
                    </a>
                </div>
            </div>
            <div class="col-xs-12 col-md-12" style="text-align:left; margin-top: 10px">
                <div class="row">
                    <div class="col-xs-4 col-md-4">
                        <div class="portlet-body">
                            <div class="panel-group accordion" id="user_accordion">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title">
                                            <a class="accordion-toggle" data-toggle="collapse"
                                               data-parent="#user_accordion" href="#user_collapse_1"
                                               aria-expanded="true">部门体系</a>
                                        </h4>
                                    </div>
                                    <div id="user_collapse_1" class="panel-collapse collapse in" aria-expanded="true">
                                        <div class="panel-body">
                                            <div id="user_jstree_organization" style="height:350px;overflow:auto"></div>
                                            <input type="hidden" id="user_organization">
                                        </div>
                                    </div>
                                </div>
                                <#-- 
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title">
                                            <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#user_accordion" 
                                            	href="#user_collapse_2" aria-expanded="false"> 岗位体系 </a>
                                        </h4>
                                    </div>
                                    <div id="user_collapse_2" class="panel-collapse collapse" aria-expanded="false">
                                        <div class="panel-body">
                                            <div id="user_jstree_postTypes" style="height:350px;overflow:auto"></div>
                                            <input type="hidden" id="user_postTypes">
                                        </div>
                                    </div>
                                </div>
                                 -->
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-8 col-md-8">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="panel panel-default" style="height:100%">
                                    <div class="panel-heading">
                                        <h5 class="panel-title">待选人员
                                        </h5>
                                    </div>
                                    <select name="from" id="user_multiselect" class="form-control" size="18" multiple="multiple">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2" style="height:100%;vertical-align:middle">
                                <button type="button" id="user_multiselect_rightSelected" class="btn btn-block">选择</button>
                                <button type="button" id="user_multiselect_rightAll" class="btn btn-block">全选</button>
                                <button type="button" id="user_multiselect_leftSelected" class="btn btn-block">移除</button>
                                <button type="button" id="user_multiselect_leftAll" class="btn btn-block">清空</button>
                            </div>
                            <div class="col-md-5" style="height:100%">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h5 class="panel-title">已选人员
                                        </h5>
                                    </div>
                                    <select name="to" id="user_multiselect_to" class="form-control" size="18" multiple="multiple"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="saveFoundUser()">保存</button>
            </div>
        </div>
    </div>
</div>
<@includeScripts scripts="admin/app/findUser_mower.js" />
</#macro>
