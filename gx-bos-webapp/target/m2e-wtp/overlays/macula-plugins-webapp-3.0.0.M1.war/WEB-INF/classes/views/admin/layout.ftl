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
<#-- $Id: layout.ftl 4722 2013-12-17 09:33:57Z wilson $ -->
<#macro admin title scripts = ''>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="X-UA-Compatible" content="edge" />
		<meta charset="utf-8" />
		<title>${(title?replace("(\\$)|(\\s\\$)|(Revision:\\s)", "", "r"))?if_exists}-${appVersion!""}</title>
		<link rel="icon" href="${resourceHost!""}/resources${appVersion!""}/admin/app-${AppuiVersion}/themes/${getTheme('skin')}/images/favicon.ico" type="image/x-icon" />
	    <link rel="icon" href="${resourceHost!""}/resources${appVersion!""}/admin/app-${AppuiVersion}/themes/${getTheme('skin')}/images/favicon.gif" type="image/gif" />
		<link rel="stylesheet" href="${resourceHost!""}/resources${appVersion!""}/admin/app-${AppuiVersion}/themes/${getTheme('skin')}/framework${minVersion!""}.css" />
		<link rel="stylesheet" href="${resourceHost!""}/resources${appVersion!""}/admin/app-${AppuiVersion}/themes/${getTheme('skin')}/style${minVersion!""}.css" />		
		<link rel="stylesheet" href="${resourceHost!""}/resources${appVersion!""}/admin/macula-ui-${MaculauiVersion}/themes/${getTheme('skin')}/macula-ui-${MaculauiVersion}${minVersion!""}.css" />
		<script>var base= '${base}', macula_ui='${resourceHost!""}/resources${appVersion!""}/admin/macula-ui-${MaculauiVersion}', startTime = (new Date).getTime(), CURRENTUSER = '${(request.getUserPrincipal().getName())!}';window.loadedPart = [ 1, 0, (new Date).getTime() ];</script>	
		<script>var dateTimePattern = '${dateTimePattern}', datePattern = '${datePattern}', timePattern = '${timePattern}'; </script>	
	</head>
	<body base="${base}">
		<noscript>
			<div class="noscript error">
				您好，要正常运行Macula开发管理平台，浏览器必须支持Javascript！
			</div>
		</noscript>
		<div class="loadpart" id="loadpart">
			<div class="msg">
				正在加载...
			</div>
			<div class="lpb">
				<div class="lpp" id="loadpartprocess"
				style="height: 5px; overflow: hidden; width: 10px">
					&nbsp;
				</div>
			</div>
		</div>
		<div class="wrapper" id="body" style="visibility: hidden">
			<div class="msgbox" id="messagebox">
			</div>
			<div class="header" id="header">
				<div class="header-inner clearfix">
					<div class="top-bar clearfix" id="topbar">
						<div class="span-7">
							<h1 class="logo">
								<a href="${base}/admin">${title}</a>
							</h1>
						</div>
						<div class="frt">
							<div class="head-opts flt">
								<div class="flt">
									<span>
										<a href="${base}/admin">桌面</a>
									</span>|
									<span>
										<a href="${base}/" target="_blank">帮助</a>
									</span>
								</div>
							</div>
							<div class="head-user flt">
								<div class="span-auto">
									<span>|</span>
								</div>
								<#if (request.getUserPrincipal().getPrincipal().getNickname())?exists>
									欢迎，${request.getUserPrincipal().getPrincipal().getNickname()}&nbsp;
								[<a href="<@macula.logoutURL />&forward=/admin/login">退出</a>]
								<#else>
									欢迎，访客&nbsp;
									[<a href="<@macula.logoutURL />&forward=/admin/login">登录</a>]
								</#if>
							</div>
						</div>
					</div>
				</div>
				<div class="head-nav clearfix">
					<div class="head-nav-inner clearfix" id="top_menu">
					</div>
				</div>
			</div>
			<div class="container clearfix" id="container">
				<div id="side" class="side hide" style="width: 154px;">
					<div class="side-inner">
						<div class="side-content" id="side-content">
						</div>
					</div>
				</div>
				<div class="toggler-left flt fixed hide" id="leftToggler">
					<a href="javascript:void(0)" class="toggler-left-inner"
					title="点击收起或展开左侧">&nbsp;</a>
				</div>
				<div class="workground" id="workground">
					<div class="content-head" id="content-head"></div>
					<div class="content-main" id="main">
						<div style="height:1000px;color:#333;font-size:14px;font-family:verdana;">Loading Desktop...</div>
					</div>
					<div class="content-foot" id="content-foot"></div>
				</div>
				<div class="side-r hide" id="side-r">
					<div class="side-r-top clearfix">
						<b class="side-r-title flt f-14"></b>
						<span
						class="frt side-r-close pointer">
							<@macula.themeImage src="arrow_close.gif" />
						</span>
					</div>
					<div id="side-r-head" class="side-r-head"
					style="border-bottom: 1px #999 solid; padding: 2px 0 2px 0;">
					</div>
					<div id="side-r-content" class="side-r-content"
					style="overflow: auto">
					</div>
					<div id="side-r-foot" class="side-r-foot">
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript" src="${resourceHost!""}/resources${appVersion!""}/admin/timezone${minVersion!""}.js"></script>
		<script type="text/javascript" src="${resourceHost!""}/resources${appVersion!""}/admin/jquery-${JQueryVersion}${minVersion!""}.js"></script>
		<script type="text/javascript" src="${resourceHost!""}/resources${appVersion!""}/admin/jquery.tmpl${minVersion!""}.js"></script>
		<script type="text/javascript" src="${resourceHost!""}/resources${appVersion!""}/admin/json2${minVersion!""}.js"></script>
		<script type="text/javascript" src="${resourceHost!""}/resources${appVersion!""}/admin/knockout-1.2.1${minVersion!""}.js"></script>
		<script type="text/javascript" src="${resourceHost!""}/resources${appVersion!""}/admin/knockout.mapping${minVersion!""}.js"></script>
		
		<script type="text/javascript" src="${resourceHost!""}/resources${appVersion!""}/admin/macula-ui-${MaculauiVersion}/macula-ui-${MaculauiVersion}${minVersion!""}.js"></script>
		<script type="text/javascript" src="${resourceHost!""}/resources${appVersion!""}/admin/macula-ui-${MaculauiVersion}/i18n/messages_${getLocale()}${minVersion!""}.js"></script>
		
		<script type="text/javascript" src="${resourceHost!""}/resources${appVersion!""}/admin/app-${AppuiVersion}/app_admin${minVersion!""}.js"></script>
		<script type="text/javascript" src="${resourceHost!""}/resources${appVersion!""}/admin/app-${AppuiVersion}/layout_admin${minVersion!""}.js"></script>
		<#if scripts?exists && scripts != ''>
			<script id="${scripts?replace('.', '_')?replace('/', '_')}" type="text/javascript">
				<#include "/${scripts?replace('.js', minVersion+'.js')}" parse=false />
			</script>
		</#if>
	</body>
