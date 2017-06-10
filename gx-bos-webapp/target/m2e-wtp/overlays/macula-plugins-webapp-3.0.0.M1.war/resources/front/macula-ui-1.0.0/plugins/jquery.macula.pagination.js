/**
 * @author Wilson Luo
 */
(function($, undefined) {

	$.fn.maculapagination = function(o) {

		var element = $(this), startPos = 0, endPos = 0, options = $.extend({
			curClass : 'current',
			pageClass : 'pagernum',
			nextBtn : 'next',
			preBtn : 'prev',
			pageMainClass : 'pager',
			data_send_event : '_data_send_.',
			data_arrive_event : '_data_arrive_.',
			summaryHtml : $.template(null, '共${total}条记录,当前页:${startPos}-${endPos}条')
		// code: '',
		// currentPage:当前页
		// total:总条目数
		// pageSize:每页条目数
		}, o || {});
		var _create = function() {
			// 设置转移到**页的事件
			var validateCodes = [ 13, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,/* 96, 97, 98, 99, 100, 101, 102, 103, 104, 105,*/ 8, 9, 46, 37, 39 ];
			element.find('input[type=text]:first').keypress(function(e) {
				if (e.shiftKey || $.inArray(e.which, validateCodes) < 0) {
					e.preventDefault();
					return;
				}
				if (e.which == 13) {
					var page = parseInt($(this).val());
					var pageTotal = cuculatePageTotal();
					page = Math.min(Math.max(0, isNaN(page) ? 1 : page), pageTotal);
					gotoPage(page);
					$(this).val(page);
					this.select();
				}
			});
			// 设置每页条数事件
			var $handle = element.find('.finder-pageset-handle'), $dropmenu = $('#' + $handle.attr('dropmenu'));
			element.find('input[type=radio]').click(function() {
				$handle.html($(this).next('label').text());
				gotoPage(null, $(this).val());
			});
			$handle.parent().hover(function() {
				$handle.addClass('active');
				var _pos = $handle.position();
				$dropmenu.css({
					left : _pos.left,
					top : _pos.top - $dropmenu.outerHeight() + 1
				}).showme();
			}, function() {
				$handle.removeClass('active');
				$dropmenu.hideme();
			});
			// 设置数据载入回调
			$(document.body).bind(options.code + options.data_arrive_event + options.code, function(e, data) {
				update({
					total : data.totalElements,
					pageSize : data.size,
					currentPage : data.number + 1
				});
			});
		};
		var update = function(o) {
			options = $.extend(options, o || {});
			var pageSize = options.pageSize, currentPage = options.currentPage;
			startPos = pageSize * (currentPage - 1) + 1;
			endPos = pageSize * currentPage;
			updatePageList();
			updateSummary();
			updatePageSize();
			attachEvent();
		}, updatePageList = function() {
			var pageMainClass = options.pageMainClass, pageClass = options.pageClass;
			var $pageList = element.find('.' + pageMainClass + ' .' + pageClass);
			$pageList.html(createPrevPage() + createPageLinks() + createNextPage());
		}, updateSummary = function() {
			element.find('td:last').html($.tmpl(options.summaryHtml, {
				total : options.total,
				startPos : Math.min(startPos, options.total),
				endPos : Math.min(endPos, options.total)
			}));
		}, updatePageSize = function() {
			var $handle = element.find('.finder-pageset-handle');
			element.find('input[type=radio]').each(function() {
				if (parseInt($(this).val()) == options.pageSize) {
					$(this).attr('checked', true);
					$handle.html($(this).next('label').text());
				}
			});
		}, attachEvent = function() {
			element.find('.' + options.pageClass + '>span:not(.current)').click(function(e) {
				var requestPage = options.currentPage;
				if ($(this).hasClass(options.nextBtn)) {
					requestPage += 1;
				} else if ($(this).hasClass(options.preBtn)) {
					requestPage -= 1;
				} else {
					requestPage = parseInt($(this).text());
				}
				gotoPage(requestPage);
			});
		}, gotoPage = function(pageNum, pageSize) {
			var requestPage = pageNum || options.currentPage, requestSize = pageSize || options.pageSize;
			if (requestPage > cuculatePageTotal() || (requestPage - 1) * requestSize > options.total) {
				requestPage = 1;
			}
			$(document.body).trigger(options.code + options.data_send_event + options.code, [ {
				pageSize : requestSize,
				currentPage : requestPage
			} ]);
		}, createPageLinks = function() {
			var links = [], t = cuculatePageTotal(), c = parseInt(options.currentPage);
			if (t < 2) {
				// no links
			} else if (t < 11) {
				links.push(createPageNumLink(1, t));
			} else {
				if (t - c < 8) {
					links.push(createPageNumLink(1, 3));
					links.push(createPageNumLink(t - 8, t));
				} else if (c < 10) {
					links.push(createPageNumLink(1, Math.max(c + 3, 10)));
					links.push(createPageNumLink(t - 1, t));
				} else {
					links.push(createPageNumLink(1, 3));
					links.push(createPageNumLink(c - 2, c + 3));
					links.push(createPageNumLink(t - 1, t));
				}
			}
			return links.join('...');
		}, createPageNumLink = function(from, to) {
			var links = [];
			for ( var i = from, l = to + 1; i < l; i++) {
				options.currentPage == i ? links.push('<span class="' + options.curClass + '">' + i + '</span>') : links.push('<span>' + i + '</span>');
			}
			return links.join(' ');
		}, createNextPage = function() {
			return cuculatePageTotal() > options.currentPage ? '<span class="' + options.nextBtn + '">»</span>' : '&nbsp;';
		}, createPrevPage = function() {
			return (options.total > 0 && options.currentPage > 1) ? '<span class="' + options.preBtn + '">«</span>' : '&nbsp;';
		}, cuculatePageTotal = function() {
			return parseInt(options.total / options.pageSize) + (options.total % options.pageSize == 0 ? 0 : 1);
		};

		_create();
	};
})(jQuery);