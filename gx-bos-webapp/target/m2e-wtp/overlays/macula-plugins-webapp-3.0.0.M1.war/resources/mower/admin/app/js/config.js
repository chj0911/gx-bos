// $Id: config.js 5787 2015-09-06 01:25:07Z wilson $
var Cookie = (function() {
	return {
		// Create Cookie Function
		createCookie : function(name, value, days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			} else
				var expires = "";
			document.cookie = name + "=" + value + expires + "; path=/";
		},

		// Read Cookie Function
		readCookie : function(name) {
			var nameEq = name + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ')
					c = c.substring(1, c.length);
				if (c.indexOf(nameEq) == 0)
					return c.substring(nameEq.length, c.length);
			}
			return null;
		},

		// Erase Cookie Function
		eraseCookie : function(name) {
			Cookie.createCookie(name, "", -1);
		}
	}
})();

var Config = (function($) {

	'user strict';

	// private functions & variables
	var isLoginUrl = function(url) {
		var reg = new RegExp('\/login$');
		return reg.test(url);
	};

	var onAjaxRedirect = function(data, settings) {
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
				url = window.location.protocol
						+ '//'
						+ (window.location.hostname + ':' + window.location.port + '/' + url).replace(new RegExp('//',
								"gm"), '/');
			} else {
				url = window.location.protocol
						+ '//'
						+ (window.location.hostname + ':' + window.location.port + '/' + base + '/' + url).replace(
								new RegExp('//', "gm"), '/');
			}
		}
		if (isLoginUrl(url)) {
			url += '?forward=/login/ajaxforward';
			ModalBox.dialog({
				message : '<iframe style="border:0;" src="' + url + '" height="380" width="100%"></iframe>',
				title : "用户登录",
				onEscape : function(e) {
					if (CURRENTUSER == e.user) {
						setTimeout(function() {
							$.ajax(settings);
						}, 100);
					} else {
						window.location.reload();
					}
				}
			});
			ModalBox.closeDialog = function(username) {
				$(".bootbox").trigger({
					type : 'escape.close.bb',
					user : username
				});
			}
		} else {
			ModalBox.alert('地址已转移: ' + data.redirection);
		}
	};

	var onAjaxForbidden = function(data) {
		ModalBox.alert(data.errorMessage + ': ' + data.exceptionMessage);
	};

	var onAjaxNotFound = function(data) {
		ModalBox.alert(data.errorMessage + ': ' + data.exceptionMessage);
	};

	var onAjaxServerError = function(data) {
		if (data.exceptionMessage.indexOf('reload') > -1 || data.exceptionMessage.indexOf('加载') > -1
				|| data.exceptionMessage.indexOf('加載') > -1) {
			ModalBox.alert(data.exceptionMessage, function() {
				window.location = base;
			});
		} else {
			ModalBox.alert(data.errorMessage + ': ' + data.exceptionMessage);
		}
	};

	// public functions
	return {
		// public field
		$header : $('#header'),
		$main : $('#main'),
		$mainMenu : $('#main-menu'),
		$mainBreadCrumb : $('#main-breadcrumb'),
		$mainContent : $('#main-content'),
		$footer : $('#footer'),
		// main function
		onAjaxResponseError : function(c, data, settings, exception) {
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
				onAjaxForbidden(data);
				break;
			case 'http.404':
			case 404:
				onAjaxNotFound(data);
				break;
			case 'http.500':
			case 500:
				onAjaxServerError(data);
				break;
			default:
				if (data.redirection) {
					onAjaxRedirect(data, settings);
				} else if (data.exceptionMessage) {
					if (data.exceptionMessage == 'timeout') {
						ModalBox.alert('请求超时，请重试！');
					} else if (data.exceptionMessage != 'abort') {
						ModalBox.alert(data.exceptionMessage);
					}
				} else if (data.exceptionStack) {
					ModalBox.dialog({
						title : '严重错误',
						message : '<div style="width:100%;height:200px;scroll: auto">' + data.exceptionStack + '</div>',
						buttons : {
							ok : {
								label : '确定'
							}
						}
					});
				}
				break;
			}
		},
		// global base variable defined in layout.ftl
		getAbsoluteUrl : function(url, contextPath) {
			if (url.indexOf('://') >= 0) {
				return url;
			}
			if (url.charAt(0) != '/') {
				url = '/' + url;
			}

			var root = (contextPath || base);
			return url.startWith(root) ? url : root + url;
		}
	};
}(jQuery));

$(document).ready(function() {
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
			Config.onAjaxResponseError(xhr.status, data, settings || {}, lastException);
		}
	});
	
	ModalBox.setDefaults({
		locale: "zh_CN"
	});

	// Handle Skins
	if (Cookie.readCookie("current-skin-admin")) {
		var a = document.createElement('link');
		a.href = Cookie.readCookie("current-skin-admin");
		a.rel = "stylesheet";
		document.getElementsByTagName("head")[0].appendChild(a);
	}
});