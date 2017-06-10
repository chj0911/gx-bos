/**
 * @author Wilson Luo
 */
(function($, undefined) {

	$.fn.maculadropmenu = function(o) {
		var options = $.extend({
					drop_target_attr	: 'dropmenu',
					dropClass			: 'droping',
					eventType			: 'mouse',
					fix					: {}
				}, o || {});

		var self = this, element = $(this), menu = $('#' + element.attr(options.drop_target_attr)), status;
		function attach() {
			var dropClass = options.dropClass, eventType = options.eventType;
			var showFunction = function(e) {
				if ($(e.target).is("input")) {
					return;
				}
				menu.css({
							left	: element.position().left + (options.fix.x || 0),
							top		: element.position().top + element.height() + (options.fix.y || 0)
						});
				if (self.timer) {
					clearTimeout(self.timer);
					delete self.timer;
				}
				if (!status) {
					element.addClass(dropClass);
					status = true;
					menu.showme();
				}
			};
			var hideFunction = function() {
				if (status) {
					self.timer = setTimeout(function() {
								element.removeClass(dropClass);
								status = false;
								menu.hideme();
							}, 200);
				};
			};
			// click时需要点击之后才显示，否则表示鼠标移上去即显示
			if (eventType == 'click') {
				element.click(showFunction).hover(null, hideFunction);
				menu.hover(showFunction, hideFunction);
			} else {
				element.add(menu).hover(showFunction, hideFunction);
			}
		};

		attach();
	};
})(jQuery);