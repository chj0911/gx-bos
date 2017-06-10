<@layout.mower_admin title="试题管理" scripts="admin/exam/item/list.js" version="[$Revision: 4511 $]" require="knockoutjs">
    <#assign code="item-list" />
    <@ui.panel>

        <@ui.panel_head>

        <div class="fit">
            <form class="form-horizontal" id="form-${code}">
                <div class="form-body">
                    <div class="row">
                        <div class="col-md-3" style="margin-left:45px">
                            <div class="form-group">
                                <label class="form-group-lg control-label pull-left">题干：</label>

                                <div class="col-md-7">
                                    <input type="hidden" id="baseId" value="">
                                    <input type="text" id="name" class="form-control input-sm" required
                                           maxlength="20"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3" style="margin-left:45px">
                            <div class="form-group">
                                <label class="form-group-lg control-label pull-left">题型：</label>

                                <div class="col-md-7">
                                    <select id="type" class="form-control input-sm">
                                    <#--类型（题型[6种]）（SINGLE：单选题，MULTIPLE：多选题，JUDGMENT：判断题，FILL：填空题，QUESTIONS：问答题，ASCERTAIN：判断改错）-->
                                        <option value="">全部</option>
                                        <option value="SINGLE">单选题</option>
                                        <option value="MULTIPLE">多选题</option>
                                        <option value="FILL">填空题</option>
                                        <option value="JUDGMENT">判断题</option>
                                        <option value="QUESTIONS">问答题</option>
                                        <option value="ASCERTAIN">判断改错题</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-xs-12 col-md-12" style="text-align:left;margin: 5">
            <div class="col-xs-6 col-md-9">
                <button id="select-all-${code}" title='全选' class="btn btn-default" data-label="全选">
                    <i class="fa fa-list fa-lg"></i>
                    全选
                </button>
                <button id="add-action-${code}" class="btn btn-default" data-bind="enable: onAddEnable" data-label="新增">
                    <i class="fa fa-plus-circle fa-lg"></i>
                    新增
                </button>
                <button id="edit-action-${code}" class="btn btn-default" data-bind="enable: onEditEnable"
                        data-label="编辑">
                    <i class="fa fa-pencil fa-lg"></i>
                    编辑
                </button>
                <button id="questionBank-action-${code}" class="btn btn-default"
                        data-bind="enable: onQuestionBankEnable"
                        data-label="题库管理">
                    <i class="fa fa-book fa-lg"></i>
                    题库管理
                </button>
                <button id="recycled-action-${code}" class="btn btn-danger" data-bind="enable: onRecycledEnable"
                        data-label="放入回收站">
                    <i class="fa fa-trash-o fa-lg"></i>
                    放入回收站
                </button>
                <button id="back-action-${code}" class="btn btn-default" data-bind="enable: onBackEnable"
                        data-label="回收站">
                    <i class="fa fa-archive fa-lg"></i>
                    回收站
                </button>
                <button id="input-action-${code}" class="btn btn-danger" data-bind="enable: onImportEnable"
                        data-label="导入">
                    <i class="fa fa-download fa-lg"></i>
                    导入
                </button>
                <button id="export-action-${code}" class="btn btn-danger" data-bind="enable: onExportEnable"
                        data-label="导出">
                    <i class="fa fa-upload fa-lg"></i>
                    导出
                </button>
                <button id="hide-action-${code}" data-label="试题详情" hidden="true"></button>
            </div>
            <div class="col-xs-6 col-md-3" style="text-align:right">
                <input type="hidden" id="rows" name="rows" value="10"/>
                <input type="hidden" id="page" name="page" value="1"/>
                <a id="search-action-${code}" class="btn btn-default">
                    <i class="fa fa-search fa-lg"></i>
                    查询
                </a>
            </div>
        </div>

        </@ui.panel_head>
        <@ui.panel_body>

        <div class="col-md-3">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a class="accordion-toggle" data-toggle="collapse" aria-expanded="true">题库</a>
                    </h4>
                </div>
                <div class="panel-collapse collapse in" aria-expanded="true" style="overflow:auto;height: 400px">
                    <div class="panel-body">
                        <div id="jstree_userOrganization"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-9">
            <table id="list-${code}" class="table table-striped table-hover table-bordered" width="100%"
                   data-serverSide="true"
                   data-paging="true" data-language-emptyTable="没有数据"
                   data-ordering="false"
                   data-ajax-url="${base}/admin/exam/item/search?sort=id&order=desc"
                   data-ajax-type="get"
                   data-row-id="id"
                   data-select-style="multiple"
                   data-select-info="false"
                   role="grid"
                   rel="datatables">
                <thead>
                <tr>
                    <th  data-name="type" data-render="ItemList.type" width="80px">题型</th>
                    <th data-name="name" data-render="ItemList.formatName" width="300px">题干</th>
                    <th data-name="baseName">所属题库</th>
                    <th data-name="score">分数</th>
                    <th data-name="createdBy">创建人</th>
                </tr>
                </thead>
            </table>
        </div>
        </@ui.panel_body>
    </@ui.panel>
</@layout.mower_admin>
