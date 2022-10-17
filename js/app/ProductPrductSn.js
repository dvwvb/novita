var ProductPrductSn = (function($) {
	var options, $form;

	var init = function(_options) {
		options = _options;
		$form = $("#editForm");
		initVue();

		// kakao app 초기화
		Kakao.init(options.kakao_appkey_script); //발급받은 키 중 javascript키를 사용해준다.
	};

	var initVue = function() {
		vue = new Vue({
			el : '.vuelayer',
			data : {
				prductSn : options.prductSn,
				resultVo : {},
				submitFlag : false,
				giftsList: [],
				cartVo : {
					prductSn: options.prductSn,
					prductQy : 1,
					price : 0,
					cartAditList : [],
				},
				faqList: [],
				reviewListVo : {},
				reviewResultList: [],
				reviewPaginationInfo: {},
				bestReviewList: [],
				reviewPopClass: '',
				mnlAtchList: [],
				reviewOrderByList: [],
				reviewSummaryVo: {},
				selectedReviewVo: {},
				typeList : [],
				categoryList : [],
				prductList : [],
				basicTypeList : [],
				basicCategoryList : [],
				basicPrductList : [],
				deviceTypeMobl: '',
			},
			created : function() {
				var vm = this;
				vm.deviceTypeMobl = options.deviceTypeMobl;
				vm.fetchData();
			},
			computed : {
				totalAmt : function() {
					var vm = this;
					var amt = 0;
					// cart 계산
					amt += vm.cartVo.prductQy * vm.cartVo.price;

					// cartAdit 계산
					if (!vm.cartVo.cartAditList || vm.cartVo.cartAditList.length < 1) {
						return amt;
					}
					vm.cartVo.cartAditList.forEach(function(result, index) {
						amt += result.prductQy * result.price;
					});
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
				cleanOptnPrductList: function() {
					var vm = this;
					if (!vm.resultVo.optnPrductList) {
						return null;
					}
					return vm.resultVo.optnPrductList.filter(function(result) {
						return result.optnKndCode == 'clean';
					});
				},
				installOptnPrductList: function() {
					var vm = this;
					if (!vm.resultVo.optnPrductList) {
						return null;
					}
					return vm.resultVo.optnPrductList.filter(function(result) {
						return result.optnKndCode == 'install';
					});
				},
				keywordList : function() {
					var vm = this;
					var ret = [];
					// 분류별키워드 추가
					if (!vm.resultVo.prdkwrdClList) {
						return ret;
					}
					vm.resultVo.prdkwrdClList.forEach(function(prdkwrdCl) {
						prdkwrdCl.prdkwrdList.forEach(function(prdkwrd) {
							ret.push({
								kwrd: prdkwrd.kwrd,
								prdkwrdSn: prdkwrd.prdkwrdSn,
							});
						});
					});
					// 직접입력 키워드 추가
					vm.resultVo.prductKwrdList.forEach(function(prductKwrd) {
						ret.push({
							kwrd: prductKwrd.kwrd,
							prdkwrdSn: 0,
						})
					})
					// 키워드 랜덤 정렬
					/*if (ret && ret.length > 0) {
						ret.sort(function() {
							return Math.random() - Math.random();
						});
					}*/
					return ret;
				},
			},
			methods : {
				fetchData : function() {
					var vm = this;
					$.ajax({dataType : 'json', type : 'post',
						contentType : 'application/json',
						url : '/product/data',
						data : JSON.stringify({ prductSn : vm.prductSn }),
					}).done(function(data) {
						vm.resultVo = data.resultVo;
						vm.faqList = data.faqList;
						vm.reviewResultList = data.reviewResultList;
						vm.reviewPaginationInfo = data.reviewPaginationInfo;
						vm.bestReviewList = data.bestReviewList;
						vm.mnlAtchList = data.mnlAtchList;

						vm.reviewListVo = data.reviewListVo;
						vm.reviewOrderByList = data.reviewOrderByList;
						vm.reviewSummaryVo = data.reviewSummaryVo;

						vm.cartVo.price = vm.resultVo.price;

						vm.typeList = data.typeList;
						vm.categoryList = data.categoryList;
						vm.prductList = data.prductList;
						if(vm.prductList != null){
							vm.basicTypeList = vm.typeList;
							vm.basicCategoryList = vm.categoryList;
							vm.basicPrductList = vm.prductList;
						}

						var skillCnt=0;
						vm.resultVo.prductDetailModuleList.forEach(function(item, index) {
							if(item.moduleSeCode === 'skill'){
								skillCnt++;
							}
						});

						if(skillCnt > 0){
							vm.resultVo.skillType = true;
						}else{
							vm.resultVo.skillType = false;
						}


					});
				},
				fetchReviewData : function() {
					var vm = this;
					$.ajax({dataType : 'json', type : 'post',
						contentType : 'application/json',
						url : '/product/review/data',
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
				onPurchase: function() {
					var vm = this;

					if (!vm.valid()) {
						return false;
					}

					$.ajax({dataType : 'json', type : 'post',
						contentType : 'application/json',
						url : '/cart/insert',
						data : JSON.stringify(vm.cartVo),
					}).done(function(data) {
						$form.find('#cartIdList').val(data.cartId);
						$form.attr('action', '/order-sheet');
						$form.attr('method', 'post');
						$form.submit();
					});
				},
				openPoupReserve  : function() {
					authencated(
							function() {
								// onAuthencated
								var $mberGradCode = $("#mberGradCode").val();
								if($mberGradCode == "general" ){
									alert("노비타 클럽 회원만 구매 하실 수 있습니다.");
									return false;
								}else{
									$("#pop-product-reserve").addClass("active");
								}
							},
							function() {
								if(confirm("로그인이 필요 합니다. 로그인 페이지 이동하시겠습니가?")){
									location.href = '/login';
								}
							}
						)
				},
				onResePurchase : function() {
					var vm = this;

					if (!vm.valid()) {
						return false;
					}

					$.ajax({dataType : 'json', type : 'post',
						contentType : 'application/json',
						url : '/cart/insert',
						data : JSON.stringify(vm.cartVo),
					}).done(function(data) {
						$form.find('#cartIdList').val(data.cartId);
						$form.attr('action', '/order-sheet');
						$form.attr('method', 'post');
						$form.submit();
					});
				},
				onUnauthenticatedPurchase: function() {
					var vm = this;

					if (!vm.valid()) {
						return false;
					}

					$.ajax({dataType : 'json', type : 'post',
						contentType : 'application/json',
						url : '/cart/insert',
						data : JSON.stringify(vm.cartVo),
					}).done(function(data) {
						$form.find('#cartIdList').val(data.cartId);
						fnCheckplusPopup();
					});
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

						if (optnPrduct.optnKndCode == 'install') {
								vm.cartVo.cartAditList.push({
									prductSn : optnPrduct.optnPrductSn,
									prductNm : optnPrduct.optnPrductNm,
									prductQy : 1,
									price : optnPrduct.price,
									optnKndCode: optnPrduct.optnKndCode,
									instlType: optnPrduct.instlType,
									instlCategory: optnPrduct.instlCategory,
									instlMaterial: optnPrduct.instlMaterial,
								});
						}else{
							vm.cartVo.cartAditList.push({
								prductSn : optnPrduct.optnPrductSn,
								prductNm : optnPrduct.optnPrductNm,
								prductQy : 1,
								price : optnPrduct.price,
								optnKndCode: optnPrduct.optnKndCode,
							});
						}
						vm.typeList = vm.basicTypeList;
						vm.categoryList = vm.basicCategoryList;
						vm.prductList = vm.basicPrductList;

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
				onchangeIntrstYn: function() {
					var vm = this;

					authencated(
						function() {
							// onAuthencated
							$.ajax({ dataType : 'json', type : 'post',
								contentType : 'application/json',
								url : '/mypage/interest-product/toggle',
								data : JSON.stringify({ prductSn : vm.resultVo.prductSn })
							}).done(function(data) {
								console.log(vm.resultVo.intrstYn);
							}).fail(function(data) {
								vm.resultVo.intrstYn = !vm.resultVo.intrstYn;
								console.log(vm.resultVo.intrstYn);
							});
						},
						function() {
							// onUnauthencated
							vm.resultVo.intrstYn = !vm.resultVo.intrstYn;
							location.href = '/login?returnUrl=' + encodeURI(location.pathname);

						}
					)

				},
				onMinusPrductQy : function(result) {
					var vm = this;
					if (result.prductQy > 1) {
						result.prductQy --;
					}
				},
				onPlusPrductQy : function(result) {
					var vm = this;
					if (result.prductQy < 20) {
						result.prductQy ++;
					}
				},
				optionAreaSubClass: function(cartAditVo) {
					var vm = this;
					if (cartAditVo.optnKndCode == 'additional') {
						return 'amount';
					} else if (cartAditVo.optnKndCode == 'clean') {
						return 'dclean';
					} else if (cartAditVo.optnKndCode == 'install') {
						return 'dclean';
					}
				},
				evlWidth: function(evlScore) {
					var score = Number(evlScore);
					if (!score) {
						return 0;
					}
					return 160 * score / 5;
				},
				evlWidthMobl: function(evlScore) {
					var score = Number(evlScore);
					if (!score) {
						return 0;
					}
					return 182 * score / 5;
				},
				onMoreReview: function() {
					var vm = this;
					vm.reviewListVo.pageIndex = vm.reviewPaginationInfo.currentPageNo + 1;
					vm.fetchReviewData();

				},
				onchangeReviewOrderBy: function() {
					var vm = this;
					vm.reviewListVo.pageIndex = 1;
					vm.fetchReviewData();					
				},
				onchangeReviewOrderByMobl: function(codeNm) {
					var vm = this;
					vm.reviewListVo.pageIndex = 1;
					vm.fetchReviewData();
					
					$('.sorted-txt').html(codeNm);					
				},								
				onchangeSearchSeCode: function() {
					var vm = this;
					vm.reviewListVo.pageIndex = 1;
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
				onchangeColorrelatePrductSn: function(colorrelatePrductVo) {
					// console.log(colorrelatePrductVo, colorrelatePrductVo.colorrelatePrductSn);
					location.href = '/product/' + colorrelatePrductVo.colorrelatePrductSn;
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

					vm.cartVo.cartAditList.forEach(function(item, index) {
						if(item.optnKndCode == 'install'){
							item.instlCategory = '';
							item.instlMaterial = '';
						}
					});
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
					});
					vm.cartVo.cartAditList.forEach(function(item, index) {
						if(item.optnKndCode == 'install'){
							item.instlMaterial = '';
						}
					});
				},

				valid: function() {
					var vm = this;
					var flag = true;

					if(vm.cartVo.cartAditList && vm.cartVo.cartAditList.length > 0){
						vm.cartVo.cartAditList.forEach(function(result, index) {
							if(result.optnKndCode == 'install') {
								if (!result.instlHopeDe) {
									alert('설치 서비스 희망일자를 입력해주세요.');
									flag = false;
									return false;
								}
							}
							if(result.optnKndCode == 'clean') {
								if (!result.cleanHopeDe) {
									alert('닥터클린 서비스 희망일을 입력해주세요.');
									flag = false;
									return false;
								}
							}
						});
					}

					return flag;
				},

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

					if(vm.deviceTypeMobl == "mobl"){
						return;
					}
					novita.ui.COMMON.pageProduct.detailProduct($('.page-product'));//제품상세 상단 visual swiper;
				}
			},
		});
	};

	return {
		init : init
	};
}(jQuery));
