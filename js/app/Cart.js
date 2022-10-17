var Cart = (function($) {
	var options, $form;

	var init = function(_options) {
		options = _options;
		$form = $("#listForm");
		initVue();
	};

	var initVue = function() {
		vue = new Vue({
			el : '.vuelayer',
			data : {
				listVo : {},
				resultList : [],
				sumVo : {},
				checkedIdList: [],
				checkAll: false,
				optionChangeCartVo : null,
				optionChangeIndex : -1,
				typeList : [],
				categoryList : [],
				prductList : [],
				optnCategoryList : [],
				optnPrductList : [],
			},
			created : function (){
				var vm = this;
				vm.listVo = options.listVo;
				vm.fetchData();
			},
			computed: {
				checkedList : function() {
					var vm = this;
					if (!vm.checkedIdList || vm.checkedIdList.length < 1) {
						return null;
					}
					return vm.resultList.filter(function(result, index) {
						return vm.checkedIdList.includes(result.cartId)
					});
				},

				additionalOptnPrductList: function() {
					var vm = this;
					if (!vm.optionChangeCartVo || !vm.optionChangeCartVo.optnPrductList) {
						return null;
					}
					return vm.optionChangeCartVo.optnPrductList.filter(function(result) {
						return result.optnKndCode == 'additional';
					});
				},
				cleanOptnPrductList: function() {
					var vm = this;
					if (!vm.optionChangeCartVo || !vm.optionChangeCartVo.optnPrductList) {
						return null;
					}
					return vm.optionChangeCartVo.optnPrductList.filter(function(result) {
						return result.optnKndCode == 'clean';
					});
				},
				installOptnPrductList: function() {
					var vm = this;
					if (!vm.optionChangeCartVo || !vm.optionChangeCartVo.optnPrductList) {
						return null;
					}
					return vm.optionChangeCartVo.optnPrductList.filter(function(result) {
						return result.optnKndCode == 'install';
					});
				},

			},
			methods : {
				fetchData : function() {
					var vm = this;
					vm.listVo.cartIdList = vm.checkedIdList;
					$.ajax({ dataType : 'json', type : 'POST',
						contentType : 'application/json',
						url : '/cart/data',
						data : JSON.stringify(vm.listVo)
					}).done(function (data){
						vm.resultList = data.resultList;
						vm.sumVo = data.sumVo;

						if (vm.resultList) {
							$('.util-cart .num').text(vm.resultList.length);
						}
					})
				},
				onchangeCbCartId: function() {
					var vm = this;
					vm.listVo.cartIdList = vm.checkedIdList;
					vm.checkAll = (vm.checkedIdList.length == vm.resultList.length);
					vm.fetchData();
				},
				onchangeCartQy : function(cartVo) {
					var vm = this;
					$.ajax({ dataType : 'json', type : 'POST',
						contentType : 'application/json',
						url : '/cart/update-cart-qy',
						data : JSON.stringify(cartVo)
					}).done(function (data) {
						vm.fetchData();
					}).fail(function (data) {
						vm.fetchData();
					});
				},
				onMinusPrductQy : function(cartVo) {
					var vm = this;
					if (cartVo.prductQy > 1) {
						cartVo.prductQy --;
						vm.onchangeCartQy(cartVo);
					}
				},
				onPlusPrductQy : function(cartVo) {
					var vm = this;
					if (cartVo.prductQy < 20) {
						cartVo.prductQy ++;
						vm.onchangeCartQy(cartVo);
					}
				},
				onDeleteCart : function(cartVo) {
					var vm = this;
					$.ajax({ dataType : 'json', type : 'POST',
						contentType : 'application/json',
						url : '/cart/delete',
						data : JSON.stringify(cartVo)
					}).done(function (data) {
						vm.fetchData();
					}).fail(function (data) {
						vm.fetchData();
					});
				},
				onDeleteSelectedCart : function() {
					var vm = this;

					if (!vm.checkedList || vm.checkedList.length < 1) {
						alert('삭제할 항목을 선택하세요.');
						return false;
					}

					$.ajax({ dataType : 'json', type : 'POST',
						contentType : 'application/json',
						url : '/cart/delete-list',
						data : JSON.stringify(vm.checkedIdList)
					}).done(function (data) {
						vm.fetchData();
					}).fail(function (data) {
						vm.fetchData();
					});
				},
				onDeleteCartAdit : function(cartAditVo) {
					var vm = this;
					$.ajax({ dataType : 'json', type : 'POST',
						contentType : 'application/json',
						url : '/cart/delete-option',
						data : JSON.stringify(cartAditVo)
					}).done(function (data) {
						vm.fetchData();
					}).fail(function (data) {
						vm.fetchData();
					});
				},
				onPurchase: function() {
					var vm = this;

					if (!vm.checkedIdList || vm.checkedIdList.length < 1) {
						alert('주문할 제품을 선택해 주세요.');
						return false;
					}

					$form.find('#cartIdList').val(vm.checkedIdList.toString());
					$form.attr('action', '/order-sheet');
					$form.submit();
				},
				onUnauthenticatedPurchase: function() {
					var vm = this;

					if (!vm.checkedIdList || vm.checkedIdList.length < 1) {
						alert('주문할 제품을 선택해 주세요.');
						return false;
					}

					fnCheckplusPopup();
				},
				onchangeCheckAll: function() {
					var vm = this;
					if (vm.checkAll) {
						vm.checkedIdList = [];
						vm.resultList.forEach(function(result) {
							vm.checkedIdList.push(result.cartId);
						});
					} else {
						vm.checkedIdList = [];
					}
					vm.fetchData();
				},
				onclickCheckAll: function() {
					var vm = this;
					vm.checkAll = vm.checkAll ? false : true;
					if (vm.checkAll) {
						vm.checkedIdList = [];
						vm.resultList.forEach(function(result) {
							// 판매중일때만 등록 되도록 추가
							if(result.sellable){
								vm.checkedIdList.push(result.cartId);
							}
						});
					} else {
						vm.checkedIdList = [];
					}
					vm.fetchData();
				},
				onclickOptionChange: function(cartVo, index) {
					var vm = this;
					vm.optionChangeCartVo = JSON.parse(JSON.stringify(cartVo));
					vm.optionChangeIndex = index;

					$.ajax({dataType : 'json', type : 'post',
						contentType : 'application/json',
						url : '/cart/install-product',
						data : JSON.stringify(vm.optionChangeCartVo),
					}).done(function(data) {
						vm.typeList = data.typeList;
						vm.categoryList = data.categoryList;
						vm.prductList = data.prductList;
						vm.optnCategoryList = data.optnCategoryList;
						vm.optnPrductList = data.optnPrductList;

						if(vm.categoryList == null){
							vm.categoryList = vm.optnCategoryList;
						}
						if(vm.prductList == null){
							vm.prductList = vm.optnPrductList ;
						}
					});
				},
				onCloseOptionChange: function() {
					var vm = this;
					vm.optionChangeCartVo = null;
					$('.btn-close').trigger('click')
				},
				onSaveOptionChange: function() {
					var vm = this;

					if (!vm.valid()) {
						return false;
					}

					vm.resultList[vm.optionChangeIndex] = vm.optionChangeCartVo;
					// vm.optionChangeCartVo = null;

					// 카트정보 업데이트 : optionChangeCartVo (/cart/update)
					$.ajax({dataType : 'json', type : 'post',
						contentType : 'application/json',
						url : '/cart/update',
						data : JSON.stringify(vm.optionChangeCartVo),
					}).done(function(data) {
						vm.optionChangeCartVo = null;
						vm.fetchData();
						$('.btn-close').trigger('click')
					});

				},
				totOrderAmt: function(cartVo) {
					var amt = 0;
					cartVo.cartAditList.forEach(function(result) {
						amt = amt + parseInt(result.prductQy) * parseInt(result.price);
					});
					amt = parseInt(cartVo.orderAmt) + amt;
					return amt;
				},

				onchangeOptnPrductSn : function(e) {
					var vm = this;
					var optnPrductSn = e.target.value;
					if (!optnPrductSn) {
						e.target.value = '';
						return;
					}

					// 추가할 상품정보
					var optnPrductList = vm.optionChangeCartVo.optnPrductList.filter(function(result) {
						return result.optnPrductSn == optnPrductSn;
					});
					if (!optnPrductList || optnPrductList.length < 1) {
						e.target.value = '';
						return;
					}
					var optnPrduct = optnPrductList[0];

					// 이미 선택된 상품 인가 확인
					var cartAdit = null;
					var cartAditList = vm.optionChangeCartVo.cartAditList.filter(function(adit) {
						return adit.prductSn == optnPrductSn;
					})
					if (cartAditList && cartAditList.length > 0) {
						cartAdit = cartAditList[0];
					}

					if (!cartAdit) {
						// 선택된 상품이 없으면, 선택상품에 추가
						if (!vm.optionChangeCartVo.cartAditList) {
							vm.optionChangeCartVo.cartAditList = [];
						}
						if (optnPrduct.optnKndCode == 'install') {
							vm.optionChangeCartVo.cartAditList.push({
								cartId : vm.optionChangeCartVo.cartId,
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
							vm.optionChangeCartVo.cartAditList.push({
								cartId : vm.optionChangeCartVo.cartId,
								prductSn : optnPrduct.optnPrductSn,
								prductNm : optnPrduct.optnPrductNm,
								prductQy : 1,
								price : optnPrduct.price,
								optnKndCode: optnPrduct.optnKndCode,
							});
						}
						vm.categoryList = vm.optnCategoryList;
						vm.prductList = vm.optnPrductList;
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
				ondeleteOptionChangeCartAdit: function(index) {
					var vm = this;
					vm.optionChangeCartVo.cartAditList.splice(index, 1);
				},
				onOptnMinusPrductQy : function(aditVo) {
					var vm = this;
					if (aditVo.prductQy > 1) {
						aditVo.prductQy --;
					}
				},
				onOptnPlusPrductQy : function(aditVo) {
					var vm = this;
					if (aditVo.prductQy < 20) {
						aditVo.prductQy ++;
					}
				},
				onProductView : function( prductSn){
					location.href = '/product/'+ prductSn;
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

					vm.optionChangeCartVo.cartAditList.forEach(function(item, index) {
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
					vm.optionChangeCartVo.cartAditList.forEach(function(item, index) {
						if(item.optnKndCode == 'install'){
							item.instlMaterial = '';
						}
					});
				},

				valid: function() {
					var vm = this;
					var flag = true;

					if(vm.optionChangeCartVo.cartAditList && vm.optionChangeCartVo.cartAditList.length > 0){
						vm.optionChangeCartVo.cartAditList.forEach(function(result, index) {
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
				vueMounted(vm);
			},
			updated : function() {
				var vm = this;
				vueUpdated(vm);
			},
		});

	};

	return {
		init : init
	};
}(jQuery));
