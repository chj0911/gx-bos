<#--

    Copyright 2010-2012 the original author or authors.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

-->
<#-- $Id: layout_mower.ftl 6083 2016-06-14 07:49:25Z wzp $ -->

<#global resources_admin="${resourceHost!''}/resources/mower/${appVersion!''}/admin" />
<#global views_admin="${resourceHost!''}/views/mower/${appVersion!''}/admin" />

<#macro mower_admin_head title = '' require = ''>
	    <meta http-equiv="X-UA-Compatible" content="edge"/>
	    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <meta name="version" content="${(version?replace("(\\$)|(\\s\\$)|(Revision:\\s)", "", "r"))?if_exists}-${appVersion!""}"/>
	    <title>${title?if_exists}</title>
	    <link rel="icon" href="${resources_admin}/app/images/favicon.ico" type="image/x-icon"/>
	    <#-- BEGIN GLOBAL MANDATORY STYLES -->
	    <link rel="stylesheet" href="${resources_admin}/bootstrap/${bootstrapVersion}/css/bootstrap${minVersion!""}.css"/>
	    <link rel="stylesheet" href="${resources_admin}/mower/${mowerVersion}/css/mower${minVersion!""}.css"/>
		<#if require?contains("")>
		<#-- TODO -->
		</#if>
		${mower_admin_head_addition!""}
	    <link rel="stylesheet" href="${resources_admin}/app/css/app${minVersion!""}.css"/>
	    <#-- END GLOBAL MANDATORY STYLES -->
	    
    	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    	<!--[if lt IE 9]>
      	<script src="${resources_admin}/libs/html5shiv/${html5shivVersion}/html5shiv${minVersion!""}.js"></script>
      	<script src="${resources_admin}/libs/respond/${respondVersion}/respond${minVersion!""}.js"></script>
    	<![endif]-->	    
</#macro>

<#macro mower_admin_header_logo>
    <!-- Navbar Barnd -->
    <div class="navbar-header pull-left">
        <a href="#" class="navbar-brand">
            ${(adminRootMenu.name)!"Macula Admin"}
        </a>
    </div>
</#macro>

<#macro mower_admin_header_menu>
    <div class="header-menu">
        <ul class="nav navbar-nav">
        	<#list adminMainMenu as mainMenu>
            <li><a href="${getAbsoluteUrl(base, mainMenu.URI, 'admin')}" mcode="${(mainMenu.code)!""}">${(mainMenu.name)!""}</a></li>
            </#list>
        </ul>
    </div>   
</#macro>


<#macro mower_admin_header_login>
    <!-- Account Area and Settings -->
    <div class="navbar-header pull-right">
        <div class="navbar-account">
            <ul class="account-area">
                <li>
                    <a class="login-area dropdown-toggle" data-toggle="dropdown">
                        <section>
                            <h2><span class="profile">${userPrincipal.getNickname()}</span></h2>
                        </section>
                    </a>
                    <!--Login Area Dropdown-->
                    <ul class="pull-right dropdown-menu dropdown-arrow dropdown-login-area">
                        <li class="username"><a>测试用户</a>
                        </li>
                        <li class="email"><a>test@infinitus-int.com</a>
                        </li>
                        <li class="edit">
                            <a href="#" class="pull-left">基本信息</a>
                            <a href="#" class="pull-right">设置</a>
                        </li>
                        
                        <!--Theme Selector Area-->
                        <li class="theme-area">
                            <ul class="colorpicker" id="skin-changer">
                                <li>
                                    <a class="colorpick-btn" href="#" style="background-color:#cc324b;" rel="${resources_admin}/mower/${mowerVersion}/css/pink${minVersion!""}.css""></a>
                                </li>
                                <li>
                                    <a class="colorpick-btn" href="#" style="background-color:#AC193D;" rel="${resources_admin}/mower/${mowerVersion}/css/darkred${minVersion!""}.css""></a>
                                </li>
                                 <li>
                                    <a class="colorpick-btn" href="#" style="background-color:#585858;" rel="${resources_admin}/mower/${mowerVersion}/css/gray${minVersion!""}.css""></a>
                                </li>
                                <li>
                                    <a class="colorpick-btn" href="#" style="background-color:#474544;" rel="${resources_admin}/mower/${mowerVersion}/css/black${minVersion!""}.css""></a>
                                </li>                               
                                 <li>
                                    <a class="colorpick-btn" href="#" style="background-color:#53a93f;" rel="${resources_admin}/mower/${mowerVersion}/css/green${minVersion!""}.css""></a>
                                </li>
                                <li>
                                    <a class="colorpick-btn" href="#" style="background-color:#5DB2FF;" rel="${resources_admin}/mower/${mowerVersion}/css/blue${minVersion!""}.css""></a>
                                </li>
                            </ul>
                        </li>
                        <!--/Theme Selector Area-->
                        <li class="dropdown-footer">
                            <a href="<@macula.logoutURL />&forward=/&renew=true">退出</a>
                        </li>
                    </ul>
                    <!--/Login Area Dropdown-->
                </li>
                <!-- /Account Area -->
            </ul>
        </div>
    </div>
    <!-- /Account Area and Settings -->
