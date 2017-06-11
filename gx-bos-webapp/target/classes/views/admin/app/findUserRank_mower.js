
var closeFindUserRule = function () {
        
        var selectedRows = $("#userRank_multiselect_to option");
        if (!selectedRows || selectedRows.length == 0) {
            ModalBox.alert('请选择一条数据');
            return;
        }
        if( $('#findUserRankCallback').val() ){
        	var param = new Array();
    		for (var i = 0; i < selectedRows.length; i++) {
    			var item = {
    				value : selectedRows[i].value,
    				name : selectedRows[i].text
    			};
    			param.push(item);
    		}
    		// 回调,将选中的职级信息以数组参数传递给调用者
    		eval($('#findUserRankCallback').val()).call(null, param);
    		$('#findUserRank').modal('hide');
        }else{
        	//暂时只支持回调方式
        }
    };
    $(function () {

    	/**
    	 * 加载所有用户职级
    	 * */
        $('#findUserRank').on('show.bs.modal', function () {
            $("#userRank_multiselect").empty();
            $("#userRank_multiselect_to").empty();

            var url = base + '/admin/usercenter/rank/findAll';
            $.get(url,function(response){
            	$("#userRank_multiselect").empty();
                if( response.returnObject ){
                	var str = "";
                	for (var i = 0; i < response.returnObject.length; i++) {
                		var row = response.returnObject[i];
                		str += "<option value='" + row.code + "'>" + row.label + "</option>"
                	}
                	$("#userRank_multiselect").append(str);
                }
            });
            $('#userRank_multiselect').multiselect();            
        });

    });
