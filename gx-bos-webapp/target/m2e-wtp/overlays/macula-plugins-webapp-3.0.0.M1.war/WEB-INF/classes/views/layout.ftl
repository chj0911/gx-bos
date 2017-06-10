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
<#-- $Id: layout.ftl 5997 2016-01-29 01:59:50Z wzp $ -->
<#global base=(springMacroRequestContext.getContextPath())?if_exists>
<#global getText=(springMacroRequestContext.getMessage)?if_exists>
<#global getTheme=(springMacroRequestContext.getThemeMessage)?if_exists>
<#global getLocale=(springMacroRequestContext.getLocale)?if_exists>
<#global JQueryVersion="1.7">
<#global MaculauiVersion="1.0.0">
<#global AppuiVersion="1.0.0">

<#global jquery1Version="1.11.3">
<#global jquery2Version="2.1.4">
<#global bootstrapVersion="3.3.5">
<#global mowerVersion="1.1.1">
<#global html5shivVersion="3.7.2">
<#global respondVersion="1.4.2">

<#global angularVersion="1.4.1">
<#global knockoutVersion="3.3.0">
<#global knockoutMappingVersion="2.4.1">
<#global vueVersion="1.0.26">

<#global jqueryWeuiVersion="0.8.0">
<#global weuiVersion="0.4.3">


<#macro includeScripts scripts>
	<#if scripts?exists && scripts != ''>
		<#list scripts?split(",") as jsItem>
			<script id="${jsItem?trim?replace('.', '_')?replace('/', '_')}" type="text/javascript">
				<#include "/${jsItem?trim?replace('.js', minVersion+'.js')}" parse=false />
			</script>
		</#list>
	</#if>
</#macro>

<#include "/admin/layout.ftl" />
<#include "/admin/layout_mower.ftl" />

<#include "/front/layout_mower.ftl" />

<#include "/mobile/layout_mower.ftl" />