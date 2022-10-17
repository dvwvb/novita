var Login = (function($) {

	var options;
	var init = function(_options) {
		options = _options;

		// bind event
		$('.btnLogin').on('click', actionLogin);
		$('#j_username, #j_password').on('keypress', onEnter);
		$('.kakao-login').on('click', onclickKakaoLogin);
		$('.naver-login').on('click', onclickNaverLogin);

		// set focus
		if (!$.trim($('#j_username').val())) {
			$('#j_username').val('').focus();
		} else if (!$.trim($('#j_password').val())) {
			$('#j_password').val('').focus();
		}

		// alert error
		/*if (options.err == '1') {
			alert('아이디가 없거나, 비밀번호가 일치하지 않습니다.');
		} else if (options.err == '2') {
			alert('비밀번호 입력 오류 회수가 초과되어 잠긴 상태입니다.');
		}*/

		// kakao app 초기화
		Kakao.init(options.kakao_appkey_script); //발급받은 키 중 javascript키를 사용해준다.
		console.log(Kakao.isInitialized()); // sdk초기화여부판단

	};

	var actionLogin = function() {
		if ($.trim($('#j_username').val()) == '') {
			alert('아이디를 입력해 주세요.');
			$('#j_username').val('').focus();
			return false;
		} else if ($.trim($('#j_password').val()) == '') {
			alert('비밀번호를 입력해 주세요.');
			$('#j_password').val('').focus();
			return false;
		} else {
			$('#loginForm').submit();
			return true;
		}
	};

	var onEnter = function(e) {
		if (e.keyCode == 13) {
			actionLogin();
			e.preventDefault();
		}
	};

	var onclickKakaoLogin = function() {
		// 로그인및정보동의 화면을 새창으로 열기 - 카카오톡 로그인창 위젯 열기
		Kakao.Auth.login({
			scope: 'account_email',
			success: function(response) {
				$.ajax({
					dataType: 'json', type: 'post',
					contentType: 'application/json',
					url: '/kakao-oauth/url',
				}).done(function(data) {
					location.href = data.url;
				});
			},
			fail: function(error) {
				console.log('Kakao.Auth.login.fail', response)
			},
		})

	};

	var onclickNaverLogin = function() {
		$.ajax({dataType : 'json', type : 'post',
			contentType : 'application/json',
			url : '/naver-oauth/url',
		}).done(function(data) {
	        // location.href = data.url;

			// 로그인 및 정보동의 화면을 새창으로 열기
			window.open(data.url, "naverlogin", "toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,width=600,height=800");
	    });
	};

	return {
		init: init
	};

}(jQuery));
