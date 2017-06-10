/**
 * Created by lenovo on 2016/5/23.
 */
var Qiniu_uploader = function (option) {
    var documentId = option.documentId;  //文件选择按钮id
    var token = option.token;           //七牛token
    var key = option.key, fileKey = option.keyId;  //key七牛生成key可以不设置   fileKey 保存key的value domId
    var proDiv = option.proDivId, pro = option.proId, proPercent = option.proPercentId; //进度条相关ID

    var Qiniu_UploadUrl = "https://up.qbox.me";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', Qiniu_UploadUrl, true);
    var formData, startDate;
    formData = new FormData();
    if (key !== null && key !== undefined) formData.append('key', key);
    formData.append('token', token);
    formData.append('file', $("#" + documentId)[0].files[0]);
    var taking;
    xhr.upload.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
            var nowDate = new Date().getTime();
            taking = nowDate - startDate;
            var x = (evt.loaded) / 1024;
            var y = taking / 1000;
            var uploadSpeed = (x / y);
            var formatSpeed;
            if (uploadSpeed > 1024) {
                formatSpeed = (uploadSpeed / 1024).toFixed(2) + "Mb\/s";
            } else {
                formatSpeed = uploadSpeed.toFixed(2) + "Kb\/s";
            }
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            $("#" + proDiv).show();
            $("#" + pro).css("width", percentComplete + "%");
            $("#" + proPercent).html(percentComplete + "%");
        }
    }, false);
    xhr.onreadystatechange = function (response) {
        if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
            var blkRet = JSON.parse(xhr.responseText);
            $("#" + fileKey).val(blkRet.key);
            $("#" + proDiv).css("display", "none");
        } else if (xhr.status != 200 && xhr.responseText) {
            $("#proPercent").html(0 + "%  上传失败！");
            setTimeout("$('#'+ pro).css('width',0+'%');", 1000);
            setTimeout("$('#'+ proDiv).hide();", 2000);
            $("#" + documentId).val("");
        }
    };
    startDate = new Date().getTime();
    xhr.send(formData);
};