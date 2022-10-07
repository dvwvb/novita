var ServiceInstallation = (function($) {

	var options, $form;

	var init = function (_options){
		options = _options;
		$form = $('#editForm');

		initVue();

		// kakao app 초기화
		Kakao.init(options.kakao_appkey_script); //발급받은 키 중 javascript키를 사용해준다.
		console.log(Kakao.isInitialized()); // sdk초기화여부판단
	};
	var initVue = function (){
		vue = new Vue({
			el : '.vuelayer',
			data : {
				resultVo : {},
				submitFlag : false,
				mobilePrefixList : [],
				emailHostList : [],
				ncssBbsSeList : [],
				typeList : [],
				categoryList : [],
				prductList : [],
				contentVo : {},
			},
			created : function () {
				var vm = this;
				vm.fetchData();
			},
			computed : {
				adresStr: function() {
					var vm = this;
					var resultVo = vm.resultVo;
					if (resultVo.zip && resultVo.addr1) {
						return '(' + resultVo.zip + ') ' + resultVo.addr1;
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
						url : '/service-install/data',
						contentType : 'application/json',
					}).done(function (data){
						vm.resultVo = data.resultVo;
						vm.mobilePrefixList = data.mobilePrefixList;
						vm.emailHostList = data.emailHostList;
						vm.ncssBbsSeList = data.ncssBbsSeList;
						vm.typeList = data.typeList;
						vm.categoryList = data.categoryList;
						vm.prductList = data.prductList;
						vm.resultVo.prductType = '';
						vm.resultVo.prductCategory = '';
						vm.resultVo.material = '';

						if (vm.resultVo.email && vm.resultVo.email.indexOf('@') > -1) {
							vm.emailId = vm.resultVo.email.split('@')[0];
							vm.emailHost = vm.resultVo.email.split('@')[1];
						}
						vm.contentVo = data.contentVo;
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

				changePrductType: function (e) {
					var vm = this;
					var searchNcssType = e.target.value;
					$.ajax({
						dataType : 'json',
						type : 'POST',
						url : '/product-ncss/category/list',
						contentType : 'application/json',
						data : JSON.stringify({searchNcssType:searchNcssType})
					}).done(function (data){
						vm.categoryList = data.categoryList;
					});
					//vm.resultVo.prductType = '';
					vm.resultVo.prductCategory = '';
					vm.resultVo.material = '';
				},

				changePrductCategory: function (e) {
					var vm = this;
					var searchNcssCategory = e.target.value;
					//console.log(searchCtgryCd);
					$.ajax({
						dataType : 'json',
						type : 'POST',
						url : '/product-ncss/prduct/list',
						contentType : 'application/json',
						data : JSON.stringify({searchNcssCategory:searchNcssCategory})
					}).done(function (data){
						vm.prductList = data.prductList;
						//console.log(JSON.stringify(vm.prductList));
					});
					vm.resultVo.material = '';
				},

				onclickPostcode: function() {
					var vm = this;
					var resultVo = vm.resultVo;
					daumPostCode(function(zip, fullAddr) {
						//debugger;
						resultVo.zip = zip;
						resultVo.addr1 = fullAddr;
						//vm.$forceUpdate();
					});
				},

				onSubmit : function(e) {
					var vm = this;
					if (vm.submitFlag) {
						alert('처리중입니다....');
						return false;
					}

					if (!vm.valid()) {
						return false;
					}

					if (!confirm('접수 하시겠습니까?')) {
						return false;
					} else {
						vm.submitFlag = true;
					}

					// 이메일
					let strEmail = "";
					strEmail += vm.resultVo.emailId + "@" ;
					strEmail += vm.resultVo.emailHost ;
					vm.resultVo.email = strEmail ;

					// 픽셀코드 추가 2022.07.22
					var js = document.createElement('script');
				    js.src = "//pixel.mathtag.com/event/js?mt_id=1603060&mt_adid=256128&mt_exem=&mt_excl=&v1=&v2=&v3=&s1=&s2=&s3=";
					document.body.appendChild(js);

					var axel = Math.random() + "";
					var a = axel * 10000000000000;
					document.write('<img src="https://ad.doubleclick.net/ddm/activity/src=12299233;type=invmedia;cat=servi00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=' + a + '?" width="1" height="1" alt=""/>');
					document.write('<noscript><img src="https://ad.doubleclick.net/ddm/activity/src=12299233;type=invmedia;cat=servi00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?" width="1" height="1" alt=""/></noscript>');


					$.ajax({dataType : 'json', type : 'post',
						contentType : 'application/json',
						url : '/service-install/submit',
						data : JSON.stringify(vm.resultVo),
					}).done(function(data) {
						vm.submitFlag = false;
						if (data.result == 'success') {
							alert('정상적으로 접수되었습니다.');
							goFirst();
						} else {
							alert('처리중 오류가 발생하였습니다. 관리자에게 문의하세요.');
						}
					});
				},

				valid: function() {
					var vm = this;
					// 이름 필수
					if (!vm.resultVo.name) {
						alert('이름을 입력해 주세요');
						vm.$refs.name.focus();
						return false;
					}

					// 휴대폰 필수
					var regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
					if(!regExp.test(vm.resultVo.phone)){
						alert('휴대폰번호를 입력해 주세요');
						 vm.$refs.phone.focus();
						return false;
					}

					// 이메일 필수
					if (!vm.resultVo.emailId) {
						alert('이메일을 입력해 주세요');
						vm.$refs.emailId.focus();
						return false;
					}
					if (!vm.resultVo.emailHost) {
						alert('이메일을 입력해 주세요');
						vm.$refs.emailHost.focus();
						return false;
					}

					// 이메일 포맷
					var email = vm.emailId + '@' + vm.emailHost;
					if (!checkEmailFormat(email)) {
						alert('잘못된 이메일 주소입니다. 이메일 주소를 다시 확인해주세요');
						vm.$refs.emailId.focus();
						return false;
					}

					if (!vm.resultVo.zip || !vm.resultVo.addr1) {
						alert('신청 정보 주소를 입력해 주세요');
						vm.$refs.addr2.focus();
						return false;
					}

					//서비스희망일
					if (!vm.resultVo.serviceDt) {
						alert('서비스희망일을 입력해주세요');
						vm.$refs.serviceDt.focus();
						return false;
					}

					return true;
				},
				onCopyUrl : function() {
					var url = window.location.href;
					navigator.clipboard.writeText(url).then(()=> {
						alert("URL주소가 복사되었습니다.");
					});
				},
				onCopyKakao : function() {
					Kakao.Link.sendDefault({
						objectType: 'text',
						text:
							'노비타',
						link: {
							mobileWebUrl:window.location.href,
							webUrl:window.location.href,
						},
					});
				},
				onCopyFacebook : function() {
					window.open('http://www.facebook.com/sharer.php?u='+window.location.href);
				}
			},

			updated : function () {
				var vm = this;
				if('function' == typeof vueUpdated) {
					vueUpdated(vm);
				}
			}
		})
	};

	var goFirst = function (){
		location.href = "/service-install";
	};

	return {
		init : init,
	};
}(jQuery));