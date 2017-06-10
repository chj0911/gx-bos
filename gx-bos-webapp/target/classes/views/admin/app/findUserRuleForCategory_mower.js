
var closeFindUserRuleForCategory = function () {
        var $myUserRuleTable = $('#myUserRuleTable'), findUserRuleParam;
        var findUserRuleId = $('#findUserRuleId').val(), findUserRuleType = $('#findUserRuleType').val(),
                findUserRuleParentTableId = $('#findUserRuleParentTableId').val();
        var findUserRuleRow = $myUserRuleTable.DataTable().selectedRows();
        if (!findUserRuleRow || findUserRuleRow.length == 0) {
            ModalBox.alert('请选择一条数据');
            return;
        }
        var findUserRuleList = new Array();
        for (var i = 0; i < findUserRuleRow.length; i++) {
            findUserRuleList.push(findUserRuleRow[i].id);
        }

        var url = base + '/admin';
        if (findUserRuleType == 'category') {
            url = url + '/infocenter/' + findUserRuleType + '/saveUserRule';
            findUserRuleParam = {
                relationIds: findUserRuleList,
                id: findUserRuleId
            };
        }
        $.ajax({
            type: 'post',
            url: url,
            data: JSON.stringify(findUserRuleParam),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (response) {
                $('#findUserRuleForCategory').modal('hide');
                if (findUserRuleParentTableId) {
                    $('#div-' + findUserRuleParentTableId).show();
                    $('#' + findUserRuleParentTableId).DataTable().ajax.reload();
                }
            }
        });
    };
    $(function () {
        var UserRuleTreeType = [];
        var findUserRuleType = $('#findUserRuleType').val();
        var $myUserRuleTable = $('#myUserRuleTable');
        $('#findUserRuleForCategory').on('show.bs.modal', function () {
            $myUserRuleTable.DataTable().ajax.url(base + '/admin/usercenter/rule/nosearch').load();
            $.getJSON(base + '/admin/usercenter/rule/searchUserRuleType', function (data) {
                var orgList = data.returnObject;
                for (var i = 0; i < orgList.length; i++) {

                    UserRuleTreeType.push({
                        id: orgList[i].id,
                        text: orgList[i].name,
                        data: orgList[i],
                        parent: (orgList[i].parentId ? orgList[i].parentId : '#')
                    });
                }
                $('#userrule_jstree_group').jstree({
                    'core': {
                        'data': UserRuleTreeType
                    }
                });
                $('#userrule_jstree_group').on('loaded.jstree', function (e, data) {
                    $('#userrule_jstree_group').jstree('open_all');
                });
                $('#userrule_jstree_group').on('changed.jstree', function (e, data) {
                    $myUserRuleTable.DataTable().ajax.url(base + '/admin/usercenter/rule/userrule/search?typeParentId='
                            + data.node.data.id + '&assignType=' + findUserRuleType + '&assignId=' + $('#findUserRuleId').val()).load();
                });
            });

        });
    });