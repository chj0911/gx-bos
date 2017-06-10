/*****************************************************************
 jQuery Validate扩展验证方法
 *****************************************************************/
$(function(){

    // 判断整数value是否等于0
    jQuery.validator.addMethod("isIntEqZero", function(value, element) {
        value=parseInt(value);
        return this.optional(element) || value==0;
    }, "整数必须为0");

    // 判断整数value是否大于0
    jQuery.validator.addMethod("isIntGtZero", function(value, element) {
        value=parseInt(value);
        return this.optional(element) || value>0;
    }, "整数必须大于0");

    // 判断整数value是否大于或等于0
    jQuery.validator.addMethod("isIntGteZero", function(value, element) {
        value=parseInt(value);
        return this.optional(element) || value>=0;
    }, "整数必须大于或等于0");

    // 判断整数value是否不等于0
    jQuery.validator.addMethod("isIntNEqZero", function(value, element) {
        value=parseInt(value);
        return this.optional(element) || value!=0;
    }, "整数必须不等于0");

    // 判断整数value是否小于0
    jQuery.validator.addMethod("isIntLtZero", function(value, element) {
        value=parseInt(value);
        return this.optional(element) || value<0;
    }, "整数必须小于0");

    // 判断整数value是否小于或等于0
    jQuery.validator.addMethod("isIntLteZero", function(value, element) {
        value=parseInt(value);
        return this.optional(element) || value<=0;
    }, "整数必须小于或等于0");

    // 判断浮点数value是否等于0
    jQuery.validator.addMethod("isFloatEqZero", function(value, element) {
        value=parseFloat(value);
        return this.optional(element) || value==0;
    }, "浮点数必须为0");

    // 判断浮点数value是否大于0
    jQuery.validator.addMethod("isFloatGtZero", function(value, element) {
        value=parseFloat(value);
        return this.optional(element) || value>0;
    }, "浮点数必须大于0");

    // 判断浮点数value是否大于或等于0
    jQuery.validator.addMethod("isFloatGteZero", function(value, element) {
        value=parseFloat(value);
        return this.optional(element) || value>=0;
    }, "浮点数必须大于或等于0");

    // 判断浮点数value是否不等于0
    jQuery.validator.addMethod("isFloatNEqZero", function(value, element) {
        value=parseFloat(value);
        return this.optional(element) || value!=0;
    }, "浮点数必须不等于0");

    // 判断浮点数value是否小于0
    jQuery.validator.addMethod("isFloatLtZero", function(value, element) {
        value=parseFloat(value);
        return this.optional(element) || value<0;
    }, "浮点数必须小于0");

    // 判断浮点数value是否小于或等于0
    jQuery.validator.addMethod("isFloatLteZero", function(value, element) {
        value=parseFloat(value);
        return this.optional(element) || value<=0;
    }, "浮点数必须小于或等于0");

    // 判断浮点型
    jQuery.validator.addMethod("isFloat", function(value, element) {
        return this.optional(element) || /^[-\+]?\d+(\.\d+)?$/.test(value);
    }, "只能包含数字、小数点等字符");

    // 匹配integer
    jQuery.validator.addMethod("isInteger", function(value, element) {
        return this.optional(element) || (/^[-\+]?\d+$/.test(value) && parseInt(value)>=0);
    }, "匹配整数类型");

    // 匹配integer
    jQuery.validator.addMethod("isPercent", function(value, element) {
        return this.optional(element) || (/^[-\+]?\d+$/.test(value) && parseInt(value)>=0 && parseInt(value)<=100);
    }, "匹配整数类型(0~100之间)");

    // 判断数值类型，包括整数和浮点数
    jQuery.validator.addMethod("isNumber", function(value, element) {
        return this.optional(element) || /^[-\+]?\d+$/.test(value) || /^[-\+]?\d+(\.\d+)?$/.test(value);
    }, "匹配数值类型，包括整数和浮点数");

    // 只能输入[0-9]数字
    jQuery.validator.addMethod("isDigits", function(value, element) {
        return this.optional(element) || /^\d+$/.test(value);
    }, "只能输入0-9数字");

    // 判断中文字符
    jQuery.validator.addMethod("isChinese", function(value, element) {
        return this.optional(element) || /^[\u0391-\uFFE5]+$/.test(value);
    }, "只能包含中文字符。");

    // 判断英文字符
    jQuery.validator.addMethod("isEnglish", function(value, element) {
        return this.optional(element) || /^[A-Za-z]+$/.test(value);
    }, "只能包含英文字符。");

    // 手机号码验证
    jQuery.validator.addMethod("isMobile", function(value, element) {
        var length = value.length;
        return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value));
    }, "请正确填写您的手机号码。");

    // 电话号码验证
    jQuery.validator.addMethod("isPhone", function(value, element) {
        var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
        return this.optional(element) || (tel.test(value));
    }, "请正确填写您的电话号码。");

    // 联系电话(手机/电话皆可)验证
    jQuery.validator.addMethod("isTel", function(value,element) {
        var length = value.length;
        var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
        return this.optional(element) || tel.test(value) || (length==11 && mobile.test(value));
    }, "请正确填写您的联系方式");

    // 匹配qq
    jQuery.validator.addMethod("isQq", function(value, element) {
        return this.optional(element) || /^[1-9]\d{4,12}$/;
    }, "匹配QQ");

    // 邮政编码验证
    jQuery.validator.addMethod("isZipCode", function(value, element) {
        var zip = /^[0-9]{6}$/;
        return this.optional(element) || (zip.test(value));
    }, "请正确填写您的邮政编码。");

    // 匹配密码，以字母开头，长度在6-12之间，只能包含字符、数字和下划线。
    jQuery.validator.addMethod("isPwd", function(value, element) {
        return this.optional(element) || /^[a-zA-Z]\\w{6,12}$/.test(value);
    }, "以字母开头，长度在6-12之间，只能包含字符、数字和下划线。");

    // 身份证号码验证
    jQuery.validator.addMethod("isIdCardNo", function(value, element) {
        //var idCard = /^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/;
        return this.optional(element) || isIdCardNo(value);
    }, "请输入正确的身份证号码。");

    // IP地址验证
    jQuery.validator.addMethod("ip", function(value, element) {
        return this.optional(element) || /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/.test(value);
    }, "请填写正确的IP地址。");

    // 字符验证，只能包含中文、英文、数字、下划线等字符。
    jQuery.validator.addMethod("stringCheck", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/.test(value);
    }, "只能包含中文、英文、数字、下划线等字符");

    // 字符验证，除了纯空格，支持中文、英文、数字、空格、括号、下划线、中划线、点号及其组合，包括中文（）—。，
    jQuery.validator.addMethod("charCheck", function(value, element) {
        return this.optional(element) ||/^[a-zA-Z0-9\u4e00-\u9fa5-_().（）—。，\s]*[a-zA-Z0-9\u4e00-\u9fa5-_().（）—。，][a-zA-Z0-9\u4e00-\u9fa5-_().（）—。，\s]*$/g.test(value);
    }, "支持中文、英文、数字、空格、括号、下划线、中划线、点号及其组合（单独输入空格不支持）");
    
    // 字符验证，除了纯空格，支持中文、英文、数字、空格、括号、下划线、中划线、点号及其组合，包括中文（）—。，
    jQuery.validator.addMethod("charChecks", function(value, element) {
    	return this.optional(element) ||/^[a-zA-Z0-9\u4e00-\u9fa5-_(),（）—。，\s]*[a-zA-Z0-9\u4e00-\u9fa5-_(),（）—。，][a-zA-Z0-9\u4e00-\u9fa5-_(),（）—。，\s]*$/g.test(value);
    }, "支持中文、英文、数字、空格、括号、下划线、中划线、逗号及其组合（单独输入空格不支持）");

    // 字符验证，除了纯空格，支持英文、数字、空格、下划线、中划线、点号及其组合
    jQuery.validator.addMethod("charEnCheck", function(value, element) {
        return this.optional(element) ||/^[a-zA-Z0-9-_.\s]*[a-zA-Z0-9-_.][a-zA-Z0-9-_.\s]*$/g.test(value);
    }, "支持英文、数字、空格、下划线、中划线、点号及其组合（单独输入空格不支持）");

    jQuery.validator.addMethod("codeEnCheck", function(value, element) {
        return this.optional(element) ||/^[a-zA-Z0-9-_.\s]*[a-zA-Z0-9-_.][a-zA-Z0-9-_.\s]*$/g.test(value);
    }, "编号支持英文、数字、空格、下划线、中划线、点号及其组合（单独输入空格不支持）");


    // 角色编码字符验证，除了纯空格，支持英文、数字、空格、下划线、中划线、点号及其组合
    jQuery.validator.addMethod("roleCharEnCheck", function(value, element) {
        return this.optional(element) ||/^[a-zA-Z0-9-_.\s]*[a-zA-Z0-9-_.][a-zA-Z0-9-_.\s]*$/g.test(value);
    }, "编码支持英文、数字、空格、下划线、中划线、点号及其组合（单独输入空格不支持）");

    // 字符验证，不能只输入纯空格
    jQuery.validator.addMethod("isSpaceLimit", function(value, element) {
        return this.optional(element) ||/^[\s]*$/g.test(value)==false;
    }, "单独输入空格不支持");

    // 匹配english
    jQuery.validator.addMethod("isEnglish", function(value, element) {
        return this.optional(element) || /^[A-Za-z]+$/.test(value);
    }, "匹配English");

    // 匹配汉字E
    jQuery.validator.addMethod("isChinese", function(value, element) {
        return this.optional(element) || /^[\u4e00-\u9fa5]+$/.test(value);
    }, "匹配汉字");

    // 匹配中文(包括汉字和字符)
    jQuery.validator.addMethod("isChineseChar", function(value, element) {
        return this.optional(element) || /^[\u0391-\uFFE5]+$/.test(value);
    }, "匹配中文(包括汉字和字符) ");

    // 判断是否为合法字符(a-zA-Z0-9-_)
    jQuery.validator.addMethod("isRightfulString", function(value, element) {
        return this.optional(element) || /^[A-Za-z0-9_-]+$/.test(value);
    }, "支持英文、数字、下划线、中划线");

    // 判断是否包含中英文特殊字符，除英文"-_"字符外
    jQuery.validator.addMethod("isContainsSpecialChar", function(value, element) {
        var reg = RegExp(/[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/);
        return this.optional(element) || !reg.test(value);
    }, "<font color='#E47068'>含有中英文特殊字符</font>");
    // url地址验证
      /* /^http:\/\/([\w]+\.)+[\w]+(\/[\w\-\./?%&=]*)?$/g.test(value) ||
    /^https:\/\/([\w]+\.)+[\w]+(\/[\w\-\./?%&=]*)?$/g.test(value)||
    /^([\w]+\.)+[\w]+(\/[\w\-\./?%&=]*)?$/g.test(value) || /^\w+(\/)*!/.test(value);*/
    jQuery.validator.addMethod("url", function(value, element) {
        /*var strRegex = '^((https|http|ftp|rtsp|mms)?://)'
            + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
            + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
            + '|' // 允许IP和DOMAIN（域名）
            + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
            + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
            + '[a-z]{2,6})' // first level domain- .com or .museum
            + '(:[0-9]{1,4})?' // 端口- :80
            + '((/?)|' // a slash isn't required if there is no file name
            + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';*/
        var re = /^((http|ftp|https):\/\/)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9\&%_\.\/-~-]*)?$/g;
       
        if(!isNull(value)){
        	var lastChar=value.substr(value.length-1,1);
        	if(lastChar=='/');
        	value=value.substr(0,value.length-1);
        }
        
        return this.optional(element) || re.test(value);
    }, "请填写正确的url链接");

    // 只能输入[0-1500]数字
    jQuery.validator.addMethod("isApplyPeopleLimit", function(value, element) {
        return this.optional(element) || isLimitNumber(value);
    }, "请输入0-1500之间的正整数");

    // 应用选择必填项提示语
    jQuery.validator.addMethod("requiredApp", function(value, element) {
        return  value.length>0;
    }, "请选择一个应用");
    // 子菜单必填项提示语
    jQuery.validator.addMethod("requiredChild", function(value, element) {
        return value.length>0;
    }, "请至少添加一个子菜单");

    // 只能输入职级代码(40、50、60、70、80、90)
    jQuery.validator.addMethod("isLevelMode", function(value, element) {
        return this.optional(element) || /^\d{1,4}$/i.test(value);
    }, "请输入大于或等于0的1到4位整数");

    // 只能输入一到二位数职级代码
    jQuery.validator.addMethod("isJobLevel", function(value, element) {
        return this.optional(element) || /^\d{1,2}$/i.test(value)||jobValidate(value);
    }, "输1~2位职级代码,多个用英文逗号隔开");

    // 单个标签限20个字
    jQuery.validator.addMethod("isTagLimit", function(value, element) {
        return this.optional(element) || tagLimitValidate(value);
    }, "单个标签限20个字，多个标签之间用英文逗号隔开");

    // 单个标签限20个字
    jQuery.validator.addMethod("isCourseTagLimit", function(value, element) {
        return this.optional(element) || tagCourseLimitValidate(value);
    }, "单个标签限25个字，多个标签之间用英文逗号隔开");

    // 判断角色编码是否重复
    jQuery.validator.addMethod("checkRepeat", function(value, element) {
        $(element).trigger("myCheck");
        return true == $(element).attr("isRepeat");
    }, "数据已存在");

    // 判断问卷编码是否重复
    jQuery.validator.addMethod("paperNumberRepeatCheck", function(value, element) {
        return undefined == $(element).attr("repeat");
    }, "该问卷编码已存在");

    // 判断考试编号是否重复
    jQuery.validator.addMethod("paperCodeRepeatCheck", function(value, element) {
        return undefined == $(element).attr("repeat");
    }, "该考试编号已存在");

    // 判断两个input值为从小到大的范围，需要两个input为兄弟元素
    jQuery.validator.addMethod("checkRange", function(value, element) {
        return this.optional(element) || checkRange(value,element);
    }, "请输入正确的范围");

    // 判断邮箱地址
    jQuery.validator.addMethod("isEmail", function(value, element) {
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        return this.optional(element) || reg.test(value);
    }, "请输入正确的邮箱地址");

    // 判断非全空格输入
    jQuery.validator.addMethod("isNotNull", function(value, element) {
        var tmp = value.trim();
        return this.optional(element) || tmp != '';
    }, "请输入非全空格数据");


    function checkRange(value,element){
        var target=$(element).siblings("input");
        var minCharge = parseInt(target.val());
        value = parseInt(value);
        if(target.length==1){
            if (value >= minCharge) {
                return true;
            } else {
                return false;
            }
        }else{
            console.log("请将input置于兄弟元素中")
        }
    }

    function jobValidate(value){
        var arr=value.split(",");
        for(var i=0;i<arr.length;i++){
            if(/^\d{1,2}$/g.test(arr[i])==false){
                return false;
            }
        }
        return true;
    }
    function tagLimitValidate(value){
        if (value.indexOf("，")>0){
            return false;
        }
        var arr=value.split(",");
        for(var i=0;i<arr.length;i++){
            if(arr[i].length>20){
                return false;
            }
        }
        return true;
    }

    function tagCourseLimitValidate(value){
        if (value.indexOf("，")>0){
            return false;
        }
        var arr=value.split(",");
        for(var i=0;i<arr.length;i++){
            if(arr[i].length>25){
                return false;
            }
        }
        return true;
    }

    function isLimitNumber(num){
        if(/^\d+$/.test(num)){
            if(num<=1500&&num>=0){
                return true;
            }
            return false;
        }
        return false;
    }
    //身份证号码的验证规则
    function isIdCardNo(num){
        //if (isNaN(num)) {alert("输入的不是数字！"); return false;}
        var len = num.length, re;
        if (len == 15)
            re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
        else if (len == 18)
            re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);
        else {
            //alert("输入的数字位数不对。");
            return false;
        }
        var a = num.match(re);
        if (a != null)
        {
            if (len==15)
            {
                var D = new Date("19"+a[3]+"/"+a[4]+"/"+a[5]);
                var B = D.getYear()==a[3]&&(D.getMonth()+1)==a[4]&&D.getDate()==a[5];
            }
            else
            {
                var D = new Date(a[3]+"/"+a[4]+"/"+a[5]);
                var B = D.getFullYear()==a[3]&&(D.getMonth()+1)==a[4]&&D.getDate()==a[5];
            }
            if (!B) {
                //alert("输入的身份证号 "+ a[0] +" 里出生日期不对。");
                return false;
            }
        }
        if(!re.test(num)){
            //alert("身份证最后一位只能是数字和字母。");
            return false;
        }
        return true;
    }

});


//车牌号校验
function isPlateNo(plateNo){
    var re = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
    if(re.test(plateNo)){
        return true;
    }
    return false;
}

//通用方法 为表单元素初始化 参数obj为form表单的ID
function formInitFunc(objId) {
    $.metadata.setType('attr', 'validate');
    $("#" + objId).validate({
        errorElement: "em",
        errorPlacement: function (error, element) {
            // Add the `help-block` class to the error element
            error.addClass("help-block");
            error.css("color","#e47068");


            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            }else if(element.siblings("input").length ===1){
                element.parent().append(error);
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("has-error").removeClass("has-success");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("has-success").removeClass("has-error");
        }
    });
}
function tableValidInit(objId) {
    $.metadata.setType('attr', 'validate');
    $("#" + objId).validate({
        errorElement: "em",
        errorPlacement: function (error, element) {
            // Add the `help-block` class to the error element
            error.addClass("help-block");
            error.css("color","#e47068");


            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("td"));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parent("td").addClass("has-error").removeClass("has-success");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parent("td").addClass("has-success").removeClass("has-error");
        }
    });
}

/** 
* 判断是否null 
* @param data 
*/
function isNull(data){
	return (data == "" || data == undefined || data == null) ?  true: false;
}