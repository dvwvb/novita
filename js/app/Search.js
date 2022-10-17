var Search = (function($) {

	var options, $form;

	var init = function(_options) {
		options = _options;
		$form = $('#listForm');

		initVue();
	};

	var initVue = function() {
		vue = new Vue({
			el: '.vuelayer',
			data: {
				listVo: {},
				resultList : [],
				paginationInfo: {},
				orderByList: [],
				bestList: [],
				popularSearchwordList: [],
				comparePrductList: [],
			},
			created : function() {
				var vm = this;
				vm.listVo = options.listVo;
				vm.fetchData();
			},
			methods: {
				fetchData : function() {
					var vm = this;
					$.ajax({
						dataType : 'json',
						type : 'POST',
						contentType : 'application/json',
						url : '/search/data',
						data : JSON.stringify(vm.listVo)
					}).done(function(data) {
						if (vm.listVo.pageIndex == 1) {
							vm.resultList = data.resultList;
						} else {
							vm.resultList = vm.resultList.concat(data.resultList);
						}
						vm.paginationInfo = data.paginationInfo;
						vm.orderByList = data.orderByList;
						vm.bestList = data.bestList;
						vm.popularSearchwordList = data.popularSearchwordList;
						vm.comparePrductList = data.comparePrductList;
					})
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
				onSearch: function() {
					var vm = this;
					$form.find('#query').val(vm.listVo.query);
					$form.find('#searchMinPrice').val(vm.listVo.searchMinPrice);
					$form.find('#searchMaxPrice').val(vm.listVo.searchMaxPrice);
					$form.attr('method', 'post')
						.attr('action', '/search')
						.submit();
				},
				onchageOrderBy : function() {
					var vm = this;
					vm.listVo.pageIndex = 1;
					vm.fetchData();
				},
				onMore: function() {
					var vm = this;
					vm.listVo.pageIndex = vm.paginationInfo.currentPageNo + 1;
					vm.fetchData();
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
								url : '/mypage/interest-product/toggle?returnUrl=returnpage',
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
				onchangeSearchMinPrice: function() {
					$('.slider-range').slider('option', 'values', [0, 0]);
				},
				onchangeSearchMaxPrice: function() {
					$('.slider-range').slider('option', 'values', [0, 0]);
				},
				onDeletePrice : function(){
					var vm = this;
					vm.listVo.searchMinPrice = '';
					vm.listVo.searchMaxPrice = '';
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
			},
			mounted : function (){
				var vm = this;
				vueMounted(vm);
			},
			updated : function (){
				var vm = this;
				vueUpdated(vm);
			},
		});
	};

	return {
		init: init,
	};
}(jQuery));
