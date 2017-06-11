    var closeCreateUserRule = function () {
        var type = $('#relationType').val();
        if(type == 'plan'){
            $('#create-user-rule-form').attr('action',base +'/admin/studycenter/plan/createUserRule');
        }

        if(type == 'train'){
            $("#rulePlanId").val($("#relationId").val());
            $('#create-user-rule-form').attr('action',base +'/admin/signUp/train/createUserRule');
        }

        if(type == 'honor'){
            $("#rulePlanId").val($("#relationId").val());
            $('#create-user-rule-form').attr('action',base +'/admin/pcbackground/honorroll/createUserRule');
        }

        if(type == "exam"){
            $("#rulePlanId").val($("#relationId").val());
            $('#create-user-rule-form').attr('action',base +'/admin/exam/examInfo/createUserRule');
        }

        if(type == "category"){
            $("#rulePlanId").val($("#relationId").val());
            $('#create-user-rule-form').attr('action',base +'/admin/infocenter/category/createUserRule');
        }

        if(type == "survey") {
            $("#rulePlanId").val($("#relationId").val());
            $('#create-user-rule-form').attr('action',base +'/admin/survey/type/createUserRule');
        }

        if(type == "share") {
            $("#rulePlanId").val($("#relationId").val());
            $('#create-user-rule-form').attr('action',base +'/admin/coursecenter/coursemanager/createUserRule');
        }

        var relationId = $('#relationId').val(), relationType = $('#relationType').val(),
                relationParentTableId = $('#relationParentTableId').val();
        var that = $(this), expTextRoles = '', expTextOrgs = '', extpTextDealerOrgs='',expTextGroups = '',
                expTextPosts = '',expTextRank='',expTextUserTypeElnAdmin='',expTextUserTypeElnClerk='',expTextStore='',expTextOfficeTitle='';
        var selectRoles = $('#jstree_rule_roles').jstree().get_checked(true);
        var selectGroups = $('#jstree_rule_groups').jstree().get_checked(true);
        var selectOrgs = $('#jstree_rule_orgs').jstree().get_checked(true);
        var selectPosts = $('#jstree_rule_posts').jstree().get_checked(true);
        var selectOfficeTitles = $('#jstree_rule_office_titles').jstree().get_checked(true);
        var selectRanks = $('#jstree_rule_ranks').jstree().get_checked(true);
        var selectBranch = $('#jstree_rule_branchs').jstree().get_checked(true);
        var selectStore = $('#jstree_rule_stores').jstree().get_checked(true);
        var selectUserTypeEln = $('input[name=userTypeEln]:checked');
        var selectAdministrative = false, selectClerk = false;

        if (selectRoles && selectRoles.length > 0) {
            for (var i = 0; i < selectRoles.length; i++) {
                if (i == 0 && i == selectRoles.length - 1) {
                    expTextRoles = '(' + expTextRoles + 'roleCodes.contains(\"' + selectRoles[i].data.code + '\")' + ')';
                } else if (i == 0 && i != selectRoles.length - 1) {
                    expTextRoles = '(' + expTextRoles + 'roleCodes.contains(\"' + selectRoles[i].data.code + '\")';
                } else if (i == selectRoles.length - 1) {
                    expTextRoles = expTextRoles + '||roleCodes.contains(\"' + selectRoles[i].data.code + '\")' + ')';
                } else {
                    expTextRoles = expTextRoles + '||roleCodes.contains(\"' + selectRoles[i].data.code + '\")';
                }
            }
        }

        if (selectGroups && selectGroups.length > 0) {
            for (var i = 0; i < selectGroups.length; i++) {
                if (i == 0 && i == selectGroups.length - 1) {
                    expTextGroups = '(' + expTextGroups + 'userGroupIds.contains(\"' + selectGroups[i].data.id + '\")' + ')';
                } else if (i == 0 && i != selectGroups.length - 1) {
                    expTextGroups = '(' + expTextGroups + 'userGroupIds.contains(\"' + selectGroups[i].data.id + '\")';
                } else if (i == selectGroups.length - 1) {
                    expTextGroups = expTextGroups + '||userGroupIds.contains(\"' + selectGroups[i].data.id + '\")' + ')';
                } else {
                    expTextGroups = expTextGroups + '||userGroupIds.contains(\"' + selectGroups[i].data.id + '\")';
                }
            }
        }

        if(selectUserTypeEln && selectUserTypeEln.length > 0){
            var value1='',value2='',value3='',value4='';
            for(var i=0; i<selectUserTypeEln.length;i++){
                var val = $(selectUserTypeEln[i]).val();
                if(val == 1 || val == 2){
                    selectAdministrative = true;
                    if(val == 1){
                        value1 = 'userType.equals(\"'+ val+'\")';
                    }else{
                        value2 = 'userType.equals(\"'+ val+'\")';
                    }
                }else if(val == 3 || val == 4){
                    selectClerk = true;
                    if(val == 3){
                        value3 = 'userType.equals(\"'+ val+'\")';
                    }else {
                        value4 = 'userType.equals(\"'+ val+'\")';
                    }
                }
            }
            if(value1.length >0 && value2.length > 0){
                expTextUserTypeElnAdmin = '(' + value1 + '||' + value2 + ')';
            }else if(value1.length > 0){
                expTextUserTypeElnAdmin = '(' + value1 + ')';
            }else if(value2.length > 0){
                expTextUserTypeElnAdmin = '(' + value2 + ')';
            }

            if(value3.length >0 && value4.length > 0){
                expTextUserTypeElnClerk = '(' + value3 + '||' + value4 + ')';
            }else if(value3.length > 0){
                expTextUserTypeElnClerk = '(' + value3 + ')';
            }else if(value4.length > 0){
                expTextUserTypeElnClerk = '(' + value4 + ')';
            }
        }

        if (selectOfficeTitles && selectAdministrative && selectOfficeTitles.length > 0) {
            for (var i = 0; i < selectOfficeTitles.length; i++) {
                if (i == 0 && i == selectOfficeTitles.length - 1) {
                    expTextOfficeTitle = '(' + expTextOfficeTitle + 'officeTitle.equals(\"' + selectOfficeTitles[i].id + '\")' + ')';
                } else if (i == 0 && i != selectOfficeTitles.length - 1) {
                    expTextOfficeTitle = '(' + expTextOfficeTitle + 'officeTitle.equals(\"' + selectOfficeTitles[i].id + '\")';
                } else if (i == selectOfficeTitles.length - 1) {
                    expTextOfficeTitle = expTextOfficeTitle + '||officeTitle.equals(\"' + selectOfficeTitles[i].id + '\")' + ')';
                } else {
                    expTextOfficeTitle = expTextOfficeTitle + '||officeTitle.equals(\"' + selectOfficeTitles[i].id + '\")';
                }
            }
        }

        if (selectPosts && selectAdministrative && selectPosts.length > 0) {
            for (var i = 0; i < selectPosts.length; i++) {
                if (i == 0 && i == selectPosts.length - 1) {
                    expTextPosts = '(' + expTextPosts + 'post.equals(\"' + selectPosts[i].id + '\")' + ')';
                } else if (i == 0 && i != selectPosts.length - 1) {
                    expTextPosts = '(' + expTextPosts + 'post.equals(\"' + selectPosts[i].id + '\")';
                } else if (i == selectPosts.length - 1) {
                    expTextPosts = expTextPosts + '||post.equals(\"' + selectPosts[i].id + '\")' + ')';
                } else {
                    expTextPosts = expTextPosts + '||post.equals(\"' + selectPosts[i].id + '\")';
                }
            }
        }

        if (selectRanks && selectClerk && selectRanks.length > 0) {
            for (var i = 0; i < selectRanks.length; i++) {
                if (i == 0 && i == selectRanks.length - 1) {
                    expTextRank = '(' + expTextRank + 'level.equals(\"' + selectRanks[i].id + '\")' + ')';
                } else if (i == 0 && i != selectRanks.length - 1) {
                    expTextRank = '(' + expTextRank + 'level.equals(\"' + selectRanks[i].id + '\")';
                } else if (i == selectRanks.length - 1) {
                    expTextRank = expTextRank + '||level.equals(\"' + selectRanks[i].id + '\")' + ')';
                } else {
                    expTextRank = expTextRank + '||level.equals(\"' + selectRanks[i].id + '\")';
                }
            }
        }

        if (selectBranch && selectClerk && selectBranch.length > 0) {
            for (var i = 0; i < selectBranch.length; i++) {
                if (i == 0 && i == selectBranch.length - 1) {
                    extpTextDealerOrgs = '(' + extpTextDealerOrgs + 'dealerOrg.equals(\"' + selectBranch[i].id + '\")' + ')';
                } else if (i == 0 && i != selectBranch.length - 1) {
                    extpTextDealerOrgs = '(' + extpTextDealerOrgs + 'dealerOrg.equals(\"' + selectBranch[i].id + '\")';
                } else if (i == selectBranch.length - 1) {
                    extpTextDealerOrgs = extpTextDealerOrgs + '||dealerOrg.equals(\"' + selectBranch[i].id + '\")' + ')';
                } else {
                    extpTextDealerOrgs = extpTextDealerOrgs + '||dealerOrg.equals(\"' + selectBranch[i].id + '\")';
                }
            }
        }

        if(selectOrgs && selectAdministrative && selectOrgs.length > 0){
            for (var i = 0; i < selectOrgs.length; i++) {
                if (i == 0 && i == selectOrgs.length - 1) {
                    expTextOrgs = '(' + expTextOrgs + 'org.equals(\"' + selectOrgs[i].data.code + '\")' + ')';
                } else if (i == 0 && i != selectOrgs.length - 1) {
                    expTextOrgs = '(' + expTextOrgs + 'org.equals(\"' + selectOrgs[i].data.code + '\")';
                } else if (i == selectOrgs.length - 1) {
                    expTextOrgs = expTextOrgs + '||org.equals(\"' + selectOrgs[i].data.code + '\")' + ')';
                } else {
                    expTextOrgs = expTextOrgs + '||org.equals(\"' + selectOrgs[i].data.code + '\")';
                }
            }
        }

        if(selectStore && selectClerk && selectStore.length > 0){
            for (var i = 0; i < selectStore.length; i++) {
                if (i == 0 && i == selectStore.length - 1) {
                    expTextStore = '(' + expTextStore + 'storeType.equals(\"' + selectStore[i].id + '\")' + ')';
                } else if (i == 0 && i != selectStore.length - 1) {
                    expTextStore = '(' + expTextStore + 'storeType.equals(\"' + selectStore[i].id + '\")';
                } else if (i == selectStore.length - 1) {
                    expTextStore = expTextStore + '||storeType.equals(\"' + selectStore[i].id + '\")' + ')';
                } else {
                    expTextStore = expTextStore + '||storeType.equals(\"' + selectStore[i].id + '\")';
                }
            }
        }


        var expText = '';

        var adminExpText = '', clerkExpText = '';

        if (expTextUserTypeElnAdmin && expTextUserTypeElnAdmin.length > 0) {
            if (adminExpText && adminExpText.length > 0) {
                adminExpText = adminExpText + '&&' + expTextUserTypeElnAdmin;
            } else {
                adminExpText = adminExpText + expTextUserTypeElnAdmin;
            }
        }

        if (expTextUserTypeElnClerk && expTextUserTypeElnClerk.length > 0) {
            if (clerkExpText && clerkExpText.length > 0) {
                clerkExpText = clerkExpText + '&&' + expTextUserTypeElnClerk;
            } else {
                clerkExpText = clerkExpText + expTextUserTypeElnClerk;
            }
        }

        if (expTextRoles && expTextRoles.length > 0) {
            if (expText && expText.length > 0) {
                expText = expText + '&&' + expTextRoles;
            } else {
                expText = expText + expTextRoles;
            }
        }
        if (expTextGroups && expTextGroups.length > 0) {
            if (expText && expText.length > 0) {
                expText = expText + '&&' + expTextGroups;
            } else {
                expText = expText + expTextGroups;
            }
        }
        if (expTextOrgs && expTextOrgs.length > 0) {
            if (adminExpText && adminExpText.length > 0) {
                adminExpText = adminExpText + '&&' + expTextOrgs;
            } else {
                adminExpText = adminExpText + expTextOrgs;
            }
        }
        if (expTextPosts && expTextPosts.length > 0) {
            if (adminExpText && adminExpText.length > 0) {
                adminExpText = adminExpText + '&&' + expTextPosts;
            } else {
                adminExpText = adminExpText + expTextPosts;
            }
        }

        if(expTextOfficeTitle && expTextOfficeTitle.length > 0){
            if (adminExpText && adminExpText.length > 0) {
                adminExpText = adminExpText + '&&' + expTextOfficeTitle;
            } else {
                adminExpText = adminExpText + expTextOfficeTitle;
            }
        }

        if(extpTextDealerOrgs && extpTextDealerOrgs.length > 0){
            if (clerkExpText && clerkExpText.length > 0) {
                clerkExpText = clerkExpText + '&&' + extpTextDealerOrgs;
            } else {
                clerkExpText = clerkExpText + extpTextDealerOrgs;
            }
        }

        if(expTextRank && expTextRank.length > 0){
            if (clerkExpText && clerkExpText.length > 0) {
                clerkExpText = clerkExpText + '&&' + expTextRank;
            } else {
                clerkExpText = clerkExpText + expTextRank;
            }
        }
        if(expTextStore && expTextStore.length > 0){
            if (clerkExpText && clerkExpText.length > 0) {
                clerkExpText = clerkExpText + '&&' + expTextStore;
            } else {
                clerkExpText = clerkExpText + expTextStore;
            }
        }

        if(adminExpText.length > 0 && clerkExpText.length > 0){
            expText = expText + '&&((' + adminExpText + ')||(' + clerkExpText + '))';
        }else if(adminExpText.length > 0){
            expText = expText + '&&(' + adminExpText + ')';
        }else if(clerkExpText.length > 0){
            expText = expText + '&&(' + clerkExpText + ')';
        }

        if (expText == '' || expText.length == 0) {
            MessageBox.info('请选择关联资源');
            return;
        } else {
            $('#expText').val(expText);
        }

        if (expText == '' || expText.length == 0) {
            MessageBox.info('请选择关联资源');
            return;
        } else {
            $('#expText').val(expText);
        }

        var flag = $('#create-user-rule-form').valid();
        if (!flag) {
            return;
        }
        $('#create-user-rule-form').ajaxValidSubmit({
            success: function (data) {
                MessageBox.success('保存成功');
                $('#createUserRule').modal('hide');
                if (relationParentTableId) {
                    if(type == 'survey') {
                        var ruturnId = data.returnObject;
                        var ids = $('#createdSurvey_userRuleIds').val();
                        if(ids && ids.length) {
                           ids += ',' +  ruturnId;
                        }else{
                            ids = ruturnId;
                        }
                        $('#createdSurvey_userRuleIds').val(ids);
                        var url = $('#' + relationParentTableId).attr('data-ajax-url');
                        var k = url.split("?")
                        if(k.length > 1) {
                            url = k[0] + "?ids=" + ids
                        }
                        $('#' + relationParentTableId).DataTable().ajax.url(url).load();
                        $('#div-' + relationParentTableId).show();
                    }else {
                        $('#' + relationParentTableId).DataTable().ajax.reload();
                        $('#div-' + relationParentTableId).show();
                    }
                }
            },
            error: function (data) {
                if ('数据绑定出错' == data.exceptionMessage) {
                    ModalBox.alert(data.validateErrors[0].element + '数据绑定' + data.validateErrors[0].message);
                } else {
                    ModalBox.alert(data.exceptionMessage);
                }
            }
        });
    };
    $(function () {
        formInitFunc("create-user-rule-form");
        $('input[name="rule.code"]').bind('myCheck',function(){
            var url = base + '/admin/usercenter/rule/checkRuleCode?value='+$('input[name="rule.code"]').val()+'&id='+$('input[name="rule.id"]').val();
            $.ajax({
                type: 'post',
                url: url,
                async : false,
                success: function (response) {
                    if (!response.success) {
                        $('input[name="rule.code"]').attr("isRepeat",0);
                    }else{
                        $('input[name="rule.code"]').attr("isRepeat",1);
                    }
                }
            });
        });

        $('#userTypeEln1').click(function () {
            if ($('#userTypeEln1')[0].checked || $('#userTypeEln2')[0].checked) {
                $('#org_div1').show();
                $('#post_rule_div').show();
                $('#title_rule_div').show();
            }else{
                $('#org_div1').hide();
                $('#post_rule_div').hide();
                $('#title_rule_div').hide();
            }
        });
        $('#userTypeEln2').click(function () {
            if ($('#userTypeEln1')[0].checked || $('#userTypeEln2')[0].checked) {
                $('#org_div1').show();
                $('#post_rule_div').show();
                $('#title_rule_div').show();
            }else{
                $('#org_div1').hide();
                $('#post_rule_div').hide();
                $('#title_rule_div').hide();
            }
        });

        $('#userTypeEln3').click(function () {
            if ($('#userTypeEln3')[0].checked || $('#userTypeEln4')[0].checked) {
                $('#org_div2').show();
                $('#rank_div').show();
                $('#store_div').show();
            }else{
                $('#org_div2').hide();
                $('#rank_div').hide();
                $('#store_div').hide();
            }
        });

        $('#userTypeEln4').click(function () {
            if ($('#userTypeEln3')[0].checked || $('#userTypeEln4')[0].checked) {
                $('#org_div2').show();
                $('#rank_div').show();
                $('#store_div').show();
            }else{
                $('#org_div2').hide();
                $('#rank_div').hide();
                $('#store_div').hide();
            }
        });

        $('#createUserRule').on('show.bs.modal', function () {
            $('#resetRule').click();

            $('#org_div1').hide();
            $('#post_rule_div').hide();
            $('#org_div2').hide();
            $('#rank_div').hide();
            $('#store_div').hide();

            var treeRoles = [], treePosts = [], treeOrgs = [], treeGroups = [],
                    treeRanks = [], treeBranch=[], treeStore=[], treeTitles=[];
            $('input[name="rule.code"]').bind('myCheck',function(){
                var url = base + '/admin/usercenter/rule/checkRuleCode?value='+$('input[name="rule.code"]').val()+'&id='+$('input[name="rule.id"]').val();
                $.ajax({
                    type: 'post',
                    url: url,
                    async : false,
                    success: function (response) {
                        if (!response.success) {
                            $('input[name="rule.code"]').attr("isRepeat",0);
                        }else{
                            $('input[name="rule.code"]').attr("isRepeat",1);
                        }
                    }
                });
            });

            $.getJSON(base + '/admin/usercenter/rule/findResources', function (response) {
                var data = response.returnObject;
                if (data.roles) {
                    for (var i = 0; i < data.roles.length; i++) {
                        treeRoles.push({
                            id: data.roles[i].id,
                            text: data.roles[i].name,
                            data: data.roles[i],
                            //state: {disabled: data.roles[i].group},
                            parent: (data.roles[i].parentId ? data.roles[i].parentId : '#')
                        });
                    }
                }

                if (data.groups) {
                    for (var i = 0; i < data.groups.length; i++) {
                        treeGroups.push({
                            id: data.groups[i].id,
                            text: data.groups[i].name,
                            data: data.groups[i],
                            //state: {disabled: data.groups[i].group},
                            parent: (data.groups[i].parentId ? data.groups[i].parentId : '#')
                        });
                    }
                }

                if (data.orgs) {
                    for (var i = 0; i < data.orgs.length; i++) {
                        treeOrgs.push({
                            id: data.orgs[i].id,
                            text: data.orgs[i].name,
                            data: data.orgs[i],
                            parent: (data.orgs[i].parentId ? data.orgs[i].parentId : '#')
                        });
                    }
                }


                if(data.regions){
                    for (var i = 0; i < data.regions.length; i++) {
                        treeBranch.push({
                            id: data.regions[i].regionNo,
                            text: data.regions[i].regionDesc,
                            data: data.regions[i],
                            parent: '#'
                        });
                    }
                    if(data.branches){
                        for (var i = 0; i < data.branches.length; i++) {
                            treeBranch.push({
                                id: data.branches[i].branchNo,
                                text: data.branches[i].branchDesc,
                                data: data.branches[i],
                                parent: (data.branches[i].regionNo ? data.branches[i].regionNo : '#')
                            });
                        }
                    }
                }

                if(data.posts){
                    treePosts.push({
                        id: 'all',
                        text: '全部',
                        state: {disabled: true},
                        parent: '#'
                    });
                    for (var i = 0; i < data.posts.length; i++) {
                        treePosts.push({
                            id: data.posts[i].code,
                            text: data.posts[i].label,
                            parent: 'all'
                        });
                    }
                }

                if(data.levels){
                    treeRanks.push({
                        id: 'all',
                        text: '全部',
                        state: {disabled: true},
                        parent: '#'
                    });
                    for (var i = 0; i < data.levels.length; i++) {
                        treeRanks.push({
                            id: data.levels[i].code,
                            text: data.levels[i].label,
                            parent: 'all'
                        });
                    }
                }

                if(data.officeTitles){
                    treeTitles.push({
                        id: 'all',
                        text: '全部',
                        state: {disabled: true},
                        parent: '#'
                    });
                    for (var i = 0; i < data.officeTitles.length; i++) {
                        treeTitles.push({
                            id: data.officeTitles[i].code,
                            text: data.officeTitles[i].label,
                            parent: 'all'
                        });
                    }
                }

                treeStore.push({
                    id: 0,
                    text: '全部',
                    state: {disabled: true},
                    parent: '#'
                });
                treeStore.push({
                    id: 1,
                    text: '专卖店',
                    parent: 0
                });
                treeStore.push({
                    id: 4,
                    text: '可订货工作室',
                    parent: 0
                });
                treeStore.push({
                    id: 5,
                    text: '不可订货工作室',
                    parent: 0
                });

                $('#jstree_rule_roles').jstree({
                    'core': {
                        'data': treeRoles
                    },
                    'checkbox': {
                        'keep_selected_style': false
                        //'three_state': false
                    },
                    'plugins': ['wholerow', 'checkbox']
                }).bind('select_node.jstree',function(event,data){
                    $('#jstree_rule_roles').jstree("open_node", "#"+data.node.id);
                    var arr = data.node.children_d;
                    for(var i= 0,length=arr.length; i<length; i++){
                        $('#jstree_rule_roles').jstree("open_node", "#"+arr[i]);
                    }
                }).bind("deselect_node.jstree",function(e,data){ //点击事件
                    $('#jstree_rule_roles').jstree("close_node", "#"+data.node.id);

                    var arr = data.node.children_d;
                    for(var i= 0,length=arr.length; i<length; i++){
                        $('#jstree_rule_roles').jstree("close_node", "#"+arr[i]);
                    }
                });
                $('#jstree_rule_groups').jstree({
                    'core': {
                        'data': treeGroups
                    },
                    'checkbox': {
                        'keep_selected_style': false
                        //'three_state': false
                    },
                    'plugins': ['wholerow', 'checkbox']
                }).bind('select_node.jstree',function(event,data){
                    $('#jstree_rule_groups').jstree("open_node", "#"+data.node.id);
                    var arr = data.node.children_d;
                    for(var i= 0,length=arr.length; i<length; i++){
                        $('#jstree_rule_groups').jstree("open_node", "#"+arr[i]);
                    }
                }).bind("deselect_node.jstree",function(e,data){ //点击事件
                    $('#jstree_rule_groups').jstree("close_node", "#"+data.node.id);

                    var arr = data.node.children_d;
                    for(var i= 0,length=arr.length; i<length; i++){
                        $('#jstree_rule_groups').jstree("close_node", "#"+arr[i]);
                    }
                });

                $('#jstree_rule_posts').jstree({
                    'core': {
                        'data': treePosts
                    },
                    'checkbox': {
                        'keep_selected_style': false
                        //'three_state': false
                    },
                    'plugins': ['wholerow', 'checkbox']
                }).bind('select_node.jstree',function(event,data){
                    $('#jstree_rule_posts').jstree("open_node", "#"+data.node.id);
                    var arr = data.node.children_d;
                    for(var i= 0,length=arr.length; i<length; i++){
                        $('#jstree_rule_posts').jstree("open_node", "#"+arr[i]);
                    }
                }).bind("deselect_node.jstree",function(e,data){ //点击事件
                    $('#jstree_rule_posts').jstree("close_node", "#"+data.node.id);

                    var arr = data.node.children_d;
                    for(var i= 0,length=arr.length; i<length; i++){
                        $('#jstree_rule_posts').jstree("close_node", "#"+arr[i]);
                    }
                });

                $('#jstree_rule_orgs').jstree({
                    'core': {
                        'data': treeOrgs
                    },
                    'checkbox': {
                        'keep_selected_style': false
                        //'three_state': false
                    },
                    'plugins': ['wholerow', 'checkbox']
                }).bind('select_node.jstree',function(event,data){
                    $('#jstree_rule_orgs').jstree("open_node", "#"+data.node.id);
                    var arr = data.node.children_d;
                    for(var i= 0,length=arr.length; i<length; i++){
                        $('#jstree_rule_orgs').jstree("open_node", "#"+arr[i]);
                    }
                }).bind("deselect_node.jstree",function(e,data){ //点击事件
                    $('#jstree_rule_orgs').jstree("close_node", "#"+data.node.id);

                    var arr = data.node.children_d;
                    for(var i= 0,length=arr.length; i<length; i++){
                        $('#jstree_rule_orgs').jstree("close_node", "#"+arr[i]);
                    }
                });


                $('#jstree_rule_branchs').jstree({
                    'core': {
                        'data': treeBranch
                    },
                    'checkbox': {
                        'keep_selected_style': false
                        //'three_state': false
                    },
                    'plugins': ['wholerow', 'checkbox']
                }).bind('select_node.jstree',function(event,data){
                    $('#jstree_rule_branchs').jstree("open_node", "#"+data.node.id);
                    var arr = data.node.children_d;
                    for(var i= 0,length=arr.length; i<length; i++){
                        $('#jstree_rule_branchs').jstree("open_node", "#"+arr[i]);
                    }
                }).bind("deselect_node.jstree",function(e,data){ //点击事件
                    $('#jstree_rule_branchs').jstree("close_node", "#"+data.node.id);

                    var arr = data.node.children_d;
                    for(var i= 0,length=arr.length; i<length; i++){
                        $('#jstree_rule_branchs').jstree("close_node", "#"+arr[i]);
                    }
                });


                $('#jstree_rule_ranks').jstree({
                    'core': {
                        'data': treeRanks
                    },
                    'checkbox': {
                        'keep_selected_style': true,
                        'three_state': false
                    },
                    'plugins': ['wholerow', 'checkbox']
                });

                $('#jstree_rule_office_titles').jstree({
                    'core': {
                        'data': treeTitles
                    },
                    'checkbox': {
                        'keep_selected_style': true,
                        'three_state': false
                    },
                    'plugins': ['wholerow', 'checkbox']
                });

                $('#jstree_rule_stores').jstree({
                    'core': {
                        'data': treeStore
                    },
                    'checkbox': {
                        'keep_selected_style': true,
                        'three_state': false
                    },
                    'plugins': ['wholerow', 'checkbox']
                });
            });
        });
    });
