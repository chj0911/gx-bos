
<#macro message_img_list>
    <span>
        <#if imgList??>
            <#list imgList as img>
                <img src="${img}" id="img-${img_index}" style="width: 100px;height:100px" onclick="showPicModal(this)"/>
            </#list>
        </#if>
    </span>

<div id="pictureModal" class="modal fade " role="dialog" aria-labelledby="gridSystemModalLabel">
    <div class="modal-dialog" role="document" style="width:700px;">
        <div class="modal-content">

            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h3 class="modal-title" id="gridSystemModalLabel">消息图片预览</h3>
            </div>

            <div class="modal-body">
                <div class="container-fluid" >
                    <div id="carousel-example-generic" class="carousel slide center-block" data-ride="carousel" data-interval=""
                         style="width: 606px;height: 356px;border: 3px solid #459998;overflow: hidden">
                        <!-- Indicators data-interval设置时间间隔 -->
                        <ol class="carousel-indicators">
                            <#if imgList??>
                                <#list imgList as img>
                                    <#if (img_index==0)>
                                        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                                    <#else>
                                        <li data-target="#carousel-example-generic" data-slide-to="${img_index}"></li>
                                    </#if>
                                </#list>
                            </#if>
                        </ol>

                        <!-- Wrapper for slides -->
                        <div class="carousel-inner " role="listbox" style="height:100%">
                            <#if imgList??>
                                <#list imgList as img>
                                    <#if (img_index==0)>
                                        <div class="item active" style="height:100%">
                                            <img src="${img}" id="img-${img_index}" style="margin:auto;height:100%"/>
                                            <div class="carousel-caption"></div>
                                        </div>
                                    <#else>
                                        <div class="item" style="height:100%">
                                            <img src="${img}" id="img-${img_index}"  style="margin:auto;height:100%"/>
                                            <div class="carousel-caption"></div>
                                        </div>
                                    </#if>
                                </#list>
                            </#if>
                        </div>

                        <!-- Controls -->
                        <a class="left carousel-control custom-carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                            <span class="fa fa-chevron-left" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="right carousel-control custom-carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                            <span class="fa fa-chevron-right" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
            </div>
        </div>
    </div>
</div>

<@includeScripts scripts="admin/app/messageImgList_mower.js" />
</#macro>
