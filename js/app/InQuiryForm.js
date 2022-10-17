var InQuiryForm = (function($) {

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
				ncssBbsSeList : [],
				typeList : [],
				categoryList : [],
				prductList : [],
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
						url : '/customer-center/inquiry-form/data',
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
						
						if (vm.resultVo.type == null){
							vm.resultVo.type = 0;
						}
						if (vm.resultVo.email && vm.resultVo.email.indexOf('@') > -1) {
							vm.emailId = vm.resultVo.email.split('@')[0];
							vm.emailHost = vm.resultVo.email.split('@')[1];
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
					
					// 연락처
					let strMbtlnum = "";
					strMbtlnum += vm.resultVo.mtel1;
					strMbtlnum += vm.resultVo.mtel2;
					strMbtlnum += vm.resultVo.mtel3 ;
					vm.resultVo.phone = strMbtlnum ;
					
					// 이메일
					let strEmail = "";
					strEmail += vm.resultVo.emailId + "@" ;
					strEmail += vm.resultVo.emailHost ;
					vm.resultVo.email = strEmail ;
					
					
					
					$.ajax({dataType : 'json', type : 'post',
						contentType : 'application/json',
						url : '/customer-center/inquiry-form/submit',
						data : JSON.stringify(vm.resultVo),
					}).done(function(data) {
						vm.submitFlag = false;
						if (data.result == 'success') {
							alert('정상적으로 접수되었습니다.');
							goList();
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
					if (!vm.resultVo.mtel1) {
						alert('휴대폰번호를 입력해 주세요');
						vm.$refs.mtel1.focus();
						return false;
					}
					
					if (!vm.resultVo.mtel2) {
						alert('휴대폰번호를 입력해 주세요');
						vm.$refs.mtel2.focus();
						return false;
					}
					
					if (!vm.resultVo.mtel3) {
						alert('휴대폰번호를 입력해 주세요');
						vm.$refs.mtel3.focus();
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
			
					if(vm.resultVo.type != 1) {
						// 제목 필수
						if (!vm.resultVo.title) {
							alert('제목은 필수 입력 항목 입니다. 정확히 입력 후 접수하기를 눌러주세요');
							vm.$refs.title.focus();
							return false;
						}
						
						var title = vm.resultVo.title;
						if(title.length < 5){
							alert('최소 5글자 이상 등록이 되어야 합니다');
							vm.$refs.title.focus();
							return false;
						}
											
						// 메모 필수
						if (!vm.resultVo.memo) {
							alert('내용은 필수 입력 항목 입니다. 정확히 입력 후 접수하기를 눌러주세요');
							vm.$refs.memo.focus();
							return false;
						}
						
						var memo = vm.resultVo.memo;
						if(memo.length < 10){
							alert('최소 10글자 이상 등록이 되어야 합니다');
							vm.$refs.memo.focus();
							return false;
						}
					
					}else{
						
						//서비스희망일
						if (!vm.resultVo.serviceDt) {
							alert('서비스희망일을 입력해주세요');
							vm.$refs.serviceDt.focus();
							return false;
						}
					}
					
					
					//개인정보 동의
					if (!vm.resultVo.agree) {
						alert('개인정보 수집 및 이용은 필수 동의 항목입니다');
						vm.$refs.agree.focus();
						return false;
					}
					
					
					return true;
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
		location.href = "/customer-center/inquiry-main";
	};

	return {
		init : init,
	};
}(jQuery));