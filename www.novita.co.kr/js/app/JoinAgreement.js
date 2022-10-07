var JoinAgreement = (function($) {
	var options, $form;

	var init = function(_options) {
		options = _options;
		$form = $('#editForm');
		initVue();
	};

	var initVue = function() {
		vue = new Vue({
			el : '.vuelayer',
			data : {
				resultVo : {
					termsAgreementYn: '',
					picAgreementYn: '',
					emailRecptnAgreYn: '',
					smsRecptnAgreYn: '',
				},
				checkAll: false,
			},
			created : function() {
			},
			methods : {
				onclickAuth: function() {
					var vm = this;

					if (!vm.valid()) {
						return false;
					}

					fnCheckplusPopup();
				},
				onchangeCheckAll: function() {
					var vm = this;
					if (vm.checkAll) {
						vm.resultVo.termsAgreementYn = 'Y';
						vm.resultVo.picAgreementYn = 'Y';
						vm.resultVo.emailRecptnAgreYn = 'Y';
						vm.resultVo.smsRecptnAgreYn = 'Y';
					} else {
						vm.resultVo.termsAgreementYn = 'N';
						vm.resultVo.picAgreementYn = 'N';
						vm.resultVo.emailRecptnAgreYn = 'N';
						vm.resultVo.smsRecptnAgreYn = 'N';
					}
				},
				onchangeCheck: function() {
					var vm = this;
					if (vm.resultVo.termsAgreementYn == 'Y' && vm.resultVo.picAgreementYn == 'Y' &&
							vm.resultVo.emailRecptnAgreYn == 'Y' && vm.resultVo.smsRecptnAgreYn == 'Y') {
						vm.checkAll = true;
					} else {
						vm.checkAll = false;
					}

				},
				valid: function() {
					var vm = this;
					if ('Y' != vm.resultVo.termsAgreementYn) {
						alert('이용약관은 필수 동의 항목입니다');
						vm.$refs.termsAgreementYn.focus();
						return false;
					}
					if ('Y' != vm.resultVo.picAgreementYn) {
						alert('개인정보 수집 및 이용은 필수 동의 항목입니다');
						vm.$refs.picAgreementYn.focus();
						return false;
					}
					return true;
				},
			},
			mounted : function() {
			},
			updated : function() {
			},
		});
	};

	return {
		init : init
	};
}(jQuery));
