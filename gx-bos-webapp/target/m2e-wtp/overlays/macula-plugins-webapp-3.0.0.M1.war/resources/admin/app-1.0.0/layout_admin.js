/** 页面各局部的区域 */
var LAYOUT = {};
var PageContext = {
	page_top_menu_loaded : false,
	page_selected_menu : 0
};
$(function() {
	LAYOUT = {
		head : $('#header'),
		container : $('#container'),
		top_menu : $('#top_menu'),
		side : $('#side'),
		side_content : $('#side-content'),
		workground : $('#workground'),
		content_main : $('#main'),
		content_head : $('#content-head'),
		content_foot : $('#content-foot'),
		side_r : $('#side-r'),
		side_r_content : $('#side-r-content'),
		leftToggler : $('#leftToggler'),
		select_mid : 0
	};
	$('#loadpart').hideme().remove();
	$('#body').showme();
	return initDesktop();
});

/** 页面初始化 */
var initDesktop = function() {
	var resizeLayout = function() {
		var winWidth = $(window).width();
		var winHeight = $(window).height();

		var containerOuterHeight = winHeight - LAYOUT.head.outerHeight();
		var containerPatchHeight = LAYOUT.container.patchHeight();

		var sideLeftWidth = 0;
		if (!LAYOUT.side.hasClass('hide')) {
			LAYOUT.side.width(winWidth * 0.12);
			sideLeftWidth = LAYOUT.side.outerWidth(true);
		}
		var leftTogglerWidth = 0;
		if (!LAYOUT.leftToggler.hasClass('hide')) {
			leftTogglerWidth = LAYOUT.leftToggler.outerWidth(true);
		}
		var sideRightWidth = 0;
		if (!LAYOUT.side_r.hasClass('hide')) {
			LAYOUT.side_r.width(winWidth * 0.17);
			LAYOUT.side_r_content.height(containerOuterHeight - LAYOUT.side_r.find('.side-r-top').outerHeight(true) - LAYOUT.side_r.find('.side-r-head').outerHeight(true)
					- LAYOUT.side_r.find('.side-r-foot').outerHeight(true) - LAYOUT.side_r.patchHeight() - LAYOUT.side_r_content.patchHeight());
			sideRightWidth = LAYOUT.side_r.outerWidth(true);
		}

		LAYOUT.container.height(containerOuterHeight - containerPatchHeight);
		LAYOUT.container.width(winWidth.limit(960, 2000));

		LAYOUT.content_main.height(LAYOUT.container.height() - LAYOUT.content_head.outerHeight(true) - LAYOUT.content_foot.outerHeight(true) - LAYOUT.workground.patchHeight());

		LAYOUT.workground.width(winWidth - sideLeftWidth - leftTogglerWidth - LAYOUT.workground.patchWidth() - sideRightWidth - 2);
		LAYOUT.content_main.width(LAYOUT.workground.width());
	};
	$(document.body).ajaxStart(function() {
		MessageBox.error('正在加载...');
		if (!$(this).isMasked()) {
			$(this).mask('正在加载...');
		}
	}).ajaxStop(function() {
		MessageBox.tip('加载完成...', true);
		$(this).unmask();
	});
	var windowResizeTimer = 0;
	$(window).resize(function() {
		clearTimeout(windowResizeTimer);
		windowResizeTimer = setTimeout(resizeLayout, 100);
	});
	LAYOUT.leftToggler.click(function() {
		if ($(this).hasClass('fixed')) {
			return;
		}
		LAYOUT.side.toggleClass('hide');
		var fcokk = 'desktop_' + CURRENTUSER + '_sideleft';

		if (!LAYOUT.side.hasClass('hide')) {
			$.cookie(fcokk, null);
		} else {
			$.cookie(fcokk, 'OFF-SHOW', {
				expires : 365
			});
		}
		$(this).trigger('onLeftTogglerChange');
		$(window).trigger('resize');
	});
	LAYOUT.leftToggler.bind('onLeftTogglerChange', function() {
		if (LAYOUT.side.hasClass('hide')) {
			LAYOUT.leftToggler.find('.toggler-left-inner').addClass('hide');
		} else {
			LAYOUT.leftToggler.find('.toggler-left-inner').removeClass('hide');
		}
	}).trigger('onLeftTogglerChange');
	if ($('#favor').exists()) {
		/* 快捷菜单处理 */
		$('#favor').hover(function() {
			$(this).addClass('favor-active');
			var drop_menu = $(this).find('.x-drop-menu'), handle_h = $(this).find('.favor-handle')[0].offsetHeight, drop_menu_h = $(window).height() - handle_h;
			drop_menu.css({
				'top' : handle_h - 1,
				'left' : 0
			}).show();

			if (drop_menu_h <= drop_menu[0].offsetHeight) {
				var edit_menu = $(this).find('.x-edit-menu'), menu_h = drop_menu_h - drop_menu.patchHeight();
				drop_menu.height(menu_h).find('ul').css({
					'overflow-y' : 'auto',
					'height' : menu_h - edit_menu[0].offsetHeight
				}).hide();
			}
		}, function() {
			$(this).removeClass('favor-active');
			$(this).find('.x-drop-menu').hide();
		});
		(function() {
			var dmenu = $('#favor > .x-drop-menu').hide();
			dmenu.width($(window).width() - $('#favor').position().left - dmenu.patchWidth() - 7);
		})();
	}
	$(window).trigger('resize');
};

var MessageBox = (function() {
	var $ele = $('#messagebox'), delay = null;
	var allClass = 'warning default', self = this;
	this.showMessage = function(msg, clz, autoClose) {
		if (delay) {
			clearTimeout(delay);
			delay = null;
		}
		$ele.html(msg).removeClass(allClass).addClass(clz);
		if (autoClose) {
			delay = setTimeout(function() {
				$ele.removeClass(clz);
			}, 1500);
		}
	};
	return {
		error : function(msg, autoClose) {
			self.showMessage(msg, 'warning', autoClose);
		},
		info : function(msg, autoClose) {
			self.showMessage(msg, 'default', autoClose);
		},
		tip : function(msg, autoClose) {
			if (delay == null) {
				self.showMessage(msg, 'default', autoClose);
			}
		}
	};

})();