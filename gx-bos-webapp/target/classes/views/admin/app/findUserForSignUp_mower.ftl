
<#macro findUserForSignUp assignId assignType parentTableId signUpId>
<div class="modal fade bs-example-modal-lg" role="dialog" aria-labelledby="findUserModalLabel" id="myAssignModal">
    <input type="hidden" id="myAssignId" value="${assignId}"/>
    <input type="hidden" id="signUpId" value="${signUpId}"/>
    <input type="hidden" id="myAssignType" value="${assignType}"/>
    <input type="hidden" id="parentTableId" value="${parentTableId}"/>

    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="findUserModalLabel">选择人员</h4>
            </div>
            <div class="col-xs-12 col-md-12">
                <div class="col-xs-12 col-md-12" style="text-align:left;margin: 5">
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
                                    <div id="user_collapse_1" class="panel-collapse collapse in" aria-expanded="true"
                                    >
                                        <div class="panel-body" >
                                            <div id="user_jstree_organization" style="height:350px;overflow:auto"></div>
                                            <input type="hidden" id="user_organization">
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title">
                                            <a class="accordion-toggle collapsed" data-toggle="collapse"
                                               data-parent="#user_accordion" href="#user_collapse_2"
                                               aria-expanded="false"> 岗位体系 </a>
                                        </h4>
                                    </div>
                                    <div id="user_collapse_2" class="panel-collapse collapse" aria-expanded="false">
                                        <div class="panel-body">
                                            <div id="user_jstree_postTypes" style="height:350px;overflow:auto"></div>
                                            <input type="hidden" id="user_postTypes">
                                        </div>
                                    </div>
                                </div>
                                <#--<div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title">
                                            <a class="accordion-toggle collapsed" data-toggle="collapse"
                                               data-parent="#user_accordion" href="#user_collapse_3"
                                               aria-expanded="false"> 群组 </a>
                                        </h4>
                                    </div>
                                    <div id="user_collapse_3" class="panel-collapse collapse" aria-expanded="false">
                                        <div class="panel-body">
                                            <div id="user_jstree_group" style="height:350px;overflow:auto"></div>
                                            <input type="hidden" id="user_group">
                                        </div>
                                    </div>
                                </div>-->
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-8 col-md-8">
                        <table id="myUserTable" class="table table-striped table-hover table-bordered" width="100%"
                               data-serverSide="true"
                               data-paging="true" data-language-emptyTable="没有数据"
                               data-ordering="false"
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
                                <th data-name="userName">用户名</th>
                                <th data-name="userRealName">用户名</th>
                                <th data-name="userNo">用户名</th>
                            </tr>
                            </thead>
                        </table>
                    </div>

                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="closeMyAssign()">保存</button>
            </div>
        </div>
    </div>
</div>

<@includeScripts scripts="admin/app/findUserForSignUp_mower.js" />
</#macro>

