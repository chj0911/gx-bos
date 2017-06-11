
<#-- 用户职级选择弹出框 findUserRuleId：弹出框关联模块id findUserRuleParentTableId：保存之后刷新表格数据id- -->
<#macro findUserRank findUserRankId="0"  callback="">
<div class="modal fade bs-example-modal-lg" role="dialog" aria-labelledby="findUserRankModalLabel" id="findUserRank">
    <input type="hidden" id="findUserRankId" value="${findUserRankId}"/>
    <input type="hidden" id="findUserRankCallback" value="${callback}"/>

    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="findUserRuleModalLabel">选择用户职级</h4>
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
                    
                    <div class="col-xs-12 col-md-12" style="margin-top:10px">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="panel panel-default" style="height:100%">
                                    <div class="panel-heading">
                                        <h5 class="panel-title">待选职级
                                        </h5>
                                    </div>
                                    <select name="from" id="userRank_multiselect" class="form-control" size="18" multiple="multiple">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2" style="height:100%;vertical-align:middle">
                                <button type="button" id="userRank_multiselect_rightSelected" class="btn btn-block">选择</button>
                                <button type="button" id="userRank_multiselect_rightAll" class="btn btn-block">全选</button>
                                <button type="button" id="userRank_multiselect_leftSelected" class="btn btn-block">移除</button>
                                <button type="button" id="userRank_multiselect_leftAll" class="btn btn-block">清空</button>
                            </div>
                            <div class="col-md-5" style="height:100%">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h5 class="panel-title">已选职级
                                        </h5>
                                    </div>
                                    <select name="to" id="userRank_multiselect_to" class="form-control" size="18" multiple="multiple"></select>
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

<@includeScripts scripts="admin/app/findUserRank_mower.js" />
</#macro>

