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
<#-- $Id: error.ftl 6097 2016-06-15 12:38:16Z xi.yang $ -->
有错误，${errors?if_exists} <BR/>
<#if errors?exists>
errorCode: ${(errors.errorCode)!''} <BR/>
errorMessage: ${(errors.errorMessage)!''} <BR/>
exceptionCode: ${(errors.exceptionCode)!''} <BR/>
exceptionMessage: ${(errors.exceptionMessage)!''} <BR/>
</#if>