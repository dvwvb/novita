var ProductRegistForm = (function($) {

	var options, $form;

	var init = function (_options){
		options = _options;
		$form = $('#editForm');

		initVue();
	};
	var initVue = function (){
		vue = new Vue({
			el : '.vuelayer',
			data : {
				resultVo : {},
				submitFlag : false,
				mobilePrefixList : [],
				emailHostList : [],
				purchsofcList : [],
				couponCode : null,
			},
			created : function () {
				var vm = this;
				vm.fetchData();
			},
			computed : {
				adresStr: function() {
					var vm = this;
					var resultVo = vm.resultVo;
					if (resultVo.zip && resultVo.adres) {
						return '(' + resultVo.zip + ') ' + resultVo.adres;
					} else {
						return '';
					}
				},
			},
			methods : {
				fetchData : function() {
					var vm = this;
					$.ajax({
						dataType : 'json',
						type : 'POST',
						url : '/customer-center/productRegist-form/data',
						contentType : 'application/json',
					}).done(function (data){
						vm.resultVo = data.resultVo;
						vm.mobilePrefixList = data.mobilePrefixList;
						vm.emailHostList = data.emailHostList;
						vm.purchsofcList = data.purchsofcList;
						
						if(!$.isEmptyObject(vm.resultVo)){
							vm.resultVo.agree = true;
							vm.resultVo.agree_m = true;
						}
					});
				},
				onList : function() {
					goList();
				},
				changeEmailHost: function (e) {
					var vm = this;
					if (e.target.value === '') {
						vm.$refs.emailHost.value = '';
						vm.resultVo.emailHost = '';
						vm.$refs.emailHost.focus();
					} else {
						vm.resultVo.emailHost = e.target.value;
					}
				},
				changePurchsofc: function (e) {
					var vm = this;
					if (e.target.value === '') {
						vm.$refs.purchsofcCode.value = '';
						vm.resultVo.purchsofcCode = '';
						vm.$refs.purchsofc.focus();
					} else {
						vm.resultVo.purchsofcCode = e.target.value;
					}
				},
				onclickPostcode: function() {
					var vm = this;
					var resultVo = vm.resultVo;
					daumPostCode(function(zip, fullAddr) {
						//debugger;
						resultVo.zip = zip;
						resultVo.adres = fullAddr;
						//vm.$forceUpdate();
					});
				},
				onCopyCode : function(couponCode) {
					var code = this.couponCode
					navigator.clipboard.writeText(code).then(()=> {
                        alert("쿠폰코드가 복사되었습니다.");
                    });
				},
				onSubmit : function(e) {
					var vm = this;
					if (vm.submitFlag) {
						alert('처리중입니다....');
						return false;
					}
					// validate
					$form.validate(options.validateOptions);
					
					if (!$form.valid()) {
						return false;
					}
					
					if (!confirm('접수 하시겠습니까?')) {
						return false;
					} else {
						vm.submitFlag = true;
					}
					
					// 연락처
					let strMbtlnum = "";
					strMbtlnum += vm.resultVo.mbtlnumPrefix + "-" ;
					strMbtlnum += vm.resultVo.mbtlnumFirst + "-" ;
					strMbtlnum += vm.resultVo.mbtlnumLast ;
					vm.resultVo.mbtlnum = strMbtlnum ;
					
					// 이메일
					let strEmail = "";
					strEmail += vm.resultVo.emailAcount + "@" ;
					strEmail += vm.resultVo.emailHost ;
					vm.resultVo.email = strEmail ;
					
					// 구매시기
					let strPurchsDt = "";
					strPurchsDt += vm.resultVo.purchsDtYear + "-" ;
					strPurchsDt += vm.resultVo.purchsDtMt + "-"  ;
					strPurchsDt += "01" ;
					vm.resultVo.purchsDt = strPurchsDt;

					$.ajax({dataType : 'json', type : 'post',
						contentType : 'application/json',
						url : '/customer-center/productRegist-form/submit',
						data : JSON.stringify(vm.resultVo),
					}).done(function(data) {
						vm.submitFlag = false;
						if (data.result == 'success') {
							//alert('정상적으로 접수되었습니다.');
							console.log("test" + data.couponCode);
							vm.couponCode = data.couponCode;
							
							if(vm.couponCode != null) {
								$("#popup-nomember-coupon").addClass("active");
							}else {
								//회원은 쿠폰을 보여줄 필요가 없음
								$("#popup-member-coupon").addClass("active");
							}
						} else {
							alert('처리중 오류가 발생하였습니다. 관리자에게 문의하세요.');
						}
					});
				},
			},
			updated : function () {
				var vm = this;
				if('function' == typeof vueUpdated) {
					vueUpdated(vm);
				}
			}
		})
	};
	
	var goList = function (){
		location.href = "/customer-center/productRegist-main";
	};
	
	return {
		init : init,
	};
}(jQuery));