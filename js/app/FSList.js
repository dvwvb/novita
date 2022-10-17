var FSList = (function($) {

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
						url : '/info/fs-list/data',
						data : JSON.stringify(vm.listVo)
					}).done(function (data){
						//console.log('data:', JSON.stringify(data));
						vm.resultList = data.resultList;
						vm.paginationInfo = data.paginationInfo;
						if(data.resultList.length==0 || data.paginationInfo.currentPageNo >= data.paginationInfo.totalPageCount){
							$("#jqMore").hide();							
						}
					})
				},
				fetchDataPlus : function (){
					var vm = this;
					vm.listVo.pageIndex = vm.listVo.pageIndex + 1;
					$.ajax({
						dataType : 'json',
						type : 'POST',
						contentType : 'application/json',
						url : '/info/fs-list/data',
						data : JSON.stringify(vm.listVo)
					}).done(function (data){
						data.resultList.forEach(function(value, index) {
							vm.resultList.push(value);
						});
						if(data.paginationInfo.currentPageNo >= data.paginationInfo.totalPageCount)
							$("#jqMore").hide();
					})
				},
				onSearch : function() {
					var vm = this;
					vm.listVo.pageIndex = 1;
					vm.fetchData();
				},
				onViewLink : function (nttSn){
					$form.attr({
						action: '/info/fs-form/' + nttSn ,
						method : 'POST'
					}).submit();
				},
				pageMove : function(page) {
                    var vm = this;
                    vm.listVo.pageIndex = page;
                    vm.fetchData();
                },
			}

		});
	};

	return {
		init : init,
	};

}(jQuery));
