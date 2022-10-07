var EventVipView = (function($) {
    var options, $form;

    var init = function(_options) {
        options = _options;
        $form = $("#viewForm");
        initVue();
    };

    var initVue = function() {
        vue = new Vue({
            el : '.vuelayer',
            data : {
            	pcAtchVo : {},
            	moAtchVo : {},
            	resveVo : {},
            	couponVo : {},
            	eventVo : {},
            	resultVo : {},
            	paginationInfo : {},
            	resveList : [],
            	couponList : [],
            	eventList : [],
            	cartVo : {
					prductSn: '',
					prductQy : 1,
					price : 0,
					cartAditList : [],
				},
				couponPaginationInfo : {},
                eventPaginationInfo : {},
            },
            created : function() {
                var vm = this;
                vm.resultVo = options.resultVo;
                vm.fetchData();

                // 예약 제품
                vm.resveVo.recordCountPerPage = 6;
                vm.resveVo.firstIndex = 0;
                vm.resveData();

                // 쿠폰
                vm.couponVo.couponUserSe = 'VIP';
                vm.couponVo.mode = 'VIP';
                vm.couponVo.useYn = 'Y';
                vm.couponVo.recordCountPerPage = 9;
                vm.couponVo.firstIndex = 0;
                vm.couponData();

                // vip 이벤트
                vm.eventVo.bbsId = 'vip-event',
                vm.eventVo.recordCountPerPage = 6;
                vm.eventVo.firstIndex = 0;
                vm.eventVo.searchStatus = 'on';
                vm.eventData();
            },
            methods : {
                fetchData : function() {
                    var vm = this;
                    $.ajax({dataType : 'json', type : 'post',
                        contentType : 'application/json',
                        url : '/event/vip/data',
                        data : JSON.stringify(),
                    }).done(function(data) {
                    	console.log(data.resultVo);
                    	vm.pcAtchVo = data.resultVo.pcAtchVo;
                    	vm.moAtchVo = data.resultVo.moAtchVo;
                    });

                },
                resveData : function() {
                    var vm = this;
                    $.ajax({dataType : 'json', type : 'post',
                        contentType : 'application/json',
                        url : '/event/vip/resve/list/data',
                        data : JSON.stringify(vm.resveVo),
                    }).done(function(data) {
                    	vm.resveList = data.resultList;
						vm.paginationInfo = data.paginationInfo;
                    });

                },
                couponData : function() {
                    var vm = this;
                    $.ajax({dataType : 'json', type : 'post',
                        contentType : 'application/json',
                        url : '/event/vip/coupon/list/data',
                        data : JSON.stringify(vm.couponVo),
                    }).done(function(data) {
                    	vm.couponList = data.resultList ;
                    	vm.couponPaginationInfo = data.paginationInfo;
                    });

                },
                downloadCoupon : function(couponSn, isuYn) {
                    var vm = this;
                    authencated(
						function() {
							// onAuthencated
							var $mberGradCode = $("#mberGradCode").val();
							if($mberGradCode == "general" ){
								alert("노비타 클럽 회원만 다운로드 할수 있습니다.");
								return false;
							}else{
								if(isuYn !== 'Y') {
			                        $.ajax({ dataType : 'json', type : 'post',
			                            contentType : 'application/json',
			                            url : '/mypage/coupon-dwld/isu',
			                            data : JSON.stringify({couponSn : couponSn})
			                        }).done(function(data) {
			                            alert("쿠폰을 다운로드 하였습니다.\n쿠폰 조회/등록 화면에서 등록된 쿠폰을 볼 수 있습니다.");
			                            vm.couponData();
			                        });
			                    }
							}
						},
						function() {
							if(confirm("로그인이 필요 합니다. 로그인 페이지 이동하시겠습니가?")){
								location.href = '/login?returnUrl=/event/vip';
							}
						}
					)
                },
                eventData : function() {
                    var vm = this;
                    $.ajax({dataType : 'json', type : 'post',
                        contentType : 'application/json',
                        url : '/event/vip/event/list/data',
                        data : JSON.stringify(vm.eventVo),
                    }).done(function(data) {
                    	vm.eventList = vm.setValue(data.resultList);
                    	vm.eventPaginationInfo = data.paginationInfo;
                    });

                },
                setValue : function(_list) {
                    var list = _list;
                    list.forEach(function (item, index) {
                        if(item.nttExpansVo.endde == null) {
                            item.dtag = "상시";
                            item.de = false;
                        } else {
                            var nowde = moment();
                            var endde = moment(item.nttExpansVo.endde);

                            var dday = endde.diff(nowde, "days");
                            if(dday === 0) {
                                item.dtag = "D-day";
                            } else {
                                item.dtag = "D-" + dday;
                            }
                            item.de = true;
                        }

                        if(item.atchList[0] != undefined) {
                            item.flpth = item.atchList[0].physiclFlpth;
                        }
                    });

                    return list;
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
				onPrductView : function(prductSn){
					console.log("onPrductView >>>"+prductSn);
					var vm = this;
					authencated(
						function() {
							// onAuthencated
							var $mberGradCode = $("#mberGradCode").val();
							if($mberGradCode == "general" ){
								alert("노비타 클럽 회원만 확인하실 수 있습니다.");
								return false;
							}else{
								location.href = '/product/'+prductSn;
							}
						},
						function() {
							if(confirm("로그인이 필요 합니다. 로그인 페이지 이동하시겠습니가?")){
								location.href = '/login?returnUrl=/event/vip';
							}
						}
					)
				},
				openPoupReserve : function(prductVo){
					console.log("openPoupReserve >>>"+prductVo.prductSn);
					var vm = this;
					authencated(
						function() {
							// onAuthencated
							var $mberGradCode = $("#mberGradCode").val();
							if($mberGradCode == "general" ){
								alert("노비타 클럽 회원만 구매 하실 수 있습니다.");
								return false;
							}else{
								$("#pop-product-reserve").addClass("active");
								vm.cartVo.price = prductVo.price;
								vm.cartVo.prductSn = prductVo.prductSn;
							}
						},
						function() {
							if(confirm("로그인이 필요 합니다. 로그인 페이지 이동하시겠습니가?")){
								location.href = '/login?returnUrl=/event/vip';
							}
						}
					)

				},
				onEventView : function(nttSn){
					var vm = this;
					authencated(
						function() {
							var $mberGradCode = $("#mberGradCode").val();
							if($mberGradCode == "general" ){
								alert("노비타 클럽 회원만 확인하실 수 있습니다.");
								return false;
							}else{
								location.href='/event/view/' + nttSn;
							}
						},
						function() {
							if(confirm("로그인이 필요 합니다. 로그인 페이지 이동하시겠습니가?")){
								location.href = '/login?returnUrl=/event/vip';
							}
						}
					)
				},
				onEventMoreOn : function() {
                    var vm = this;

                    $.ajax({dataType : 'json', type : 'post',
                        contentType : 'application/json',
                        url : '/event/vip/event/list/data',
                        data : JSON.stringify(vm.eventVo)
                    }).done(function(data) {
                        vm.eventList = [...vm.eventList, ...vm.setValue(data.resultList)];
                        vm.eventPaginationInfo = data.paginationInfo;
                        vm.eventVo.firstIndex += vm.eventVo.recordCountPerPage;
                    });
                },
				onResePurchase : function(){
					var vm = this;

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
            },
			updated : function() {
                var vm = this;
                if('function' == typeof vueUpdated) {
                    vueUpdated(vm);
                }
            }
        });
    };

    return {
        init: init
    };
}(jQuery));