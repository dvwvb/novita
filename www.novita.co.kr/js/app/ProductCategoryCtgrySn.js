var ProductCategoryCtgrySn = (function($) {
	var options, $form;

	var init = function(_options) {
		options = _options;
		$form = $('#listForm');
		initVue();
	};

	var initVue = function() {
		vue = new Vue({
			el : '.vuelayer',
			data : {
				listVo : {},
				resultList : [],
				paginationInfo : {},
				ctgryVo: {},
				orderByList: [],
				comparePrductList: [],
				firstCtgryList: [],
				firstCtgryVo: {},
				secondCtgryVo: {},
			},
			computed: {
			},
			created : function() {
				var vm = this;
				vm.listVo = options.listVo;
				vm.fetchData();
			},
			methods : {
				fetchData : function() {
					var vm = this;
					$.ajax({ dataType : 'json', type : 'post',
						contentType : 'application/json',
						url : '/product-category/data',
						data : JSON.stringify(vm.listVo)
					}).done(function(data) {

						if (vm.listVo.pageIndex == 1) {
							vm.resultList = data.resultList;
						}else {
							vm.resultList = vm.resultList.concat(data.resultList);
						}
						vm.paginationInfo = data.paginationInfo;
						vm.ctgryVo = data.ctgryVo;
						vm.orderByList = data.orderByList;
						vm.comparePrductList = data.comparePrductList;
						vm.firstCtgryList = data.firstCtgryList;
						// console.log("vm.comparePrductList : " + vm.comparePrductList);

						if (vm.ctgryVo.level == 2) {
							vm.firstCtgryVo = JSON.parse(JSON.stringify(vm.ctgryVo));
						} else if (vm.ctgryVo.level == 3) {
							var filteredList = vm.firstCtgryList.filter(function(result) {
								return result.id == vm.ctgryVo.parentId;
							});
							if (filteredList && filteredList.length > 0) {
								vm.firstCtgryVo = filteredList[0];
							}
							vm.secondCtgryVo = JSON.parse(JSON.stringify(vm.ctgryVo));
						}
					});
				},
				fetchDataComparePrductList : function() {
					var vm = this;
					$.ajax({ dataType : 'json', type : 'post',
						contentType : 'application/json',
						url : '/product-compare/data',
						data : JSON.stringify({})
					}).done(function(data) {
						vm.comparePrductList = data.comparePrductList;
					});
				},

				onSearch : function() {
					var vm = this;
					vm.listVo.pageIndex = 1;
					vm.fetchData();
				},
				onViewLink : function(prductSn) {
					location.href = '/product/' + prductSn;
				},
				onMore: function() {
					var vm = this;
					vm.listVo.pageIndex = vm.paginationInfo.currentPageNo + 1;
					vm.fetchData();
				},
				pageMove : function(page) {
					var vm = this;
					vm.listVo.pageIndex = page;
					vm.fetchData();
				},
				onSort : function(orderBy) {
					var vm = this;
					vm.listVo.orderBy = orderBy;
				},
				onclickCategory: function(ctgryVo) {
					location.href = '/product-category/' + ctgryVo.id;
				},
				onchangeIntrstYn: function(prductVo) {
					var vm = this,
						input = event.target;

					authencated(
						function() {
							// onAuthencated
							//on:chagen -> on:click.prevnet 변경시사용가능 확인
							prductVo.intrstYn = (input.checked) ? 'N' : 'Y';

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
				onchangeSearchMinPrice: function() {
					$('.slider-range').slider('option', 'values', [0, 0]);
				},
				onchangeSearchMaxPrice: function() {
					$('.slider-range').slider('option', 'values', [0, 0]);
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
				onclickCompareYn: function(prductVo) {
					var vm = this;
					$.ajax({dataType : 'json', type : 'post',
						contentType : 'application/json',
						url : '/product-compare/toggle',
						data : JSON.stringify({
							prductSn: prductVo.prductSn,
						}),
					}).done(function(data) {
						vm.fetchDataComparePrductList();
						//console.log(prductVo.compareYn);
					}).fail(function(data) {
						prductVo.compareYn = !prductVo.compareYn;
					});
				},
				onclickRemoveComparePrduct: function(prductVo, index) {
					var vm = this;
					$.ajax({dataType : 'json', type : 'post',
						contentType : 'application/json',
						url : '/product-compare/remove',
						data : JSON.stringify({
							prductSn: prductVo.prductSn,
						}),
					}).done(function(data) {
						vm.fetchData();
						// vm.comparePrductList.splice(index, 1);
					}).fail(function(data) {
						prductVo.compareYn = !prductVo.compareYn;
					});
				},

				keywordList : function(prductVo) {
					var ret = [];
					// 분류별키워드 추가
					prductVo.prdkwrdClList.forEach(function(prdkwrdCl) {
						prdkwrdCl.prdkwrdList.forEach(function(prdkwrd) {
							ret.push({
								kwrd: prdkwrd.kwrd,
								prdkwrdSn: prdkwrd.prdkwrdSn,
							});
						});
					});
					// 직접입력 키워드 추가
					prductVo.prductKwrdList.forEach(function(prductKwrd) {
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
					if (ret.length > 2) {
						ret = ret.splice(0, 2);
					}
					return ret;
				},
				getPrdkwrdList : function(prductVo) {
					var ret = [];
					// 분류별키워드 추가
					prductVo.prdkwrdClList.forEach(function(prdkwrdCl) {
						prdkwrdCl.prdkwrdList.forEach(function(prdkwrd) {
							ret.push(prdkwrd);
						});
					});
					return ret;
				},
				/*onclickFirstCtgry: function(ctgryVo) {
					var vm = this;
					vm.firstCtgryVo = ctgryVo;
					if (ctgryVo.children && ctgryVo.children.length > 0) {
						vm.secondCtgryVo = ctgryVo.children[0];
					}
				},*/
				onclickPromotionBanner: function() {
					var vm = this;
					if(vm.ctgryVo.promtBannerUrl != null && vm.ctgryVo.promtBannerUrl !="" ){
						location.href = vm.ctgryVo.promtBannerUrl;
					}
				},
				onchangeSearchPriceMobl: function(event) {
					var vm = this;

					var searchPriceValue = event.target.value.split(',', 2);
					vm.listVo.searchMinPrice = searchPriceValue[0];
					vm.listVo.searchMaxPrice = searchPriceValue[1];
					
					if(event.target.value == "") {
						$('input:radio[name=sort-2]').attr("checked", false);
					}					
				},
				onclickAllRemoveComparePrductMobl: function() {
					var vm = this;
					var comparePrductListMobl = vm.comparePrductList;
										
					for(var i = 0; i < comparePrductListMobl.length; i++){
						(function(i) {							
							$.ajax({
								dataType : 'json', 
								type : 'post',
								async: false,
								contentType : 'application/json',
								url : '/product-compare/remove',
								data : JSON.stringify({
									prductSn: comparePrductListMobl[i].prductSn,
								}),
							}).done(function(data) {
								// vm.fetchData()
								// vm.comparePrductList.splice(index, 1);
							}).fail(function(data) {
								prductVo.compareYn = !prductVo.compareYn;
							});
							
					    })(i);
					}
					vm.fetchData();					
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
				}
			},
		});
	};

	return {
		init : init
	};
}(jQuery));
