/**
 * Created by lpc on 2016/5/11.
 */
var ItemList = (function ($) {

    var code = 'item-list';
    var table = '#list-' + code;
    var form = '#form-' + code;
    var $table = $(table);
    var orgData;

    var _getPersistedTreeState = function () {
        $table.treetable("getPersistedTreeState");
    };

    var actionsViewModel = ko.mapping.fromJS({
        selectedRow: null
    });

    actionsViewModel.onAddEnable = ko.dependentObservable(function () {
        var action = actionsViewModel.selectedRow();
        return action != null;
    });

    // 全选
    var _onSelectAll = function () {
        $('#select-all-' + code).click(function () {
            var trs = $(table + " tr");
            for (var i = 0; i < trs.length; i++) {
                if (trs[i].id != 'undefined' && trs[i].id != '') {
                    if (!$(table + " tr[id=" + trs[i].id + "]").hasClass('selected')) {
                        selectAll = false;
                    }
                }
            }
            if (selectAll) {
                $table.DataTable().rows('.selected').deselect();
                selectAll = false;
                $(table + " tr").each(function () {
                    $(this).removeClass('selected');
                });
                actionsViewModel.selectedRow(null);
            } else {
                for (var i = 0; i < trs.length; i++) {
                    if (trs[i].id != 'undefined' && trs[i].id != '') {
                        $(table + " tr[id=" + trs[i].id + "]").addClass('selected');
                    }
                }
                $table.DataTable().rows('.selected').select();
                actionsViewModel.selectedRow($table.DataTable().rows('.selected').data());
                selectAll = true;
            }
        });
    };

    // 新增试题
    var _onAddAction = function () {
        $('#add-action-' + code).click(function (e) {
            $(this).trigger({
                type: 'push.mu.breadcrumb',
                page: base + '/admin/exam/item/createUI'
            });
        });
    };

    // 编辑按钮
    var _onEditAction = function () {
        $('#edit-action-' + code).click(function (e) {
            var row = actionsViewModel.selectedRow();
            $(this).trigger({
                type: 'push.mu.breadcrumb',
                page: base + '/admin/exam/item/edit/' + row[0].id
            });
        });
    };

    // 题库管理
    var _onQuestionBankAction = function () {
        $('#questionBank-action-' + code).click(function (e) {
            $(this).trigger({
                type: 'push.mu.breadcrumb',
                page: base + '/admin/exam/item/questionBank'
            });
        });
    };

    // 放入回收站
    var _onRecycledAction = function () {
        $("#recycled-action-" + code).click(function () {
            var id = $(table).DataTable().selectedRowIds();
            var row = $(table).DataTable().selectedRows();
            var ids = "";
            for (var i = 0; i < row.length; i++) {
                if (i == 0) {
                    ids += row[i].id;
                } else {
                    ids += ',' + row[i].id;
                }
            }
            ModalBox.confirm('您确定要把这【' + id.length + '】道题放入回收站吗？', function (result) {
                if (result) {
                    $.post(base + '/admin/exam/item/recycled/' + ids, function (data) {
                        if (data.returnObject) {
                            MessageBox.info('放入回收站成功.');
                            $table.DataTable().rows({selected: true}).clear();
                            actionsViewModel.selectedRow(null);
                            $(table).DataTable().ajax.reload();
                        } else {
                            MessageBox.info('放入回收站失败.');
                            $table.DataTable().rows({selected: true}).clear();
                            actionsViewModel.selectedRow(null);
                            $(table).DataTable().ajax.reload();
                        }
                    });
                }
            });
        })
    };

    // 回收站
    var _onActivation = function () {
        $('#back-action-' + code).click(function (e) {
            $(this).trigger({
                type: 'push.mu.breadcrumb',
                page: base + '/admin/exam/item/recycled'
            });
        });
    };

    /**
     * 导出
     * @private
     */
    var _onExportAction = function () {
        $('#export-action-' + code).click(function (e) {
            var inputs = $('form div div div div div input');
            var param_url = 'place=0';// place=0 在首页列表显示
            for (var i = 0; i < inputs.length; i++) {
                param_url += '&' + inputs[i].id + '=' + encodeURI(encodeURI(inputs[i].value.trim()));
            }
            var type = $('#type').val();
            param_url += '&type='+ type;
            var url = base + '/admin/exam/item/export?' + param_url;
            window.location.href = url;
        });
     };

    // 导入
    var _onImportAction = function () {
        $("#input-action-"+ code).click(function(e) {
            $(this).trigger({
                type: 'push.mu.breadcrumb',
                page: base + '/admin/exam/item/itemInput'
            });
        });
    };

    // 筛选
    var _onSearchAction = function () {
        $('#search-action-' + code).click(function () {
            var inputs = $('form div div div div div input');
            var param_url;
            for (var i = 0; i < inputs.length; i++) {
                if (i == 0) {
                    param_url = inputs[i].id + '=' + inputs[i].value.trim();
                } else {
                    param_url += '&ch_' + inputs[i].id + '=' + encodeURI(encodeURI(inputs[i].value.trim()));
                }
            }
            var type = $('#type').val();
            param_url += '&type='+ type;
            var url = base + '/admin/exam/item/search?' + param_url;

            $table.DataTable().rows({selected: true}).clear();
            $(table).DataTable().ajax.url(url).load();
            actionsViewModel.selectedRow(null);
        });
    };

    //绑定数据行单击事件
    var _onTableRowClickAction = function () {
        $(table).on('click', 'tbody', function (e, data) {
            actionsViewModel.selectedRow($table.DataTable().rows({selected: true}).data());
            return true;
        });
    };

    return {
        reloadItemBaseTree:function(){
        	$.getJSON(base + '/admin/exam/item/findItemBase', function (data) {
                var itemBaseList = data.returnObject;
                var orgTreeTypes = new Array();
                for (var i = 0; i < itemBaseList.length; i++) {
                    orgTreeTypes.push({
                        id: itemBaseList[i].id,
                        text: itemBaseList[i].baseName,
                        data: itemBaseList[i],
                        parent: (itemBaseList[i].parentId ? itemBaseList[i].parentId : '#')
                    });
                }
                //清空旧数据并刷新
                $('#jstree_userOrganization').data('jstree', false).empty().jstree({
                	'core': {
                		'data': orgTreeTypes
                	}                	
                });
                $('#jstree_userOrganization').on('loaded.jstree', function (e, data) {
                    $('#jstree_userOrganization').jstree('open_all');
                });
                $('#jstree_userOrganization').on('changed.jstree', function (e, data) {
                	if( data.node ){
                		$('#baseId').val(data.node.data.id);                		
                		$('#search-action-' + code).click();
                	}
                });
            });
        },
    	
    	init: function () {
            _onSelectAll();// 全选
            _onAddAction();// 新增
            _onSearchAction(); // 筛选
            _onEditAction();// 编辑
            _onQuestionBankAction();// 题库管理
            _onRecycledAction();// 放入回收站
            _onActivation();// 回收站
            _onImportAction();// 导入
            _onExportAction();// 导出
            _onTableRowClickAction();

            // 新增
            actionsViewModel.onAddEnable = ko.dependentObservable(function () {
                return true;
            });

            // 新增
            actionsViewModel.onEdiEnable = ko.dependentObservable(function () {
                return false;
            });

            // 编辑
            actionsViewModel.onEditEnable = ko.dependentObservable(function () {
                var row = actionsViewModel.selectedRow();
                return (row && row.length > 0 && row.length < 2);
            });

            // 放入回收站
            actionsViewModel.onRecycledEnable = ko.dependentObservable(function () {
                var row = actionsViewModel.selectedRow();
                return (row && row.length > 0);
            });

            // 回收站
            actionsViewModel.onBackEnable = ko.dependentObservable(function () {
                return true;
            });

            // 题库管理
            actionsViewModel.onQuestionBankEnable = ko.dependentObservable(function () {
                return true;
            });

            // 导入
            actionsViewModel.onImportEnable = ko.dependentObservable(function () {
                return true;
            });
            // 导出
            actionsViewModel.onExportEnable = ko.dependentObservable(function () {
                return true;
            });

            ko.applyBindings(actionsViewModel);

            //加载题库树
            this.reloadItemBaseTree();

        },

        type: function (data, type, full, meta) {
            /* 类型（题型[6种]）（SINGLE：单选题，MULTIPLE：多选题，JUDGMENT：判断题，
             FILL：填空题，QUESTIONS：问答题，ASCERTAIN：判断改错）*/
            if (data == "SINGLE") {
                return "单选题"
            } else if (data == "MULTIPLE") {
                return "多选题"
            } else if (data == "JUDGMENT") {
                return "判断题"
            } else if (data == "FILL") {
                return "填空题"
            } else if (data == "QUESTIONS") {
                return "问答题"
            } else if (data == "ASCERTAIN") {
                return "判断改错"
            } else {
                return data;
            }
        },
        /**
         * 回收站页面的来源（回收站中显示该考题的来源  EXPIRED自动过期  MANUAL手动加入）
         *
         * @param data
         * @param type
         * @param full
         * @param meta
         */
        source: function (data, type, full, meta) {
            if (data == "EXPIRED") {
                return "自动过期"
            } else if (data == "MANUAL") {
                return "手动删除"
            } else {
                return data;
            }
        },

        //　让组选项(isgroup=1)不能被选中
        orgJstreeCallback: function (instance, data) {
            var newData = [], item;
            orgData = data;
            if (data != null && data.length) {
                $.each(data, function (index, value) {
                    if (typeof value["id"] == 'undefined') return true;
                    item = {
                        "id": value["id"],
                        "parent": !value["pid"] ? "#" : value["pid"],
                        "text": value["label"],
                        "state": {"disabled": !!value["isgroup"]}
                    };
                    newData.push(item);
                });
            }
            return newData;
        },
        xhrComplete: function (json) {
            if (json.success) {
                json.content.makeLineTree({
                    pid: 'parentId',
                    order: 'id'
                });
            }
        },
        formatName: function(data, type, full, meta, arguments) {

            if(data != null && data != undefined) {
                $(arguments).attr('title',data);
                if(data.length > 20) {
                    return "<a href='javascript:void(0)' onclick='ItemList.detailAction(" + full.id +")'><font color='blue'>" +
                        "<label title='" + data + "'>" + data.substring(0,20) + "...</label></font></a>";
                }else{
                    return "<a href='javascript:void(0)' onclick='ItemList.detailAction(" + full.id +")'><font color='blue'>" +
                        "<label title='" + data + "'>" + data + "</label></font></a>";
                }
            }
        },
        detailAction: function(id) {
            $("#hide-action-"+ code).trigger({
                type :"push.mu.breadcrumb",
                page :base+"/admin/exam/item/detailUI?id="+ id
            });
        },
        // 删除一个文件
        delFile: function(data) {
            ModalBox.confirm('是否确定删除？', function (result) {
                if (result) {
                    $(data).parent().parent().remove();
                    var imgKeyId = $(data).parent().find('label').attr("name");
                    if(imgKeyId != undefined) {
                        $("#" + imgKeyId).remove();// 删除保存在页面的key
                    }
                }
            });
        }
    };
}(jQuery));
$(function () {
    ItemList.init();
});

document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) { // enter 键
        //要做的事情
        document.getElementById('search-action-item-list').click();
    }
};