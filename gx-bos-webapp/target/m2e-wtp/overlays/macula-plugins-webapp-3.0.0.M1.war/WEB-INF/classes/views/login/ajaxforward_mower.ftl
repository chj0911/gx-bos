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
<#-- $Id: ajaxforward.ftl 5339 2014-08-22 11:47:23Z wzp $ -->
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>
	<body style="text-align: center;">
		<div style="margin-left:auto;margin-right:auto;">登录成功！Login Successful</div>
		<script>
			setTimeout(function(){
				if(window.top.bootbox){
					window.top.bootbox.closeDialog('${(request.getUserPrincipal().getName())!}');
				}
			}, 1000);
		</script>
	</body>
</html>
