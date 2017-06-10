<#-- UI的自定义宏 -->
<#---------------------------------------ADMIN--------------------------------------->
<#macro panel id='panel-list' class='panel panel-widget unboxed'>
    <div id="${id}" class="panel panel-widget ${class}"  data-base="${base}">
        <#nested />
    </div>
</#macro>

<#macro panel_head>
    <div class="panel-heading" data-base="${base}">
        <div class="row mu-panel-toolbar">
            <#nested />
        </div>
    </div>
</#macro>

<#macro panel_body>
    <div class="panel-body" style="box-shadow: 0 0 4px 0 rgba(0, 0, 0, .2);" data-base="${base}">
    	<#compress><#nested /></#compress>
    </div>
</#macro>

<#macro panel_footer>
    <div class="panel-footer" data-base="${base}">
    	<#compress><#nested /></#compress>
    </div>
</#macro>

<#macro panel_toolbar_query>
    <div class="col-xs-12 col-md-offset-2  col-md-4 mu-panel-toolbar-query-cont">
        <div class="input-group">
            <span class="input-group-addon query">
                <a class="btn" href="#">查询&nbsp;<i class="fa fa-search"></i></a>
            </span>
            <input class="form-control" type="text">
            <span class="input-group-addon">
                <a class="btn" href="#" data-toggle="tooltip" rel="tooltip" data-original-title="清除">
                    <i class="fa fa-times-circle"></i>
                </a>
            </span>
            <span class="input-group-addon advanced-query">
                <a class="btn " href="#" data-toggle="dropdown">高级查询&nbsp;<i class="fa fa-caret-down"></i> </a> 
                <div class="dropdown-menu advanced-query-container" rel="dropdown-menu" data-options="closeOnBodyClick:false" id="advancedQuery">
                    <div class="advanced-query-content">
                        <#compress><#nested /></#compress>
                    </div>
                </div>
            </span>
        </div>
    </div>
</#macro>

<#------------------------------FRONT------------------------------------->
<#macro main_breadcrumb rootType = 'admin' menuCode = ''>
<!-- BEGIN BREADCRUMB -->
<div class="mu-breadcrumb-wrapper">
	<ol class="breadcrumb">
		<#list getMenuBreadcrumb(rootType, menuCode) as menu>
			<#if menu.code == menuCode>
				<li class="active" id="currentMenu" mainMenuCode="<#if __main_menu_code__?exists>${__main_menu_code__}<#else>${menu.code}</#if>">
					<#if menu_index == 0>
						<i class="fa fa-home fa-2x"></i>
					</#if>
					${(menu.name)!""}
				</li>
			<#else>
				<li>
					<#if menu_index == 0>
						<i class="fa fa-home fa-2x"></i>
						<#assign __main_menu_code__=menu.code />
					</#if>
					<#if menu.URI?exists>
						<a href="${menu.URI}">${(menu.name)!""}</a>
					<#else>
						${(menu.name)!""}
					</#if>
				</li>
			</#if>
		</#list>
		<#nested>
	</ol>
</div>
<!-- END BREADCRUMB-->
</#macro>

<#macro main_sidebar>
<div class="mu-sidebar">
	<#nested>
</div>
</#macro>

<#macro main_content>
<div class="mu-content">
	<div class="mu-content-inner">
		<div class="row ">
			<div class="col-xs-12 col-md-12">
				<#nested/>
            </div>
        </div>
	</div>
</div>
</#macro>

<#macro main_wrapper>
<div class="mu-content-wrapper">
	<#nested>
</div>
</#macro>

<#----------------------------------------COMMON--------------------------------->

<#include "/ui/app/ui.ftl" />