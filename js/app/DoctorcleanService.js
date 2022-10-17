var DoctorcleanService = (function($){
	var options, $form;

	var init = function(_options) {
		options = _options;
		$form = $("#editForm");
		initVue();

		// kakao app 초기화
		Kakao.init(options.kakao_appkey_script); //발급받은 키 중 javascript키를 사용해준다.
		console.log(Kakao.isInitialized()); // sdk초기화여부판단
	};

	var initVue = function() {
		vue = new Vue({
			el : '.vuelayer',
			data : {
				prductSn: options.prductSn,
				resultVo: {},
				cleanPrductList: [],
				cartVo : {
					prductSn: options.prductSn,
					prductQy : 1,
					price : 0,
					cartAditList : [],
					instlPrductSn: '',
					instlHopeDe: '',
					cleanSj: '',
					cleanHopeDe: '',
					cleanCn: '',
					dlvyNm: '',
					dlvyMbtlnum: '',
					dlvyZip: '',
					dlvyAdres: '',
					dlvyAdresDetail: '',
					dlvyMemoCode: '',
					dlvyMemo: '',
				},
				mobilePrefixList: [],
				availablePrductCouponList: [],
				selectedAvailablePrductCouponSnList: [],
				mberVo: {},
				contentVo : {},

				reviewListVo : {},
				reviewResultList: [],
				reviewPaginationInfo: {},
				bestReviewList: [],
				reviewPopClass: '',
				reviewOrderByList: [],
				reviewSummaryVo: {},
				selectedReviewVo: {},
			},
			created : function() {
				var vm = this;
				vm.fetchData();
			},
			computed : {
				totalAmt : function() {
					var vm = this;
					var amt = 0;
					// cart 계산
					amt += vm.cartVo.prductQy * vm.cartVo.price;

					// cartAdit 계산
					if (vm.cartVo.cartAditList && vm.cartVo.cartAditList.length > 0) {
						vm.cartVo.cartAditList.forEach(function(result, index) {
							amt += result.prductQy * result.price;
						});
					}
					// 쿠폰할인
					amt = amt - vm.couponUseAmt;
					if (amt < 0) {
						amt = 0;
					}
					return amt;
				},
				additionalOptnPrductList: function() {
					var vm = this;
					if (!vm.resultVo.optnPrductList) {
						return null;
					}
					return vm.resultVo.optnPrductList.filter(function(result) {
						return result.optnKndCode == 'additional';
					});
				},
				dlvyAdresStr: function() {
					var vm = this;
					var cartVo = vm.cartVo;
					if (cartVo.dlvyZip && cartVo.dlvyAdres) {
						return '(' + cartVo.dlvyZip + ') ' + cartVo.dlvyAdres;
					} else {
						return '';
					}
				},
				availableCouponCount: function() {
					var vm = this;
					var count = 0;
					if (vm.availablePrductCouponList && vm.availablePrductCouponList.length > 0) {
						count += vm.availablePrductCouponList.length;
					}
					return count;
				},
				selectedCouponList: function() {
					var vm = this;
					var ret = [];
					if (vm.availablePrductCouponList && vm.availablePrductCouponList.length > 0
							&& vm.selectedAvailablePrductCouponSnList && vm.selectedAvailablePrductCouponSnList.length > 0) {
						var filterd = vm.availablePrductCouponList.filter(function(result){
							return vm.selectedAvailablePrductCouponSnList.indexOf(result.couponIsuSn) > -1;
						});
						if (filterd && filterd.length > 0) {
							ret = ret.concat(filterd);
						}
					}
					return ret;
				},
				couponUseAmt: function() {
					var vm = this;
					var ret = 0;
					if (vm.selectedCouponList && vm.selectedCouponList.length > 0) {
						vm.selectedCouponList.forEach(function(result) {
							ret += result.couponAmt;
						});
					}
					return ret;
				},
			},
			methods : {
				fetchData : function() {
					var vm = this;
					$.ajax({dataType : 'json', type : 'post',
						contentType : 'application/json',
						url : '/doctorclean-service/data',
						data : JSON.stringify({ prductSn : vm.prductSn }),
					}).done(function(data) {
						vm.resultVo = data.resultVo;
						vm.cleanPrductList = data.cleanPrductList;
						vm.mobilePrefixList = data.mobilePrefixList

						vm.availablePrductCouponList = data.availablePrductCouponList;

						vm.cartVo.prductSn = vm.resultVo.prductSn;
						vm.cartVo.price = vm.resultVo.price;
						vm.mberVo = data.mberVo;
						if (vm.mberVo) {
							vm.cartVo.dlvyNm = vm.mberVo.userNm;
							vm.cartVo.dlvyMbtlnum = vm.mberVo.mbtlnum;
							vm.cartVo.dlvyZip = vm.mberVo.zip;
							vm.cartVo.dlvyAdres = vm.mberVo.adres;
							vm.cartVo.dlvyAdresDetail = vm.mberVo.adresDetail;
						}
						vm.cartVo.prductKndCode = vm.resultVo.prductKndCode;
						vm.cartVo.prductKndCodeNm = vm.resultVo.prductKndCodeNm;

						vm.contentVo = data.contentVo;

						vm.reviewResultList = data.reviewResultList;
						vm.reviewPaginationInfo = data.reviewPaginationInfo;
						vm.bestReviewList = data.bestReviewList;

						vm.reviewListVo = data.reviewListVo;
						vm.reviewOrderByList = data.reviewOrderByList;
						vm.reviewSummaryVo = data.reviewSummaryVo;

					});
				},
				onchangPrductSn: function() {
					var vm = this;
					vm.cartVo.prductQy = 1;
					vm.fetchData();
				},
				onMinusPrductQy : function(result) {
					var vm = this;
					if (result.prductQy > 1) {
						result.prductQy --;
					}
				},
				onPlusPrductQy : function(result) {
					var vm = this;
					if (result.prductQy < 5) {
						result.prductQy ++;
					}
				},
				onchangeOptnPrductSn : function(e) {
					var vm = this;
					var optnPrductSn = e.target.value;
					if (!optnPrductSn) {
						e.target.value = '';
						return;
					}

					// 추가할 상품정보
					var optnPrductList = vm.resultVo.optnPrductList.filter(function(result) {
						return result.optnPrductSn == optnPrductSn;
					});
					if (!optnPrductList || optnPrductList.length < 1) {
						e.target.value = '';
						return;
					}
					var optnPrduct = optnPrductList[0];

					// 이미 선택된 상품 인가 확인
					var cartAdit = null;
					var cartAditList = vm.cartVo.cartAditList.filter(function(adit) {
						return adit.prductSn == optnPrductSn;
					})
					if (cartAditList && cartAditList.length > 0) {
						cartAdit = cartAditList[0];
					}

					if (!cartAdit) {
						// 선택된 상품이 없으면, 선택상품에 추가
						vm.cartVo.cartAditList.push({
							prductSn : optnPrduct.optnPrductSn,
							prductNm : optnPrduct.optnPrductNm,
							prductQy : 1,
							price : optnPrduct.price,
							optnKndCode: optnPrduct.optnKndCode,
						});
					} else {
						// 이미 선택된 상품이면, 설치제품/닥터클린제품 또는 추가제품에 따라 분기
						if (optnPrduct.optnKndCode == 'install' || optnPrduct.optnKndCode == 'clean') {
							// 설치제품/닥터클린제품 을 추가로선택한 경우.
							e.target.value = '';
							return;
						}

						// 수량 증가
						cartAdit.prductQy ++;

					}

					e.target.value = '';
				},
				ondeleteCartAdit: function(index) {
					var vm = this;
					vm.cartVo.cartAditList.splice(index, 1);
				},
				onclickPostcode: function() {
					var vm = this;
					var cartVo = vm.cartVo;
					daumPostCode(function(zip, fullAddr) {
						cartVo.dlvyZip = zip;
						cartVo.dlvyAdres = fullAddr;
					});
				},
				onCart: function() {
					var vm = this;
					if (!vm.valid()) {
						return false;
					}
					$.ajax({dataType : 'json', type : 'post',
						contentType : 'application/json',
						url : '/cart/add',
						data : JSON.stringify(vm.cartVo),
					}).done(function(data) {
						if (confirm('상품이 장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?')) {
							location.href = '/cart';
						}
					});
				},
				onApply: function() {
					var vm = this;
					if (!vm.valid()) {
						return false;
					}

					//vm.onPixelCode();

					$.ajax({dataType : 'json', type : 'post',
						contentType : 'application/json',
						url : '/cart/insert',
						data : JSON.stringify(vm.cartVo),
					}).done(function(data) {
						if (vm.selectedAvailablePrductCouponSnList) {
							$form.find('#couponCartId').val(data.cartId);
							$form.find('#couponSnList').val(vm.selectedAvailablePrductCouponSnList.join());
						}
						$form.find('#cartIdList').val(data.cartId);
						$form.attr('action', '/order-sheet');
						$form.attr('method', 'post');
						$form.submit();
					});
				},
				onUnauthenticatedApply: function() {
					var vm = this;
					if (!vm.valid()) {
						return false;
					}

					vm.onPixelCode();

					$.ajax({dataType : 'json', type : 'post',
						contentType : 'application/json',
						url : '/cart/insert',
						data : JSON.stringify(vm.cartVo),
					}).done(function(data) {
						if (vm.selectedAvailablePrductCouponSnList) {
							$form.find('#couponSnList').val(vm.selectedAvailablePrductCouponSnList.join());
						}
						$form.find('#cartIdList').val(data.cartId);
						fnCheckplusPopup();
					});
				},

				// 할인쿠폰 선택관련
				onSelectCouponPop: function(selected) {
					var vm = this;
					console.log(selected);
					vm.selectedAvailablePrductCouponSnList = selected.selectedAvailablePrductCouponSnList;
				},
				onDeleteSelectedCoupon: function() {
					var vm = this;
					vm.selectedAvailablePrductCouponSnList = [];
				},
				onOpenCouponPop: function() {
					var vm = this;
					vm.$refs.popCouponSelect.selectedAvailablePrductCouponSnList = JSON.parse(JSON.stringify(vm.selectedAvailablePrductCouponSnList));
				},
        		valid: function() {
					var vm = this;

					if (!vm.cartVo.dlvyNm) {
						alert('신청 정보 이름을 입력해 주세요');
						vm.$refs.dlvyNm.focus();
						return false;
					}
					if (!vm.cartVo.dlvyMbtlnum) {
						alert('신청 정보 연락처를 입력해 주세요');
						vm.$refs.dlvyMbtlnum.focus();
						return false;
					}
					if (!vm.cartVo.dlvyZip || !vm.cartVo.dlvyAdresDetail || !vm.cartVo.dlvyAdresDetail) {
						alert('신청 정보 주소를 입력해 주세요');
						vm.$refs.dlvyAdresDetail.focus();
						return false;
					}

					/*if (!vm.cartVo.cleanSj) {
						alert('추가 정보 제목을 입력해 주세요');
						vm.$refs.cleanSj.focus();
						return false;
					}
					if (!vm.cartVo.cleanHopeDe) {
						alert('추가 정보 서비스희망일을 입력해 주세요');
						// vm.$refs.cleanHopeDe.focus();
						return false;
					}
					if (!vm.cartVo.cleanCn) {
						alert('추가 정보 내용을 입력해 주세요');
						vm.$refs.cleanCn.focus();
						return false;
					}*/
					if (!vm.cartVo.cleanHopeDe) {
						alert('신청 정보 서비스희망일을 입력해 주세요');
						vm.$refs.cleanHopeDe.focus();
						return false;
					}

					// 이메일 포맷
					var email = vm.emailId + '@' + vm.emailHost;
					if (!checkEmailFormat(email)) {
						alert('잘못된 이메일 주소입니다. 이메일 주소를 다시 확인해주세요');
						vm.$refs.emailId.focus();
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
				},
				evlWidth: function(evlScore) {
					var score = Number(evlScore);
					if (!score) {
						return 0;
					}
					return 160 * score / 5;
				},
				onchangeSearchSeCode: function() {
					var vm = this;
					vm.reviewListVo.pageIndex = 1;
					vm.fetchReviewData();
				},
				onchangeReviewOrderBy: function() {
					var vm = this;
					vm.reviewListVo.pageIndex = 1;
					vm.fetchReviewData();
				},
				onMoreReview: function() {
					var vm = this;
					vm.reviewListVo.pageIndex = vm.reviewPaginationInfo.currentPageNo + 1;
					vm.fetchReviewData();

				},
				onclickReview: function(reviewVo) {
					var vm = this;
					if(!reviewVo.prductReviewImageList || reviewVo.prductReviewImageList.length < 1) {
						vm.reviewPopClass = ' txt';
					} else {
						vm.reviewPopClass = '';
					}
					vm.reviewPopClass += ' active';
					vm.selectedReviewVo = reviewVo;
				},
				onchangeReviewOrderByMobl: function(codeNm) {
					var vm = this;
					vm.reviewListVo.pageIndex = 1;
					vm.fetchReviewData();

					$('.sorted-txt').html(codeNm);
				},
				evlWidthMobl: function(evlScore) {
					var score = Number(evlScore);
					if (!score) {
						return 0;
					}
					return 182 * score / 5;
				},
				fetchReviewData : function() {
					var vm = this;
					$.ajax({dataType : 'json', type : 'post',
						contentType : 'application/json',
						url : '/doctorclean-service/review/data',
						data : JSON.stringify(vm.reviewListVo),
					}).done(function(data) {
						if (data.reviewResultList && data.reviewResultList.length > 0) {
							if (vm.reviewListVo.pageIndex == 1) {
								vm.reviewResultList = data.reviewResultList;
							} else {
								vm.reviewResultList = vm.reviewResultList.concat(data.reviewResultList);
								/*
								data.reviewResultList.forEach(function(item, index) {
									vm.reviewResultList.push(item);
								});
								*/

							}
						}
						vm.reviewPaginationInfo = data.reviewPaginationInfo;
					});
				},
				onPixelCode : function(){

					// 픽셀코드 추가 2022.07.22
					var js = document.createElement('script');
				    js.src = "//pixel.mathtag.com/event/js?mt_id=1603058&mt_adid=256128&mt_exem=&mt_excl=&v1=&v2=&v3=&s1=&s2=&s3=";
					document.body.appendChild(js);

					var axel = Math.random() + "";
					var a = axel * 10000000000000;
					//document.write('<img src="https://ad.doubleclick.net/ddm/activity/src=12299233;type=invmedia;cat=docto0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=' + a + '?" width="1" height="1" alt=""/>');
					//document.write('<noscript><img src="https://ad.doubleclick.net/ddm/activity/src=12299233;type=invmedia;cat=docto0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?" width="1" height="1" alt=""/></noscript>');

				}
			},
			mounted : function() {
				var vm = this;
				if('function' == typeof vueMounted) {
					vueMounted(vm);
				}
			},
			updated : function() {
				var vm = this;
				if('function' == typeof vueUpdated) {
					vueUpdated(vm);
				}
			},

		});
	};

	return {
		init: init,
	};
}(jQuery));