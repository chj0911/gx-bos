// /////////////////////////获取参数信息//////////////////////////////////////
var ParamsCache = {}, LoadingCache = {};
var $ClearParams, $Param, $ParamPage, $Params;
$ClearParams = function(codes) {
	if (codes != null && $.isArray(codes)) {
		for ( var i = 0; i < codes.length; i++) {
			if (typeof (codes[i]) == 'string') {
				ParamsCache[codes[i]] = null;
				LoadingCache[codes[i]] = null;
			}
		}
	}
};
$Param = function(code, path, params, callback) {
	if (typeof (code) != 'string') {
		if ($.isFunction(callback)) {
			setTimeout(function() {
				callback(code);
			}, 10);
		}
		return code;
	}
	var contextPath = (path || base), cacheCode = code + (params != null ? ':' + $.param(params) : ''), cacheValue = ParamsCache[cacheCode];
	if ($.isFunction(callback) && cacheValue == null && LoadingCache[cacheCode]) {
		setTimeout(function() {
			$Param(code, path, params, callback);
		}, 1000);
		return;
	}
	LoadingCache[cacheCode] = true;
	cacheValue = ParamsCache[cacheCode];
	if (cacheValue != null) {
		if ($.isFunction(callback)) {
			setTimeout(function() {
				callback(cacheValue);
			}, 10);
		}
		return cacheValue;
	}
	var url = contextPath + '/admin/macula-base/param/' + code, result = null;
	mAjax({
		url : url,
		dataType : 'json',
		type : 'GET',
		cache : params == null,
		data : params || {},
		async : $.isFunction(callback),
		success : function(data) {
			if (params == null) {
				ParamsCache[cacheCode] = data;
			}
			if ($.isFunction(callback)) {
				callback(data);
			}
			result = data;
		}
	});
	return result;
};
$ParamPage = function(code, path, params, callback) {
	var contextPath = (path || base);
	var result = null, url = contextPath + '/admin/macula-base/param/' + code + '/pageable';
	qAjax({
		url : url,
		dataType : 'json',
		type : 'GET',
		data : params,
		async : $.isFunction(callback),
		success : function(data) {
			if ($.isFunction(callback)) {
				callback(data);
			}
			result = data;
		}
	});
	return result;
};
$Params = function(codes, path) {
	var contextPath = (path || base);
	var grepCodes = $.grep(codes, function(it) {
		return ParamsCache[it] == null;
	});
	if (grepCodes.length) {
		var url = contextPath + '/admin/macula-base/param/';
		mAjax({
			url : url,
			dataType : 'json',
			type : 'POST',
			data : {
				code : grepCodes
			},
			async : false,
			success : function(data) {
				$.extend(ParamsCache, data || {});
			}
		});
	}
};
// ///////////////////////扩展binding类型//////////////////////////////////////
(function() {

	var nodePrefixIndex = 0;
	function getNodePrefix() {
		return 'N' + (nodePrefixIndex++);
	}
	function getUnwrapObservable(v) {
		var valueUnwrapped = ko.utils.unwrapObservable(v);
		while ($.isFunction(valueUnwrapped)) {
			valueUnwrapped = valueUnwrapped();
		}
		if (typeof (valueUnwrapped) == 'undefined' || valueUnwrapped == null) {
			valueUnwrapped = '';
		}
		return valueUnwrapped;
	}
	function getOptionsText(row, optionsText) {
		return getUnwrapObservable($.isFunction(optionsText) ? optionsText(row) : (row || [])[optionsText || 'label']);
	}
	function getOptionsValue(row, optionsValue) {
		if (!optionsValue) {
			return getUnwrapObservable(row);
		}
		return getUnwrapObservable($.isFunction(optionsValue) ? optionsValue(row) : (row || [])[optionsValue || 'code']);
	}
	function wrapperAlignElement($wrapper, $el) {
		$wrapper.alignFollow($el);
	}
	function getInputDefaultHeight() {
		return 15;
	}
	function createMatcherMethod(viewModel, matcher, optionsValue, optionsText) {
		var defaultMatcher = function(query, row, eq) {
			var optionV = getOptionsValue(row, optionsValue);
			if (optionV == query) {
				return true;
			}
			if (eq) {
				return false;
			}
			var optionT = getOptionsText(row, optionsText);
			return optionT == query || (typeof (optionV) == 'string' && optionV.indexOf(query) == 0) || (typeof (optionT) == 'string' && optionT.indexOf(query) == 0);
		};
		return viewModel[matcher] || matcher || defaultMatcher;
	}
	function createUsableMethod(viewModel, usable) {
		return viewModel[usable] || usable || function(row) {
			return true;
		};
	}
	function dateFormatUtil(value, type) {
		if (value !== null || value !== undefined) {
			if (type === 'date') {
				return $.date.format(value, datePattern);
			}
			if (type === 'datetime') {
				return $.date.format(value, dateTimePattern);
			}
			if (type === 'time') {
				return $.date.format(value, timePattern);
			}
		}
		return value;
	}
	function getTemplateContainer($wrapper, tmplKey) {
		if (!tmplKey) {
			return $wrapper;
		}
		var tbase = $wrapper.closest('[base]');
		if (tbase != null && tbase.exists()) {
			return tbase;
		}
		return $(document.body);
	}
	// 扩展了value update，解决date的格式转换和bool为false不设置值的问题
	var oldValueUpdate = ko.bindingHandlers['value']['update'];
	ko.bindingHandlers['value']['update'] = function(element, valueAccessor, allBindingsAccessor) {
		var newValue = ko.utils.unwrapObservable(valueAccessor());
		var newValueAccessor = ko.observable(newValue);
		var type = allBindingsAccessor()['type'];
		if (newValue !== null || newValue !== undefined) {
			if (type === 'bool' || type === 'boolean') {
				ko.selectExtensions.writeValue(element, newValue);
			} else {
				newValueAccessor(dateFormatUtil(newValue, type));
			}
		}
		oldValueUpdate(element, newValueAccessor);
	};

	// 扩展了text update，解决date的格式转换和bool为false不设置值的问题
	var oldTextUpdate = ko.bindingHandlers['text']['update'];
	ko.bindingHandlers['text']['update'] = function(element, valueAccessor, allBindingsAccessor) {
		var newValue = ko.utils.unwrapObservable(valueAccessor());
		var newValueAccessor = ko.observable(newValue);
		var type = allBindingsAccessor()['type'];
		newValueAccessor(dateFormatUtil(newValue, type));
		oldTextUpdate(element, newValueAccessor);
	};

	// 通过配置的参数值对，翻译值
	ko.bindingHandlers['code2value'] = {
		'update' : function(element, valueAccessor, allBindingsAccessor, viewModel) {
			var value = getUnwrapObservable(valueAccessor), allBindings = allBindingsAccessor();
			var $el = $(element), contextPath = getUnwrapObservable(allBindings['base']) || $el.getContextPath();
			if (value != '') {
				var options = getUnwrapObservable(allBindings['param']);
				// OptionsText and OptionsValue can be a function: function(row)
				var optionsText = allBindings['optionsText'], optionsValue = allBindings['optionsValue'], matcher = allBindings['matcher'], qvalue = allBindings['qvalue'];
				var matcherMethod = createMatcherMethod({}, matcher, optionsValue || 'code', optionsText || 'label');

				$Param(options, contextPath, qvalue, function(data) {
					for ( var i = 0; i < data.length; i++) {
						if (matcherMethod(value, data[i], true)) {
							value = getOptionsText(data[i], optionsText || 'label');
							break;
						}
					}
					ko.bindingHandlers['text']['update'](element, function() {
						return value;
					}, allBindingsAccessor);
				});
			} else {
				ko.bindingHandlers['text']['update'](element, function() {
					return value;
				}, allBindingsAccessor);
			}
		}
	};

	// 通过配置的参数值对，连续输出复选框
	ko.bindingHandlers.checkboxlist = {
		init : function(element, valueAccessor, allBindingsAccessor, viewModel) {
			var value = valueAccessor(), allBindings = allBindingsAccessor();
			var bindingValue = allBindings['value'], optionsText = allBindings['optionsText'], optionsValue = allBindings['optionsValue'];
			var width = allBindings['width'], height = allBindings['height'], cols = allBindings['cols'] || 100;
			var valueUnwrapped = getUnwrapObservable(value), contextPath = getUnwrapObservable(allBindings['base']) || $(element).getContextPath();
			var checkboxs = [];

			function updateCheckboxStatus(newValue) {
				var newValues = $.isArray(newValue) ? newValue : newValue.split(',');
				$(checkboxs).each(function() {
					$(this).setChecked($.inArray($(this).val(), newValues) >= 0);
				});
			}

			function buildInternalCheckboxList(valueUnwrapped) {
				if (!$.isArray(valueUnwrapped)) {
					return;
				}
				var $box = null;
				if (height || width) {
					$box = $('<p style="overflow: auto; border-width: 5px; border-style: solid; border-color: #eeeeee; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: #eeeeee; color: #000000; margin-bottom: 1.5em; background-position: initial initial; background-repeat: initial initial; " />');
					$box.insertBefore($(element));
					height && $box.css('height', height);
					width && $box.css('width', width);
				}
				$.each(valueUnwrapped, function(ix, thisValue) {
					var label = getOptionsText(thisValue, optionsText), code = getOptionsValue(thisValue, optionsValue);
					var $el = $('<input type="checkbox" />').cloneAttr(element).attr({
						'id' : $(element).attr('name') + '-' + getNodePrefix() + '-checkbox',
						value : code
					});
					if ($box != null) {
						$el.appendTo($box);
					} else {
						$el.insertBefore($(element));
					}
					var $label = $('<label for="' + $el.attr('id') + '">' + label + '&nbsp;&nbsp;</label>').insertAfter($el);
					if ((ix + 1) % cols == 0) {
						$('<br/>').insertAfter($label);
					}
					checkboxs.push($el);
				});
				$(checkboxs).each(function() {
					var newValues = getUnwrapObservable(bindingValue);
					if (typeof (newValues) == 'string') {
						newValues = newValues.split(',');
					}
					$(this).setChecked($.inArray($(this).val(), newValues) >= 0);
					$(this).click(function() {
						var existsValues = getUnwrapObservable(bindingValue);
						if (typeof (existsValues) == 'string') {
							existsValues = existsValues.split(',');
						}
						var code = $(this).val();
						var index = $.inArray(code, existsValues);
						if ($(this).getChecked()) {
							index < 0 && existsValues.push(code);
						} else {
							index >= 0 && (existsValues = $.grep(existsValues, function(value) {
								return value != code;
							}));
						}
						existsValues = $.grep(existsValues, function(value) {
							return value != '';
						});
						ko.isObservable(bindingValue) && bindingValue(existsValues.join(','));
					});
				});
				ko.isObservable(bindingValue) && bindingValue.subscribe(updateCheckboxStatus);
				updateCheckboxStatus(getUnwrapObservable(bindingValue));
			}

			$Param(valueUnwrapped, contextPath, null, function(data) {
				buildInternalCheckboxList(data);
			});
		}
	};

	// ================================
	// 复选框树
	// ================================
	ko.bindingHandlers.checkboxtree = {
		init : function(element, valueAccessor, allBindingsAccessor, viewModel) {
			var value = getUnwrapObservable(valueAccessor), allBindings = allBindingsAccessor();
			var bindingValue = allBindings['value'], optionsValue = allBindings['optionsValue'];
			var header = allBindings['optionsHeader'], optionsWidth = ko.utils.unwrapObservable(allBindings['optionsWidth']), optionsHeight = ko.utils.unwrapObservable(allBindings['optionsHeight']);
			var usable = allBindings['usable'], tmplKey = allBindings['tmplKey'], discascade = allBindings['discascade'];
			var discascadeSelectAncestor = allBindings['discascadeSelectAncestor'], discascadeSelectChild = allBindings['discascadeSelectChild'], alwaysSelectAncestor = allBindings['alwaysSelectAncestor'];
			var discascadeUnselectAncestor = allBindings['discascadeUnselectAncestor'], discascadeUnselectChild = allBindings['discascadeUnselectChild'];
			var childPrefix = 'child-of-', nodePrefix = getNodePrefix();

			var $wrapper = null, $table = null;
			var publishEventBySelf = false;
			// ================================
			// copy from tree table
			// ================================
			function childrenOf(node) {
				return $("table.treeTable tbody tr." + childPrefix + node[0].id);
			}
			function parentOf(node) {
				if (typeof (node[0]) == undefined) {
					return null;
				}
				if (node[0] == null) {
					return null;
				}
				var classNames = (node[0].className||'').split(' ');
				for ( var key = 0; key < classNames.length; key++) {
					if (classNames[key].match(childPrefix)) {
						return $("#" + classNames[key].substring(childPrefix.length));
					}
				}
				return null;
			}
			function ancestorsOf(node) {
				var ancestors = [];
				while (node = parentOf(node)) {
					ancestors[ancestors.length] = node[0];
				}
				return ancestors;
			}
			// ================================
			// Checkbox button status
			// ================================
			function selectChildren(node) {
				childrenOf(node).each(function() {
					$(this).find('button:first').attr('class', 'chk checkbox_true_full');
					selectChildren($(this));
				});
			}
			function unselectChildren(node) {
				childrenOf(node).each(function() {
					$(this).find('button:first').attr('class', 'chk checkbox_false_full');
					unselectChildren($(this));
				});
			}
			function updateAncestors(node) {
				$(ancestorsOf(node)).each(
						function() {
							var theNode = $(this), $bt = theNode.find('button:first'), $children = childrenOf(theNode);
							var hasFalse = $children.has('button.checkbox_false_full').length > 0, hasTrue = $children.has('button.checkbox_true_full').length > 0, hasTruePart = $children
									.has('button.checkbox_true_part').length > 0;
							if (hasTruePart || (hasFalse && hasTrue)) {
								if (!alwaysSelectAncestor) {
									$bt.attr('class', 'chk checkbox_true_part');
								} else {
									$bt.attr('class', 'chk checkbox_true_full');
								}
							} else if (hasFalse && !hasTrue) {
								$bt.attr('class', 'chk checkbox_false_full');
							} else if (!hasFalse && hasTrue) {
								$bt.attr('class', 'chk checkbox_true_full');
							}
						});
			}
			// ================================
			// Checkbox value and status
			// ================================
			function updateCheckboxStatus(newValue) {
				if (!publishEventBySelf) {
					var newValues = $.isArray(newValue) ? newValue : newValue.split(',');
					$table.find('button').attr('class', 'chk checkbox_false_full').each(function() {
						if ($.inArray($(this).val(), newValues) >= 0) {
							$(this).trigger('click', [ true ]);
							// $(this).closest('tr').reveal();
						}
					});
				}
			}
			
			function existButton(v) {
				var result = false;
				$table.find('button').each(function() {
					if ($(this).val() == v) {
						result = true;
						return false;
					}
				});
				return result;
			}

			function calculateFinalValues() {
				var checkedValues = [], originValues = getUnwrapObservable(bindingValue);
				originValues = $.isArray(originValues) ? originValues : originValues.split(',');
				$table.find('button.chk.checkbox_true_full').each(function() {
					checkedValues.push($(this).val());
				});
				originValues = $.grep(originValues, function(row, index) {
					return row != '' && $.inArray(row, checkedValues) == -1 && !existButton(row);
				});
				return checkedValues.concat(originValues).join(',');
			}
			// ================================
			// 创建模版
			// ================================
			function createTemplate(data) {
				var thead = ko.utils.unwrapObservable(header), sample = ko.utils.unwrapObservable(data);
				var $header = [], $content = [], firstTd = true;
				$.each(thead || sample, function(value, key) {
					if (thead != null) {
						$header.push('<th>' + value + '</th>');
					}
					if (firstTd) {
						$content.push('<td>{{if usableMethod(row) }}'
								+ '<button data-bind="value: getCheckboxValue(row), click: function(e,trigger){ onCheckboxClick(row,e,trigger); }" onfocus="this.blur();"></button>' + '{{/if}}' + '${'
								+ key + '}</td>');
						firstTd = false;
					} else {
						$content.push('<td>${' + key + '}</td>');
					}
				});

				return [ '<table class="treeTable gridlist"><thead>', $header.join(''), '</thead><tbody>',
						'{{each(i,row) content}}<tr id="${nodePrefix}-${id}" class="' + childPrefix + '${nodePrefix}-${pid}">', $content.join(''), '</tr>{{/each}}', '</tbody></table>' ].join('');
			}
			// ================================
			// Create checkbox tree
			// ================================
			function buildInternalCheckboxTree(data) {
				var treeViewModel = ko.mapping.fromJS({
					content : []
				});
				treeViewModel.getCheckboxValue = function(row) {
					return getOptionsValue(row, optionsValue || 'id');
				};
				treeViewModel.usableMethod = createUsableMethod(treeViewModel, usable);
				treeViewModel.nodePrefix = nodePrefix;
				treeViewModel.onCheckboxClick = function(row, e, trigger) {
					var $bt = $(e.currentTarget), $tr = $bt.closest('tr');
					if ($bt.hasClass('checkbox_false_full')) { // 执行选择
						$bt.attr('class', 'chk checkbox_true_full');
						if (!discascade) {
							if (!discascadeSelectChild) {
								selectChildren($tr);
							}
							if(!discascadeSelectAncestor){
								updateAncestors($tr);
							}
						}
					} else if ($bt.hasClass('checkbox_true_part') || $bt.hasClass('checkbox_true_full')) { // 执行不选择
						$bt.attr('class', 'chk checkbox_false_full');
						if (!discascade) {
							if (!discascadeUnselectChild) {
								unselectChildren($tr);
							}
							if (!discascadeUnselectAncestor) {
								updateAncestors($tr);
							}
						}
					}
					if (!trigger) {
						var checkedValue = calculateFinalValues();
						if (ko.isObservable(bindingValue)) {
							publishEventBySelf = true;
							bindingValue(checkedValue);
							publishEventBySelf = false;
						}
					}
				};

				var $el = $(element).hideme();
				$wrapper = $('<div/>').insertBefore($(element)).addClass('checkboxtree');

				optionsWidth && $wrapper.width(optionsWidth);
				optionsHeight && $wrapper.height(optionsHeight);
				wrapperAlignElement($wrapper, $el);

				var templateName = tmplKey || (getNodePrefix() + '-checkboxtree-template');
				if (!$('#' + templateName).exists()) {
					var templateContent = createTemplate(data[0]);
					getTemplateContainer($wrapper, tmplKey).append('<script type="text/x-jquery-tmpl" id="' + templateName + '"> ' + templateContent + '</script>');
				}
				$wrapper.append('<div data-bind="template: { name: \'' + templateName + '\' }"/>');
				treeViewModel.content(ko.mapping.toJS(data).makeLineTree());
				ko.applyBindings(treeViewModel, $wrapper[0]);
				$wrapper.find('tr.' + childPrefix + nodePrefix + '-').removeClass(childPrefix + nodePrefix + '-');
				$table = $wrapper.find('table:first').treeTable();
				if (!$.browser.msie || $.browser.msie.version > 6) {
					$table.find('button').hover(function() {
						$(this).addClass('focus');
					}, function() {
						$(this).removeClass('focus');
					});
				}
				$table.find('tbody tr:first').expand();

				if (ko.isObservable(bindingValue)) {
					bindingValue.subscribe(updateCheckboxStatus);
				}
			}

			var cachedContent = null, contextPath = getUnwrapObservable(allBindings['base']) || $(element).getContextPath();
			function requestRemote(onDataCallback) {
				if (cachedContent) {
					return onDataCallback(cachedContent);
				}
				$Param(value, contextPath, null, function(data) {
					cachedContent = data;
					return onDataCallback(cachedContent);
				});
			}
			requestRemote(function(data) {
				buildInternalCheckboxTree(data);
				updateCheckboxStatus(ko.utils.unwrapObservable(bindingValue));
			});
		}
	};

	// ================================
	// 单选树
	// ================================
	ko.bindingHandlers.radiotree = {
		init : function(element, valueAccessor, allBindingsAccessor, viewModel) {
			var value = getUnwrapObservable(valueAccessor), allBindings = allBindingsAccessor();
			var bindingValue = allBindings['value'], optionsValue = allBindings['optionsValue'];
			var header = allBindings['optionsHeader'], optionsWidth = ko.utils.unwrapObservable(allBindings['optionsWidth']), optionsHeight = ko.utils.unwrapObservable(allBindings['optionsHeight']);

			var usable = allBindings['usable'], tmplKey = allBindings['tmplKey'];
			var childPrefix = 'child-of-', nodePrefix = getNodePrefix();
			var $wrapper = null, $table = null;

			function updateRadioStatus(newValue) {
				var choiceRadio = $table.find('input[type=radio][value=' + newValue + ']');
				if (choiceRadio.exists()) {
					choiceRadio.setChecked(true).closest('tr').reveal();
				} else {
					$table.find('input[type=radio]').setChecked(false);
				}
			}

			function buildInternalRadioTree(data) {
				var treeViewModel = ko.mapping.fromJS({
					content : []
				});
				treeViewModel.getRadioValue = function(row) {
					return getOptionsValue(row, optionsValue || 'id');
				};
				treeViewModel.usableMethod = createUsableMethod(treeViewModel, usable);
				treeViewModel.nodePrefix = nodePrefix;
				treeViewModel.stoleName = stoleName = $(element).attr('name') + '-' + getNodePrefix() + '-stole';

				var $el = $(element).hideme();
				$wrapper = $('<div/>').insertBefore($(element)).addClass('checkboxtree');
				optionsWidth && $wrapper.width(optionsWidth);
				optionsHeight && $wrapper.height(optionsHeight);
				wrapperAlignElement($wrapper, $el);
				var templateName = tmplKey || (getNodePrefix() + '-radiotree-template');

				if (!$('#' + templateName).exists()) {
					var templateContent = createTemplate(data[0]);
					getTemplateContainer($wrapper, tmplKey).append('<script type="text/x-jquery-tmpl" id="' + templateName + '"> ' + templateContent + '</script>');
				}
				$wrapper.append('<div data-bind="template: { name: \'' + templateName + '\' }"/>');
				treeViewModel.content(ko.mapping.toJS(data).makeLineTree());
				ko.applyBindings(treeViewModel, $wrapper[0]);
				$wrapper.find('tr.' + childPrefix + nodePrefix + '-').removeClass(childPrefix + nodePrefix + '-');
				// $wrapper.find('tr.' + childPrefix + nodePrefix +
				// '-0').removeClass(childPrefix + nodePrefix + '-0');
				$table = $wrapper.find('table:first').treeTable();
				$wrapper.find('input[type=radio]').click(function() {
					ko.isObservable(bindingValue) && bindingValue($(this).val());
				});
				$table.find('tbody tr:first').expand();
			}
			function createTemplate(data) {
				var thead = ko.utils.unwrapObservable(header);
				var $header = [], $content = [], firstTd = true;

				$.each(thead || sample, function(value, key) {
					if (thead != null) {
						$header.push('<th>' + value + '</th>');
					}
					if (firstTd) {
						$content.push('<td>{{if usableMethod(row) }}' + '<input type="radio" name="${stoleName}" data-bind="value: getRadioValue(row)" onfocus="this.blur();" />' + '{{/if}}' + '${'
								+ key + '}</td>');
						firstTd = false;
					} else {
						$content.push('<td>${' + key + '}</td>');
					}
				});
				return [ '<table class="treeTable gridlist"><thead>', $header.join(''), '</thead><tbody>',
						'{{each(i,row) content}}<tr id="${nodePrefix}-${id}" class="' + childPrefix + '${nodePrefix}-${pid}">', $content.join(''), '</tr>{{/each}}', '</tbody></table>' ].join('');
			}
			var cachedContent = null, contextPath = getUnwrapObservable(allBindings['base']) || $(element).getContextPath();
			function requestRemote(onDataCallback) {
				if (cachedContent) {
					return onDataCallback(cachedContent);
				}
				$Param(value, contextPath, null, function(data) {
					cachedContent = data;
					return onDataCallback(cachedContent);
				});
			}
			if (ko.isObservable(bindingValue)) {
				bindingValue.subscribe(updateRadioStatus);
			}
			requestRemote(function(data) {
				buildInternalRadioTree(data);
				updateRadioStatus(getUnwrapObservable(bindingValue));
			});
		}
	};

	// ================================
	// 单选框列表
	// ================================
	ko.bindingHandlers.radiolist = {
		init : function(element, valueAccessor, allBindingsAccessor, viewModel) {
			var value = valueAccessor(), allBindings = allBindingsAccessor();
			var bindingValue = allBindings['value'], optionsText = allBindings['optionsText'], optionsValue = allBindings['optionsValue'];
			var width = allBindings['width'], height = allBindings['height'], cols = allBindings['cols'] || 100;
			var valueUnwrapped = getUnwrapObservable(value), contextPath = getUnwrapObservable(allBindings['base']) || $(element).getContextPath();

			var radios = [], groupName = getNodePrefix();

			function updateRadioStatus(newValue) {
				$(radios).each(function() {
					$(this).setChecked($(this).val() == newValue);
				});
			}

			function buildInternalRadioList(valueUnwrapped) {
				if (!$.isArray(valueUnwrapped)) {
					return;
				}
				var $box = null;
				if (height || width) {
					$box = $('<p style="overflow: auto; border-width: 5px; border-style: solid; border-color: #eeeeee; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: #eeeeee; color: #000000; margin-bottom: 1.5em; background-position: initial initial; background-repeat: initial initial; ">');
					$box.insertBefore($(element));
					height && $box.css('height', height);
					width && $box.css('width', width);
				}
				$.each(valueUnwrapped, function(ix, thisValue) {
					var label = getOptionsText(thisValue, optionsText), code = getOptionsValue(thisValue, optionsValue);
					var $el = $('<input type="radio" />').cloneAttr(element).attr({
						name : $(element).attr('name') + '-radio' + '-' + groupName,
						id : $(element).attr('name') + '-' + getNodePrefix() + '-radio',
						value : code
					});
					if ($box != null) {
						$el.appendTo($box);
					} else {
						$el.insertBefore($(element));
					}
					var $label = $('<label for="' + $el.attr('id') + '">' + label + '&nbsp;&nbsp;</label>').insertAfter($el);
					if ((ix + 1) % cols == 0) {
						$('<br/>').insertAfter($label);
					}
					radios.push($el);
				});

				$(radios).each(function() {
					var newValues = getUnwrapObservable(bindingValue);
					$(this).setChecked($(this).val() == newValues);
					$(this).click(function() {
						ko.isObservable(bindingValue) && bindingValue($(this).val());
					});
				});
				ko.isObservable(bindingValue) && bindingValue.subscribe(updateRadioStatus);
				updateRadioStatus(getUnwrapObservable(bindingValue));
			}

			$Param(valueUnwrapped, contextPath, null, function(data) {
				buildInternalRadioList(data);
			});
		}
	};
	// ================================
	// 表格选项列表
	// ================================
	ko.bindingHandlers.tableOptions = {
		init : function(element, valueAccessor, allBindingsAccessor, viewModel) {
			var value = ko.utils.unwrapObservable(valueAccessor()), allBindings = allBindingsAccessor();
			var bindingValue = allBindings['value'], optionsText = allBindings['optionsText'], optionsValue = allBindings['optionsValue'];
			var header = allBindings['optionsHeader'], matcher = allBindings['matcher'], optionsChange = allBindings['optionsChange'];
			var optionsWidth = ko.utils.unwrapObservable(allBindings['optionsWidth']), optionsHeight = ko.utils.unwrapObservable(allBindings['optionsHeight']);
			var tmplKey = ko.utils.unwrapObservable(allBindings['tmplKey']);

			var contextPath = getUnwrapObservable(allBindings['base']) || $(element).getContextPath();
			var $div = null, $el = null, $bt, $wrapper = null, wrapperVisible = false, wrapperHasFocus = false, templateName = tmplKey || (getNodePrefix() + '-options-template');
			var pageDataCached = [], listSize = 20, pageSize = 100, requestTimer = false, oldValue = null, oldExtractlyValue = null;
			// //////////////////创建模版////////////////////////
			function createTemplate(sample) {
				var thead = ko.utils.unwrapObservable(header);
				var $header = [], $content = [];
				$.each(thead || sample, function(key, value) {
					if (thead != null) {
						$header.push('<th>' + key + '</th>');
					}
					if (thead != null) {
						$content.push('<td>${' + value + '}</td>');
					} else {
						$content.push('<td>${' + key + '}</td>');
					}
				});
				return [ '<table class="gridlist"><thead>', $header.join(''), '</thead><tbody>',
						'{{each(i,row) content}}<tr data-bind="click: function(e, trigger) { onRowClick(row,e,trigger); return false;}">', $content.join(''), '</tr>{{/each}}', '</tbody></table>' ]
						.join('');
			}
			// //////////////////构建数据模型////////////////////////////////////
			var selectOptionsModel = ko.mapping.fromJS({
				content : []
			});
			selectOptionsModel.selectedObject = null;
			selectOptionsModel.onRowClick = function(row, e, trigger) { // 行点击事件
				var $tr = $(e.target).closest('tr');
				onRowSelect(row, $tr);
				$wrapper && $wrapper.scrollTop($wrapper.scrollTop() + $tr.offset().top - $wrapper.offset().top - $wrapper.height() / 2);
				if (!trigger) {
					doUserChoice();
				}
			};
			// //////////对Option操作助手方法////////////////////
			var extractMatcherMethod = createMatcherMethod(viewModel, matcher, optionsValue, optionsText);
			var optionsChangeMethod = viewModel[optionsChange] || optionsChange || function() {
			};
			// //////////////////构建html元素////////////////////////////////////
			function buildInternalTableOptions() {
				$el = $(element).clone().removeAttr('data-bind').removeAttr('validate').attr({
					id : $(element).attr('id') + '-' + getNodePrefix() + '-stole',
					name : $(element).attr('name') + '-' + getNodePrefix() + '-stole',
					autocomplete : 'off'
				}).addClass('table-select-options');
				$bt = $('<button id="' + $(element).attr('id') + '-' + getNodePrefix() + '-btn" class="table-select-options">&nbsp;</button>');
				$div = $('<div id="' + $(element).attr('id') + '-' + getNodePrefix() + '-box" class="div-input-box" />');
				$div.insertBefore($(element));
				$div.append($el).append($bt);
				$div.width($el.width());
				$el.width($el.width() - 16);
				var $el_height = Math.max($el.height(), getInputDefaultHeight());
				$div.height($el_height + 5);
				$bt.height($el_height + 5);
				$div.css({
					"line-height" : $el_height + 5 + 'px',
					overflow : 'hidden'
				});
				$(element).hideme();

				// /////////////////////////元素事件//////////////////////////
				$bt.click(function(e) {
					e.preventDefault();
					$(this).focus(); // FIX Chrome点击按钮不获取焦点
					$el.trigger('dblclick');
				});
				$el.focus(function() {
					$(this).select();
				}).click(function(e) {
					e.preventDefault();
				}).dblclick(function(e) {
					e.preventDefault();
					if (!wrapperVisible) {
						oldValue = null;
						requestAgain($el.val(), showOptionList);
					}
				});
				$el.add($bt).keydown(function(e) {
					switch (e.keyCode) {
					case 40:// Down
						e.preventDefault();
						if (!wrapperVisible) {
							if ($el.val().length) {
								oldValue = null;
								requestAgain($el.val(), showOptionList);
							}
						} else {
							onNextRowSelect();
						}
						break;
					case 38:// Up
						e.preventDefault();
						onPrevRowSelect();
						break;
					case 9: // Tab
						doUserChoice();
						break;
					case 27: // Esc
						e.preventDefault();
						$el.trigger('updateValueEvent', oldExtractlyValue);
						return false;
						break;
					case 13:// Enter, prevent form submission
						e.preventDefault();
						doUserChoice();
						return false;
						break;
					default:
						break;
					}
				}).keyup(function(e) {
					switch (e.keyCode) {
					case 40: // Down
					case 38: // Up
					case 9: // Tab
					case 27: // Esc
					case 13: // Enter, prevent form submission
						break;
					default:
						requestAgain($el.val(), showOptionList);
						break;
					}
				}).keypress(function(e) {
					if (e.keyCode == 13) {
						// Enter, prevent form submission
						e.preventDefault();
						return false;
					}
				}).blur(function(e) {
					if (!wrapperHasFocus) {
						if ($el.val() == '') {
							selectOptionsModel.selectedObject = null;
						}
						doUserChoice();
					}
				}).bind('updateValueEvent', function(e, evalue) {
					requestAgain(evalue, function(evalue, content) {
						selectOptionsModel.selectedObject = content[0];
						if (evalue == '') {
							selectOptionsModel.selectedObject = null;
						}
						doUserChoice();
					}, true);
				});

				if (ko.isObservable(bindingValue)) {
					bindingValue.subscribe(function(newValue) {
						if (typeof (newValue) == 'object') {
							newValue = getOptionsValue(newValue, optionsValue);
						}
						$el.trigger('updateValueEvent', newValue);
					});
				}

				$el.trigger('updateValueEvent', getUnwrapObservable(bindingValue));
			}

			// /////////////////////////上下箭选择以及Tab、Enter选择//////////////////////////
			var $tr_selected = null;
			function onRowSelect(row, $tr) {
				selectOptionsModel.selectedObject = row;
				$tr_selected = $tr;
				$tr_selected.parent().find('tr').removeClass('current');
				$tr_selected.addClass('current');
			}

			function onNextRowSelect() { // 选择下一行
				var sib = $tr_selected.next();
				if (sib.length) {
					sib.trigger('click', [ true ]);
				}
			}
			function onPrevRowSelect() { // 选择上一行
				var sib = $tr_selected.prev();
				if (sib.length) {
					sib.trigger('click', [ true ]);
				}
			}
			function doUserChoice() { // 确认选择
				hideOptionList();
				var choiceText = getOptionsText(selectOptionsModel.selectedObject, optionsText || 'label');
				var choiceValue = getOptionsValue(selectOptionsModel.selectedObject, optionsValue);
				$(element).val(choiceValue);
				$el.val(choiceText);
				if (ko.isObservable(bindingValue)) {
					bindingValue(choiceValue);
					// 值变化事件
					optionsChangeMethod.apply(viewModel, [ selectOptionsModel.selectedObject ]);
				}
			}

			function showOptionList(q, data) {
				if ($wrapper == null) {
					if (data.length < 1) {
						return;
					}
					$wrapper = $('<div/>').addClass('table-select-options').insertAfter($div);
					optionsWidth && $wrapper.width(optionsWidth);
					optionsHeight && $wrapper.height(optionsHeight);
					if (!$('#' + templateName).exists()) {
						var templateContent = createTemplate(data[0]);
						getTemplateContainer($wrapper, tmplKey).append('<script type="text/x-jquery-tmpl" id="' + templateName + '"> ' + templateContent + '</' + 'script>');
					}
					$wrapper.append('<div data-bind="template: { name: \'' + templateName + '\' }"/>');
					ko.applyBindings(selectOptionsModel, $wrapper[0]);
					$wrapper.hover(function(e) {
						wrapperHasFocus = true;
					}, function(e) {
						wrapperHasFocus = false;
					});
					$wrapper.bgiframe({
						width : $wrapper[0].offsetWidth,
						height : $wrapper[0].offsetHeight
					});
				}
				selectOptionsModel.content(data.slice(0, Math.min(data.length, listSize)));
				onRowSelect(data[0], $wrapper.find('tbody>tr:first'));
				wrapperAlignElement($wrapper, $div);
				$wrapper.showme();
				wrapperVisible = true;
			}
			function hideOptionList() {
				$wrapper && $wrapper.hideme();
				wrapperVisible = false;
			}

			function requestAgain(q, onDataCallback, eq) {
				if (typeof (q) == 'undefined' || q == null || oldValue == q) {
					return;
				}
				oldValue = q;
				// 先检查已有的缓存中是否可以有足够的匹配
				var useCachedIndex = -1, cachedQueryLength = -1;
				for ( var i = 0, length = pageDataCached.length; i < length; i++) {
					var currentQuery = pageDataCached[i].currentQuery;
					if (currentQuery.length > cachedQueryLength && q.indexOf(currentQuery) == 0) {
						useCachedIndex = i;
					}
				}
				if (useCachedIndex > -1) {
					var lastPage = pageDataCached[useCachedIndex].lastPage, content = pageDataCached[useCachedIndex].content;
					content = $.grep(content, function(row, index) {
						return extractMatcherMethod(q, row, eq);
					});
					if (content.length >= listSize || lastPage) {
						onDataCallback(q, content);
						return;
					}
				}
				if (requestTimer !== false) {
					clearTimeout(requestTimer);
					requestTimer = false;
				}
				requestTimer = setTimeout(function() {
					requestRemote(q, function(q, page) {
						page.currentQuery = q;
						if (q == $el.val()) {
							q = $(element).val();
						}
						content = $.grep(page.content, function(row, index) {
							return extractMatcherMethod(q, row, eq);
						});
						if (content.length) {
							pageDataCached.push(page);
						}
						onDataCallback(q, content);
					});
				}, 200);
			}
			function requestRemote(q, onDataCallback) {
				if ($.isFunction(value)) {
					onDataCallback(q, value(q));
					return;
				}
				var params = {
					'qvalue' : q,
					'page' : 1,
					'rows' : pageSize
				};
				$ParamPage(value, contextPath, params, function(data) {
					onDataCallback(q, data);
				});
			}
			setTimeout(buildInternalTableOptions, 10);
		}
	};
	ko.bindingHandlers.treeOptions = {
		init : function(element, valueAccessor, allBindingsAccessor, viewModel) {
			var value = ko.utils.unwrapObservable(valueAccessor()), allBindings = allBindingsAccessor();
			var bindingValue = allBindings['value'], optionsText = allBindings['optionsText'], optionsValue = allBindings['optionsValue'], header = allBindings['optionsHeader'], matcher = allBindings['matcher'], optionsChange = allBindings['optionsChange'], usable = allBindings['usable'], optionsWidth = ko.utils
					.unwrapObservable(allBindings['optionsWidth']), optionsHeight = ko.utils.unwrapObservable(allBindings['optionsHeight']);
			var tmplKey = allBindings['tmplKey'], contextPath = getUnwrapObservable(allBindings['base']) || $(element).getContextPath();
			var publishEventBySelf = false;

			var $div = null, $el = null, $bt = null, $wrapper = null, wrapperVisible = false, wrapperHasFocus = false, templateName = tmplKey || (getNodePrefix() + '-options-template'), oldExtractlyValue = null;
			// //////////////////创建模版////////////////////////
			var childPrefix = 'child-of-', nodePrefix = getNodePrefix();
			function createTemplate(sample) {
				var thead = ko.utils.unwrapObservable(header);
				var $header = [], $content = [];
				$.each(thead || sample, function(key, value) {
					if (thead != null) {
						$header.push('<th>' + key + '</th>');
					}
					if (thead != null) {
						$content.push('<td>${' + value + '}</td>');
					} else {
						$content.push('<td>${' + key + '}</td>');
					}
				});
				return [ '<table class="treeTable gridlist"><thead>', $header.join(''), '</thead><tbody>', '{{each(i,row) content}}', '<tr id="${nodePrefix}-${id}"',
						'class="' + childPrefix + '${nodePrefix}-${pid}"', 'data-bind="click: function(e, trigger) {return onRowClick(row,e,trigger);}">', $content.join(''), '</tr>{{/each}}',
						'</tbody></table>' ].join(' ');
			}
			// //////////////////构建数据模型////////////////////////////////////
			var selectOptionsModel = ko.mapping.fromJS({
				content : []
			});
			selectOptionsModel.nodePrefix = nodePrefix;
			selectOptionsModel.onRowClick = function(row, e, trigger) { // 行点击事件
				var $tr = $(e.target).closest('tr');
				$tr.reveal().expand();
				onRowSelect(row, $tr);
				$wrapper && $wrapper.scrollTop($wrapper.scrollTop() + $tr.offset().top - $wrapper.offset().top - $wrapper.height() / 2);
				if (!trigger) {
					doUserChoice();
				}
			};
			selectOptionsModel.selectedObject = null;
			// //////////对Option操作助手方法////////////////////
			var extractMatcherMethod = createMatcherMethod(viewModel, matcher, optionsValue, optionsText);
			var usableMethod = viewModel[usable] || usable || function(row) {
				return true;
			};
			var optionsChangeMethod = viewModel[optionsChange] || optionsChange || function() {
			};
			// //////////////////构建html元素////////////////////////////////////
			function buildInternalTreeOptions() {
				$el = $(element).clone().removeAttr('data-bind').removeAttr('validate').attr({
					id : $(element).attr('id') + '-' + getNodePrefix() + '-stole',
					name : $(element).attr('name') + '-' + getNodePrefix() + '-stole',
					autocomplete : 'off'
				}).addClass('tree-select-options');
				$bt = $('<button id="' + $(element).attr('id') + '-' + getNodePrefix() + '-btn" class="tree-select-options">&nbsp;</button>');
				$(element).hideme();

				$div = $('<div id="' + $(element).attr('id') + '-' + getNodePrefix() + '-box" class="div-input-box" />');
				$div.insertBefore($(element));
				$div.append($el).append($bt);
				$div.width($el.width());
				$el.width($el.width() - 16);
				var $el_height = Math.max($el.height(), getInputDefaultHeight());
				$div.height($el_height + 5);
				$bt.height($el_height + 5);
				$div.css({
					"line-height" : $el_height + 5 + 'px',
					overflow : 'hidden'
				});

				$bt.click(function(e) {
					$(this).focus(); // FIX Chrome点击按钮不获取焦点
					$el.trigger('dblclick');
				}).blur(function(e) {
					$el.trigger('blur');
				});
				$el.add($bt).focus(function() {
					$(this).select();
				}).click(function(e) {
					e.preventDefault();
				}).dblclick(function(e) {
					e.preventDefault();
					if (!wrapperVisible) {
						requestRemote($el.val(), showOptionList, true);
					}
				}).keydown(function(e) {
					switch (e.keyCode) {
					// Down
					case 40:
						e.preventDefault();
						if (!wrapperVisible) {
							requestRemote($el.val(), showOptionList, true);
						} else {
							onNextRowSelect();
						}
						break;
					// Up
					case 38:
						e.preventDefault();
						onPrevRowSelect();
						break;
					// Tab
					case 9:
						hideOptionList();
						doUserChoice();
						break;
					// Esc
					case 27:
						e.preventDefault();
						hideOptionList();
						return false;
						break;
					// Enter, prevent form submission
					case 13:
						e.preventDefault();
						hideOptionList();
						doUserChoice();
						return false;
						break;
					default:
						break;
					}
				}).keyup(function(e) {
					switch (e.keyCode) {
					case 40: // Down
					case 38: // Up
					case 9: // Tab
					case 27: // Esc
					case 13: // Enter, prevent form submission
						break;
					default:
						requestRemote($el.val(), showOptionList);
						break;
					}
				}).keypress(function(e) {
					if (e.keyCode == 13) { // Enter, prevent form submission
						e.preventDefault();
						return false;
					}
				}).blur(function(e) {
					if (!wrapperHasFocus) {
						($el.val() == '') && (selectOptionsModel.selectedObject = null);
						doUserChoice();
					}
				}).bind('updateValueEvent', function(e, evalue) {
					oldValue = null;
					requestRemote(evalue, function(q, content, hidden, eq) {
						showOptionList(q, content, true, eq);
						if (q != '') {
							publishEventBySelf = true;
							doUserChoice();
							publishEventBySelf = false;
						}
						hideOptionList();
					}, true);
				});

				if (ko.isObservable(bindingValue)) {
					bindingValue.subscribe(function(newValue) {
						if (!publishEventBySelf) {
							if (typeof (newValue) == 'object') {
								newValue = getOptionsValue(newValue, optionsValue);
							}
							$el.trigger('updateValueEvent', [ newValue ]);
						}
					});
				}

				$el.trigger('updateValueEvent', [ getUnwrapObservable(bindingValue) ]);
			}

			// -------------------------------------------
			// 以下部分tableOptions与treeOptions几乎相同的处理
			// -------------------------------------------
			// /////////////////////////上下箭选择以及Tab、Enter选择//////////////////////////
			var $choicedRow = null;
			function onRowSelect(row, $tr) {
				selectOptionsModel.selectedObject = usableMethod(row) ? row : null;
				$choicedRow = $tr;
				$choicedRow.parent().find('tr').removeClass('current');
				$choicedRow.addClass('current');
			}

			function onNextRowSelect() { // 选择下一行
				var sib = $choicedRow.next();
				if (sib.length) {
					sib.trigger('click', [ true ]);
					if (selectOptionsModel.selectedObject == null) {
						onNextRowSelect();
					}
				}
			}
			function onPrevRowSelect() { // 选择上一行
				var sib = $choicedRow.prev();
				if (sib.length) {
					sib.trigger('click', [ true ]);
					if (selectOptionsModel.selectedObject == null) {
						onPrevRowSelect();
					}
				}
			}
			function doUserChoice() { // 确认选择
				hideOptionList();
				if (selectOptionsModel.selectedObject != null && !usableMethod(selectOptionsModel.selectedObject)) {
					selectOptionsModel.selectedObject = null;
					return false;
				}
				oldExtractlyValue = getOptionsValue(selectOptionsModel.selectedObject, optionsValue);
				var label = getOptionsText(selectOptionsModel.selectedObject, optionsText);
				$el.val(label);
				$(element).val(oldExtractlyValue);
				if (ko.isObservable(bindingValue)) {
					bindingValue(oldExtractlyValue);
					// 值变化事件
					optionsChangeMethod.apply(viewModel, [ selectOptionsModel.selectedObject ]);
				}
				return true;
			}
			function showOptionList(q, data, hidden, eq) {
				if ($wrapper == null) {
					if (data.length == 0) {
						return;
					}
					$wrapper = $('<div/>').addClass('tree-select-options').insertAfter($div);
					optionsWidth && $wrapper.width(optionsWidth);
					optionsHeight && $wrapper.height(optionsHeight);
					if (!$('#' + templateName).exists()) {
						var templateContent = createTemplate(data[0]);
						getTemplateContainer($wrapper, tmplKey).append('<script type="text/x-jquery-tmpl" id="' + templateName + '"> ' + templateContent + '</script>');
					}
					$wrapper.append('<div data-bind="template: { name: \'' + templateName + '\' }"/>');
					selectOptionsModel.content(ko.mapping.toJS(data).makeLineTree());
					ko.applyBindings(selectOptionsModel, $wrapper[0]);
					$wrapper.find('tr.' + childPrefix + nodePrefix + '-').removeClass(childPrefix + nodePrefix + '-');
					var $table = $wrapper.find('table:first').treeTable();
					$table.find('tr').each(function() {
						$(this).find('td:first').click(function(e) {
							if ("TD" != e.target.tagName) {
								e.stopPropagation();
								return false;
							}
						});
					});
					$wrapper.hover(function(e) {
						wrapperHasFocus = true;
					}, function(e) {
						wrapperHasFocus = false;
					}).blur(function(e) {
						hideOptionList();
					});
					$wrapper.bgiframe({
						width : $wrapper[0].offsetWidth,
						height : $wrapper[0].offsetHeight
					});
				}
				if (!wrapperVisible) {
					if (!hidden) {
						wrapperAlignElement($wrapper, $div);
						$wrapper.showme();
						wrapperVisible = true;
					}
				}
				if (q == $el.val()) {
					q = $(element).val();
				}
				var selectRow = $.grep(data, function(row, index) {
					return extractMatcherMethod(q, row, eq);
				});
				if (selectRow.length) {
					$choicedRow = $('#' + nodePrefix + '-' + selectRow[0]['id']);
				} else {
					$choicedRow = $wrapper.find('tbody>tr:first');
				}
				$choicedRow.trigger('click', [ true ]);
			}

			function hideOptionList() {
				wrapperVisible = false;
				$wrapper && $wrapper.hideme();
			}

			function requestRemote(q, onDataCallback, eq) {
				$Param(value, contextPath, null, function(data) {
					return onDataCallback(q, data, false, eq);
				});
			}
			setTimeout(buildInternalTreeOptions, 10);
		}
	};
})();
