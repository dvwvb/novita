// 로그인 여부
function authencated(onAuthencated, onUnauthencated) {
	$.ajax({dataType : 'json', type : 'post',
		contentType : 'application/json',
		url : '/authencation/authencated',
	}).done(function(data) {
		if (data.result && 'function' == typeof onAuthencated) {
			onAuthencated();
		} else if (!data.result && 'function' == typeof onAuthencated) {
			onUnauthencated();
		} else {
			console.log(JSON.stringify(data));
		}
	});
}