</#macro>

<#macro mower_admin_footer>
    <!-- BEGIN FOOTER -->
    <div id="footer" class="mu-footer-container" style="text-align:right">
        <div class="container-fluid">
            <p>&copy; 2015 <a href="http://github.com/macula-projects" target="_blank">MACULA</a>
            </p>
        </div>
    </div>
    <!-- END FOOTER -->
</#macro>

<#macro mower_admin_scripts require = ''>
	<!-- BEGIN CORE LIBS -->
	<!--[if lt IE 9]>
	<script type="text/javascript" src="${resources_admin}/libs/jquery/${jquery1Version}/jquery${minVersion!""}.js"></script>
	<![endif]-->
	<!--[if gte IE 9]><!-->
	<script type="text/javascript" src="${resources_admin}/libs/jquery/${jquery2Version}/jquery${minVersion!""}.js"></script>	
	<!--<![endif]-->
	<script type="text/javascript" src="${resources_admin}/libs/jquery-tmpl/jquery.tmpl${minVersion!""}.js"></script>
	<!-- END CORE LIBS -->
	
	<!-- BEGIN UI LIBS -->
	<script type="text/javascript" src="${resources_admin}/bootstrap/${bootstrapVersion}/js/bootstrap${miniVersion!""}.js"></script>
	<script type="text/javascript" src="${resources_admin}/mower/${mowerVersion}/js/mower${minVersion!""}.js"></script>
	<!-- END UI LIBS -->
	
	<!-- REQUIRE LIBRARY -->
	<#if require?contains('angularjs')>
	<script type="text/javascript" src="${resources_admin}/mvc/angularjs/${angularVersion}/angular${minVersion!""}.js"></script>
	</#if>
	<#if require?contains('knockoutjs')>
	<script type="text/javascript" src="${resources_admin}/mvc/knockoutjs/${knockoutVersion}/knockout${minVersion!""}.js"></script>
	<script type="text/javascript" src="${resources_admin}/mvc/knockoutjs/${knockoutMappingVersion}/knockout.mapping${minVersion!""}.js"></script>
	</#if>
	<#if require?contains('vue')>
	<script type="text/javascript" src="${resources_admin}/mvc/vue/${vueVersion}/vue${minVersion!""}.js"></script>
	<script type="text/javascript" src="${resources_admin}/mvc/vue/${vueVersion}/vue-router${minVersion!""}.js"></script>
	</#if>
	<!-- END REQUIRE LIBRARY -->	
	
	<!-- CUSTOM LIBRARY -->
	${mower_admin_scripts_addition!""}
	<!-- END CUSTOM LIBRARY -->
</#macro>

<#include "/admin/app/layout_mower.ftl" />

<#macro mower_admin title scripts = '' version = '' require = ''>
<#global ui_name = 'mower' />
<#global ui_path = 'admin' />
<#if Request['isAjaxRequest']?exists && Request['isAjaxRequest'] == true>
	<#if title?exists><title>${title?if_exists}</title></#if>
	<#if version?exists><meta content="${(version?replace("(\\$)|(\\s\\$)|(Revision:\\s)", "", "r"))?if_exists}-${appVersion!""}"></#if>
	<#nested />
	<@includeScripts scripts />
