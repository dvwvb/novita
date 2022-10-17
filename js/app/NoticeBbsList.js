var NoticeBbsList = (function($) {

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
				resultList : [],
				paginationInfo : {},
				keywordYn : {},
			},
			created : function (){
				var vm = this;
				vm.listVo = options.listVo;
				vm.fetchData();
			},
			methods : {
				fetchData : function (){
					var vm = this;
					$.ajax({
						dataType : 'json',
						type : 'POST',
						contentType : 'application/json',
						url : '/customer-center/notice-bbs-list/data',
						data : JSON.stringify(vm.listVo)
					}).done(function (data){
						//console.log('data:', JSON.stringify(data));
						vm.resultList = data.resultList;
						vm.paginationInfo = data.paginationInfo;
						vm.keywordYn = data.keywordYn;
						vm.listVo.firstIndex = data.paginationInfo.recordCountPerPage;
					})
				},
				onSearch : function() {
					var vm = this;
					vm.listVo.pageIndex = 1;
					vm.fetchData();
				},
				onViewLink : function (nttSn){
					$form.attr({
						action: '/customer-center/notice-bbs-form/' + nttSn ,
						method : 'POST'
					}).submit();
				},
				pageMove : function(page) {
                    var vm = this;
                    vm.listVo.pageIndex = page;
                    vm.fetchData();
                },
                onMoreMobl : function() {
					var vm = this;
                    vm.listVo.recordCountPerPage = vm.listVo.firstIndex + 15;
                    vm.fetchData();
                },
			}

		});
	};

	return {
		init : init,
	};

}(jQuery));