</html>
</#macro>

<#macro singlepage title scripts = '' content = ''>
<!doctype html>
<html>
	<head>
		<meta http-equiv="X-UA-Compatible" content="edge" />
		<meta charset="utf-8" />
		<title>${(title?replace("(\\$)|(\\s\\$)|(Revision:\\s)", "", "r"))?if_exists}-${appVersion!""}</title>
		<link rel="icon" href="${resourceHost!""}/resources${appVersion!""}/admin/app-${AppuiVersion}/themes/${getTheme('skin')}/images/favicon.ico" type="image/x-icon" />
	    <link rel="icon" href="${resourceHost!""}/resources${appVersion!""}/admin/app-${AppuiVersion}/themes/${getTheme('skin')}/images/favicon.gif" type="image/gif" />
		<link rel="stylesheet" href="${resourceHost!""}/resources${appVersion!""}/admin/app-${AppuiVersion}/themes/${getTheme('skin')}/framework${minVersion!""}.css" />
		<link rel="stylesheet" href="${resourceHost!""}/resources${appVersion!""}/admin/app-${AppuiVersion}/themes/${getTheme('skin')}/style${minVersion!""}.css" />		
		<link rel="stylesheet" href="${resourceHost!""}/resources${appVersion!""}/admin/app-${AppuiVersion}/themes/${getTheme('skin')}/singlepage${minVersion!""}.css" />
		<link rel="stylesheet" href="${resourceHost!""}/resources${appVersion!""}/admin/macula-ui-${MaculauiVersion}/themes/${getTheme('skin')}/macula-ui-${MaculauiVersion}${minVersion!""}.css" />
		<script>var base= '${base}', macula_ui='${resourceHost!""}/resources${appVersion!""}/admin/macula-ui-${MaculauiVersion}', startTime = (new Date).getTime(), CURRENTUSER = '${(request.getUserPrincipal().getName())!}';window.loadedPart = [ 1, 0, (new Date).getTime() ];</script>
		<script>var dateTimePattern = '${dateTimePattern}', datePattern = '${datePattern}', timePattern = '${timePattern}'; </script>		
	</head>
	<#if RequestParameters.mode?exists>
	<body base="${base}">
	<#else>
	<body base="${base}" class="single-page single-page-col2">
	</#if>
		<noscript>
			<div class='noscript error'>您好，要正常运行Macula开发管理平台，浏览器必须支持Javascript！</div>
		</noscript>
		<div class='loadpart' id='loadpart'>
			<div class='msg'>正在加载...</div>
			<div class='lpb'>
				<div class='lpp' id='loadpartprocess'
					style='height: 5px; overflow: hidden; width: 20px'>&nbsp;</div>
			</div>
		</div>
		<div class='body' id='body' style='visibility: hidden'>
			<div class='msgbox' id='messagebox'></div>
			<div class='container clearfix' id='container'>
				<div class='side span-auto side-close hide' id='side'>
					<div id="side-content"></div>${has_side_content?if_exists}
				</div>
				<div class="toggler-left flt fixed hide" id='leftToggler'>
					<div class="toggler-left-inner">&nbsp;</div>
				</div>
				<div class="workground" style="width: 100%" id="workground">
						<div class="content-head" id="content-head"></div>
						<div class="content-main" id="main"></div>
						<div class="content-foot" id="content-foot"></div>
				</div>
				<div class="side-r hide" id="side-r">
					<div class="side-r-top clearfix">
						<b class="side-r-title flt f-14"></b>
						<span class="frt side-r-close pointer">
							<@macula.themeImage src="arrow_close.gif" />
						</span>
					</div>
					<div id="side-r-head" class="side-r-head" style="border-bottom: 1px #999 solid; padding: 2px 0 2px 0;"></div>
					<div id="side-r-content" class="side-r-content" style="overflow: auto"></div>
					<div id="side-r-foot" class="side-r-foot"></div>
				</div>
			</div>
		</div>
		<script type="text/javascript" src="${resourceHost!""}/resources${appVersion!""}/admin/timezone${minVersion!""}.js"></script>		
		<script type="text/javascript" src="${resourceHost!""}/resources${appVersion!""}/admin/jquery-${JQueryVersion}${minVersion!""}.js"></script>
		<script type="text/javascript" src="${resourceHost!""}/resources${appVersion!""}/admin/jquery.tmpl${minVersion!""}.js"></script>
		<script type="text/javascript" src="${resourceHost!""}/resources${appVersion!""}/admin/json2${minVersion!""}.js"></script>
		<script type="text/javascript" src="${resourceHost!""}/resources${appVersion!""}/admin/knockout-1.2.1${minVersion!""}.js"></script>
		<script type="text/javascript" src="${resourceHost!""}/resources${appVersion!""}/admin/knockout.mapping${minVersion!""}.js"></script>
		
		<script type="text/javascript" src="${resourceHost!""}/resources${appVersion!""}/admin/macula-ui-${MaculauiVersion}/macula-ui-${MaculauiVersion}${minVersion!""}.js"></script>
		<script type="text/javascript" src="${resourceHost!""}/resources${appVersion!""}/admin/macula-ui-${MaculauiVersion}/i18n/messages_${getLocale()}${minVersion!""}.js"></script>		
		
		<script type="text/javascript" src="${resourceHost!""}/resources${appVersion!""}/admin/app-${AppuiVersion}/app_admin${minVersion!""}.js"></script>
		<script type="text/javascript" src="${resourceHost!""}/resources${appVersion!""}/admin/app-${AppuiVersion}/layout_admin${minVersion!""}.js"></script>
		${content?if_exists}
		<#if scripts?exists && scripts != ''>
			<script id="${scripts?replace('.', '_')?replace('/', '_')}" type="text/javascript">
				<#include "/${scripts?replace('.js', minVersion+'.js')}" parse=false />
			</script>
		</#if>
	</body>
