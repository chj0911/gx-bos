/**
 * @author Wilson Luo
 */
(function($, undefined) {
	var pageIndex = 1000;
	$.maculapage = function(homepage) {

		var PageUtils = {
			getMid : function(href) {
				if ($.isFunction(decodeURIComponent)) {
					href = decodeURIComponent(href);
				}
				var mid = 0, hashes = href.slice(href.indexOf('?') + 1).split('&');
				for (var i = 0; i < hashes.length; i++) {
					var hash = hashes[i].split('=');
					if (hash[0] === '_mid') {
						mid = hash[1];
						break;
					}
				}
				return mid;
			},
			setMid : function(href, mid) {
				return (href.indexOf('?') > 0) ? href + '&_mid=' + mid : href + '?_mid=' + mid;
			}
		};

		if (window.opener != null && window.opener != window) {
			$('form').live('closeDialog', function(e) {
				window.close();
			});
		}

		$.history.init(function(hash) {
			if (hash) {
				var mid = PageUtils.getMid(hash);
				loadPageIfMenuLoaded(hash, mid, 0);
			}
		});
		function loadPageIfMenuLoaded(hash, mid, loadedTimes) {
			if (loadedTimes > 10) {
				return;
			}
			if (!PageContext.page_top_menu_loaded) {
				setTimeout(function() {
					loadPageIfMenuLoaded(hash, mid, loadedTimes++);
				}, 1500);
			} else {
				LAYOUT.top_menu.updatemenu(mid);
				if ($.isFunction(decodeURIComponent)) {
					hash = decodeURIComponent(hash);
				}
				if (hash.indexOf('&mode=') >= 0) {
					var mode = 'normal', hashes = hash.slice(hash.indexOf('?') + 1).split('&');
					for (var i = 0; i < hashes.length; i++) {
						var h = hashes[i].split('=');
						if (h[0] === 'mode') {
							mode = h[1];
							break;
						}
					}

					if (mode !== 'iframe' && mode !== 'open') {
						if (hash.indexOf('://') >= 0) {
							if (hash.indexOf(document.location.protocol + '//' + document.location.host) < 0) {
								mode = 'iframe';
							}
						}
					}

					if (mode === 'iframe') {
						var iframe = '<div id="content-head" class="content-head"></div>';
						iframe += '<div id="main" class="content-main"><div class="loading" style="height:100%;overflow:hidden;"><iframe width="100%" height="100%" frameborder="0" allowtransparency="true" onload="this.parentNode.className=\'\';" src="'
								+ hash + '"></iframe></div></div>';
						iframe += '<div id="content-foot" class="content-foot"></div>';
						$(document.body).updateHtml(iframe, false);
						$(window).trigger('resize');
						return;
					}
					if (mode === 'open') {
						window.open(hash);
					} else {
						$(document.body).updateContents(hash);
					}
				} else {
					$(document.body).updateContents(hash);
				}
			}
		}

		function getAbsoluteUrl(url, contextPath) {
			if (url.indexOf('://') >= 0) {
				return url;
			}
			if (url.charAt(0) != '/') {
				url = '/' + url;
			}
			var root = (contextPath || base);
			return url.startWith(root) ? url : root + url;
		}

		$(document.body).click(
				function(e) {
					var $target = $(e.target), index = 0;
					while (!$target.attr('href') && index++ < 3 && ($target = $target.parent())) {
						// nothing ;
					}

					if ($target.size() < 1 || $target.is(':disabled')) {
						return false;
					}

					var mid = $target.attr('_mid') || $target.attr('mid') || PageContext.page_selected_menu;
					var target = $target.attr('target'), href = $target.attr('href'), url = $target.attr('url');
					if (!target || !href) {
						return true;
					}
					if (!url || !href.match(/^javascript.+/i)) {
						return true;
					}
					var mode = target, extra = {};
					if (target.match(/::/)) {
						var params = target.split('::');
						mode = params[0], extra = JSON.decode(params[1] || '{}');
					}

					var finalCallback = function(data) {
						if (extra.callback && $.isFunction(extra.callback)) {
							extra.callback(data);
						}
						if (extra.trigger) {
							$target.trigger(extra.trigger, [ data ]);
						}
					};

					switch (mode) {
					case '_blank':
					case 'blank':
						$.openWindow(getAbsoluteUrl(url || href, $target.getContextPath()), extra.title || '',
								extra.width || -1, extra.height || -1);
						break;
					case 'menu':
						$('#side-r').trigger('hiderightpanel');
						var openMode = extra.openMode || 'normal';
						$.history.load(getAbsoluteUrl(PageUtils.setMid(url || href, mid) + '&mode=' + openMode + '&t='
								+ new Date().getTime(), $target.getContextPath()), extra);
						break;
					case 'dialog':
						var $dialog = null;
						$dialog = new $.dialog($.extend({
							id : '-page-dialog-' + (++pageIndex),
							html : true,
							cover : true,
							autoSize : true,
							rang : true,
							btnBar : false,
							iconTitle : false,
							dgOnLoad : function() {
								mAjax($.extend({
									url : getAbsoluteUrl(url, $target.getContextPath()),
									success : function(data) {
										$dialog.updateContent(data);
										finalCallback(data);
									}
								}, extra));
							}
						}, extra));
						$dialog.ShowDialog();
						break;
					case 'update':
						$(extra.container || document.body).updateContents(
								getAbsoluteUrl(url, $target.getContextPath()), extra, finalCallback);
						break;
					case 'replace':
						$(extra.container || document.body).replaceContents(
								getAbsoluteUrl(url, $target.getContextPath()), extra, finalCallback);
						break;
					case 'command':
						if (extra.trigger == null) {
							extra.trigger = 'onCommand';
						}
						mAjax($.extend({
							url : getAbsoluteUrl(url, $target.getContextPath()),
							type : 'post',
							dataType : 'json',
							success : function(data) {
								finalCallback(data);
							}
						}, extra));
						break;
					}
					return false;
				}).mouseover(function(e) {
			if ($(e.target).attr('title')) {
				window.status = $(e.target).attr('title');
			}
		});

		if (homepage && window.location.href.indexOf('#') == -1) {
			$.history.load(homepage);
		}
	};

	// 处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
	function banBackSpace(e) {
		var ev = e || window.event;// 获取event对象
		var obj = ev.target || ev.srcElement;// 获取事件源

		var t = obj.type || obj.getAttribute('type');// 获取事件源类型

		// 获取作为判断条件的事件类型
		var vReadOnly = obj.getAttribute('readonly');
		var vEnabled = obj.getAttribute('enabled');
		// 处理null值情况
		vReadOnly = (vReadOnly == null) ? false : vReadOnly;
		vEnabled = (vEnabled == null) ? true : vEnabled;

		// 当敲Backspace键时，事件源类型为密码或单行、多行文本的，
		// 并且readonly属性为true或enabled属性为false的，则退格键失效
		var flag1 = (ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vEnabled != true)) ? true
				: false;

		// 当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
		var flag2 = (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea") ? true : false;

		// 判断
		if (flag2) {
			return false;
		}
		if (flag1) {
			return false;
		}
	}

	// 禁止后退键 作用于Firefox、Opera
	document.onkeypress = banBackSpace;
	// 禁止后退键 作用于IE、Chrome
	document.onkeydown = banBackSpace;

})(jQuery);