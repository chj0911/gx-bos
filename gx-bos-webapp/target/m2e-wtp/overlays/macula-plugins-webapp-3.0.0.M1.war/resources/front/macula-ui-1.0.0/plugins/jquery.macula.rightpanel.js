/**
 * @author Wilson Luo
 */
(function($, undefined) {
	$.fn.macularightpanel = function(o) {
		var element = $(this), options = $.extend({
			width : 180
		}, o || {});
		// var head = null, content = null, foot = null;
		var _create = function() {
			// head = element.find('#side-r-head');
			// content = element.find('#side-r-content');
			// foot = element.find('#side-r-foot');

			element.find('.side-r-title').html(options.title || '');
			element.find('.side-r-close').unbind("click").click(function() {
				hideSide();
			});
			options.ajaxOptions = {
				beforeSend : function() {
					element.addClass('loading');
				},
				complete : function() {
					element.removeClass('loading');
				}
			};
			showSide();
			element.updateContents(options.url, options, function() {
				if (options.onLoad) {
					options.onLoad();
				}
			});
		}, showSide = function() {
			if (options.width) {
				element.width(options.width);
			}
			element.removeClass('hide').showme();
			if (options.onShow) {
				options.onShow();
			}
			$(window).trigger('resize');
		}, hideSide = function() {
			element.addClass('hide');
			if (options.onHide) {
				options.onHide();
			}
			$(window).trigger('resize');
		};
		element.bind({
			'hiderightpanel' : hideSide,
			'showrightpanel' : showSide
		});
		_create();
	};

})(jQuery);