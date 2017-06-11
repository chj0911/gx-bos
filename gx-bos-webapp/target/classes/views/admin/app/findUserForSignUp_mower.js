
var closeMyAssign = function () {
        var $myUserTable = $('#myUserTable'), param;
        var myAssignId = $('#myAssignId').val(), myAssignType = $('#myAssignType').val(),
                parentTableId = $('#parentTableId').val();
        var row = $myUserTable.DataTable().selectedRows();
        if (!row || row.length == 0) {
            ModalBox.alert('请选择一条数据');
            return;
        }
        var userList = new Array();
        if (myAssignType == 'signUpTrain') {
            for (var i = 0; i < row.length; i++) {
                userList.push({
                    nameStr: row[i].name,
                    username: row[i].userName,
                    sex: row[i].sex,
                    cardNo: row[i].cardNo,
                    rank: row[i].rank,
                    officePost: row[i].officePost,
                    mobile: row[i].mobile
                });
            }
            param = {
                userNames: userList,
                id: $("#signUpId").val()
            };
        } else {
            for (var i = 0; i < row.length; i++) {
                userList.push(row[i].userName);
            }
            param = {
                userNames: userList,
                id: myAssignId
            };
        }

        var url = base;
        var url = '/admin/usercenter/' + myAssignType + '/saveuser';
        if (myAssignType == 'user') {
            $('#leaderAccount').val(row[0].userName);
            $('#myAssignModal').modal('hide');
            return;
        }
        if (myAssignType == "signUpTrain") {
            url = '/eln/admin/signUp/train/saveUser';
            $.ajax({
                type: 'post',
                url: url,
                data: JSON.stringify(param),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                success: function (response) {
                    $('#myAssignModal').modal('hide');
                    if (parentTableId) {
                        $('#' + parentTableId).DataTable().ajax.reload();
                    }
                }
            });
        } else {
            $.ajax({
                type: 'post',
                url: url,
                data: JSON.stringify(param),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                success: function (response) {
                    $('#myAssignModal').modal('hide');
                    if (parentTableId) {
                        $('#' + parentTableId).DataTable().ajax.reload();
                    }
                }
            });
        }


    };
    $(function () {
        var orgTreeTypes = [];
        var postTreeTypes = [];
        var groupTreeTypes = [];

        var myAssignType = $('#myAssignType').val();
        var $myUserTable = $('#myUserTable');

        $('#myAssignModal').on('show.bs.modal', function () {
            $myUserTable.DataTable().ajax.url(base + '/admin/usercenter/user/nosearch').load();
            $.getJSON(base + '/admin/usercenter/role/organization/findAllOrgTypes', function (data) {
                var orgList = data.returnObject;

                for (var i = 0; i < orgList.length; i++) {

                    orgTreeTypes.push({
                        id: orgList[i].id,
                        text: orgList[i].name,
                        data: orgList[i],
                        parent: (orgList[i].parentId ? orgList[i].parentId : '#')
                    });
                }
                $('#user_jstree_organization').jstree({
                    'core': {
                        'data': orgTreeTypes
                    }
                });
                $('#user_jstree_organization').on('loaded.jstree', function (e, data) {
                    $('#user_jstree_organization').jstree('open_all');
                });
                $('#user_jstree_organization').on('changed.jstree', function (e, data) {
                    $myUserTable.DataTable().ajax.url(base + '/admin/usercenter/role/organization/search?typeParentId='
                            + data.node.data.oaId + '&assignType=' + myAssignType + '&assignId=' + $('#myAssignId').val()).load();
                });
            });

            //获取属于岗位体系的人员
            $.getJSON(base + '/admin/usercenter/user/findAllPosts', function (data) {
                var depList = data.returnObject;

                for (var i = 0; i < depList.length; i++) {
                    postTreeTypes.push({
                        id: depList[i].code,
                        text: depList[i].label,
                        data: depList[i],
                        parent: (depList[i].parentId ? depList[i].parentId : '#')
                    });
                }

                $('#user_jstree_postTypes').jstree({
                    'core': {
                        'data': postTreeTypes
                    }
                });
                $('#user_jstree_postTypes').on('loaded.jstree', function (e, data) {
                    $('#user_jstree_postTypes').jstree('open_all');
                });
                $('#user_jstree_postTypes').on('changed.jstree', function (e, data) {
                    $myUserTable.DataTable().ajax.url(base + '/admin/usercenter/post/user/search?typeId='
                            + data.node.data.id + '&assignType=' + myAssignType + '&assignId=' + $('#myAssignId').val()).load();

                });
            });

            /*//获取属于群组中的人员
            $.getJSON(base + '/admin/usercenter/group/findEffectiveGroups', function (data) {
                var list = data.returnObject;
                for (var i = 0; i < list.length; i++) {
                    groupTreeTypes.push({
                        id: list[i].id,
                        text: list[i].name,
                        data: list[i],
                        parent: (list[i].parentId ? list[i].parentId : '#')
                    });
                }

                $('#user_jstree_group').jstree({
                    'core': {
                        'data': groupTreeTypes
                    }
                });
                $('#user_jstree_group').on('loaded.jstree', function (e, data) {
                    $('#user_jstree_group').jstree('open_all');
                });
                $('#user_jstree_group').on('changed.jstree', function (e, data) {
                    $myUserTable.DataTable().ajax.url(base + '/admin/usercenter/group/user/search?typeParentId='
                            + data.node.data.id + '&assignType=' + myAssignType + '&assignId=' + $('#myAssignId').val()).load();
                });
            });*/

        });
    });
