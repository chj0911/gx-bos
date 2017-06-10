var saveFoundGroup = function () {
    	
	var selectedRows = $("#group_multiselect_to option");
	if (!selectedRows || selectedRows.length == 0) {
		ModalBox.alert('请选择一条数据');
		return;
	}

	if ($('#findGroupSaveUrl').val()) {
		var param = {};
		if( $('#findGroupGetSubmitParam').val() ){
			var parameters = new Array();
			for (var i = 0; i < selectedRows.length; i++) {
				var item = {
					value : selectedRows[i].value,
					name : selectedRows[i].text
				};
				parameters.push(item);
			}
			// 回调,将选中的群组信息以数组参数传递给调用者
			param = eval($('#findGroupGetSubmitParam').val()).call(null, parameters);
		}else{
			var groupList = new Array();
			for (var i = 0; i < selectedRows.length; i++) {
				groupList.push(selectedRows[i].value);
			}
			param = {
				id : $('#findGroupId').val(),
				groupIds : groupList
			};
		}


		$.ajax({
			type : 'post',
			url : base + '/admin' + $('#findGroupSaveUrl').val(),
			data : JSON.stringify(param),
			dataType : 'json',
			contentType : 'application/json;charset=utf-8',
			success : function(response) {

				var parentTableId = $('#findGroupParentTableId').val();
				if (parentTableId) {
					$('#findGroup').modal('hide');
					$('#div-' + parentTableId).show();
					$('#' + parentTableId).DataTable().ajax.reload();
				}
			}
		});
	} else if ($('#findGroupCallback').val()) {
		var param = new Array();
		for (var i = 0; i < selectedRows.length; i++) {
			var item = {
				value : selectedRows[i].value,
				name : selectedRows[i].text
			};
			param.push(item);
		}
		// 回调,将选中的群组信息以数组参数传递给调用者
		eval($('#findGroupCallback').val()).call(null, param);
		$('#findGroup').modal('hide');
	}
};
    $(function () {
        var usergroupTreeType = [];

        $('#findGroup').on('show.bs.modal', function () {
            //$("#group_multiselect").empty();
//            $("#group_multiselect_to").empty();
            $.getJSON(base + '/admin/usercenter/group/findUserGroups', function (data) {
                var groupList = data.returnObject;
                for (var i = 0; i < groupList.length; i++) {
                    usergroupTreeType.push({
                        id: groupList[i].id,
                        text: groupList[i].groupName,
                        data: groupList[i],
                        parent: (groupList[i].parentId ? groupList[i].parentId : '#')
                    });
                }
                $('#usergroup_jstree_group').jstree({
                    'core': {
                        'data': usergroupTreeType
                    }
                });
                $('#usergroup_jstree_group').on('loaded.jstree', function (e, data) {
                    $('#usergroup_jstree_group').jstree('open_all');
                });
                $('#usergroup_jstree_group').on('changed.jstree', function (e, data) {
                    var row = $("#group_multiselect_to option");
                    var selectedGroups = new Array();
                    for (var i = 0; i < row.length; i++) {
                        selectedGroups.push(row[i].value);
                    }
                    $("#group_multiselect").empty();
                    var selObj = $("#group_multiselect");
                    var str = "";
                    var userGroupList = data.node.data.dealerGroupResults;
                    for (var i = 0; i <= userGroupList.length-1; i++) {
                        if(!containsGroupId(selectedGroups,userGroupList[i].id)){
                            str += "<option value='" + userGroupList[i].id + "'>" + userGroupList[i].groupName + "</option>"
                        }
                    }
                    selObj.append(str);
                });
            });

            $('#group_multiselect').multiselect();
        });
    });
    function containsGroupId(a, obj) {
        var i = a.length;
        while (i--) {
            if (a[i] == obj) {
                return true;
            }
        }
        return false;
    }

// 已选群组
$(function () {
	var usergroupTreeType = [];

	$('#findGroup').on('show.bs.modal', function () {
		$.getJSON(base + '/admin/usercenter/group/findSelectedGroups?module='+$("#module").val()+'&id='+$("#findGroupId").val(), function (data) {
			var groupList = data.returnObject;
			var selectedGroups = new Array();
			for (var i = 0; i < groupList.length; i++) {
				if(i == 0){
					//兼容查询不到数据时，不清空已选择的内容
					$("#group_multiselect_to").empty();
				}
				var str = "<option value='" + groupList[i].id + "'>" + groupList[i].groupName + "</option>";
				selectedGroups.push(str);
			}
			$("#group_multiselect_to").append(selectedGroups);
		});

		$('#group_multiselect_to').multiselect();
	});
});