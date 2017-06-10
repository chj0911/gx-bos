<#--
使用者可以通过覆盖这个文件实现对一些宏的重新定义包括：
-- html head中的内容，包括meta css等
<#macro mower_admin_head title = ''>
-- LOGO
<#macro mower_admin_header_logo>
-- 菜单栏
<#macro mower_admin_header_menu>
-- 登录后提示信息
<#macro mower_admin_header_login>
-- 页脚
<#macro mower_admin_footer>
包含的Javascript(angularjs,knockoutjs,datagrid)
<#macro mower_admin_scripts require = ''>
-->

<#--
局部替换：如果以下变量定义在具体业务模板中，则会覆盖你的layout模板中的定义

<#global mower_admin_scripts_addition>
	加入你自己的javascript库文件
</#global>

<#global mower_admin_head_addition>
	加入你自己的css文件
</#global>
-->

<#macro mower_admin_header_menu>
    <@jquery_scripts />
<div class="header-menu">
    <ul class="nav navbar-nav">
        <#list adminMainMenu as mainMenu>
            <#if (mainMenu_index<6)>
                <li><a href="${base}/${(mainMenu.uri!"admin")}" mcode="${(mainMenu.code!"")}">${mainMenu.name!""}</a>
                </li>
            </#if>
        </#list>
        <li class="dropdown">
            <#list adminMainMenu as mainMenu>
                <#if (mainMenu_index == 6)>
                    <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"
                       href="${base}/${(mainMenu.uri!"admin")}" mcode="${(mainMenu.code!"")}">${mainMenu.name!""}<span
                            class="caret"></span></a>
                </#if>
            </#list>
            <ul class="dropdown-menu" role="menu">
                <#list adminMainMenu as mainMenu>
                    <#if (mainMenu_index >= 6)>
                        <li><a href="${base}/${(mainMenu.uri!"admin")}"
                               mcode="${(mainMenu.code!"")}">${mainMenu.name!""}</a></li>
                    </#if>
                </#list>
            </ul>
        </li>
    </ul>
</div>
</#macro>


