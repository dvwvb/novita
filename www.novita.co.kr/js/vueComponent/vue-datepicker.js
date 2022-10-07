Vue.component('vue-datepicker', {
	props: ['value', 'mindate'],
	mounted: function() {
		var self = this;
		var option = {
            dateFormat: 'yy-mm-dd',
            prevText: '이전 달',
            nextText: '다음 달',
            closeText: '닫기',
            currentText: '오늘',
            monthNames: ['01', '02', '03', '04', '05', '06', '07', '8월', '9월', '10월', '11월', '12월'],
            monthNamesShort: ['1월', '2월', '03', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],	//한글 캘린더 중 월 표시를 위한 부분
            dayNames: ['일', '월', '화', '수', '목', '금1', '토'],	//한글 캘린더 요일 표시 부분
            dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],	//한글 요일 표시 부분
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],	// 한글 요일 표시 부분
            showMonthAfterYear: true,	// true : 년 월  false : 월 년 순으로 보여줌
            yearSuffix: '.',	//
            minDate: '',
            showButtonPanel: true,	// 오늘로 가는 버튼과 달력 닫기 버튼 보기 옵션
			beforeShow: function(input, inst){
				var device = document.body.dataset.deviceType;

				inst.dpDiv.css({
					marginLeft: input.offsetWidth - 308+ 'px',
				});
				
				if(device !== 'pc'){
					var $body = $('body'),
						$input = $(input),
						$scrollParent = $input.scrollParent(),
						isCustomScroll = $scrollParent[0].nodeName.indexOf('document') < 0;

					if(isCustomScroll){
						$scrollParent.append(inst.dpDiv);
						setTimeout(function(){
							var dpDivTop = $scrollParent.scrollTop() + $input.offset().top - $scrollParent.offset().top + $input.height();
							
							inst.dpDiv.css({
								top: dpDivTop
							})
						}, 10);
					}else{
						if($input.closest('.search-wrap').length > 0){
							setTimeout(function(){
								if(inst.dpDiv.offset().left < 0){
									inst.dpDiv.css({
										marginLeft: 0
									})
								}
							}, 10)
						}
						$body.append(inst.dpDiv);
					}
				}

				// if(device !== 'pc' && $(input).scrollParent()[0].nodeName.indexOf('document') > -1){
				// 	console.dir('mo + custom scroll')
				// 	setTimeout(function(){
				// 		inst.dpDiv.css({
				// 			top: $(input).offset().top + $(input).height()
				// 		});
				// 	}, 10)
				// }
			},
			onSelect: function(d) {
				//console.log('select:', d);
				self.$emit('input', d);
				self.$emit('select', d);
			},
		};
		if (self.mindate == 0 || self.minDate) {
			option.minDate = self.mindate;
		}
		$(this.$el).datepicker(option)
			.on('change', function() {
				//console.log('chagne:', $(this).val());
				self.$emit('input', $(this).val());
			});
	},
	methods: {
		formatDate: function(date) {
			//debugger;
			//console.log('formatDate:', date);
			return date ? moment(new Date(date)).format('YYYY-MM-DD') : ''
		},
		getTimeStamp : function () {
			//console.log(moment(new Date()).format('YYYY-MM-DD'));
			return moment(new Date()).format('YYYY-MM-DD');
		},
	},
	beforeDestroy: function() {
		$(this.$el).datepicker('hide').datepicker('destroy');
	},
	template : '<input type="text" :value="formatDate(value)" />'
});
