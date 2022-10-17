Vue.component('vue-pop-coupon-select', {
	props: [
		'availableprductcouponlist',
		'availableordercouponlist',
	],
	data: function() {
		return {
			selectedAvailablePrductCouponSnList: [],
			selectedAvailableOrderCouponSn: '',
		}
	},
	computed: {
	},
	created: function() {
		console.log('created');
	},
	mounted: function() {
		console.log('mounted');
	},
	methods: {
		onSelect: function() {
			var vm = this;
			if ((vm.availableprductcouponlist && vm.availableprductcouponlist.length > 0) ||
					(vm.availableordercouponlist && vm.availableordercouponlist.length > 0)) {
				vm.$emit('select', {
					'selectedAvailablePrductCouponSnList': vm.selectedAvailablePrductCouponSnList,
					'selectedAvailableOrderCouponSn': vm.selectedAvailableOrderCouponSn,
				});
			}
			$('.btn-close', '.coupon-pop').trigger('click');
		},
		onClose: function() {
			var vm = this;
			$('.btn-close', '.coupon-pop').trigger('click');
		},
	},
	template : '\
        <div class="ui-popup case-btn coupon-pop" id="coupon-pop">\
            <div class="content" tabindex="0" style="width:950px">\
                <div class="header">\
                    <p>쿠폰 사용</p>\
                    <button type="button" class="btn-close">닫기</button>\
                </div>\
                <div class="body">\
                    <div class="content-area">\
                        <ul class="bullet-o">\
                            <li>제품별 쿠폰은 제품별로 사용할 수 있습니다.</li>\
                            <li>악세서리 단독 구매시에는 쿠폰을 사용할 수 없습니다.</li>\
                            <li>전체 반품 시 사용한 쿠폰은 복원되며, 쿠폰 유효기간에 따라 복원되어도 사용이 불가할 수 있습니다.</li>\
                            <li>제품 부분 환불 시, 쿠폰 사용 조건에 따라 쿠폰은 복원될 수 있으며, 쿠폰으로 할인된 금액이 반품하는 제품금액에서 차감된 후, 환불됩니다.</li>\
                        </ul>\
                        <div v-if="(!availableprductcouponlist || availableprductcouponlist.length <= 0) && (!availableordercouponlist || availableordercouponlist.length <= 0)" class="form-group form-radio-box">\
                        	<div class="empty-area">\
	                            <span class="no-content">사용 가능한 쿠폰이 없습니다.</span>\
	                        </div>\
                        </div>\
                        <div v-if="(availableprductcouponlist && availableprductcouponlist.length > 0) || (availableordercouponlist && availableordercouponlist.length > 0)" class="form-group form-radio-box">\
							<!-- 상품 적용 쿠폰 -->\
                            <div v-for="(result, index) in availableprductcouponlist">\
                                <label class="input-check">\
                                    <input type="checkbox" v-model="selectedAvailablePrductCouponSnList" :value="result.couponIsuSn"\
										name="prductCouponIsuSns" :id="\'prductCouponIsuSns\' + index">\
                                    <span>\
                                        <div>\
                                            <strong>\
												{{ result.couponNm }}<br>\
                                                <em>({{ result.prductNm }})</em>\
											</strong>\
                                            <span class="txt"></span>\
                                            <span class="date">\
												{{ result.validBeginDt | timeToDate }} - {{ result.validEndDt | timeToDate }}</span>\
                                            <span class="price"><em>{{ result.couponAmt | numberWithCommas }}</em>원 할인</span>\
                                        </div>\
                                    </span>\
                                </label>\
                            </div>\
							<!-- 주문 적용 쿠폰 (생일, 회원가입) -->\
							<div class="radio" v-for="(result, index) in availableordercouponlist">\
                                <label class="input-radio">\
                                    <input type="radio" v-model="selectedAvailableOrderCouponSn" :value="result.couponIsuSn"\
										name="orderCouponIsuSns" :id="\'orderCouponIsuSns\' + index">\
                                    <span>\
                                        <div>\
                                            <strong>\
                                                {{ result.couponNm }}<br>\
                                                <em>({{ result.prductNm }})</em>\
                                            </strong>\
                                            <span class="txt"></span>\
                                            <span class="date">\
												{{ result.validBeginDt | timeToDate }} - {{ result.validEndDt | timeToDate }}</span>\
                                            <span class="price"><em>{{ result.couponAmt | numberWithCommas }}</em>원 할인</span>\
                                        </div>\
                                    </span>\
                                </label>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <div class="footer">\
                    <div class="btn-group flex wide">\
                        <button v-on:click="onClose" type="button" class="btn-medium normal">취소</button>\
                        <button v-if="(availableprductcouponlist && availableprductcouponlist.length > 0) || (availableordercouponlist && availableordercouponlist.length > 0)" \
							v-on:click="onSelect" type="button" class="btn-medium im-active">적용</button>\
                    </div>\
                </div>\
            </div>\
        </div>\
	',
});
