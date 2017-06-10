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

$(function() {
	var userKey = "$f43312dbce092333$"
	// Setting focus
	$('input[name="username"]').focus();

	$('#password').keypress(function(event) {
		detectCapsLock(event);
	});

	$('#loginCode').click(updateCaptcha);
	$('#loginCode_a').click(updateCaptcha);
	
	if (typeof validationErrors != 'undefined') {
		for ( var name in validationErrors ) {
			$('#' + name).removeClass('has-error').addClass('has-error');
		}
	}
	
	// 恢复用户名
	var MaculaUserName = Cookie.readCookie(userKey);
	if (MaculaUserName != null && MaculaUserName != "") {
		$('#userName').val(MaculaUserName);
		$('#password').focus();
	} else {
		$('#userName').select();
	}

	function detectCapsLock(e) {
		var valueCapsLock = e.which;
		var valueShift = e.shiftKey;
		if (((valueCapsLock >= 65 && valueCapsLock <= 90) && !valueShift)
				|| ((valueCapsLock >= 97 && valueCapsLock <= 122) && valueShift)) {
			$('#password').tooltip('show');

		} else {
			$('#password').tooltip('hide');
		}
	}

	function updateCaptcha() {
		var updataCaptchaUrl = base + '/login/ucaptcha?id=' + $('#captchaId').val() + '&_t=' + new Date().getTime();
		$.get(updataCaptchaUrl, function(data) {
			if (data) {
				var captchaUrl = base + '/login/captcha?id=' + data + '&_t=' + new Date().getTime();
				$('#loginCode').attr('src', captchaUrl);
				$('#captchaId').val(data);
			} else {
				alert('请提供有效的凭据！');
			}
		});
	}

	$('#loginTab a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});
	
	$('#login-form').submit(function(e) {
		var userName = $("#userName").val(),
			password = $("#password").val(),
			captchaResponse = $("#captchaResponse").val();
		var errorTip = input_message, valid = true;
		if (userName == '') {
			$('#userName').closest(".input-group").removeClass('has-error').addClass('has-error');
			errorTip += userName_message;
			valid = false;
		}
		if (password == '') {
			$('#password').closest(".input-group").removeClass('has-error').addClass('has-error');
			errorTip += password_message;
			valid = false;
		}
		if (captchaResponse == '') {
			$('#captchaResponse').closest(".form-group").removeClass('has-error').addClass('has-error');
			errorTip += captchaResponse_message;
			valid = false;
		}
		
		if (!valid) {
			$('#error').removeClass('alert-warning').removeClass('alert-danger').addClass('alert-danger');
			errorTip = errorTip.substring(0, errorTip.length - 1);
			$('#error').find('span').html(errorTip);
			e.preventDefault();
		} else {
			Cookie.createCookie(userKey, userName, 365);
		}
	});
});
