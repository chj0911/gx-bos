
<#-- 用户规则选择弹出框 findUserRuleId：弹出框关联模块id  findUserRuleType：弹出框关联模块类型 findUserRuleParentTableId：保存之后刷新表格数据id- -->
<#macro findUserRule findUserRuleId findUserRuleType findUserRuleParentTableId>
<div class="modal fade bs-example-modal-lg" role="dialog" aria-labelledby="findUserRuleModalLabel" id="findUserRule">
    <input type="hidden" id="findUserRuleId" value="${findUserRuleId}"/>
    <input type="hidden" id="findUserRuleType" value="${findUserRuleType}"/>
    <input type="hidden" id="findUserRuleParentTableId" value="${findUserRuleParentTableId}"/>

    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="findUserRuleModalLabel">选择用户规则</h4>
            </div>
            <div class="col-xs-12 col-md-12">
                <div class="col-xs-12 col-md-12" style="text-align:left;margin: 5">
                    <div class="col-xs-4 col-md-4" hidden="true">
                        <div class="portlet-body">
                            <div class="panel-group accordion" id="user_rule_accordion">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title">
                                            <a class="accordion-toggle" data-toggle="collapse"
                                               data-parent="#user_rule_accordion" href="#UserRule_collapse_1"
                                               aria-expanded="false"> 用户规则类型 </a>
                                        </h4>
                                    </div>
                                    <div id="UserRule_collapse_1" class="panel-collapse collapse in"
                                         aria-expanded="true">
                                        <div class="panel-body">
                                            <div id="userrule_jstree_group" style="height:350px;overflow:auto"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-12" style="text-align:right; margin-top: 10px">
                        <div class="row">
                            规则名称:
                            <input type="text" class="input-sm" id="findUserRule_name" maxlength="20"/>
                            <a id="findUserRule_search" class="btn btn-default" style="margin-right: 10px">
                                <i class="fa fa-search fa-lg"></i>
                                查询
                            </a>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-12" style="margin-top:10px">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="panel panel-default" style="height:100%">
                                    <div class="panel-heading">
                                        <h5 class="panel-title">待选规则
                                        </h5>
                                    </div>
                                    <select name="from" id="userRule_multiselect" class="form-control" size="18" multiple="multiple">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2" style="height:100%;vertical-align:middle">
                                <button type="button" id="userRule_multiselect_rightSelected" class="btn btn-block">选择</button>
                                <button type="button" id="userRule_multiselect_rightAll" class="btn btn-block">全选</button>
                                <button type="button" id="userRule_multiselect_leftSelected" class="btn btn-block">移除</button>
                                <button type="button" id="userRule_multiselect_leftAll" class="btn btn-block">清空</button>
                            </div>
                            <div class="col-md-5" style="height:100%">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h5 class="panel-title">已选规则
                                        </h5>
                                    </div>
                                    <select name="to" id="userRule_multiselect_to" class="form-control" size="18" multiple="multiple"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="closeFindUserRule()">保存</button>
            </div>
        </div>
    </div>
</div>

<@includeScripts scripts="admin/app/findUserRule_mower.js" />
</#macro>

