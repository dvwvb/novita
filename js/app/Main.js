var Main = (function($) {
	var options, $form;

	var init = function(_options) {
		options = _options;
		$form = $('#listForm');
		initVue();
	};

	var initVue = function (){
		vue = new Vue({
            el : '.vuelayer',
            data : {
				listVo : {},
				bestList : [],
				promotionList : [],
			},
			created : function (){
				var vm = this;
				vm.bestData();
				vm.promotionData();
			},
            methods : {
            	bestData : function(){
            		var vm = this;
					$.ajax({
						dataType : 'json',
						type : 'POST',
						contentType : 'application/json',
						url : '/main/best/data',
						data : JSON.stringify()
					}).done(function (data){
						vm.bestList = data.resultList;
					})
            	},
            	promotionData : function(){
            		var vm = this;
					$.ajax({
						dataType : 'json',
						type : 'POST',
						contentType : 'application/json',
						url : '/main/promotion/data',
						data : JSON.stringify()
					}).done(function (data){
						vm.promotionList = data.resultList;
					})
            	},
            	onclickCart: function(prductVo) {
					var vm = this;
					$.ajax({dataType : 'json', type : 'post',
						contentType : 'application/json',
						url : '/cart/add',
						data : JSON.stringify({
							prductSn: prductVo.prductSn,
							prductQy : 1,
							price : 0,
							cartAditList : [],
						}),
					}).done(function(data) {
						if (confirm('상품이 장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?')) {
							location.href = '/cart';
						}
					}).fail(function(data) {
					});
				},
				onchangeIntrstYn: function(prductVo) {
					var vm = this,
						input = event.target;

					authencated(
						function() {
							// onAuthencated
							/*
								//on:chagen -> on:click.prevnet 변경시사용가능 확인
								prductVo.intrstYn = (input.checked) ? 'N' : 'Y';
							*/

							$.ajax({ dataType : 'json', type : 'post',
								contentType : 'application/json',
								url : '/mypage/interest-product/toggle',
								data : JSON.stringify({ prductSn : prductVo.prductSn })
							}).done(function(data) {
								console.log(">>"+prductVo.intrstYn);
								if(prductVo.intrstYn == "Y"){
									alert("제품을 찜 하였습니다.");
								}
							}).fail(function(data) {
								prductVo.intrstYn = !prductVo.intrstYn;
								console.log(prductVo.intrstYn);
							});
						},
						function() {
							if(confirm("로그인이 필요 합니다. 로그인 페이지 이동하시겠습니가?")){
								// onUnauthencated
								prductVo.intrstYn = !prductVo.intrstYn;
								location.href = '/login?returnUrl=' + encodeURI(location.pathname);
							}
						}
					)

				},
            },
		});
	};

	return {
		init : init
	};
}(jQuery));
