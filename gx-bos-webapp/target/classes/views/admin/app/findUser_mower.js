
var saveFoundUser = function () {
        var $myUserTable = $('#myUserTable');
        var myAssignId = $('#myAssignId').val();
        var myAssignType = $('#myAssignType').val();
        var parentTableId = $('#parentTableId').val();
        
        var row = $("#user_multiselect_to option");
        if (!row || row.length == 0) {
            ModalBox.alert('请选择一条数据');
            return;
        }
        
        if( $("#findUserCallback").val() ){
        	var param = new Array();
    		for (var i = 0; i < row.length; i++) {
    			var item = {
    				value : row[i].value,
    				name : row[i].text
    			};
    			param.push(item);
    		}
    		// 回调,将选中的群组信息以数组参数传递给调用者
    		eval($('#findUserCallback').val()).call(null, param);
    		$('#myAssignModal').modal('hide');
    		return;
        }
        
        var userList = new Array();
        for (var i = 0; i < row.length; i++) {
            userList.push(row[i].value);
        }
        var param = {
            userNames: userList,
            id: myAssignId
        };

        var url = base + '/admin/usercenter/' + myAssignType + '/saveuser';
        if (myAssignType == 'user') {
            $('#leaderAccount').val(row[0].value);
            $('#leaderAccountName').val(row[0].text);
            $('#myAssignModal').modal('hide');
            return;
        } else if (myAssignType == 'message') {
            for (var i = 0; i < row.length; i++) {
                var li = $('#addressee-user-' + row[i].value);
                if (li == undefined || li == '' || li.length < 1) {
                    document.getElementById('addresseeUl').innerHTML += '<li class="search-choice" ' +
                            'aname="' + row[i].text + '" atype="USERNAME" addressee="' + row[i].value + '" id="addressee-user-' + row[i].value + '">' +
                            '<span>' + row[i].text + '</span>' +
                            '<a class="search-choice-close" onclick="$(this).parent().remove();"></a>' +
                            '</li>';
                }
            }
            $('#myAssignModal').modal('hide');
            return;
        } else if (myAssignType == 'role') {
            var roleId = $("#roleId-role-assigned").val();

            $.post(base + '/admin/usercenter/role/create?rolePeople=' + userList + '&roleId=' + roleId, function (data) {

                if (data.returnObject == true) {
                    $('#myAssignModal').modal('hide');

                    $('#' + parentTableId).DataTable().ajax.reload();
                }
            });

            return;
        } else if (myAssignType == 'visitRole') {
            var roleId = $("#roleId").val();

            $.post(base + '/admin/signUp/role/create?rolePeople=' + userList + '&roleId=' + roleId, function (data) {

                if (data.returnObject == true) {
                    $('#myAssignModal').modal('hide');

                    $('#' + parentTableId).DataTable().ajax.reload();
                }
            });

            return;
        }else if(myAssignType == 'commentManager'){
            var personId = $("#user_multiselect_to option").map(function(){return $(this).val();}).get().join(",")
            var commentManagerId = $("#myAssignId").val();
            $.ajax({
                type: 'post',
                url: base + '/admin/coursecenter/coursemanager/commentManager/saveCommentManager?commentManagerId='+ commentManagerId +"&userNames=" + personId,
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                success: function (response) {
                    $('#myAssignModal').modal('hide');

                    var userNames = personId.split(",")
                    var context = "";
                    for(var i = 0; i<userNames.length; i++){
                        context += '<span class="tag">' + userNames[i] +  '<i>X</i>';
                    }

                    $("#typeQuestionAddId").append(context);

                    $("#list-course-list").DataTable().ajax.reload();
                }
            });
            return;
        }

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
    };
    $(function () {

        var myAssignType = $('#myAssignType').val();
        var $myUserTable = $('#myUserTable');


        $('#findUser_search').click(function(){
            var $jstree=$('div[id="myAssignModal"] div div div div div div div div div[class="panel-collapse collapse in"] div div');
            if(!$jstree){
                Modal.alert("请选择左侧体系");
            }
            var selectId = $jstree.jstree().get_selected();
            var $jstreeId = $jstree[0].id;
            var $selectUsers = $("#user_multiselect_to option");
            var selectedUserNameList = new Array();
            if($selectUsers && $selectUsers.length > 0){
                for(var i=0; i<$selectUsers.length; i++){
                    selectedUserNameList.push($selectUsers[i].value);
                }
            }
            var url = "";
            if($jstreeId == 'user_jstree_organization'){
                url = base + '/admin/usercenter/role/organization/search';
            }else if($jstreeId == 'user_jstree_postTypes'){
                url = base + '/admin/usercenter/post/user/search';
            }else if($jstreeId == 'user_jstree_group'){
                url = base + '/admin/usercenter/group/user/search';
            }
            if(selectId && selectId.length > 0) {
                var param = {
                    selectId: selectId[0],
                    relationType: myAssignType,
                    relationId: $('#myAssignId').val(),
                    selectedList: selectedUserNameList,
                    queryThing: $('#findUser_userName').val()
                };
                $.ajax({
                    type: 'post',
                    url: url,
                    data: JSON.stringify(param),
                    dataType: 'json',
                    contentType: 'application/json;charset=utf-8',
                    success: function (response) {
                        $("#user_multiselect").empty();
                        var selObj = $("#user_multiselect");
                        var str = "";
                        for (var i = 0; i <= response.content.length - 1; i++) {
                        	var row = response.content[i];
                        	str += "<option value='" + row.userName + "'>" + row.userRealName + "(" + row.userName +")</option>"
                        }
                        selObj.append(str);
                    }
                });
            }
        });

        $('#myAssignModal').on('show.bs.modal', function () {
            $("#user_multiselect").empty();
            $("#user_multiselect_to").empty();
            $('#findUser_userName').val('');

            $.getJSON(base + '/admin/usercenter/role/organization/findAllOrgTypes', function (data) {
                var orgList = data.returnObject;
                var orgTreeTypes = [];
                for (var i = 0; i < orgList.length; i++) {
                    orgTreeTypes.push({
                        id: orgList[i].oaId,
                        text: orgList[i].name,
                        data: orgList[i],
                        parent: (orgList[i].parentId!=null ? orgList[i].parentId : '#'),
                        state:{opened:orgList[i].parentId==null}
                    });
                }
                $('#user_jstree_organization').jstree({
                    'core': {
                        'data': orgTreeTypes
                    }
                });
                $('#user_jstree_organization').on('changed.jstree', function (e, data) {
                    var url = base + '/admin/usercenter/role/organization/search';
                    var $selectUsers = $("#user_multiselect_to option");
                    var selectedUserNameList = new Array();
                    if($selectUsers && $selectUsers.length > 0){
                        for(var i=0; i<$selectUsers.length; i++){
                            selectedUserNameList.push($selectUsers[i].value);
                        }
                    }
                    var param = {
                        selectId : data.node.data.oaId,
                        relationType : myAssignType,
                        relationId : $('#myAssignId').val(),
                        selectedList : selectedUserNameList,
                        queryThing: $('#findUser_userName').val()
                    };
                    $.ajax({
                        type: 'post',
                        url: url,
                        data: JSON.stringify(param),
                        dataType: 'json',
                        contentType: 'application/json;charset=utf-8',
                        success: function (response) {
                            $("#user_multiselect").empty();
                            var selObj = $("#user_multiselect");
                            var str = "";
                            for (var i = 0; i <= response.content.length-1; i++) {
                            	var row = response.content[i];
                                str += "<option value='" + row.userName + "'>" + row.userRealName + "(" + row.userName +")</option>";
                            }
                            selObj.append(str);
                        }
                    });
                });
            });

            $('#user_multiselect').multiselect();
        });
    });
    