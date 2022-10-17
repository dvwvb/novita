var EventLiveList = (function($) {
    var options, $form;

    var init = function(_options) {
        options = _options;
        $form = $("listForm");
        initVue();
    };

    var initVue = function() {
        vue = new Vue({
            el : '.vuelayer',
            data : {
                listVo : {},
                resultList : [],
                resultView : {},
                liveTime : {
                    day : 0,
                    hour : 0,
                    min : 0,
                    sec : 0
                },
                paginationInfo : {},
            },
            created : function() {
                var vm = this;
                vm.listVo = options.listVo;
                vm.listVo.recordCountPerPage = 8;
                vm.listVo.firstIndex = 0;
                vm.fetchData();
            },
            methods : {
                fetchData : function() {
                    var vm = this;
                    $.ajax({dataType : 'json', type : 'post',
                        contentType : 'application/json',
                        url : '/event/live/list/data',
                        data : JSON.stringify(vm.listVo)
                    }).done(function(data) {
                        vm.resultList = data.resultList;
                        vm.resultView = data.resultView;
                        vm.paginationInfo = data.paginationInfo;

                        if(vm.resultView != null && vm.resultView.flagYn === 'ready') {
                            vm.setTimer();
                            setInterval(vm.setTimer, 1000);
                        }
                    });
                },
                setTimer : function() {
                    var vm = this;
                    var nowde = moment();
                    var livede = moment(vm.resultView.bgnde);
                    var live = moment.duration(livede.diff(nowde));
                    vm.liveTime.day = live.days();
                    vm.liveTime.hour = live.hours();
                    vm.liveTime.min = live.minutes();
                    vm.liveTime.sec = live.seconds();
                },
                onMore : function() {
                    var vm = this;
                    vm.listVo.firstIndex += vm.listVo.recordCountPerPage;

                    $.ajax({dataType : 'json', type : 'post',
                        contentType : 'application/json',
                        url : '/event/live/list/data',
                        data : JSON.stringify(vm.listVo)
                    }).done(function(data) {
                        vm.resultList = [...vm.resultList, ...data.resultList];
                        vm.paginationInfo = data.paginationInfo;
                    });
                }
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