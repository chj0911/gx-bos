/**
 * @author Wilson Luo
 * @author hujh
 */
(function($, undefined) {

	var existedFinderCodes = [], dialogIndex = 100;

	function rebuildHoldingFinderCodes(eventBindingElement, code) {
		existedFinderCodes = $.grep(existedFinderCodes, function(existedCode, i) {
			var existedDom = $('#finder-header-' + existedCode).size();
			if (!existedDom) {
				eventBindingElement.unbind('.' + existedCode);
			}
			return existedDom > 0;
		});
		eventBindingElement.unbind('.' + code);
		existedFinderCodes.push(code);
	}

	$.maculafinder = function(code, options) {
		// 定义的常量
		var Constants = {
			data_send_event : code + '_data_send_.' + code,
			data_arrive_event : code + '_data_arrive_.' + code,
			row_selected_event : code + '_row_selected_.' + code,
			row_choiced_event : code + '_row_choiced_.' + code,
			row_all_selected_event : code + '_rowall_selected_.' + code,
			row_all_unselected_event : code + '_rowall_unselected_.' + code,
			tip_update_event : code + '_tip_update_.' + code,
			item_detail_event : code + '_item_detail_.' + code,
			selected_class : 'selected',
			selected_all_class : 'selectedall',
			unselected_class : 'unselected'
		};
		// Finder缓存的数据信息
		var PageData = {
			refreshTabViews : false,
			selectedItems : [],
			selectedAllFlag : false,
			dataTotal : 0
		};
		var relativePath = options.relativePath || '';
		// Ajax信息
		var ajaxOptions = $.extend({
			code : code,
			tab : '_',
			currentPage : 1,
			url : relativePath + 'macula-mda/finder/' + code + '/_',
			tabs : relativePath + 'macula-mda/finder/' + code + '/tabs',
			detail : relativePath + 'macula-mda/finder/' + code + '/detail',
			queryOnLoad : true
		}, options || {});
		var getAbsoluteUrl = function(url, contextPath) {
			if (url.indexOf('://') >= 0) {
				return url;
			}
			if (url.charAt(0) != '/') {
				url = '/' + url;
			}
			var root = (contextPath || base);
			return url.startWith(root) ? url : root + url;
		};
		// Finder 中需要操作的页面元素
		var Parts = {};
		$([ 'packet', 'action', 'action-form', 'search', 'filter', 'tip', 'header', 'footer', 'pager', 'keywords', 'filter-action', 'data-tmpl', 'list', 'nodata' ]).each(function() {
			Parts[this] = $('#finder-' + this + '-' + code);
		});
		// tabView 视图
		if (Parts['packet'].exists()) {
			ajaxOptions.url = Parts['packet'].find('li.current').attr('url');
			ajaxOptions.tab = Parts['packet'].find('li.current').attr('tabViewCode');
		}
		if (Parts['action'].exists()) {
			// action 分组按钮
			Parts['action'].find('.finder-action-group').hover(function() {
				$(this).find('ul').showme();
			}, function() {
				$(this).find('ul').hideme();
			}).click(function(e) {
				return false;
			});
			// action点击事件
			Parts['action']
					.find('.finderAction')
					.click(
							function(e) {
								var $target = $(this), target = $(this).attr('target'), url = getAbsoluteUrl($(this).attr('submit'), $(this).getContextPath()), confirmText = $(this).attr('confirm'), minRowSelected = $(
										this).attr('minRowSelected'), maxRowSelected = $(this).attr('maxRowSelected'), beforeUpdate = $(this).attr('beforeUpdate');
								var $form_tmp = Parts['action-form'].find('>div').empty();
								if (minRowSelected > 0
										&& ((PageData.selectedAllFlag && PageData.dataTotal < minRowSelected) || (!PageData.selectedAllFlag && PageData.selectedItems.length < minRowSelected))) {
									alert('请至少选择 ' + minRowSelected + ' 条数据项进行该操作！');
									return false;
								}
								if (maxRowSelected > 0
										&& ((PageData.selectedAllFlag && PageData.dataTotal > maxRowSelected) || (!PageData.selectedAllFlag && PageData.selectedItems.length > maxRowSelected))) {
									alert('请至多选择 ' + maxRowSelected + ' 条数据项进行该操作！');
									return false;
								}
								if (confirmText && !window.confirm(confirmText)) {
									return false;
								}
								if (beforeUpdate && $.isFunction(window[beforUpdate])) {
									if (window[beforUpdate]() === false) {
										return;
									}
								}
								// 如果只选中了某几条，也收集查询条件
								if (ajaxOptions.form) {
									ajaxOptions.form.find('*[name^=filters]:not([disabled])').each(function() {
										$form_tmp.append('<input type="hidden" name="selection.' + $(this).attr('name') + '" value="' + $(this).val() + '" />');
									});
								}
								if (!PageData.selectedAllFlag) {
									for (var i = 0; i < PageData.selectedItems.length; i++) {
										$form_tmp.append('<input type="hidden" name="selection.items[' + i + ']" value="' + PageData.selectedItems[i] + '" />');
									}
								}
								$form_tmp.append('<input type="hidden" name="selection.selectedAll" value="' + PageData.selectedAllFlag + '" />');
								Parts['action-form'].find('input[name="selection.finderCode"]').val(code);
								Parts['action-form'].find('input[name="selection.tabViewCode"]').val(ajaxOptions.tab);

								var mode = target, extra = {};
								if (target.match(/::/)) {
									var params = target.split('::');
									mode = params[0], extra = JSON.decode(params[1] || '{}');
								}
								// add by hujh 添加type参数
								extra.type = extra.type || 'POST';
								var finalCallback = function(data) {
									if (extra.callback && $.isFunction(extra.callback)) {
										extra.callback(data);
									}
									if (extra.trigger) {
										$target.trigger(extra.trigger, [ data ]);
									}
								};
								PageData.refreshTabViews = true;
								switch (mode) {
								case 'blank':
								case '_blank':
									$.openWindow('about:blank', extra.title || 'window_open_' + code, extra.width || -1, extra.height || -1);
									Parts['action-form'].attr('target', extra.title || 'window_open_' + code);
									Parts['action-form'].attr('action', url);
									Parts['action-form'].attr('method', extra.type);
									Parts['action-form'].submit();
									break;
								case 'newWindow':
								case '_newWindow':
									Parts['action-form'].attr('target', '_blank');
									Parts['action-form'].attr('action', url);
									Parts['action-form'].attr('method', extra.type);
									Parts['action-form'].submit();
									break;
								case 'dialog':
									var $dialog = null;
									$dialog = new $.dialog($.extend({
										id : '-finder-dialog-' + (++dialogIndex),
										html : true,
										cover : true,
										autoSize : true,
										rang : true,
										btnBar : false,
										iconTitle : false,
										onXclick : function(event) {
											$dialog.cancel();
											$dialog.cleanDialog();
											eventBindingElement.trigger(Constants.data_send_event);
										},
										dgOnLoad : function() {
											Parts['action-form'].ajaxSubmit($.extend({
												url : url
											}, $.extend(extra, {
												success : function(data) {
													$dialog.updateContent(data);
													finalCallback(data);
												}
											})));
										}
									}, extra));
									$dialog.ShowDialog();
									break;
								case 'update':
									if (!extra.success) {
										extra.success = function(data) {
											Parts['header'].parent().updateHtml(data, false, finalCallback);
											eventBindingElement.trigger(Constants.data_send_event, [ data ]);
										};
									}
									Parts['action-form'].ajaxSubmit($.extend({
										url : url
									}, extra));
									break;
								case 'replace':
									if (!extra.success) {
										extra.success = function(data) {
											Parts['header'].parent().updateHtml(data, true, finalCallback);
											eventBindingElement.trigger(Constants.data_send_event, [ data ]);
										};
									}
									Parts['action-form'].ajaxSubmit($.extend({
										url : url
									}, extra));
									break;
								case 'command':
									if (!extra.success) {
										extra.success = function(data) {
											finalCallback(data);
											eventBindingElement.trigger(Constants.data_send_event, [ data ]);
										};
									}
									Parts['action-form'].ajaxSubmit($.extend({
										url : url
									}, extra));
									break;
								}
								return false;
							});
		}
		if (Parts['search'].exists()) {
			// 简单查询列表选择
			Parts['search'].find('.finder-search-select').maculadropmenu({
				fix : {
					x : -6,
					y : 2
				}
			});
			Parts['keywords'].find('li').click(function(e) {
				var paramName = $(this).attr('key');
				Parts['search'].find('.finder-search-select').find('label').text($(this).text());
				Parts['search'].find('input[name*=filters][name$=name]').val(paramName);
				Parts['search'].find('div.searchWrapper').hideme().find('input,select,textarea').attr('disabled', 'disabled');
				Parts['search'].find('div.searchWrapper.' + paramName).showme().find('input,select,textarea').removeAttr('disabled');
				return false;
			}).first().trigger('click');

			// 简单查询回车事件
			var search_input = Parts['search'].find('input.finder-search-input');
			search_input.keypress(function(e) {
				if (e.which == 13) {
					e.preventDefault();
					ajaxOptions.form = Parts['search'];
					ajaxOptions.currentPage = 1;
					Parts['search'].trigger(Constants.data_send_event);
				}
			});
			// 简单查询按钮
			Parts['search'].find('.finder-search-btn').click(function(e) {
				e.preventDefault();
				ajaxOptions.form = Parts['search'];
				ajaxOptions.currentPage = 1;
				Parts['search'].trigger(Constants.data_send_event);
				return false;
			});
		}
		var $rside = $('#side-r');
		// 高级查询按钮
		if (Parts['filter-action'].exists()) {
			var initialized = false;
			Parts['filter-action'].click(function(e, query) {
				var self = $(this);
				var href = self.attr('url');
				if (self.hasClass('active')) {
					$rside.trigger('hiderightpanel');
				} else {
					self.addClass('active');
					if (!initialized) {
						$rside.macularightpanel({
							title : '高级筛选(搜索)',
							url : getAbsoluteUrl(href, Parts['filter-action'].getContextPath()),
							onLoad : function() {
								// 增加高级查询按钮事件
								$rside.find('#filter-submit-' + code).unbind('click').bind('click', function(e) {
									Parts['filter'] = $('#finder-filter-' + code);
									ajaxOptions.form = Parts.filter;
									ajaxOptions.currentPage = 1;
									Parts['filter-action'].trigger(Constants.data_send_event);
									$(this).blur();
									return false;
								});
								if (query) {
									$rside.find('#filter-submit-' + code).trigger('click');
								}
							},
							onShow : function() {
								Parts['search'].parent().hideme();
							},
							onHide : function() {
								Parts['search'].parent().showme();
								self.removeClass('active');
							}
						});
						initialized = true;
					}
					$rside.trigger('showrightpanel');
				}
				$(this).blur();
				e.preventDefault();
				e.stopPropagation();
				return false;
			});
		}
		$rside.trigger('hiderightpanel');
		if (Parts['header'].exists()) {
			// 总选择框
			Parts['header'].find('.col-select-opt-inner').maculadropmenu({
				eventType : 'click'
			});
			Parts['header'].find('.col-select-opt-inner').hover(function() {
				$(this).find('img').css('visibility', 'visible');
			}, function() {
				$(this).find('img').css('visibility', 'hidden');
			});
			// 选择框事件
			Parts['header'].find('.sellist').click(function() {
				var checked = $(this).attr('checked');
				PageData.selectedItems = [];
				Parts['list'].find('input[type=checkbox]').each(function() {
					$(this).attr('checked', checked);
					$(this).trigger(Constants.row_selected_event);
				});
			});
		}
		if (Parts['tip'].exists()) {
			// 选择提示框
			Parts['tip'].bind(Constants.tip_update_event, function(e, className, selectedCount) {
				if (selectedCount < 2 && className != Constants.selected_all_class) {
					className = 'unselected';
				}
				$(this).children().each(function() {
					if (!$(this).hasClass(className)) {
						$(this).hideme().parent().hideme().prev().addClass('hide');
					}
				});
				var el = $(this).find('.' + className);
				if (el.exists()) {
					el.html(el.html().replace(/<em>([\s\S]*?)<\/em>/ig, function() {
						return '<em>' + selectedCount + '</em>';
					})).showme().parent().showme().prev().removeClass('hide');
				}
			});
			Parts['tip'].width(Parts['list'].width() - 2);
		}
		var eventBindingElement = $(document.body);
		rebuildHoldingFinderCodes(eventBindingElement, code);
		if (Parts['pager'].exists()) {
			// 分页
			Parts['pager'].maculapagination({
				code : code
			});
		}
		eventBindingElement.bind(
				Constants.data_arrive_event,
				function(e, data) {
					PageData.dataTotal = data.totalElements;
					$('#content-head .finder-title .count2').text(PageData.dataTotal);
					if (data.content && data.content.length) {
						Parts['nodata'].hideme();
						Parts['list'].find('tbody:first').html(Parts['data-tmpl'].tmpl(data.content)).find('tr:odd').addClass('even').end().find('tr:even').addClass('odd').end().find('tr:first')
								.addClass('first');
					} else {
						Parts['list'].find('tbody:first').empty();
						Parts['nodata'].showme();
					}
					eventBindingElement.trigger(Constants.row_all_unselected_event);
				}).bind(Constants.data_send_event, function(e, options) {
			ajaxOptions = $.extend(ajaxOptions, options || {});
			if (ajaxOptions.form) {
				ajaxOptions.form.find('input[name=rows]').val(ajaxOptions.pageSize);
				ajaxOptions.form.find('input[name=page]').val(ajaxOptions.currentPage);
				$.metadata.setType('attr', 'validate');
				var validator = null;
				validator = ajaxOptions.form.validate({
					focusInvalid : false,
					submitHandler : function(form) {
						$(form).ajaxSubmit({
							url : getAbsoluteUrl(relativePath + ajaxOptions.form.attr('action') + "/" + ajaxOptions.tab, Parts['list'].getContextPath()),
							dataType : 'json',
							success : function(data) {
								if (data.success) {
									eventBindingElement.trigger(Constants.data_arrive_event, [ data ]);
								} else {
									var errors = {};
									$(data.validateErrors).each(function() {
										errors[this.element] = this.message;
									});
									validator.showErrors(errors);
									data.exceptionMessage && MessageBox.error(data.exceptionMessage, true);
								}
							}
						});
					}
				});
				ajaxOptions.form.submit();
			} else {
				mAjax({
					url : getAbsoluteUrl(ajaxOptions.url, Parts['list'].getContextPath()),
					type : 'post',
					dataType : 'json',
					data : {
						rows : ajaxOptions.pageSize,
						page : ajaxOptions.currentPage
					},
					success : function(data) {
						if (data.success) {
							eventBindingElement.trigger(Constants.data_arrive_event, [ data ]);
						} else {
							data.exceptionMessage && MessageBox.error(data.exceptionMessage, true);
						}
					}
				});
			}

			if (PageData.refreshTabViews && Parts['packet'].exists()) {
				PageData.refreshTabViews = false;
				mAjax({
					url : getAbsoluteUrl(ajaxOptions.tabs, Parts['list'].getContextPath()),
					type : 'post',
					dataType : 'json',
					success : function(data) {
						if (data.success) {
							Parts['packet'].find('li[tabViewCode]').each(function() {
								if ($(this).attr('tabViewCode')) {
									$(this).find('em:first').text(data[$(this).attr('tabViewCode')]);
								}
							});
						} else {
							data.exceptionMessage && MessageBox.error(data.exceptionMessage, true);
						}
					}
				});
			}
		}).bind(Constants.row_all_selected_event, function(e) {
			Parts['header'].find('.sellist').attr('checked', true);
			if (PageData.dataTotal > 0) {
				PageData.selectedAllFlag = true;
				PageData.selectedItems = [];
				Parts['tip'].trigger(Constants.tip_update_event, [ Constants.selected_all_class, PageData.dataTotal ]);
				updateCheckboxStatus();
			}
		}).bind(Constants.row_all_unselected_event, function(e) {
			Parts['header'].find('.sellist').attr('checked', false);
			PageData.selectedAllFlag = false;
			PageData.selectedItems = [];
			Parts['tip'].trigger(Constants.tip_update_event, [ Constants.unselected_class, PageData.selectedItems.length ]);
			updateCheckboxStatus();
		}).bind(Constants.row_selected_event, function(e) {
			var itemValue = $(e.target).val(), itemIndex = $.inArray(itemValue, PageData.selectedItems);
			if ($(e.target).attr('checked')) {
				$(e.target).closest('tr').addClass('selected');
				if (itemIndex < 0) {
					PageData.selectedItems.push(itemValue);
				}
				var page_all_selected = true;
				Parts['list'].find('input[type=checkbox].sel').each(function() {
					if (!$(this).attr('checked')) {
						page_all_selected = false;
						return false;
					}
				});
				if (page_all_selected) {
					Parts['header'].find('.sellist').attr('checked', true);
				}
			} else {
				$(e.target).closest('tr').removeClass('selected');
				if (itemIndex >= 0) {
					PageData.selectedItems.splice(itemIndex, 1);
				}
				Parts['header'].find('.sellist').attr('checked', false);
			}
			if (PageData.selectedItems.length == PageData.dataTotal || PageData.selectedAllFlag) {
				Parts['tip'].trigger(Constants.tip_update_event, [ Constants.selected_all_class, PageData.dataTotal ]);
			} else {
				Parts['tip'].trigger(Constants.tip_update_event, [ Constants.selected_class, PageData.selectedItems.length ]);
			}
			updateCheckboxStatus();
			$(e.target).blur();
		}).bind(Constants.row_choiced_event, function(e) {
			var itemValue = $(e.target).val(), $tr = $(e.target).closest('tr');
			$tr.parent().find('tr').removeClass('selected');
			$tr.addClass('selected');
			PageData.selectedItems = [ itemValue ];
			$(e.target).blur();
		}).bind(Constants.item_detail_event, function(e) {
			var $target = $(e.target), $tr = $target.closest('tr'), tdsize = $tr.find('>td').size(), itemId = $tr.attr('item-id');
			// 已显示的是当前行的信息
			if ($('#finder-detail-' + code).exists()) {
				if ($('#finder-detail-' + code).attr('item-id') == itemId) {
					if ($tr.hasClass('view-detail')) {
						$tr.removeClass('view-detail');
						$('#finder-detail-' + code).remove();
					} else {
						// 已载入，do nothing;
					}
					return;
				}
				$('#finder-detail-' + code).prev('tr').removeClass('view-detail');
				$('#finder-detail-' + code).remove();
			}
			$tr.addClass('view-detail');
			var detailViewPanel = $('#finder-detail-tmpl-' + code).tmpl().attr('item-id', itemId).insertAfter($tr);
			detailViewPanel.find('>td').attr('colspan', tdsize);
			detailViewPanel.updateContents(getAbsoluteUrl(ajaxOptions.detail, $target.getContextPath()), {
				data : {
					'item' : itemId,
					'tab' : ajaxOptions.tab
				}
			}, function() {
				Parts['list'].parent().scrollTop($tr.position().top);
				$('#finder-detail-content-' + code).width(Parts['list'].width());
			});
		});
		$(window).resize(function() {
			setTimeout(function() {
				if (Parts['tip'].exists()) {
					Parts['tip'].width(Parts['list'].width());
				}
				if ($('#finder-detail-content-' + code).exists()) {
					$('#finder-detail-content-' + code).width(Parts['list'].width());
				}
			}, 500);
		});
		function updateCheckboxStatus() {
			Parts['list'].find('input[type=checkbox].sel').each(function() {
				var selection = PageData.selectedAllFlag || $.inArray($(this).val(), PageData.selectedItems) >= 0;
				selection ? $(this).attr('checked', true).closest('tr').addClass('selected') : $(this).attr('checked', false).closest('tr').removeClass('selected');
			});
		}

		// 数据滚动事件
		var updaterTimer = null;
		Parts['list'].parent().bind('scroll', function() {
			var scroller = $(this);
			if (updaterTimer) {
				clearTimeout(updaterTimer);
			}
			updaterTimer = setTimeout(function() {
				Parts['tip'].css('margin-left', scroller.scrollLeft());
				Parts['header'].css('margin-left', -scroller.scrollLeft());
				if ($('#finder-detail-content-' + code).exists()) {
					$('#finder-detail-content-' + code).css('margin-left', scroller.scrollLeft());
				}
			}, 100);
		});
		// 载入数据
		if (ajaxOptions.queryOnLoad) {
			if (Parts['search'].exists()) {
				ajaxOptions.form = Parts['search'];
				eventBindingElement.trigger(Constants.data_send_event);
			} else if (Parts['filter-action'].exists()) {
				Parts['filter-action'].removeClass('active').trigger('click', [ true ]);
			} else {
				eventBindingElement.trigger(Constants.data_send_event);
			}
		}
	};
})(jQuery);