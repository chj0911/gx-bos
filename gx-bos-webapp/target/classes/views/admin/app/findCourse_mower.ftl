
<#-- 课程资源选择弹出框 findCourseId：弹出框关联模块id  findCourseType：弹出框关联模块类型 findCourseParentTableId：保存之后刷新表格数据id-->
<#macro findCourse findCourseId="0" findCourseParentTableId="" findCourseType=""  callback="" terminal="">
<div class="modal fade bs-example-modal-lg" role="dialog" aria-labelledby="findCourseModalLabel" id="findCourse">
    <input type="hidden" id="findCourseId" value="${findCourseId}"/>
    <input type="hidden" id="findCourseType" value="${findCourseType}"/>
    <input type="hidden" id="findCourseParentTableId" value="${findCourseParentTableId}"/>
    <input type="hidden" id="findCourseCallback" value="${callback}"/>
    <input type="hidden" id="courseTerminal" value="${terminal}">

    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="findCourseModalLabel">选择课程资源</h4>
            </div>
            <div class="col-xs-12 col-md-12">
                <div class="col-xs-12 col-md-12" style="text-align:right; margin-top: 10px">
                    <div class="row">
                        课程名称:
                        <input type="text" class="input-sm" id="findCourse_name" maxlength="20"/>
                        <a id="findCourse_search" class="btn btn-default" style="margin-right: 10px">
                            <i class="fa fa-search fa-lg"></i>
                            查询
                        </a>
                    </div>
                </div>
                <div class="col-xs-12 col-md-12" style="text-align:left;margin-top: 10px">
                    <div class="col-xs-4 col-md-4">
                        <div class="portlet-body">
                            <div class="panel-group accordion" id="course_accordion">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title">
                                            <a class="accordion-toggle" data-toggle="collapse"
                                               data-parent="#course_accordion" href="#course_collapse_1"
                                               aria-expanded="false"> 课程资源 </a>
                                        </h4>
                                    </div>
                                    <div id="course_collapse_1" class="panel-collapse collapse in"
                                         aria-expanded="true">
                                        <div class="panel-body">
                                            <div id="coursetype_jstree_group" style="height:350px;overflow:auto"></div>
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
                                        <h5 class="panel-title">待选课程
                                        </h5>
                                    </div>
                                    <select name="from" id="course_multiselect" class="form-control" size="18" multiple="multiple">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-2" style="height:100%;vertical-align:middle">
                                <button type="button" id="course_multiselect_rightSelected" class="btn btn-block">选择</button>
                                <button type="button" id="course_multiselect_rightAll" class="btn btn-block">全选</button>
                                <button type="button" id="course_multiselect_leftSelected" class="btn btn-block">移除</button>
                                <button type="button" id="course_multiselect_leftAll" class="btn btn-block">清空</button>
                            </div>
                            <div class="col-md-5" style="height:100%">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h5 class="panel-title">已选课程
                                        </h5>
                                    </div>
                                    <select name="to" id="course_multiselect_to" class="form-control" size="18" multiple="multiple"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="closeFindCourse()">保存</button>
            </div>
        </div>
    </div>
</div>
<@includeScripts scripts="admin/app/findCourse_mower.js" />
</#macro>

