var Footer = (function($) {

	var options, $form;

	var init = function (_options){
		options = _options;
		$form = $('#footerForm');

		initVue();
	};

	var initVue = function (){
		footerVue = new Vue({
			el : '.footerlayer',
			data : {
				footerVo : {},
			},
			created : function (){
				var vm = this;
				vm.fetchData();
			},
			methods : {
				fetchData : function (){
					var vm = this;
					$.ajax({
						dataType : 'json',
						type : 'POST',
						contentType : 'application/json',
						url : '/inc/footer/message/data',
						data : JSON.stringify()
					}).done(function (data){
						console.log("footer >>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
						console.log(data.resultVo);
						vm.footerVo = data.resultVo;

						var nowUrl = window.location.href;
						console.log(nowUrl);
						console.log(window.location.pathname);
						if (window.location.href.indexOf("/product/") > -1) {
							vm.footerVo.typeCode = "product";
						}

						if(vm.footerVo.loginType === "Login"){

							if(vm.footerVo.typeCode === "product"){
								vm.footerVo.message = "더 자세한 상담이 필요하시면<br>1:1 문의 또는 <em>1566-9090</em> 으로 문의주세요.";
								vm.footerVo.url = "#none";
								$(".message-login").show();
							}else if(vm.footerVo.typeCode === "productView"){
								vm.footerVo.message = data.resultVo.prductNm+" ("+data.resultVo.material+")을 관심있게 보셨군요.<br>다시 한 번 확인 해보시겠어요?";
								vm.footerVo.url = "/product/"+data.resultVo.prductSn;
							}else if(vm.footerVo.typeCode === "cart"){
								vm.footerVo.message = "현재 장바구니에 "+data.resultVo.cartCnt+"개의 제품이 담겨 있어요.<br>지금 확인해 보세요.";
								vm.footerVo.url = "/cart";
								$(".message-login").show();
							}else if(vm.footerVo.typeCode === "cleanSeviceStart"){
								vm.footerVo.message = "닥터클린 서비스를 신청해 주셔서 감사합니다.<br>서비스 일정 확인을 위해 곧 연락 드리겠습니다.";
								vm.footerVo.url = "#none";
								$(".message-login").show();
							}else if(vm.footerVo.typeCode === "cleanSeviceOn"){
								vm.footerVo.message = "닥터클린 서비스 일정이 확정되었습니다.<br>전문 기사 방문 예정입니다.";
								vm.footerVo.url = "#none";
								$(".message-login").show();
							}else{
								$(".message-login").hide();
							}

						}else {
							if(vm.footerVo.typeCode === "product"){
								vm.footerVo.message = "더 자세한 상담이 필요하시면<br>1:1 문의 또는 <em>1566-9090</em> 으로 문의주세요.";
								vm.footerVo.url = "#none";
							}else if(vm.footerVo.typeCode === "productView"){
								vm.footerVo.message = data.resultVo.prductNm+" ("+data.resultVo.material+")을 관심있게 보셨군요.<br>다시 한 번 확인 해보시겠어요?";
								vm.footerVo.url = "/product/"+data.resultVo.prductSn;
							}else if(vm.footerVo.typeCode === "cart"){
								vm.footerVo.message = "현재 장바구니에 "+data.resultVo.cartCnt+"개의 제품이 담겨 있어요.<br>지금 확인해 보세요.";
								vm.footerVo.url = "/cart";
							}else {
								vm.footerVo.message = "지금 <em>로그인</em> 하고, <br>특별한 혜택을 만나보세요.";
								vm.footerVo.url = "/login";
							}
						}


					})
				}
			},
		});
	};

	return {
		init : init,
	};

}(jQuery));