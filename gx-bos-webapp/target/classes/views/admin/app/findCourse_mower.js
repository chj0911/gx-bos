
var closeFindCourse = function () {
        var $myCourseTable = $('#myCourseTable'), findCourseParam, oldCourseIds = $('#oldCourseIds').val();
        var findCourseId = $('#findCourseId').val(), findCourseType = $('#findCourseType').val(),
                findCourseParentTableId = $('#findCourseParentTableId').val();
        var findCourseRow = $("#course_multiselect_to option");
        if (!findCourseRow || findCourseRow.length == 0) {
            ModalBox.alert('请选择一条数据');
            return;
        }
        
        if ($('#findCourseCallback').val()) {
    		var param = new Array();
    		for (var i = 0; i < findCourseRow.length; i++) {
    			var item = {
    				value : findCourseRow[i].value,
    				name : findCourseRow[i].text
    			};
    			param.push(item);
    		}
    		// 回调,将选中的群组信息以数组参数传递给调用者
    		eval($('#findCourseCallback').val()).call(null, param);
    		$('#findCourse').modal('hide');
    		return;
    	}
        
        var findCourseList = new Array();
        for (var i = 0; i < findCourseRow.length; i++) {
            findCourseList.push(findCourseRow[i].value);
        }
        if (oldCourseIds != null && oldCourseIds != '') {
            findCourseParam = {
                relationIds: findCourseList,
                id: findCourseId,
                olds: oldCourseIds
            };
        } else {
            findCourseParam = {
                relationIds: findCourseList,
                id: findCourseId
            };
        }
        var url = base + '/admin';
        if (findCourseType == 'plan') {
            url = url + '/studycenter/' + findCourseType + '/saveCourse';
        }else if(findCourseType == 'app_info'){
            $('#findCourse').modal('hide');
        }
        $.ajax({
            type: 'post',
            url: url,
            data: JSON.stringify(findCourseParam),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (response) {
                $('#findCourse').modal('hide');
                if (findCourseParentTableId) {
                    $('#div-' + findCourseParentTableId).show();
                    $('#' + findCourseParentTableId).DataTable().ajax.reload();
                }
            }
        });
    };
    $(function () {
        var CourseTreeType = [];

        var findCourseType = $('#findCourseType').val();
        var $myCourseTable = $('#myCourseTable');

        $('#findCourse_search').click(function(){
            var $jstree=$('#coursetype_jstree_group');
            var selectId = $jstree.jstree().get_selected();
            var $selectCourse = $("#course_multiselect_to option");
            var selectedCourseIdList = new Array();
            if($selectCourse && $selectCourse.length > 0){
                for(var i=0; i<$selectCourse.length; i++){
                    selectedCourseIdList.push($selectCourse[i].value);
                }
            }
            var url = base + '/admin/coursecenter/course_category/course/search';
            if(selectId && selectId.length > 0) {
                var param = {
                    selectId: selectId[0],
                    relationType : findCourseType,
                    relationId : $('#findCourseId').val(),
                    selectedList : selectedCourseIdList,
                    courseTerminal: $('#courseTerminal').val(),
                    queryThing: $('#findCourse_name').val()
                };
                $.ajax({
                    type: 'post',
                    url: url,
                    data: JSON.stringify(param),
                    dataType: 'json',
                    contentType: 'application/json;charset=utf-8',
                    success: function (response) {
                        $("#course_multiselect").empty();
                        var selObj = $("#course_multiselect");
                        var str = "";
                        for (var i = 0; i <= response.content.length - 1; i++) {
                            str += "<option value='" + response.content[i].id + "'>" + response.content[i].name + "</option>"
                        }
                        selObj.append(str);
                    }
                });
            }
        });

        $('#findCourse').on('show.bs.modal', function () {
            $("#course_multiselect").empty();
            $("#course_multiselect_to").empty();
            $('#findCourse_name').val('');

            $.getJSON(base + '/admin/coursecenter/course_category/searchCourseCategory', function (data) {
                var orgList = data.returnObject;
                for (var i = 0; i < orgList.length; i++) {
                    CourseTreeType.push({
                        id: orgList[i].id,
                        text: orgList[i].name,
                        data: orgList[i],
                        parent: (orgList[i].parentId ? orgList[i].parentId : '#'),
                        state:{opened:orgList[i].parentId  ? false : true}
                    });
                }
                $('#coursetype_jstree_group').jstree({
                    'core': {
                        'data': CourseTreeType
                    }
                });
                $('#coursetype_jstree_group').on('changed.jstree', function (e, data) {
                    var url = base + '/admin/coursecenter/course_category/course/search';
                    var $selectCourses = $("#course_multiselect_to option");
                    var selectedCourseIdList = new Array();
                    if($selectCourses && $selectCourses.length > 0){
                        for(var i=0; i<$selectCourses.length; i++){
                            selectedCourseIdList.push($selectCourses[i].value);
                        }
                    }
                    var param = {
                        selectId : data.node.data.id,
                        relationType : findCourseType,
                        relationId : $('#findCourseId').val(),
                        selectedList : selectedCourseIdList,
                        courseTerminal: $('#courseTerminal').val(),
                        queryThing: $('#findCourse_name').val()
                    };
                    $.ajax({
                        type: 'post',
                        url: url,
                        data: JSON.stringify(param),
                        dataType: 'json',
                        contentType: 'application/json;charset=utf-8',
                        success: function (response) {
                            $("#course_multiselect").empty();
                            var selObj = $("#course_multiselect");
                            var str = "";
                            for (var i = 0; i <= response.content.length-1; i++) {
                                str += "<option value='" + response.content[i].id + "'>" + response.content[i].name + "</option>"
                            }
                            selObj.append(str);
                        }
                    });
                });
            });

            $('#course_multiselect').multiselect();
        });
    });