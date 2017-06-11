
<#-- 新建用户规则选择弹出框 relationId：弹出框关联模块id  relationType：弹出框关联模块类型 relationParentTableId：保存之后刷新表格数据id- -->
<#macro createUserRule relationId relationType relationParentTableId>
<div class="modal fade bs-example-modal-lg" role="dialog" aria-labelledby="gridSystemModalLabel" id="createUserRule">
    <input type="hidden" id="relationId" value="${relationId}"/>
    <input type="hidden" id="relationType" value="${relationType}"/>
    <input type="hidden" id="relationParentTableId" value="${relationParentTableId}"/>

    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title" id="gridSystemModalLabel">新建用户规则</h4>
            </div>
            <div class="col-xs-12 col-md-12">
                <form id="create-user-rule-form"
                      action="${base}/admin/studycenter/${relationType}/createUserRule" method="post"
                      class="form-horizontal" rel="validate-form" data-bv-container="tooltip">
                    <input type="hidden" name="rule.id"/>
                    <input type="hidden" name="rule.planId" id="rulePlanId" value="${relationId}"/>
                    <input type="hidden" name="rule.group" value="0"/>
                    <input type="hidden" name="rule.status" value="ENABLED"/>
                    <input type="hidden" name="rule.parentId" value="1"/>
                    <input type="hidden" name="rule.expSql" id="expSql"/>
                    <button type="reset" id="resetRule" style="display: none;"></button>

                    <div class="form-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="col-md-12" style="margin-top: 15px">
                                    <div class="form-group">
                                        <label class="control-label col-md-3"><span style="color:red;">*</span>规则名称：</label>

                                        <div class="col-md-9">
                                            <input type="text" name="rule.name"
                                                   class="form-control input-sm"
                                                   validate="{required:true,maxlength:50,charCheck:true}"
                                                  />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="control-label col-md-3"><span style="color:red;">*</span>规则编码：</label>

                                        <div class="col-md-9">
                                            <input type="text" name="rule.code" class="form-control input-sm"
                                                   validate="{required:true,maxlength:50,charEnCheck:true,checkRepeat:true}" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12" hidden="true">
                                    <div class="form-group">
                                        <label class="control-label col-md-3">规则表达式：</label>

                                        <div class="col-md-9">
                                            <textarea rows="3" id="expText" name="rule.expText" class="form-control input-sm"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label col-md-3">用户类型：</label>

                                            <div class="col-md-9">
                                                <input type="checkbox" name="userTypeEln" id="userTypeEln1" value="1">&nbsp;&nbsp;行政人员&nbsp;&nbsp;&nbsp;&nbsp;
                                                <input type="checkbox" name="userTypeEln" id="userTypeEln2" value="2">&nbsp;&nbsp;售后系统金牌师傅&nbsp;&nbsp;&nbsp;&nbsp;
                                                <input type="checkbox" name="userTypeEln" id="userTypeEln3" value="3">&nbsp;&nbsp;业务员&nbsp;&nbsp;&nbsp;&nbsp;
                                                <input type="checkbox" name="userTypeEln" id="userTypeEln4" value="4">&nbsp;&nbsp;优消
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label col-md-3">关联角色：</label>

                                            <div class="col-md-9">
                                                <div id="jstree_rule_roles" style="overflow:auto"></div>
                                                <input type="hidden" id="rule_roleIds" name="rule_roleIds"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label col-md-3">关联群组：</label>

                                            <div class="col-md-9">
                                                <div id="jstree_rule_groups" style="overflow:auto"></div>
                                                <input type="hidden" id="rule_groups" name="rule_groups"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12" id="org_div1" hidden="true">
                                        <div class="form-group">
                                            <label class="control-label col-md-3">关联行政人员部门：</label>

                                            <div class="col-md-9">
                                                <div id="jstree_rule_orgs" style="overflow:auto"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12" id="org_div2" hidden="true">
                                        <div class="form-group">
                                            <label class="control-label col-md-3">关联业务人员部门：</label>

                                            <div class="col-md-9">
                                                <div id="jstree_rule_branchs" style="overflow:auto"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12" id="post_rule_div" hidden="true">
                                        <div class="form-group">
                                            <label class="control-label col-md-3">关联岗位：</label>

                                            <div class="col-md-9">
                                                <div id="jstree_rule_posts" style="overflow:auto"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12" id="title_rule_div" hidden="true">
                                        <div class="form-group">
                                            <label class="control-label col-md-3">关联职位：</label>

                                            <div class="col-md-9">
                                                <div id="jstree_rule_office_titles" style="overflow:auto"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12" id="rank_div" hidden="true">
                                        <div class="form-group">
                                            <label class="control-label col-md-3">关联职级：</label>

                                            <div class="col-md-9">
                                                <div id="jstree_rule_ranks" style="overflow:auto"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12" id="store_div" hidden="true">
                                        <div class="form-group">
                                            <label class="control-label col-md-3">关联店铺：</label>

                                            <div class="col-md-9">
                                                <div id="jstree_rule_stores" style="overflow:auto"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="closeCreateUserRule()">保存</button>
            </div>
        </div>
    </div>
</div>
<@includeScripts scripts="admin/app/createUserRule_mower.js" />
</#macro>