</html>
</#macro>
<#macro ajaxContent title scripts = ''>
	<#if Request['isAjaxRequest']?exists && Request['isAjaxRequest'] == true>
		<#if title?exists><title>${title?replace("(\\$)|(\\s\\$)|(Revision:\\s)", "", "r")}-${appVersion!""}</title></#if>
		<#nested />
		<#if scripts?exists && scripts != ''>
			<script id="${scripts?replace('.', '_')?replace('/', '_')}" type="text/javascript">
				<#include "/${scripts?replace('.js', minVersion+'.js')}" parse=false />
			</script>
		</#if>
	<#else>
		<#assign nestedContent>
			<#compress><#nested /></#compress>
		</#assign>
		<#assign jsContent>
			<script type="text/javascript">
				$(function(){
					$(document.body).updateHtml('${nestedContent?js_string}');
					$.maculapage();
				});
			</script>
		</#assign>
		<@layout.singlepage title=title scripts=scripts content=jsContent />		
	</#if>
</#macro>

<#macro side_content>
	<div id="side-content" base="${base}"><#compress><#nested /></#compress></div>
</#macro>
<#macro content_main>
	<div class="content-main" id="main" base="${base}"><#compress><#nested /></#compress></div>
</#macro>
<#macro content_head>
	<div class="content-head" id="content-head" base="${base}"><#compress><#nested /></#compress></div>
