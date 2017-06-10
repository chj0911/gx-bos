/**
 * @author Wilson Luo
 */
(function($, undefined) {

	$.fn.maculamenu = function(o) {
		var options = $
				.extend(
						{
							url : undefined,
							dataType : 'json',
							topMenuTmpl : $
									.template(
											null,
											'<dl><dt><a mid="${id}" target="menu" class="wg"><span>${name}</span></a></dt><dd><ul>{{each(index2, menu2) children}}<li><a class="head-nav-sub" href="javascript:void(0)"><span>${menu2.name}</span></a><ul>{{each(index3, menu3) menu2.children}}<li><a mid="${menu3.id}" url="${menu3.uri}" target="menu::{openMode:\'{{if menu3.attributes.openMode}}${menu3.attributes.openMode}{{else}}normal{{/if}}\'}" href="javascript:void(0);">${menu3.name}</a></li>{{/each}}</ul></li>{{/each}}</ul></dd></dl>'),
							leftMenuTmpl : $
									.template(
											null,
											'<div class="side-bx first"><div class="side-bx-title"><h3>${name}</h3></div><div class="side-bx-bd"><ul>{{each(index2, menu2) children}}<li><a mid="${menu2.id}" url="${menu2.uri}" target="menu::{openMode:\'{{if menu2.attributes.openMode}}${menu2.attributes.openMode}{{else}}normal{{/if}}\'}" href="javascript:void(0);">${menu2.name}</a></li>{{/each}}</ul></div></div>'),
							left_menu : undefined
						}, o || {});

		var self = this, element = $(this), selected_mid, menuRoots, _mouse;

		var _getCurrentTopMenu = function() {
			if (selected_mid && selected_mid > 0) {
				var seletedMenu = element.find('a[mid=' + selected_mid + ']');
				return seletedMenu.closest('dl').find('a.wg:first');
			}
			return $();
		};

		var createTopMenu = function() {
			element.empty();
			var menusMapping = [];
			var html_part = [];
			for ( var i = 0; i < menuRoots.length; i++) {
				$.tmpl(options.topMenuTmpl, menuRoots[i].children).appendTo(element);
			}
			element.find('dl').each(function() {
				var selfArch = $(this).find('a:first'), firstArch = $(this).find('a[url]:first');
				if (firstArch.length) {
					selfArch.attr('_mid', firstArch.attr('mid')).attr('url', firstArch.attr('url')).attr('href', firstArch.attr('href'));
				}
				$(this).find('dd>ul>li:last').addClass('last');
			});
		};

		var _bindTopMenuBehavior = function() {
			var workMenus = element.find('dl');
			workMenus.hover(function() {
				_mouse = true;
				_getCurrentTopMenu().removeClass('current');
				$(this).find('.wg').addClass('current');
				var dd = $(this).find('dd');
				if (dd.exists()) {
					dd.bgiframe({
						width : dd[0].offsetWidth,
						height : dd[0].offsetHeight
					}).showme().css(_absoluteFix($(this), dd));
				}
			}, function() {
				if (_mouse) {
					$(this).find('.wg').removeClass('current');
					_getCurrentTopMenu().addClass('current');
					var dd = $(this).find('dd');
					if (dd.exists()) {
						dd.hideme();
					}
				}
			}).click(function(e) {
				_mouse = true;
				var dl = $(this);
				setTimeout(function() {
					dl.trigger('mouseleave');
				}, 300);
			});
		};
		var _bindLeftMenuBehavior = function() {
			var $leftmenu = $(options.left_menu);
			$($leftmenu.selector + ' .side-bx-title').live('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var bx = $(this).parent(), bd = $(this).next('.side-bx-bd');
				if (bx.hasClass('side-bx-toggled')) {
					bd.showme();
					bx.removeClass('side-bx-toggled');
				} else {
					bd.hideme();
					bx.addClass('side-bx-toggled');
				}
			});
		};

		// Left Menu 构建
		var createLeftMenu = function(top_mid) {
			function findMenuByParentId(parentId) {
				for ( var i = 0; i < menuRoots.length; i++) {
					var tmpMenus = menuRoots[i].children;
					for ( var i = 0; i < tmpMenus.length; i++) {
						if (tmpMenus[i].id == parentId) {
							return tmpMenus[i];
						}
					}
				}
			}
			var topMenu = findMenuByParentId(top_mid);
			$.tmpl(options.leftMenuTmpl, topMenu.children).appendTo($(options.left_menu));
			$(options.left_menu).find('>div:first').addClass('first');
			$(options.left_menu).find('>div:last').addClass('last');
		};
		var _absoluteFix = function(dl, dd) {
			var dlleft = dl.position().left, dltop = dl.position().top, dlright = dlleft + dl.width();
			var ddwidth = dd.width(), winwidth = $(window).width();
			if (dlleft + ddwidth < winwidth || ddwidth > dlright) {
				return {
					'left' : dlleft,
					'top' : dltop + dl.height()
				};
			} else {
				return {
					'left' : dlright - dd.outerWidth(true),
					'top' : dltop + dl.height()
				};
			}
		};

		self.updatemenu = function(mid) {
			selected_mid = mid;
			element.find('a.wg').removeClass('current');
			var topMid = _getCurrentTopMenu().addClass('current').attr('mid');
			if (options.left_menu) {
				var $leftmenu = $(options.left_menu);
				$(options.left_toggle).removeClass('fixed hide');
				var side = $leftmenu.empty().parents('.side');
				// 如果没有mid，则清除并隐藏
				if (!mid || mid <= 0 || !topMid) {
					if (!side.hasClass('hide')) {
						side.addClass('hide');
					}
					return;
				}
				var fcokk = 'desktop_' + CURRENTUSER + '_sideleft';
				var showCookieValue = !$.cookie(fcokk);
				if (showCookieValue) {
					side.removeClass('hide');
				}
				$(options.left_toggle).trigger('onLeftTogglerChange');
				// 检测是否已经存在，如果存在则不需要变动
				if ($leftmenu.find('a[mid=' + mid + ']').exists()) {
					return;
				}
				// 如果不存在，则需要重新构建html文档
				createLeftMenu(topMid);
				// 选中指定mid
				var sub = $leftmenu.find('a[mid=' + mid + ']');
				if (!sub.hasClass('current')) {
					sub.addClass('current');
				}
			}
			$(window).trigger('resize');
		};

		if (!!options.url) {
			mAjax({
				url : options.url,
				success : function(data) {
					menuRoots = data.makeLevelTree({
						pid : 'parentId',
						order : function(m) {
							return m['attributes']['ordered'];
						}
					});
					createTopMenu();

					element.find('dl ul li li').sameWidth().click(function() {
						$(this).parent('dl').trigger('mouseleave');
						_mouse = false;
					});
					_bindTopMenuBehavior();
					_bindLeftMenuBehavior();
					PageContext.page_top_menu_loaded = true;
				},
				dataType : options.dataType,
				type : 'GET'
			});
		}
	};

})(jQuery);