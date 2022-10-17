var NovitaAdList = (function($) {
    var options, $form;

    var init = function(_options) {
        options = _options;
        $form = $("#listForm");
        initVue();
        // kakao app 초기화
        Kakao.init(options.kakao_appkey_script); //발급받은 키 중 javascript키를 사용해준다.
        console.log(">>"+Kakao.isInitialized()); // sdk초기화여부판단
    };

    var initVue = function() {
        vue = new Vue({
            el : '.vuelayer',
            data : {
				listVo : {},
				viewVo : {},
				resultList : [],
				paginationInfo : {},
				messages : options.messages,
			},
			created : function (){
				var vm = this;
				vm.listVo = options.listVo;
				vm.listVo.recordCountPerPage = 6;
				vm.fetchData();
			},
            methods : {
            	fetchData : function (){
	            	var vm = this;
					$.ajax({
						dataType : 'json',
						type : 'POST',
						contentType : 'application/json',
						url : '/novita/ad-list/data',
						data : JSON.stringify(vm.listVo)
					}).done(function (data){
						//console.log('data:', JSON.stringify(data));
						vm.resultList = data.resultList;
						vm.paginationInfo = data.paginationInfo;
						vm.listVo.firstIndex = data.paginationInfo.recordCountPerPage;
						if(vm.listVo.pageIndex == '1'){
							vm.viewVo = data.topView;
							vm.onView(vm.viewVo);
						}
					});
            	},
            	onView  : function (selectVo){
            		var vm = this;
            		vm.viewVo = selectVo
            	},
            	pageMove : function(page) {
                    var vm = this;
                    vm.listVo.pageIndex = page;
                    vm.fetchData();
                },
                onCopyUrl : function() {
                    var url = window.location.href;
                    navigator.clipboard.writeText(url).then(()=> {
                        alert("URL주소가 복사되었습니다.");
                    });
                },
                onCopyKakao : function() {
                    Kakao.Link.sendDefault({
                        objectType: 'text',
                        text:
                            '노비타',
                        link: {
                            mobileWebUrl:window.location.href,
                            webUrl:window.location.href,
                        },
                    });
                },
                onCopyFacebook : function() {
                    window.open('http://www.facebook.com/sharer.php?u='+window.location.href);
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
        init: init
    };
}(jQuery));