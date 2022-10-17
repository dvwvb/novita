var ProductFilterList = (function($) {
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
				listVo : {
					/*searchClId: 'function',
					searchFunctionPrdkwrdSnList: [],
					searchHealthPrdkwrdSnList: [],
					searchEmotionPrdkwrdSnList: [],*/
				},
				resultList : [],
				paginationInfo : {},
				orderByList: [],
				functionPrdkwrdList: [],
				healthPrdkwrdList: [],
				emotionPrdkwrdList: [],
				comparePrductList: [],
			},
			computed: {
				selectedFunctionPrdkwrdList : function() {
					var vm = this;
					var ret = [];
					if (!vm.listVo.searchFunctionPrdkwrdSnList) {
						return [];
					}
					vm.listVo.searchFunctionPrdkwrdSnList.forEach(function(searchFunctionPrdkwrdSn) {
						var functionPrdkwrdVo = vm.functionPrdkwrdList.filter(function(prdkwrd) {
							return prdkwrd.prdkwrdSn == searchFunctionPrdkwrdSn;
						})[0];
						if (functionPrdkwrdVo) {
							ret.push(functionPrdkwrdVo);
						}
					})
					return ret;
				},
				selectedHealthPrdkwrdList : function() {
					var vm = this;
					var ret = [];
					if (!vm.listVo.searchHealthPrdkwrdSnList) {
						return [];
					}
					vm.listVo.searchHealthPrdkwrdSnList.forEach(function(searchHealthPrdkwrdSn) {
						var healthPrdkwrdVo = vm.healthPrdkwrdList.filter(function(prdkwrd) {
							return prdkwrd.prdkwrdSn == searchHealthPrdkwrdSn;
						})[0];
						if (healthPrdkwrdVo) {
							ret.push(healthPrdkwrdVo);
						}
					})
					return ret;
				},
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
						url : '/product-filter/data',
						data : JSON.stringify(vm.listVo)
					}).done(function(data) {
						if (vm.listVo.pageIndex == 1) {
							vm.resultList = data.resultList;
						} else {
							vm.resultList = vm.resultList.concat(data.resultList);
						}
						vm.paginationInfo = data.paginationInfo;
						vm.orderByList = data.orderByList;
						vm.functionPrdkwrdList = data.functionPrdkwrdList;
						vm.healthPrdkwrdList = data.healthPrdkwrdList;
						vm.emotionPrdkwrdList = data.emotionPrdkwrdList;
						vm.comparePrductList = data.comparePrductList;
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
				onSearchIntroMobl : function() {
					var vm = this;
					vm.listVo.pageIndex = 1;
					vm.fetchData();					
					
					$('#introContents').hide();
					$('#mainContents').show();
					$('html, body').scrollTop(0);
				},				
				onMore: function() {
					var vm = this;
					vm.listVo.pageIndex = vm.paginationInfo.currentPageNo + 1;
					vm.fetchData();
				},
				onTab: function(selected) {
					var vm = this;
					vm.listVo.searchClId = selected;
					
					$('.filter-select .tooltip input').prop('checked', false);
				},
				onclickDeleteSelectedFunctionPrdkwrd: function(result, index) {
					var vm = this;
					vm.listVo.searchFunctionPrdkwrdSnList.splice(index, 1)
				},
				onclickDeleteSelectedHealthPrdkwrd: function(result, index) {
					var vm = this;
					vm.listVo.searchHealthPrdkwrdSnList.splice(index, 1)
				},

				onclickDeleteAllPrdkwrd: function() {
					var vm = this;
					if (vm.listVo.searchClId == 'function') {
						vm.listVo.searchFunctionPrdkwrdSnList = [];
					} else if (vm.listVo.searchClId == 'health') {
						vm.listVo.searchHealthPrdkwrdSnList = [];
					}
				},

				onchangeSearchMinPrice: function() {
					$('.slider-range').slider('option', 'values', [0, 0]);
				},
				onchangeSearchMaxPrice: function() {
					$('.slider-range').slider('option', 'values', [0, 0]);
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
					return ret;
				},
				onchangeIntrstYn: function(prductVo) {
					var vm = this;

					authencated(
						function() {
							// onAuthencated
							$.ajax({ dataType : 'json', type : 'post',
								contentType : 'application/json',
								url : '/mypage/interest-product/toggle',
								data : JSON.stringify({ prductSn : prductVo.prductSn })
							}).done(function(data) {
								console.log(prductVo.intrstYn);
							}).fail(function(data) {
								prductVo.intrstYn = !prductVo.intrstYn;
								console.log(prductVo.intrstYn);
							});
						},
						function() {
							// onUnauthencated
							prductVo.intrstYn = !prductVo.intrstYn;
							location.href = '/login?returnUrl=' + encodeURI(location.pathname);

						}
					)

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
						console.log(prductVo.compareYn);
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
				onchangeSearchPriceMobl: function(event) {
					var vm = this;
					
					var searchPriceValue = event.target.value.split(',', 2);
					vm.listVo.searchMinPrice = searchPriceValue[0];
					vm.listVo.searchMaxPrice = searchPriceValue[1];
					
					if(event.target.value == "") {
						$('input:radio[name=sort-2]').attr("checked", false);
					}	
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