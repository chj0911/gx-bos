<#--
使用者可以通过覆盖这个文件实现对一些宏的重新定义包括：
--html head中的内容，包括css meta等
<#macro mower_mobile_head title = ''>
--页脚
<#macro mower_mobile_footer>
--包含的Javascript(angularjs,knockoutjs,vue)
<#macro mower_mobile_scripts require = ''>
-->


<#--
局部替换：如果以下变量定义在具体业务模板中，则会覆盖你的layout模板中的定义

定制页脚区域
<#global mower_mobile_footer_custom>
ddddadf
</#global>

<#global mower_mobile_scripts_addition>
	加入你自己的javascript库文件
</#global>

<#global mower_mobile_head_addition>
	加入你自己的css文件
</#global>
-->

