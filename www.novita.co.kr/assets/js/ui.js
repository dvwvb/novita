(function($, core, ui, undefined){
    'use strict';

    ui.COMMON = {
        init: function(){
            ui('ANIMATION', '[data-animation]');
            this.include();
            this.header();
            this.checkboxAll();
            this.aside();
            this.selectClass();
            this.calendar();
            this.scrollBar();
            this.checkedClass();

            if(core.$body.find('.page-main').length > 0) this.pageMain.init();
            if(core.$body.find('.page-search').length > 0) this.pageSearch.init();
            if(core.$body.find('.page-product').length > 0) this.pageProduct.init();
            if(core.$body.find('.page-payment').length > 0) this.pageCheckout.init();
            if(core.$body.find('.page-novita').length > 0) this.pageNovita.init();
        },
        include: function(){    //개발적용시 제거
            $('[data-include]').each(function(){
                var el = this,
                    url = this.dataset.include;

                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        el.innerHTML = this.responseText;
                        $(el).trigger('include');
                    }
                };
                xhttp.open('GET', url, true);
                xhttp.send();
            });
        },
        header: function(){
            core.observer.on('SCROLL_UP SCROLL_DOWN', function(obj){
                if(obj.data){
                    if(obj.type == 'SCROLL_UP'){
                        core.$html.addClass('scroll-up')
                        .removeClass('scroll-down');
                    }else{
                        core.$html.addClass('scroll-down')
                        .removeClass('scroll-up');
                    }
                }
            })

            core.$body.on('mouseenter focusin', 'header .nav-standard', function(){
                $('header').addClass('hover')
                .find('.nav-item').removeClass('active');

                $(this).parent().addClass('active')
                .find('.nav-sub >ul').slideDown(300);
            })

            core.$body.on('mouseleave', 'header nav', function(){
                $('header').removeClass('hover')
                .find('.nav-item').removeClass('active')
                .find('.nav-sub >ul').hide();
            });
        },
        scrollBar: function(){
            core.observer.on('LOAD', function(){
                $('.scrollbar').each(function(){
                    $(this).mCustomScrollbar({
                        theme: "normal"
                    });
                })
                
            })
        },
        rangePriceSlider: function($el){
            $el.find('.display-range').on('range', function(evt, values){
                var $items = $(this).children(),
                    $rangeItem = $items.slice(values[0], values[1]+1);

                $items.removeClass('active')
                $rangeItem.addClass('active');
            })
            $el.find('.slider-range').each(function(){
                $(this).slider({
                    range: true,
                    min: 0,
                    max: 4,
                    values: $(this).data('range'),
                    create: function(evt, ui){
                        $(this).find('.display-range').trigger('range', [$(this).slider('option', 'values')]);
                    },
                    slide: function(evt, ui) {
                        if(ui.values[0] >= ui.values[1]) return false;
                        $(this).find('.display-range').trigger('range', [ui.values]);
                    }
                });
            })
        },
        checkboxAll: function(){
            core.$body.on('change.checkbox', 'input[type="checkbox"][name]', function(e){
                var $checks = $('input[type="checkbox"][name='+ this.name +']'),
                    $checkAll = $checks.filter('.check-all'),
                    $check = $checks.not($checkAll),
                    isChecked = this.checked,
                    hasAll = $(this).hasClass('check-all');

                if(hasAll){
                    if(isChecked) $check.prop('checked', true);
                    else $check.prop('checked', false);
                }else{
                    var isAll = $check.length == $check.filter(":checked").length;
                    if(isAll) $checkAll.prop('checked', true);
                    else $checkAll.prop('checked', false);
                }

                return false;
            });
        },
        aside: function(){
            core.$body.on('click.scrollTop', '.btn-top', function(){
                core.scroll.to(0);
            })
            core.observer.on('LOAD', function(){
                $('footer').addClass('active');
                core.observer.on('SCROLL', function(){
                    if(core.screen.scrollTop > 0){
                        core.$html.removeClass('scroll-first');
                    }else{
                        core.$html.addClass('scroll-first');
                    }
                })
            })
        },
        selectClass: function(){
            core.$body.on('change', '[data-select]', function(){
                var opts = this.options,
                    idx = opts.selectedIndex;

                $(this.options).filter('[data-selected]').each(function(){
                    var obj = $(this).data('selected').split(','),
                        $target = $(obj[0]),
                        className = obj[1];

                    if(idx == this.index){
                        $target.removeClass(className);
                    }else{
                        $target.addClass(className);
                    }
                })
            })
        },
        calendar: function(){
            var defaults = {
                dateFormat: 'yy.mm.dd',
                prevText: '이전 달',
                nextText: '다음 달',
                closeText: '닫기',
                currentText: '오늘',
                monthNames: ['01', '02', '03', '04', '05', '06', '07', '8월', '9월', '10월', '11월', '12월'],
                monthNamesShort: ['1월', '2월', '03', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],	//한글 캘린더 중 월 표시를 위한 부분
                dayNames: ['일', '월', '화', '수', '목', '금', '토'],	//한글 캘린더 요일 표시 부분
                dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],	//한글 요일 표시 부분
                dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],	// 한글 요일 표시 부분
                showMonthAfterYear: true,	// true : 년 월  false : 월 년 순으로 보여줌
                yearSuffix: '.',	//
                minDate: 0,
                showButtonPanel: true,	// 오늘로 가는 버튼과 달력 닫기 버튼 보기 옵션
                beforeShow: function(input, inst){
                    inst.dpDiv.css({
                        marginLeft: input.offsetWidth - 307+ 'px'
                    });
                }
            }
            $(".form-calendar .datepicker").each(function(){
                $(this).datepicker(defaults);
            })
        },
        checkedClass: function(){
            core.$body.on('change.checked-class', '[data-checked-class]', function(){
                var input = this,
                    data = $(this).data('checked-class').split(' ').join('').split(','),
                    name = this.name,
                    $el = $(data[0]),
                    className = data[1];

                if(input.checked) $el.addClass(className);
                else $el.removeClass(className);

                if(input.type == 'radio'){
                    $('input[name='+name+']').not(input).off('change.checked-class').on('change.checked-class', function(){
                        $(input).trigger('change.checked-class');
                    })
                }
            })
        },
        pageProduct: {
            init: function(){
                var $el = $('.page-product');
                ui.COMMON.rangePriceSlider($el);
                this.fixProductBreadcrumb($el);
                this.searchProduct($el);
                this.detailProduct($el);
            },
            fixProductBreadcrumb: function($el){
                var $breadcrumb = $el.find('.breadcrumb.fn-fix');
                if($breadcrumb.length < 1) return;

                var $pageTop = $el.find('#container').children('.top');

                core.observer.on('SCROLL', function(){
                    var topHide = $pageTop.get(0).getBoundingClientRect().bottom < 1;

                    $breadcrumb.css({
                        transform: 'translateX('+ -core.screen.scrollLeft +'px)'
                    })

                    if(topHide){
                        $breadcrumb.addClass('fixed-product');
                    }else{
                        $breadcrumb.removeClass('fixed-product');
                    }
                });
            },
            searchProduct: function($el){
                var $scope = $el.find('.search-product');
                new Swiper($scope.find('.search-hash .swiper-container'), {
                    slidesPerView: 'auto',
                    spaceBetween: 24,
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'progressbar',
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    on: {
                        init: function(){
                            this.$el.find('.swiper-page-area .total').text(this.snapGrid.length);
                        },
                        snapIndexChange: function(){
                            this.$el.find('.swiper-page-area .current').text(this.snapIndex+1);
                        },
                    }
                });

                //filter
                new Swiper($el.find('.filter-select .swiper-container'), {
                    slidesPerView: 'auto',
                    resistance : true,
                    resistanceRatio : 0,
                    on: {
                        snapIndexChange: function(){
                            if(!this.initialized) return;

                            $(this.$el).find('.tooltip input').prop('checked', false);

                            if(this.isEnd){
                                this.$el.addClass('end');
                            }else{
                                this.$el.removeClass('end');
                            }
                        }
                    }
                })


                $el.find('.filter-select .swiper-container').on('change', '.tooltip input', function(){
                    var swiper = $(this).closest('.swiper-container')[0].swiper;
                    if(this.checked){
                        var $tooltip = $(this).closest('.tooltip'),
                            clickIndex = $(this).closest('.swiper-slide').index(),
                            viewIndex = clickIndex - swiper.snapIndex;

                        if(viewIndex >= 6){
                            $tooltip.addClass('reverse');
                        }else{
                            $tooltip.removeClass('reverse');
                        }
                    }
                })

                $scope.find('.fn-prd >input').on('change', function(){
                    var value = $(this).siblings('span').text(),
                        $filter = $(this).closest('.filter-area'),
                        $appendList = $filter.find('.filter-selected .list');

                    if(this.checked){
                        var appendItem = '<span>'+ value +'<button type="button" class="fn-remove" name='+ this.name +'>항목삭제</button></span>';
                        $appendList.append(appendItem);
                    }else{
                        $appendList.find('button').filter('[name='+ this.name +']')
                        .parent().remove();
                    }
                })

                $scope.find('.filter-selected').on('click', '.fn-remove', function(){
                    $(this).closest('.filter-area').find('.filter-select .fn-prd input')
                    .filter('[name='+ this.name +']').prop('checked', false)
                    .trigger('change');
                })

                $scope.find('.filter-selected .fn-deselect, .filter-selected .fn-removeAll').on('click', function(){
                    $(this).closest('.filter-selected').find('.fn-remove').trigger('click');
                })
            },
            detailProduct: function($el){
                var $scope = $el.find('.detail-product');
                if($scope.length > 0){
                    var bigSwiper = new Swiper('.swiper-container.big', {
                        effect: 'fade',
                        fadeEffect: {
                            crossFade: true
                        },
                        on: {
                            slideChange: function(){
                                thumbSwiper.slideTo(this.realIndex);
                                $(thumbSwiper.slides).removeClass('swiper-thumb-enable')
                                .eq(this.realIndex).addClass('swiper-thumb-enable')
                            }
                        }
                    });

                    var thumbSwiper = new Swiper('.swiper-container.thumb', {
                        direction: 'vertical',
                        slidesPerView: 'auto',
                        spaceBetween: 8,
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        watchSlidesVisibility: true,
                        on: {
                            init: function(){
                                var swiper = this;
                                $(swiper.slides).on('click', function(){
                                    var idx = $(this).index();
                                    swiper.slideTo(idx);
                                    bigSwiper.slideTo(idx);

                                    $(swiper.slides).removeClass('swiper-thumb-enable')
                                    .eq(idx).addClass('swiper-thumb-enable')
                                });

                                if($(swiper.slides).length > 5){
                                    $scope.find('.thumb-area .swiper-button')
                                    .removeClass('hidden');
                                }
                            }
                        }
                    });
                }
            }
        },
        pageSearch: {
            init: function(){
                var $el = $('.page-search');
                this.swiperBest($el);
                ui.COMMON.rangePriceSlider($el);
            },
            swiperBest: function($el){
                new Swiper('.page-search .product-list .swiper-container', {
                    slidesPerView: 'auto',
                    //spaceBetween: 40,
                    slidesPerGroup: 4,
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'progressbar',
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    on: {
                        init: function(){
                            this.$el.find('.swiper-page-area .total').text(this.snapGrid.length);
                        },
                        snapIndexChange: function(){
                            this.$el.find('.swiper-page-area .current').text(this.snapIndex+1);
                        }
                    }
                });
            }
        },
        pageCheckout: {
            init: function(){
                var $el = $('.page-payment');
                this.rightFix($el);
            },
            rightFix: function($el){
				core.observer.on('LOAD', function(){
				    if( $('.basket-list .left-cont').height() < $('.ui-sticky-wrapper').height() ){
				        $('.ui-sticky-wrapper').addClass('disabled'); 
				    }
				    if( $('.right-cont .scroll').length != 0 && $('.basket-list').hasClass('payment')){
				        var scroll_height = $('.right-cont .scroll').height()+1;
				        $('.right-cont .scroll').css('height',scroll_height);
				    }
				
				    $('.ui-sticky-wrapper').on('sticty-out', function(){
				        $('.mCustomScrollBox').css('maxHeight','none');
				    });
				    
				    $('.agree-wrap .ui-tree').on('open-start', function(){
				        $(this).parents('.scroll').css('height','auto');
				    });
				    $('.agree-wrap .ui-tree').on('close-end', function(){
				        var scroll_height = $(this).parents('.scroll').height()+1;
				        $(this).parents('.scroll').css('height',scroll_height);
				    });
				});
            }
        },
        pageNovita: {
            init: function(){
                var $el = $('.page-novita');
                this.advertising($el);
                this.brandStory($el);
            },
            advertising: function($el){
                core.$body.on('click.ad-list', '.ad-list .board .list li a', function(){
                    core.scroll.toElem($('.video-wrap'));
                    $(this).closest('.board').find('.img-area').removeClass('active');
                    $(this).find('.img-area').addClass('active');
                })
            },
            brandStory: function($el){
                //core.observer.on('LOAD', function(){
                    if($el.find('.brand-wrap').length > 0 ) {
                        var offset;
                        $(window).on('scroll', function () {
            
                            $el.find('.ani-el').each(function(i, a){
                                var aniTarget = $(a)[0].getBoundingClientRect();
                                var offsetVal = $(a).attr('data-offset');
                                
                                if(offsetVal) {
                                    if(offsetVal == 0.3) {
                                        offset = innerHeight / 3 * 2;
                                    } else if (offsetVal == 0.5) {
                                        offset = innerHeight / 2;
                                    }
                                } else {
                                    offset = innerHeight / 2;
                                }
                                
                                if(aniTarget.top < offset && aniTarget.bottom > 0) {
                                    $(a).addClass('action');
                                }
            
                            })
                            
                        });
                    }
                    
                    if($el.find('.brand-slider').length > 0) {
                        var brandSwiper = new Swiper($el.find('.brand-slider'), {
                            slidesPerView: 'auto',
                            spaceBetween: 8,
                            speed: 700,
                            simulateTouch: false,
                            // mousewheel: {
                            //     invert: false,
                            //     releaseOnEdges: true,
                            // },
                            slidesOffsetBefore: 648,
                            navigation: {
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            },
                            on: {
                                init: function(){
                                    var swiper = this;
                                    swiper.isWheel = false;

                                    $el.on('wheel', '.brand-slider.action', function(e){
                                        if(swiper.isWheel) return false;

                                        var isDown = e.originalEvent.deltaY > 0 ? true : false,
                                            isEnd = swiper.isEnd && isDown,
                                            isFirst = swiper.realIndex == 0 && !isDown,
                                            isEdge = isEnd || isFirst;
                                        
                                        if(!isEdge){
                                            swiper.isWheel = true;
                                            if(isDown){
                                                swiper.slideNext();
                                            }else{
                                                swiper.slidePrev();
                                            }
                                            setTimeout(function(){
                                                swiper.emit('resetWheelVars');
                                            }, 700)
                                            return false;
                                        }
                                    })
                                },
                                resetWheelVars: function(){
                                    this.isWheel = false;
                                },
                            }
                        });
                    }
                //})

            }
        },
        pageMain: {
            init: function(){
                var _ = this;
                var $el = $('.page-main');
                core.observer.on('LOAD', function(){
                    _.visual($el);
                });
                this.findNovita($el);
                this.bestSeller($el);
                this.productMonth($el);
                this.eventNews($el);
            },
            visual: function($el){
                var $swiper = $el.find('.main-visual .swiper-container'),
                    $progressFill = $swiper.find('.swiper-autoplay-progressbar-fill');

                new Swiper($swiper, {
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'fraction',
                    },
                    speed: 1000,
                    loop: true,
                    simulateTouch: false,
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true
                    },
                    on: {
                        setNextMedia: function(){
                            var swiper = this,
                                $activeSlide = $(swiper.slides).eq(swiper.activeIndex);

                            swiper.$video = $activeSlide.find('video');
                            swiper.isVideo = swiper.$video.length > 0;
                            //swiper.playDuration = swiper.isVideo ? (swiper.$video.get(0).duration -1) * 1000 : 5000;
                            swiper.playDuration = 5000;
                            
                            if(swiper.isVideo){
                                var vid = swiper.$video.get(0);

                                swiper.$video.one('canplay', function(){
                                    this.play();
                                    swiper.emit('playNextSlide');
                                });
                                vid.pause();
                                vid.currentTime = 0;
                            }
                        },
                        slideChangeTransitionStart: function(){
                            $progressFill.removeClass('is-play')
                            .css('transition-duration', this.params.speed+'ms');

                            this.emit('setNextMedia');
                        },
                        slideChangeTransitionEnd: function(){
                            var swiper = this;

                            $(swiper.slides).removeClass('enable-animate')
                            .eq(swiper.activeIndex).addClass('enable-animate');

                            $progressFill.addClass('is-play')
                            .css('transition-duration', '5000ms');

                            clearTimeout(swiper.playTimeout);
                            swiper.playTimeout = setTimeout(function(){
                                swiper.slideNext();
                            }, 5000);
                        },
                    }
                })
            },
            findNovita: function($el){
                var $swiper = $el.find('.main-find-novita .swiper-container'),
                    swiper = new Swiper($el.find('.main-find-novita .swiper-container'), {
                    slidesPerView: 'auto',
                    spaceBetween: 16,
                    //centeredSlides: true,
                    loop: true,
                    loopAdditionalSlides: 1,
                    speed: 5000,
                    freeMode: true,
                    simulateTouch: false,
                })

                $swiper.on('complete', function(){
                    swiper.params.autoplay.delay = 0;
                    swiper.params.autoplay.disableOnInteraction = false;
                    swiper.autoplay.start();
                })
            },
            bestSeller: function($el){
                var $swiper = $el.find('.main-best-seller .swiper-container'),
                    isSwiper = $swiper.find('.swiper-slide').length > 1,
                    $progressFill = $swiper.find('.swiper-autoplay-progressbar-fill');

                var swiper = new Swiper($swiper, {
                    speed: 1000,
                    loop: true,
                    simulateTouch: false,
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'fraction',
                    },
                    navigation: {
                        nextEl: '.main-best-seller .swiper-button-next',
                        prevEl: '.main-best-seller .swiper-button-prev',
                    },
                })

                $swiper.on('complete', function(){
                    swiper.on('slideChangeTransitionStart', function(){
                        $progressFill.removeClass('is-play');
                    });
                    swiper.on('slideChangeTransitionEnd', function(){
                        var swiper = this,
                            $slides = $(this.slides),
                            $activeSlide = $slides.filter('.swiper-slide-active');

                        $slides.removeClass('enable-animate');
                        $activeSlide.addClass('enable-animate');

                        clearTimeout(swiper.timeout);
                        $progressFill.addClass('is-play');
                        swiper.timeout = setTimeout(function(){
                            swiper.slideNext();
                        }, 5000);

                    }).emit('slideChangeTransitionEnd');
                })
            },
            productMonth: function($el){
                var $swiper = $el.find('.main-product-month .swiper-container'),
                    isSwiper = $swiper.find('.swiper-slide').length > 2;

                var swiper = new Swiper($swiper, {
                    speed: 700,
                    slidesPerView: 'auto',
                    spaceBetween: 40,
                    simulateTouch: isSwiper ? true : false,
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'progressbar',
                    },
                    navigation: {
                        nextEl: '.main-product-month .swiper-button-next',
                        prevEl: '.main-product-month .swiper-button-prev',
                    },
                    on: {
                        init: function(){
                            $swiper.find('.swiper-pagination-current').text(this.snapIndex + 1);
                            $swiper.find('.swiper-pagination-total').text(this.snapGrid.length);
                        },
                        slideChange: function(){
                            $swiper.find('.swiper-pagination-current').text(this.snapIndex + 1);
                        },
                    }
                })

                if(!isSwiper){
                    $swiper.removeClass('swiper-container-initialized');
                }
            },
            eventNews: function($el){
                var $swiper = $el.find('.event-swiper .swiper-container');
                if($swiper.find('.swiper-slide').length < 2) return;

                new Swiper($el.find('.event-swiper .swiper-container'), {
                    speed: 700,
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'progressbar',
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    parallax: true,
                    on: {
                        init: function(){
                            $swiper.find('.swiper-pagination-current').text(this.activeIndex + 1);
                            $swiper.find('.swiper-pagination-total').text(this.slides.length);
                        },
                        slideChange: function(){
                            $swiper.find('.swiper-pagination-current').text(this.activeIndex + 1);
                        },
                    }
                })
            }
        }
    }
})(jQuery, window[APP_NAME], window[APP_NAME].ui);
