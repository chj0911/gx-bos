
<#macro findUserRuleForCategory findUserRuleId findUserRuleType findUserRuleParentTableId>
<div class="modal fade bs-example-modal-lg" role="dialog" aria-labelledby="findUserRuleModalLabel"
     id="findUserRuleForCategory">
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
                    <div class="col-xs-4 col-md-4">
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
                    <div class="col-xs-8 col-md-8">
                        <table id="myUserRuleTable" class="table table-striped table-hover table-bordered" width="100%"
                               data-serverSide="true"
                               data-paging="true"
                               data-ordering="false" data-language-emptyTable="没有数据"
                               data-ajax-type="get"
                               data-row-id="id"
                               data-select-style="multiple"
                               data-select-info="false"
                               role="grid"
                               rel="datatables"
                               data-ajax-url="${base}/admin/usercenter/user/nosearch"
                        >
                            <thead>
                            <tr>
                                <th data-name="name">名称</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="closeFindUserRuleForCategory()">保存</button>
            </div>
        </div>
    </div>
</div>

<@includeScripts scripts="admin/app/findUserRuleForCategory_mower.js" />
</#macro>

