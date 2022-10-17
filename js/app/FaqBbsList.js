var FaqBbsList = (function($) {

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
				listVo : { searchBbsCtgrySn : '', 
							searchUpperCtgrySn : ''
						  },
				resultList : [],
				paginationInfo : {},
				frontSubmenuList : [],
				ctgryTopList : [],
				ctgryAllList : [],
				seachAllCategoty : '',
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
						url : '/customer-center/faq-bbs-list/data',
						data : JSON.stringify(vm.listVo)
					}).done(function (data){
						vm.ctgryTopList = [];
						vm.ctgryAllList = [];
						vm.resultList = data.resultList;
						vm.paginationInfo = data.paginationInfo;
						vm.frontSubmenuList = data.frontSubmenuList;
						vm.keywordYn = data.keywordYn;
						vm.listVo.firstIndex = data.paginationInfo.recordCountPerPage;
						
						if(vm.frontSubmenuList != null) {
							$form.find('.ui-tree .group.active').removeClass('active')
							.find('.sub').hide();

							vm.frontSubmenuList.forEach(function(item, index){
								if(item.level === 1){
									vm.ctgryTopList.push({
										ctgryCode : item.id,
										ctgryNm   : item.text,
									});
								}
								if(item.level === 2){
									vm.ctgryAllList.push({
										ctgryCode : item.id,
										ctgryNm   : item.text,
									});
									
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
				onFirstTab : function (ctgryCode){
					var vm = this;
					vm.listVo.pageIndex = 1;
					vm.listVo.searchUpperCtgrySn = ctgryCode;
					vm.listVo.searchBbsCtgrySn = '';
					vm.fetchData();
				},
				onSecondTab : function (ctgryCode){
					var vm = this;
					vm.listVo.pageIndex = 1;
					vm.listVo.searchBbsCtgrySn = ctgryCode;
					vm.fetchData();
				},
				pageMove : function(page) {
                    var vm = this;
                    vm.listVo.pageIndex = page;
                    vm.fetchData();
                },
                onChangeSecondTabMobl : function(e) {
					var vm = this;
					vm.listVo.pageIndex = 1;
					vm.listVo.searchBbsCtgrySn = e.target.value;
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
