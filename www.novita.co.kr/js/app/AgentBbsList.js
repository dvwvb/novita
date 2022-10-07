var AgentBbsList = (function($) {

	var options, $form;
	
	var init = function(_options) {
		options = _options;
		$form = $("listForm");
		
		//on load
		initVue();
	};

	var initVue = function() {
		vue = new Vue({
			el: '#container',
			data: {
				areaCodeList: [],
				agencySeCodeList: [],
				resultList: [],
				listVo: {
					areaCode: null, agencySeCode: null,
				},
				selectedListVo: {},
				map: {},
				markers: [],
			},
			mounted : function() {
			    var vm = this;
				vm.fetchData();

				vm.map = options.mapHelper.initMap();
			},
			computed: {				
			},
			methods : {
				fetchData : function() {
					var vm = this;
					$.ajax({
						dataType: 'json',
						type : 'post',
						url: '/customer-center/agent-bbs-list/data',
						contentType: 'application/json',
						data: JSON.stringify(vm.listVo),
					}).done(function(data) {
						vm.resultList = data.resultList;
						vm.areaCodeList = data.areaCodeList;
						vm.agencySeCodeList = data.agencySeCodeList;
						
						//console.log('resultList:', JSON.stringify(vm.resultList));
					});
				},
				onSearch : function() {
					var vm = this;
					//vm.listVo.pageIndex = 1;
					vm.fetchData();
				},
				onclickArea : function(e) {
					var vm = this;
					vm.listVo.searchAreaCode = e.target.value;
					
					vm.fetchData();
				},
				setMarker : function() {
					var vm = this;
					vm.clearMarkers();

					vm.markers = options.mapHelper.addMarker({ 
						map: vm.map, resultList: vm.resultList,
						Lang: options.Lang,
					});
				}, 
				clearMarkers : function() {
					var vm = this;
					options.mapHelper.clearMarkers({
						map: vm.map, markers: vm.markers
					});
				},
				focusAcency: function(agency) {
					//console.log('[focusAcency] agency', agency);
					var vm = this;
					
					if (!agency) {
						return false;
					}
					
					// 해당지점으로 중심이동
					options.mapHelper.setCenter({
						map: vm.map, 
						latlng: {lat: parseFloat(agency.gpsLa), lng: parseFloat(agency.gpsLo) },
					});
				},
				onclickAgent : function(e, agency, index) {
					var vm = this;
					if (agency) {
						vm.selectedListVo = agency;
						vm.listVo = $.extend(false, vm.storeVo, {
							agencySn: agency.agencySn,
							agencyNm: agency['agencyNm']
						});
					}
					
					// for mobile
					if (typeof mapResult === 'function') {
						mapResult()
					}
				},
			},
			watch: {
				resultList: function() {
					var vm = this;
					vm.setMarker();
					
					//console.log('[watch.resultList] vm.resultList.length', vm.resultList.length);
					if (vm.resultList && vm.resultList.length > 0) {
						vm.listVo = $.extend(false, vm.listVo, { 
							agencySn: vm.resultList[0].agencySn,
							agencyNm: vm.resultList[0]['agencyNm']
						});
					}
					//console.log('[watch.resultList] vm.listVo', vm.listVo);
				}, 
				listVo: function(val) {
					var vm = this;
					
					if (vm.listVo && vm.listVo.agencySn) {

						//console.log('[watch.listVo] vm.listVo', vm.listVo);
						var agency = null;
						vm.resultList.forEach(function(item) {
							if (item.agencySn === vm.listVo.agencySn) {
								agency = item;
								return;
							}
						});
						
						if (agency) {
							vm.focusAcency(agency);
						}
						
					}
					
				},
			},
			updated: function() {
				//onVueUpdated(this);
			},
		});
	};

	return {
		init : init
	};
	
}(jQuery));
