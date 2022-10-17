var EventList = (function($) {
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
                onListVo : {},
                endListVo : {},
                onResultList : [],
                endResultList : [],
                onPaginationInfo : {},
                endPaginationInfo : {},
            },
            created : function() {
                var vm = this;
                vm.onListVo = options.onListVo;
                vm.endListVo = options.endListVo;

                vm.onListVo.recordCountPerPage = 6;
                vm.endListVo.recordCountPerPage = 9;

                vm.onListVo.firstIndex = 0;
                vm.endListVo.firstIndex = 0;

                vm.onListVo.searchStatus = 'on';
                vm.endListVo.searchStatus = 'end';
                vm.onFetchData();
                vm.endFetchData();
            },
            methods : {
                onFetchData : function() {
                    var vm = this;
                    $.ajax({dataType : 'json', type : 'post',
                        contentType : 'application/json',
                        url : '/event/list/data',
                        data : JSON.stringify(vm.onListVo)
                    }).done(function(data) {
                        vm.onResultList = vm.setValue(data.resultList);
                        vm.onPaginationInfo = data.paginationInfo;
                        vm.onListVo.firstIndex = vm.onListVo.recordCountPerPage;
                    });
                },
                endFetchData : function() {
                    var vm = this;
                    $.ajax({dataType : 'json', type : 'post',
                        contentType : 'application/json',
                        url : '/event/list/data',
                        data : JSON.stringify(vm.endListVo)
                    }).done(function(data) {
                        vm.endResultList = vm.setValue(data.resultList);
                        vm.endPaginationInfo = data.paginationInfo;
                    });
                },
                setValue : function(_list) {
                    var list = _list;
                    list.forEach(function (item, index) {
                        if(item.nttExpansVo.endde == null) {
                            item.dtag = "상시";
                            item.de = false;
                        } else {
                            var nowde = moment();
                            var endde = moment(item.nttExpansVo.endde);

                            var dday = endde.diff(nowde, "days");
                            if(dday === 0) {
                                item.dtag = "D-day";
                            } else {
                                item.dtag = "D-" + dday;
                            }
                            item.de = true;
                        }

                        if(item.atchList[0] !== undefined) {
                            item.flpth = item.atchList[0].physiclFlpth;
                        }
                    });

                    return list;
                },
                onMoreOn : function() {
                    var vm = this;
                    vm.onListVo.recordCountPerPage = 4;

                    $.ajax({dataType : 'json', type : 'post',
                        contentType : 'application/json',
                        url : '/event/list/data',
                        data : JSON.stringify(vm.onListVo)
                    }).done(function(data) {
                        vm.onResultList = [...vm.onResultList, ...vm.setValue(data.resultList)];
                        vm.onPaginationInfo = data.paginationInfo;
                        vm.onListVo.firstIndex += vm.onListVo.recordCountPerPage;
                    });
                },
                onMoreEnd : function() {
                    var vm = this;
                    vm.endListVo.recordCountPerPage = 9;

                    $.ajax({dataType : 'json', type : 'post',
                        contentType : 'application/json',
                        url : '/event/list/data',
                        data : JSON.stringify(vm.endListVo)
                    }).done(function(data) {
                        vm.endResultList = [...vm.endResultList, ...vm.setValue(data.resultList)];
                        vm.endPaginationInfo = data.paginationInfo;
                        vm.endListVo.firstIndex += vm.endListVo.recordCountPerPage;
                    });
                },
                onEndEvent : function() {
                    alert("종료된 이벤트입니다.");
                },
                onView : function(nttSn) {
                    return '/event/view/' + nttSn;
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