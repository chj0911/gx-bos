
<#-- 
  -- 群组选择弹出框 findGroupId：弹出框关联模块id findGroupParentTableId：保存之后刷新表格数据id  
  -- findGroupSaveUrl:保存选中数据url callback:回调方法名(和findGroupSaveUrl必须二选一)
  -- 使用 findGroupSaveUrl方式,默认会把选中数据和findGroupId提交到指定url,数据格式如:{groupIds:[1,2,3],id:findGroupId}
  -- 或者通过findGroupGetSubmitParam参数指定回调函数,自行组装参数,回调函数包含一个参数,[{value:1,name:'群组1'},{value:2,name:'群组2'}]
  -- callback方法会将选中群组信息以数组参数形式回调调用者指定的函数,[{value:1,name:'群组1'},{value:2,name:'群组2'}]
  -- module:调用模块（课程计划：coursePlan/课程分享：courseShare/考试：examInfo/试题类别：examItem/资料类别：infoCategory/精英人物：infoElite/
  -- 荣誉榜：honorroll/专卖店：sorte/调查管理：survey）
-->
<#macro findGroup findGroupId="0" findGroupParentTableId="" findGroupGetSubmitParam="" findGroupSaveUrl="" callback="" module="">
<div class="modal fade bs-example-modal-lg" role="dialog" aria-labelledby="findUserModalLabel" id="findGroup">
    <input type="hidden" id="findGroupId" value="${findGroupId}"/>
    <input type="hidden" id="findGroupParentTableId" value="${findGroupParentTableId}"/>
    <input type="hidden" id="findGroupGetSubmitParam" value="${findGroupGetSubmitParam}"/>
    <input type="hidden" id="findGroupSaveUrl" value="${findGroupSaveUrl}"/>
    <input type="hidden" id="findGroupCallback" value="${callback}"/>
    <input type="hidden" id="module" value="${module}"/>
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="findUserModalLabel">选择群组</h4>
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
                                               aria-expanded="true">群组类型</a>
                                        </h4>
                                    </div>
                                    <div id="user_collapse_1" class="panel-collapse collapse in" aria-expanded="true"
                                            >
                                        <div class="panel-body">
                                            <div id="usergroup_jstree_group" style="height:350px;overflow:auto"></div>
                                            <input type="hidden" id="user_group">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-8 col-md-8">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="panel panel-default" style="height:100%">
                                    <div class="panel-heading">
                                        <h5 class="panel-title">待选群组
                                        </h5>
                                    </div>
                                    <select name="from" id="group_multiselect" class="form-control" size="18" multiple="multiple">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2" style="height:100%;vertical-align:middle">
                                <button type="button" id="group_multiselect_rightSelected" class="btn btn-block">选择</button>
                                <button type="button" id="group_multiselect_rightAll" class="btn btn-block">全选</button>
                                <button type="button" id="group_multiselect_leftSelected" class="btn btn-block">移除</button>
                                <button type="button" id="group_multiselect_leftAll" class="btn btn-block">清空</button>
                            </div>
                            <div class="col-md-5" style="height:100%">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h5 class="panel-title">已选群组
                                        </h5>
                                    </div>
                                    <select name="to" id="group_multiselect_to" class="form-control" size="18" multiple="multiple"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="saveFoundGroup()">保存</button>
            </div>
        </div>
    </div>
</div>
<@includeScripts scripts="admin/app/findGroup_mower.js" />
</#macro>


