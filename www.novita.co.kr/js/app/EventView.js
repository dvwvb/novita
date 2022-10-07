var EventView = (function($) {
    var options, $form;

    var init = function(_options) {
        options = _options;
        $form = $("#editForm");
        initVue();

        // kakao app 초기화
        Kakao.init(options.kakao_appkey_script); //발급받은 키 중 javascript키를 사용해준다.
        console.log(Kakao.isInitialized()); // sdk초기화여부판단
    };

    var initVue = function() {
        vue = new Vue({
            el : '.vuelayer',
            data : {
                messages : options.messages,
                nttSn : options.nttSn,
                wrterSn : options.wrterSn,
                resultVo : options.resultVo,
                answerVo : options.answerVo,
                answerList : [],
                answerCount : {},
                paginationInfo : {},
                prevPage : '',
                nextPage : '',
                popUrl : '',
            },
            created : function() {
                var vm = this;
                vm.answerVo.pageIndex = 1;
                vm.fetchData();
                vm.fetchAnswer();
            },
            methods : {
                fetchData : function() {
                    var vm = this;
                    $.ajax({dataType : 'json', type : 'post',
                        contentType : 'application/json',
                        url : '/event/view/data',
                        data : JSON.stringify({ nttSn : vm.nttSn}),
                    }).done(function(data) {

                    	var $mberGradCode = $("#mberGradCode").val();
                    	if(data.resultVo.bbsId === 'vip-event' && $mberGradCode != "russo"){
                    		alert("노비타 클럽 회원만 확인하실 수 있습니다.");
                    		location.href = '/event/list';
                    		return false;
                    	}

                        vm.resultVo = data.resultVo;
                        if(data.prevPage != null) vm.prevPage = '/event/view/'+data.prevPage.nttSn;
                        if(data.nextPage != null) vm.nextPage = '/event/view/'+data.nextPage.nttSn;
                    });
                },
                fetchAnswer : function() {
                    var vm = this;
                    vm.answerVo.nttSn = vm.nttSn;
                    $.ajax({dataType : 'json', type : 'post',
                        contentType : 'application/json',
                        url : '/event/view/answer',
                        data : JSON.stringify(vm.answerVo),
                    }).done(function(data) {
                        vm.answerList = data.resultList;
                        vm.answerCount = data.resultCount;
                        vm.paginationInfo = data.paginationInfo;
                    });
                },
                onUploadImage : function(e) {
                    var vm = this;
                    uploadImage($form, $(e.target), function(data) {
                        if (!vm.answerVo.answerAtchList) {
                            vm.answerVo.answerAtchList = [];
                        }

                        if(vm.answerVo.answerAtchList.length > 0) {
                            vm.answerVo.answerAtchList.splice(0, 1);
                        }

                        vm.answerVo.answerAtchList.push(data.resultVo);
                    });
                },
                onDeleteImage : function() {
                    var vm = this;
                    vm.answerVo.answerAtchList.splice(0, 1);
                },
                onPopImageUrl : function(url) {
                    this.popUrl = url;
                },
                onList : function(e) {
                    return '/event/list';
                },
                onReply : function() {
                    var vm = this;
                    vm.answerVo.nttSn = vm.nttSn;

                    vm.answerVo.eventYn = true;

                    //
                    if(vm.answerVo.answerCn.length < 1) {
                        alert("댓글 내용을 입력해주세요.");
                        return false;
                    }

                    //사진첨부 검사
                    if(vm.resultVo.nttExpansVo.answerYn === 'P') {
                        if(vm.answerVo.answerAtchList.length < 1) {
                            alert("댓글 이미지를 등록해주세요.");
                            return false;
                        }
                    }

                    $.ajax({dataType : 'json', type : 'post',
                        contentType : 'application/json',
                        url : '/event/submit/answer',
                        data : JSON.stringify(vm.answerVo),
                    }).done(function(data) {
                        vm.answerVo.answerCn = '';
                        vm.answerVo.answerAtchList = [];
                        vm.fetchAnswer();
                    }).fail(function() {

                    });
                },
                onRemoveAnswer : function(nttAnswerSn) {
                    var vm = this;
                    vm.answerVo.nttAnswerSn = nttAnswerSn;

                    if (!confirm('댓글을 삭제하시겠습니까?')) {
                        return false;
                    }

                    $.ajax({dataType : 'json', type : 'post',
                        contentType : 'application/json',
                        url : '/event/delete/answer',
                        data : JSON.stringify(vm.answerVo),
                    }).done(function(data) {
                        alert("댓글이 삭제되었습니다.");
                        vm.fetchAnswer();
                    }).fail(function() {

                    });
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
                onKakaoLunching : function() {
                    Kakao.Link.sendDefault({
                    	objectType: 'feed',
                        content: {
                            title: '노비타 노즐교체비데 출시기념',
                            description: '퀴즈이벤트 풀고 공유하고 경품 받자',
                            imageUrl: 'https://www.novita.co.kr/assets/images/event/event/kakao_share_event.png',
                            imageWidth: 1200,
                            imageHeight: 630,
                            link: {
                            	mobileWebUrl:window.location.href,
                                webUrl:window.location.href,
                            },
                        },
                        buttons: [
                            {
                                title: '상세보기',
                                link: {
                                	mobileWebUrl:window.location.href,
                                    webUrl:window.location.href,
                                },
                            },
                        ]
                    });
                },
                onKakaoShare : function(idx) {
                	$("#place").val(idx);
                	$.ajax({dataType : 'json', type : 'post',
        				url : '/lunchingEvent/kakaoShare',
        				data : $("#editForm").serialize(),
        				async: false,
        			}).done(function(data) {
        				if(idx==='6' || idx==='7'){
        					location.href = '/product/20000000061';
        				}
        			}).fail(function() {

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