<#else>
	<!DOCTYPE html>
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<@mower_admin_head title="${title?if_exists}" require = "${require!''}" />
	    <script type="text/javascript">
		    var base = '${base}', startTime = (new Date).getTime(), CURRENTUSER = '${(request.getUserPrincipal().getName())!}';
		    var dateTimePattern = '${dateTimePattern}', datePattern = '${datePattern}', timePattern = '${timePattern}'; 
		    var menuUrl = "${base}/admin/menu/${sessionId!'session'}";
            var mcodeParam = "${(request.getParameter('mcode'))!}",rcodeParam = '${(request.getParameter("rcode"))!}';
	    </script>
	</head>
	
	<body data-base="${base}">
	
	<noscript>
	    <div class="noscript error">
	        您好，要正常运行应用程序，浏览器必须支持Javascript！
	    </div>
	</noscript>
	
    <!-- Loading Container -->
    <div class="loading-container">
       <div class="loader"></div>
    </div>
    <!--  /Loading Container -->	
	
    <!-- BEGIN HEADER -->
    <div id="header" class="mu-header-container">
    	<!-- BEGIN MAIN MENU -->
        <div class="navbar" role="navigation">
            <div class="navbar-inner">
                <div class="navbar-container">
					<@mower_admin_header_logo />
					<!-- Sidebar Collapse -->
                    <div class="sidebar-collapse" id="sidebar-collapse">
                        <i class="collapse-icon fa fa-bars"></i>
                    </div>
                    <!-- /Sidebar Collapse -->
					<@mower_admin_header_menu />
					<@mower_admin_header_login />
				</div>
			</div>
		</div>
	</div>
	<!-- END HEADER -->
	
	<!-- BEGIN MAIN -->
	<div class="mu-main-container container-fluid">
        <!-- BEGIN SIDEBAR -->
        <div class="mu-sidebar-wrapper">
            <div class="mu-sidebar" id="sidebar">
                <!-- Page Sidebar Header-->
                <div class="sidebar-header-wrapper">
                    <input type="text" class="searchinput">
                    <i class="searchicon fa fa-search"></i>
                    <div class="searchhelper">搜索菜单</div>
                </div>
                <!-- /Page Sidebar Header -->
                <!-- Sidebar Menu -->
                <ul class="nav sidebar-menu" style="">
                </ul>
                <!-- /Sidebar Menu -->
            </div>
        </div>
        <!-- END SIDEBAR -->	
	
        <!-- BEGIN CONTENT -->
        <div class="mu-content-wrapper">
            <div class="mu-content">
                <!-- BEGIN BREADCRUMB -->
                <div class="mu-content-header">
                    <div class="mu-breadcrumb-wrapper">
                        <ul class="breadcrumb" data-target="#mainContent">
                            <li data-target="breadcrumb0" class="active"></li>
                        </ul>
                    </div>
                    <div class="header-buttons">
                        <a class="sidebar-toggler" href="#">
                            <i class="fa fa-arrows-h"></i>
                        </a>
                        <a class="refresh" id="refresh-toggler" href="">
                            <i class="glyphicon glyphicon-refresh"></i>
                        </a>
                        <a class="favorite" id="favorite-toggler" href="#">
                            <i class="fa fa-star fa-lg"></i>
                        </a>
                    </div>
                </div>
                <!-- END BREADCRUMB-->
		        <div class="mu-content-body">
		            <div class="row">
		                <div class="col-md-12">
		                    <div id="mainContent">
		                        <div data-panel="breadcrumb0">
			                		<#nested />
		                        </div>
		                    </div>
		                </div>
		            </div>
		        </div>
		    </div>
		</div>        
	</div>
	<!-- END MAIN -->
	
	<!-- BEGIN FOOTER -->
	<div id="footer" class="mu-footer">
		<@mower_admin_footer />
	</div>
	<!-- END FOOTER -->
	
	<@mower_admin_scripts require = "${require!''}" />
	
	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<script type="text/javascript" src="${resources_admin}/app/js/config${minVersion!""}.js"></script>
	<script type="text/javascript" src="${resources_admin}/app/js/app${minVersion!""}.js"></script>
	
	<@includeScripts scripts="admin/app/layout_mower.js" />
	<@includeScripts scripts="ui/app/ui.js" />
	<@includeScripts scripts />
	<!-- END PAGE LEVEL SCRIPTS -->
	</body>
	</html>
</#if>
</#macro>
