var UserManualList = (function($) {

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
				mnlSeCodeList : [],
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
						url : '/customer-center/user-manual-list/data',
						data : JSON.stringify(vm.listVo)
					}).done(function (data){
						vm.resultList = data.resultList;
						vm.paginationInfo = data.paginationInfo;
						vm.mnlSeCodeList = data.mnlSeCodeList;
						vm.keywordYn = data.keywordYn;
						vm.listVo.firstIndex = data.paginationInfo.recordCountPerPage;
						
						if(vm.resultList != null) {
							vm.resultList.forEach(function(item, index){
								if(item.prductMnlList[0] !== undefined) {
                            		item.imageRoute = item.prductMnlList[0].reprsntImageFlpth;
                        		}
								if(item.atchList[0] !== undefined) {
                            		item.fileRoute = item.atchList[0].atchId;
                            		//console.log("AAAA++" + item.fileRoute);
                        		}	
							});
						}
					})
				},
				onSearch : function() {
					var vm = this;
					vm.listVo.pageIndex = 1;
					vm.fetchData();
				},
				onTab : function (mnlSeCode){
					var vm = this;
					vm.listVo.searchMnlSeCode = mnlSeCode;
					vm.fetchData();
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
                }
			}

		});
	};

	return {
		init : init,
	};

}(jQuery));
