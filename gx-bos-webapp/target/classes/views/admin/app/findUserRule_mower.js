
var closeFindUserRule = function () {
        var $myUserRuleTable = $('#myUserRuleTable'), findUserRuleParam;
        var findUserRuleId = $('#findUserRuleId').val(), findUserRuleType = $('#findUserRuleType').val(),
                findUserRuleParentTableId = $('#findUserRuleParentTableId').val();
        var findUserRuleRow = $("#userRule_multiselect_to option");
        if (!findUserRuleRow || findUserRuleRow.length == 0) {
            ModalBox.alert('请选择一条数据');
            return;
        }
        var findUserRuleList = new Array();
        var findUserRuleCodes = new Array();
        for (var i = 0; i < findUserRuleRow.length; i++) {
            findUserRuleList.push(findUserRuleRow[i].value);
            findUserRuleCodes.push($(findUserRuleRow[i]).attr("ruleCode"));
        }

        var url = base + '/admin';
        if (findUserRuleType == 'plan') {
            url = url + '/studycenter/' + findUserRuleType + '/saveUserRule';
            if (oldUser != null && oldUser != '') {
                findUserRuleParam = {
                    relationIds: findUserRuleList,
                    id: findUserRuleId,
                    olds: oldUser,
                    codes :findUserRuleCodes
                };
            } else {
                findUserRuleParam = {
                    relationIds: findUserRuleList,
                    id: findUserRuleId,
                    codes :findUserRuleCodes
                };
            }
        } else if (findUserRuleType == "courseShare") {
            url = url + '/coursecenter/coursemanager/course-user/save';
            var parentRow = $('#list-course-list').DataTable().selectedRows();
            var courseIds = new Array();
            for(var i=0; i<parentRow.length; i++){
                if (parentRow[i].terminal != 1 && parentRow[i].shareStatus == '未分享') {
                    courseIds.push(parentRow[i].id);
                }
            }
            findUserRuleParam = {
                userRuleIds: findUserRuleList,
                ids: courseIds,
                codes :findUserRuleCodes
            };
        } else if (findUserRuleType == "share") {
            url = url + '/coursecenter/coursemanager/course-user/save';
            var courseIds = new Array();
            courseIds.push(findUserRuleId);
            findUserRuleParam = {
                userRuleIds: findUserRuleList,
                ids: courseIds,
                codes :findUserRuleCodes
            };
        }else if (findUserRuleType == "train") {
            url = url + '/signUp/train/addUserRule';
            findUserRuleParam = {
                ruleIds: findUserRuleList,
                trainId: findUserRuleId,
                codes :findUserRuleCodes
            };
        }else if (findUserRuleType == "honor") {
            url = url + '/pcbackground/honorroll/addUserRule';
            findUserRuleParam = {
                ruleIds: findUserRuleList,
                honorId: findUserRuleId,
                codes :findUserRuleCodes
            };
        } else if (findUserRuleType == "message") {
            for (var i = 0; i < findUserRuleRow.length; i++) {
                var li = $('#addressee-rule-' + findUserRuleRow[i].value);
                if (li == undefined || li == '' || li.length < 1) {
                    document.getElementById('addresseeUl').innerHTML += '<li class="search-choice" ' +
                            'id="addressee-rule-' + findUserRuleRow[i].value + '" addressee="' + $(findUserRuleRow[i]).attr("ruleCode") + '" ' +
                            'aname="' + findUserRuleRow[i].text + '" atype="USERRULE">' +
                            '<span>' + findUserRuleRow[i].text + '</span>' +
                            '<a class="search-choice-close" onclick="$(this).parent().remove();"></a>' +
                            '</li>';
                }
            }
            $('#findUserRule').modal('hide');
            return;
        } else if (findUserRuleType == "createdSurvey") {
            var ids = $("#createdSurvey_userRuleIds").val();;
            for (var i = 0; i < findUserRuleRow.length; i++) {
                if(ids && ids.length>0) {
                    ids += ',' + findUserRuleRow[i].value;
                } else {
                    if (i == 0) {
                        ids = findUserRuleRow[i].value;
                    } else {
                        ids += ',' + findUserRuleRow[i].value;
                    }
                }
            }
            $("#createdSurvey_userRuleIds").val(ids);

            $('#findUserRule').modal('hide');
            if (findUserRuleParentTableId) {
                /*$('#div-' + findUserRuleParentTableId).show()*/

                var table_url = $("#table-list-user-rule-add-item").attr("data-ajax-url");
                if(table_url == undefined) {
                    table_url = $("#table-list-user-rule-edit-item").attr("data-ajax-url");
                }
                var o = table_url.split('?');
                if(o.length > 1) {
                    table_url = o[0] + "?ids=" + ids
                }
                $('#' + findUserRuleParentTableId).DataTable().ajax.url(table_url).load();
            }
            return;
        }else if(findUserRuleType == "exam"){
            url = url + "/exam/examInfo/saveUserGroup";
            var ids = new Array();
            for (var i = 0; i < findUserRuleRow.length; i++) {
                ids.push(findUserRuleRow[i].value);
            }
            findUserRuleParam = {
                id: findUserRuleId,
                ids: ids,
                codes :findUserRuleCodes
            };
            var table_url_1 = base +  '/admin/exam/examInfo/findUserRule?id=' + findUserRuleId;
            $.ajax({
                type: 'post',
                url: url,
                data: JSON.stringify(findUserRuleParam),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                success: function (response) {
                    $('#findUserRule').modal('hide');
                    if (findUserRuleParentTableId) {
                        $('#' + findUserRuleParentTableId).DataTable().ajax.url(table_url_1).load();
                    }
                }
            });
            return;

        }if (findUserRuleType == 'category') {
            url = url + '/infocenter/' + findUserRuleType + '/saveUserRule';
            findUserRuleParam = {
                relationIds: findUserRuleList,
                id: findUserRuleId,
                codes :findUserRuleCodes
            };
        }


        $.ajax({
            type: 'post',
            url: url,
            data: JSON.stringify(findUserRuleParam),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (response) {
                $('#findUserRule').modal('hide');
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

        $('#findUserRule_search').click(function(){
            var $selectRuleIds = $("#userRule_multiselect_to option");
            var selectedRuleIdList = new Array();
            var findUserRuleCodes = new Array();
            if($selectRuleIds && $selectRuleIds.length > 0){
                for(var i=0; i<$selectRuleIds.length; i++){
                    selectedRuleIdList.push($selectRuleIds[i].value);
                    findUserRuleCodes.push($($selectRuleIds[i]).attr("ruleCode"));
                }
            }
            var url = base + '/admin/usercenter/rule/userrule/search';
            var param = {
                relationType: findUserRuleType,
                relationId: $('#findUserRuleId').val(),
                selectedList: selectedRuleIdList,
                queryThing: $('#findUserRule_name').val(),
                codes :findUserRuleCodes
            };
            $.ajax({
                type: 'post',
                url: url,
                data: JSON.stringify(param),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                success: function (response) {
                    $("#userRule_multiselect").empty();
                    var selObj = $("#userRule_multiselect");
                    var str = "";
                    for (var i = 0; i <= response.content.length - 1; i++) {
                        str += "<option value='" + response.content[i].id + "' ruleCode='"+ response.content[i].code + "'>" + response.content[i].name + "</option>"
                    }
                    selObj.append(str);
                }
            });
        });
        $("#findUserRule_name").keydown(function(e){
            var ev = e || window.event;
            if(ev.keyCode == 13 || ev.which==13){
                $("#findUserRule_search").trigger("click");
                $("input").blur();
            }
        });
        $('#findUserRule').on('show.bs.modal', function () {
            $("#userRule_multiselect").empty();
            $("#userRule_multiselect_to").empty();
            $('#findUserRule_name').val('');

            var url = base + '/admin/usercenter/rule/userrule/search';
            var $selectRules = $("#userRule_multiselect_to option");
            var selectedRuleIdList = new Array();
            if($selectRules && $selectRules.length > 0){
                for(var i=0; i<$selectRules.length; i++){
                    selectedRuleIdList.push($selectRules[i].value);

                }
            }
            var param = {
                relationType: findUserRuleType,
                relationId: $('#findUserRuleId').val(),
                selectedList: selectedRuleIdList,
                queryThing: $('#findUserRule_name').val()
            };
            $.ajax({
                type: 'post',
                url: url,
                data: JSON.stringify(param),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                success: function (response) {
                    $("#userRule_multiselect").empty();
                    var selObj = $("#userRule_multiselect");
                    var str = "";
                    for (var i = 0; i <= response.content.length - 1; i++) {
                        str += "<option value='" + response.content[i].id + "' ruleCode='"+ response.content[i].code + "'>" + response.content[i].name + "</option>"
                    }
                    selObj.append(str);
                }
            });
//            $myUserRuleTable.DataTable().ajax.url(base + '/admin/usercenter/rule/userrule/search?typeParentId=1'
//                    + '&assignType=' + findUserRuleType + '&assignId=' + $('#findUserRuleId').val()).load();
            /*$myUserRuleTable.DataTable().ajax.url(base + '/admin/usercenter/rule/nosearch').load();
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
            });*/
            $('#userRule_multiselect').multiselect();
        });

    });
