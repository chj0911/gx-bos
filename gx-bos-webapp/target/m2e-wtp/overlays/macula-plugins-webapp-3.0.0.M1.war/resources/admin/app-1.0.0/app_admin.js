$(function() {
	$.ajaxSetup({
		cache : false,
		timeout : 60000,
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		headers : {
			'MU' : CURRENTUSER
		}
	});
	$(document).ajaxError(function(e, xhr, settings, exception) {
		var data = null, lastException = exception;
		try {
			data = $.parseJSON(xhr.responseText);
		} catch (e) {
			lastException = e;
		}

		if (lastException != null && data == null) {
			var exceptionMessage = null;
			if (typeof lastException == 'string') {
				exceptionMessage = lastException;
			} else {
				exceptionMessage = lastException.message;
			}
			if (exceptionMessage != null) {
				data = {
					errorMessage : '',
					exceptionMessage : exceptionMessage
				};
			}
		}
		if (xhr.status || data) {
			onAjaxResponseError(xhr.status, data, settings || {}, lastException);
		}
	});
});

function onAjaxResponseError(c, data, settings, exception) {
	var code = data.exceptionCode || c;
	switch (code) {
	case 'http.301':
	case 'http.302':
	case 301:
	case 302:
		onAjaxRedirect(data, settings);
		break;
	case 'http.403':
	case 403:
		onAjaxForbidden(data, settings);
		break;
	case 'http.404':
	case 404:
		onAjaxNotFound(data, settings);
		break;
	case 'http.500':
	case 500:
		onAjaxServerError(data, settings);
		break;
	default:
		if (data.redirection) {
			onAjaxRedirect(data, settings);
		} else if (data.exceptionMessage) {
			if (data.exceptionMessage == 'timeout') {
				alert('请求超时，请重试！');
			} else if (data.exceptionMessage != 'abort') {
				MessageBox.error(data.exceptionMessage);
			}
		} else if (data.exceptionStack) {
			new $.dialog({
				title : '严重错误',
				html : '<div style="width:522px;height:400px;scroll: auto">' + data.exceptionStack + '</div>',
				cover : true,
				autoSize : false,
				rang : true,
				btnBar : false,
				iconTitle : false,
				link : true,
				width : 522,
				height : 422
			}).ShowDialog();
		}
		break;
	}
}

function isLoginUrl(url) {
	var reg = new RegExp('\/login$');
	return reg.test(url);
}
var loginDialog = null;
function onAjaxRedirect(data, settings) {
	var url = data.redirection;
	var qIndex = url.indexOf('?');
	var sIndex = url.indexOf(';');
	var subIndex = qIndex > 0 ? (sIndex > 0 ? Math.min(qIndex, sIndex) : qIndex) : (sIndex > 0 ? sIndex : qIndex);
	if (subIndex > 0) {
		url = url.substring(0, subIndex);
	}
	var postProtocolIndex = url.indexOf('://');
	if (url.indexOf('://') > 0) {
		url = window.location.protocol + url.substring(postProtocolIndex + 1);
	} else {
		if (url.indexOf(base) > -1) {
			url = window.location.protocol + '//' + (window.location.hostname + ':' + window.location.port + '/' + url).replace(new RegExp('//', "gm"), '/');
		} else {
			url = window.location.protocol + '//' + (window.location.hostname + ':' + window.location.port + '/' + base + '/' + url).replace(new RegExp('//', "gm"), '/');
		}
	}
	if (isLoginUrl(url)) {
		url += '?forward=/admin/ajaxforward';
		loginDialog = new $.dialog({
			title : '用户登录',
			page : url,
			cover : true,
			autoSize : true,
			rang : true,
			btnBar : false,
			iconTitle : false,
			link : true,
			width : 620,
			height : 425
		});
		loginDialog.closeDialog = function(username) {
			if (CURRENTUSER == username) {
				loginDialog.closeTime(0.5, function() {
					setTimeout(function() {
						mAjax(settings);
					}, 100);
				});
			} else {
				window.location.reload();
			}
		};
		loginDialog.ShowDialog();
	} else {
		alert('地址已转移: ' + data.redirection);
	}
}

function onAjaxForbidden(data, settings) {
	alert(data.errorMessage + ': ' + data.exceptionMessage);
}
function onAjaxNotFound(data, settings) {
	alert(data.errorMessage + ': ' + data.exceptionMessage);
}
function onAjaxServerError(data) {
	if (data.exceptionMessage.indexOf('reload') > -1 || data.exceptionMessage.indexOf('加载') > -1 || data.exceptionMessage.indexOf('加載') > -1) {
		alert(data.exceptionMessage);
		window.location = base;
	} else {
		alert(data.errorMessage + ': ' + data.exceptionMessage);
	}
}