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
<#-- $Id: layout_mower.ftl 5441 2014-09-17 02:52:08Z eric.ou $ -->

<#global resources_mobile="${resourceHost!''}/resources/mower/${appVersion!''}/mobile" />
<#global views_mobile="${resourceHost!''}/views/mower/${appVersion!''}/mobile" />

<#macro mower_mobile_head title = '' require = ''>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1.0" />
	<meta name="format-detection" content="telephone=no, email=no" />
    <meta name="version" content="${(version?replace("(\\$)|(\\s\\$)|(Revision:\\s)", "", "r"))?if_exists}-${appVersion!""}"/>
    <title>${title?if_exists}</title>    
    <link rel="icon" href="${resources_mobile}/app/images/favicon.ico" type="image/x-icon"/>
    <#-- BEGIN GLOBAL MANDATORY STYLES -->
    <link rel="stylesheet" href="${resources_mobile}/libs/weui/${weuiVersion}/weui${minVersion!""}.css"/>
    <link rel="stylesheet" href="${resources_mobile}/jquery-weui/${jqueryWeuiVersion}/css/jquery-weui${minVersion!""}.css"/>
	<#if require?contains("")>
	<#-- TODO -->
	</#if>
	${mower_mobile_head_addition!""}
    <link rel="stylesheet" href="${resources_mobile}/app/css/app${minVersion!""}.css"/>
    <#-- END GLOBAL MANDATORY STYLES -->
</#macro>

<#macro mower_mobile_footer>
    <!-- BEGIN FOOTER -->
	${mower_mobile_footer_custom!""}
    <!-- END FOOTER -->
</#macro>

<#macro mower_mobile_scripts require = ''>
	<!-- BEGIN CORE LIBS -->
	<script type="text/javascript" src="${resources_mobile}/libs/jquery/${jquery2Version}/jquery${minVersion!""}.js"></script>	
	<!-- END CORE LIBS -->
	
	<!-- BEGIN UI LIBS -->
	<script type="text/javascript" src="${resources_mobile}/jquery-weui/${jqueryWeuiVersion}/js/jquery-weui${minVersion!""}.js"></script>
	<!-- END UI LIBS -->
	
	<!-- MVC LIBRARY -->
	<#if require?contains('angularjs')>
	<script type="text/javascript" src="${resources_mobile}/mvc/angularjs/${angularVersion}/angular${minVersion!""}.js"></script>
	</#if>
	<#if require?contains('knockoutjs')>
	<script type="text/javascript" src="${resources_mobile}/mvc/knockoutjs/${knockoutVersion}/knockout${minVersion!""}.js"></script>
	<script type="text/javascript" src="${resources_mobile}/mvc/knockoutjs/${knockoutMappingVersion}/knockout.mapping${minVersion!""}.js"></script>
	</#if>
	<#if require?contains('vue')>
	<script type="text/javascript" src="${resources_admin}/mvc/vue/${vueVersion}/vue${minVersion!""}.js"></script>
	<script type="text/javascript" src="${resources_admin}/mvc/vue/${vueVersion}/vue-router${minVersion!""}.js"></script>
	</#if>
	<!-- END MVC LIBRARY -->

	<!-- CUSTOM LIBRARY -->
	${mower_mobile_scripts_addition!""}
	<!-- END CUSTOM LIBRARY -->
</#macro>

<#include "/mobile/app/layout_mower.ftl" />

<#macro mower_mobile title scripts = '' version = '' require = ''>
<#global ui_name = 'mower' />
<#global ui_path = 'mobile' />
<#if Request['isAjaxRequest']?exists && Request['isAjaxRequest'] == true>
	<#if title?exists><title>${title?if_exists}</title></#if>
	<#if version?exists><meta content="${(version?replace("(\\$)|(\\s\\$)|(Revision:\\s)", "", "r"))?if_exists}-${appVersion!""}"></#if>
	<#nested />
	<@includeScripts scripts />
<#else>
<!DOCTYPE html>
<html>
	<head>
		<@mower_mobile_head title="${title!''}" require="${require!''}" />
	    <script type="text/javascript">
		    var base = '${base}', startTime = (new Date).getTime(), CURRENTUSER = '${(request.getUserPrincipal().getName())!}';
		    var dateTimePattern = '${dateTimePattern}', datePattern = '${datePattern}', timePattern = '${timePattern}'; 
	    </script>
	</head>
	
	<body data-base="${base}" ontouchstart>

		<!-- BEGIN MAIN -->
		<#nested/>
		<!-- END MAIN -->
	
		<!-- BEGIN FOOTER -->
		<footer>
		<@mower_mobile_footer />
		</footer>
		<!-- END FOOTER -->
	
		<@mower_mobile_scripts require = "${require!''}" />
	
		<!-- BEGIN PAGE LEVEL SCRIPTS -->
		<script type="text/javascript" src="${resources_mobile}/app/js/config${minVersion!""}.js"></script>
		<script type="text/javascript" src="${resources_mobile}/app/js/app${minVersion!""}.js"></script>
		
		<@includeScripts scripts="mobile/app/layout_mower.js" />
		<@includeScripts scripts />
	
		<!-- END PAGE LEVEL SCRIPTS -->
	</body>
</html>
</#if>
</#macro>