</#macro>
<#macro content_foot>
	<div class="content-foot" id="content-foot" base="${base}"><#compress><#nested /></#compress></div>
</#macro>

<#macro content_pager code>
	<div id="finder-footer-${code}" class="gridlist-footer finder-footer" base="${base}">
		<div class="clearfix" id="finder-pager-${code}">
			<table>
				<tfoot>
					<tr>
			 			<td style="text-align:left;width:150px;border:none;padding:0;">
			   				<div class="clearfix">
		  						<div class="flt"><span> 每页最多显示：</span></div>
		  							<div id="finder-pageset-${code}" class="flt pointer finder-pageset">
		  								<div class="finder-pageset-handle" dropmenu="finder-pagesel-${code}">20条</div>
		  								<div style="visibility:hidden;display:block;" class="x-drop-menu" id="finder-pagesel-${code}">
											<div class="item">
		            							<input type="radio" id="finder_plimit_100" value="100" name="finder_plimit" />
		            							<label for="finder_plimit_100">100条</label>
		            						</div>
											<div class="item">
		            							<input type="radio" id="finder_plimit_50" value="50" name="finder_plimit" />
		            							<label for="finder_plimit_50">50条</label>
		            						</div>
		            						<div class="item">
		            							<input type="radio" id="finder_plimit_20" value="20" name="finder_plimit" />
		            							<label for="finder_plimit_20">20条</label>
		            						</div>
		            						<div class="item">
		            							<input type="radio" id="finder_plimit_10" value="10" name="finder_plimit" />
		            							<label for="finder_plimit_10">10条</label>
		            						</div>
	            						</div>
		  							</div>
		 						</div>
		 					</div>
			 			</td>
						<td style="text-align:left;width:150px">
							<label for="finder-jumpinput-${code}"> 跳转到第<input type="text" id="finder-jumpinput-${code}" style="width:20px; padding:0;border:1px #ccc solid;margin:0;font-size:12px;"></label>
						</td>
						<td style="text-align:center;">
							<div class="pager"><div class="pagernum"></div></div>
	    				</td>
			   	       <td style="text-align:right;">&nbsp;</td>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>	
</#macro>		