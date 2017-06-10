<#global resources_login="${resourceHost!''}/resources/mower/${appVersion!''}/login" />
<!DOCTYPE html>
<html class="app-admin-vertical-centered">
<head>
    <meta http-equiv="X-UA-Compatible" content="edge"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${getText(maculaConfig.getAppName(), maculaConfig.getAppName())}-欢迎登录</title>
    
    <link rel="icon" href="${resources_login}/app/images/favicon.ico" type="image/x-icon"/>
    <#-- BEGIN GLOBAL MANDATORY STYLES -->
    <link rel="stylesheet" href="${resources_login}/bootstrap/${bootstrapVersion}/css/bootstrap${minVersion!""}.css"/>
    <link rel="stylesheet" href="${resources_login}/app/css/login${minVersion!""}.css"/>
    <#-- END GLOBAL MANDATORY STYLES -->
    
	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
  	<script src="${resources_login}/libs/html5shiv/${html5shivVersion}/html5shiv${minVersion!""}.js"></script>
  	<script src="${resources_login}/libs/respond/${respondVersion}/respond${minVersion!""}.js"></script>
	<![endif]-->
    <script type="text/javascript">
    	var base = "${base}";
    </script>
</head>

<body data-base="${base}">
	<noscript>
	    <div class="noscript error">
	        您好，要正常运行应用程序，浏览器必须支持Javascript！
	    </div>
	</noscript>
	
	<!-- 如果是统一认证后本地出错，则统一登出后跳回统一认证登录界面 -->
	<#if exception?exists && !(RequestParameters.form)?exists>
		<script type="text/javascript">
			alert('${getText(exception.getMessage(), exception.getMessage())}');
			window.location = '${maculaConfig.getCasServerService()}/logout?service=${maculaConfig.getCasClientService()}/logout&forward=${((RequestParameters.forward)!"/front")?url("UTF-8")}&appId=${maculaConfig.getAppName()}';
		</script>
	</#if>	
	
	<!-- 检测是否需要统一认证 -->
	<#if !(RequestParameters.form)?exists && !exception?exists>
		<script type="text/javascript">
			function checkCasLogin(status) {
				window.location = '${maculaConfig.getCasServerService()}/login?service=${maculaConfig.getCasClientService()}/login/cas<#if (RequestParameters.forward)?exists>&forward=${RequestParameters.forward?url("UTF-8")}</#if>&form=${maculaConfig.getCasClientService()}/login&appId=${maculaConfig.getAppName()}';
			}
		</script>	
		<script type="text/javascript" src="${maculaConfig.getCasServerService()}/v?jsonp=checkCasLogin&appId=${maculaConfig.getAppName()}"></script>
	</#if>	

    <!-- BEGIN LOGO -->
    <div class="logo">
        <div class="container">
        	<div class="row">
            	<div class="col-xs-12 col-sm-12 col-md-12">
                	<a href="index.html">
                    	<img src="${resources_login}/app/images/logo-fp.png" style="width: 123px;height: 81px;" alt="infinitus">
                	</a>
                	<b class="welcome"></b>
            	</div>
        	</div>
        </div>
    </div>
    <!-- END LOGO -->

    <!-- BEGIN LOGIN -->
    <div class="content">
        <div class="login-wrap">
            <div class="container">
                <div class="row">
                <div class="pull-right">
                    <div class="login-panel">
                        <!-- Nav tabs -->
                        <ul id="loginTab" class="nav nav-tabs nav-justified" role="tablist">
                            <li role="presentation" class="active"><a href="#pwdlogin" aria-controls="profile" role="tab" data-toggle="tab">帐户密码登录</a></li>
                            <li role="presentation" ><a href="#tdclogin" role="tab" data-toggle="tab">快速登录</a></li>
                        </ul>
                        <!-- Tab panes -->
                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane " id="tdclogin">
                                <div class="login-code">
                                    <div>
                                        <div class="login-code-title text-center">
                                            扫描二维码安全登录
                                        </div>
                                        <div class="text-center">
                                            <img src="${resources_login}/app/images/tdcode.png" style="width: 147px;height: 147px;" alt="infinitus">
                                        </div>
                                        <div class="text-center login-code-tool">
                                            <a href="javascript:;" class="text-muted">刷新二维码</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="javascript:;" class="text-muted">使用帮助</a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane active" id="pwdlogin">
                                <!-- BEGIN LOGIN FORM -->
                                <form id="login-form" class="login-form" action="${base}/login/check?form=true&forward=<#if (RequestParameters.forward)?exists>${RequestParameters.forward?url("UTF-8")}<#else>/</#if>" method="post">
                            		<#if exception?exists >
                                   		<div id="error" class="alert alert-danger">
                                        	<button class="close" data-close="alert"></button>
                                        	<span>${getText(exception.getMessage(), exception.getMessage())}</span>
                                    	</div>
                            		<#else>
                                   		<div id="error" class="alert alert-warning">
                                        	<button class="close" data-close="alert"></button>
                                        	<span>公共场所不建议自动登录，以防账号丢失</span>
                                    	</div>
                            		</#if>
                                    <div class="alert alert-danger hidden">
                                        <button class="close" data-close="alert"></button>
                                        <span></span>
                                    </div>
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <span class="glyphicon glyphicon-user"></span>
                                        </span>
                                        <input class="form-control" type="text" id="userName" name="username" placeholder="用户名">
                                    </div>
                                    <br/>
                                    <div class="input-group">
                                        <span class="input-group-addon text-muted">
                                            <span class="glyphicon glyphicon-lock"></span>
                                        </span>
                                        <input class="form-control" type="password" id="password" name="password" placeholder="密码" data-title="Caps Lock键已开启,密码输入是大写状态!" data-animation="true">
                                        <i class="fa fa-key"></i>
                                    </div>
                                    <input type="hidden" id="captchaId" name="captchaId" value="${captchaId}" />
									<#if captchaStatus?exists && captchaStatus.inViolation >
                                    <br/>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-12 col-md-5">
                                				<input class="form-control mu-text-bold" type="text" id="captchaResponse" name="captchaResponse" maxlength="4" placeholder="验证码"/>
                                            </div>
                                            <div class="col-sm-12 col-md-7 login-verify">
                            					<img id="loginCode" src="${base}/login/captcha?id=${captchaId}&_t=${captchaStatus.lastUpdate}" title="点击更换验证码！" onfocus="this.blur();" style="cursor:pointer;width:70px;height:26px;" align="absMiddle"/>	
                                            	&nbsp;看不清？<a id="loginCode_a" href="javascript:;" class="text-muted">换一张</a>
                                            </div>
                                        </div>
                                    </div>
									</#if>
                                    <div class="clearfix">
                                        <div class="pull-left">
                                            <a href="javascript:;" class="text-muted">忘记登录密码？</a>
                                        </div>
                                        <div class="pull-right">
                                           <a href="javascript:;" class="text-muted">获取密码</a>
                                        </div>
                                    </div>
                                    <br/>
                                    <input type="submit" class="btn btn-danger btn-block btn-lg" value="登&nbsp;&nbsp;&nbsp;&nbsp;录"></input>
									<br/>
                                </form>
                                <!-- END LOGIN FORM -->
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="login-banner">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 col-sm-12">
                            <div class="advertise visible-md-block visible-lg-block"></div>
                        </div>
                    </div>
            </div>
        </div>
    </div>

    <div  class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <br>
                <p class="text-center small">建议使用IE8.0或其以上版本的浏览器并设置1024X768分辨率</p>
            </div>
        </div>
    </div>
    <!-- END LOGIN -->

	<script>
		<#if (bindingResult.fieldErrors)?has_content>
		var validationErrors = [];
		<#list bindingResult.fieldErrors as fieldError>
			validationErrors['${fieldError.getField()}'] = '${getText(fieldError)}';
		</#list>
		</#if>	
		var input_message = '请输入',
			userName_message = '用户名、',
			password_message = '密码、',
			captchaResponse_message = '验证码、';
	</script>
			
	<!-- BEGIN CORE LIBS -->
	<!--[if lt IE 9]>
	<script type="text/javascript" src="${resources_login}/libs/jquery/${jquery1Version}/jquery${minVersion!""}.js"></script>
	<![endif]-->
	<!--[if gte IE 9]><!-->
	<script type="text/javascript" src="${resources_login}/libs/jquery/${jquery2Version}/jquery${minVersion!""}.js"></script>	
	<!--<![endif]-->
	<!-- END CORE LIBS -->
	
	<!-- BEGIN UI LIBS -->
	<script type="text/javascript" src="${resources_login}/bootstrap/${bootstrapVersion}/js/bootstrap${miniVersion!""}.js"></script>
	<!-- END UI LIBS -->
	<@layout.includeScripts scripts="login/login_mower.js" />
</body>
</html>