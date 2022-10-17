var FtCntntsList = (function($) {

	var options, $form;

	var init = function (_options){
		options = _options;
		$form = $('#listForm');

		initVue();
	};
	var initVue = function (){
		vue = new Vue({
			el : '.vuelayer',
			data : {
				listVo : {},
				resultList : {},
				paginationInfo : {},
				nowVo : {},
				lastDate : null,
			},
			created : function (){
				var vm = this;
				vm.listVo = options.listVo;
				vm.fetchData();
			},
			methods : {
				fetchData : function() {
					var vm = this;
					$.ajax({
						dataType : 'json',
						type : 'POST',
						contentType : 'application/json',
						url : '/info/' + options.cntntsBbsId +'/cntnts/list/data',
						data : JSON.stringify(vm.listVo)
					}).done(function (data){
						vm.resultList = data.resultList;
						vm.nowVo = data.resultList[0];
						vm.paginationInfo = data.paginationInfo;
						if(options.cntntsBbsId == "indvdlprtc")
							vm.lastDate = vm.nowVo.expsrDt;
					})
				},
				onChange : function (event){
					if(event.target.value == "") return false;
					
					var vm = this;
					vm.resultList.forEach(function(value, index) {
						if(event.target.value == value.cntntsSn){
							vm.nowVo = value;
						}
						//console.log('array index: ' + index + ' value : ' + value.cntntsSn);
					});
				},
			}
		})
	}

	return {
		init : init
	};
}(jQuery));
