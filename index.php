<!DOCTYPE html>
<html>

<head>
    <title>노비타(NOVITA)</title>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
    <meta name="robots" content="index,follow" />
    <meta name="keywords" content="Think Better, 비데, 살균비데, 자동살균, 행사제품, 클린비데, 노비타LIVE," />
    <meta name="description" content="노비타 공식 홈페이지입니다. " />
    <meta property="og:type" content="website">
    <meta property="og:title" content="노비타(NOVITA)" />
    <meta property="og:description" content="노비타 공식 홈페이지입니다. ">
    <meta property="og:url" content="main.html">
    <link rel="stylesheet" href="assets/css/default.css">
    <script type="text/javascript" src="assets/js/jquery-1.12.4.min.js"></script>
    <script type="text/javascript" src="assets/js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="assets/js/common_front.js"></script>
    <script type="text/javascript" src="assets/js/ui.js"></script>

    <style>
        [v-cloak] {
            display: none !important
        }

        .document-dimed,
        .loading-dimed {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 999;
            background: #aaa;
            opacity: 0.7;
        }

        .loading-dimed.visual {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        .loading-dimed {
            z-index: 2000;
        }

        .loading-dimed:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 1;
            width: 40px;
            height: 40px;
            margin: -20px 0 0 -20px;
            background: url('images/loading.svg') no-repeat 0 0;
        }

        .loading-dimed:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            background: #000;
        }

        .document-dimed:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.8;
            background: #000;
        }
    </style>
    <style>
        .lbMaxlenPrnt {
            position: relative;
        }

        .lbMaxlen {
            position: absolute;
            top: 5px;
            right: 5px;
            color: #aaa;
        }

        .lbMaxlen_textarea {
            position: absolute;
            top: 5px;
            right: 25px;
            color: #aaa;
        }
    </style>
    <script src="common/js/jquery.form.min.js"></script>
    <script src="common/js/jquery.validate.min.js"></script>
    <script src="common/js/vue.js"></script>
    <script src="common/js/jquery.cookie.js"></script>
    <script src="common/js/jstree.js"></script>
    <script src="common/js/moment.min.js"></script>
    <script src="common/js/moment-timezone-with-data.min.js"></script>
    <script src="js/vueComponent/vue-filter.js"></script>
    <script src="js/vueComponent/vue-datepicker.js"></script>
    <script src="js/vueComponent/vue-telno.js"></script>
    <script src="js/app/App.js"></script>
    <script src="js/app/Authencation.js"></script>
    <script>
        $(function() {
            var option = {};
            option.locale = 'en';
            App.init(option);
        });
    </script>
    <script type="text/javascript" src="assets/js/TweenMax.min.js"></script>
    <script type="text/javascript" src="assets/js/swiper.min.js"></script>
    <script type="text/javascript" src="assets/js/jquery.mCustomScrollbar.js"></script>
</head>

<body class="" data-device-type="pc" data-language="en" data-layout="empty-pc">

    <div id="wrap" class="page-main ">
        <header class="theme-white">
            <?php include "_inc/nav.php"; ?>
        </header>

        <form name="listForm" id="listForm">
            <div id="container" class="frame-main vuelayer">
                <div class="main-visual">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">

                            <div class="swiper-slide">
                                <div class="visual-area">



                                    <video src="https://cdn-www.novita.co.kr/main/nozzle2_PC.mp4" class="visual-content" muted></video>


                                </div>
                                <div class="txt-area">
                                    <p class="txt">
                                        <strong data-animate="fade-up"></strong>
                                        <span data-animate="fade-up" data-animate-delay="0.1"></span>
                                    </p>

                                </div>
                            </div>

                            <div class="swiper-slide">
                                <div class="visual-area">



                                    <video src="https://cdn-www.novita.co.kr/main/Novita_clip_1.mp4" class="visual-content" muted></video>


                                </div>
                                <div class="txt-area">
                                    <p class="txt">
                                        <strong data-animate="fade-up">Think Better!</strong>
                                        <span data-animate="fade-up" data-animate-delay="0.1">New 노비타 노즐교체 비데<br> 자동 알림과 손쉬운 교체로 노즐 전체를 바꿔 비데 걱정 끝!</span>
                                    </p>

                                </div>
                            </div>

                            <div class="swiper-slide">
                                <div class="visual-area">



                                    <video src="https://cdn-www.novita.co.kr/main/main_key1.mp4" class="visual-content" muted></video>


                                </div>
                                <div class="txt-area">
                                    <p class="txt">
                                        <strong data-animate="fade-up">Think Better!</strong>
                                        <span data-animate="fade-up" data-animate-delay="0.1">노비타 비데는 방수가 기본!<br>습한 욕실에서도 고장 걱정없이, 안전하게!</span>
                                    </p>

                                </div>
                            </div>

                            <div class="swiper-slide">
                                <div class="visual-area">



                                    <video src="https://cdn-www.novita.co.kr/main/main_key3.mp4" class="visual-content" muted></video>


                                </div>
                                <div class="txt-area">
                                    <p class="txt">
                                        <strong data-animate="fade-up">Think Better!</strong>
                                        <span data-animate="fade-up" data-animate-delay="0.1">전해수로 99% 깨끗하게<br>유로부터 노즐, 도기까지 3단계로 하루 한 번 자동살균!</span>
                                    </p>

                                </div>
                            </div>


                        </div>
                        <div class="swiper-control">
                            <div class="swiper-autoplay-pagination">
                                <div class="swiper-pagination"></div>
                                <div class="swiper-autoplay-progressbar">
                                    <span class="swiper-autoplay-progressbar-fill"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <i class="ico-scroll"></i>
                </div>
                <div class="main-find-novita">
                    <div class="txt-area">
                        <strong data-animation='{
							"anchor": ".main-find-novita",
							"from": {"y": 50, "opacity": 0},
							"to": {"y": 0, "opacity": 1}
						}'>어떤 비데를 사야할지 고민 된다면?</strong>
                        <a href="product-filter.html" class="btn-find-novita" data-animation='{
							"anchor": ".main-find-novita",
							"from": {"y": 50, "opacity": 0},
							"to": {"y": 0, "opacity": 1, "delay": 0.2}
						}'>내게 맞는 노비타 찾기</a>
                    </div>
                    <div class="swiper-container" data-animation='{
						"duration": 1.5,
						"from": {"x": 300, "opacity": 0},
						"to": {"x": 0, "opacity": 1}
					}'>
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <img src="assets/images/main/find-novita-01.png" alt="">
                            </div>
                            <div class="swiper-slide">
                                <img src="assets/images/main/find-novita-02.png" alt="">
                            </div>
                            <div class="swiper-slide">
                                <img src="assets/images/main/find-novita-03.png" alt="">
                            </div>
                            <div class="swiper-slide">
                                <img src="assets/images/main/find-novita-04.png" alt="">
                            </div>
                            <div class="swiper-slide">
                                <img src="assets/images/main/find-novita-05.png" alt="">
                            </div>
                            <div class="swiper-slide">
                                <img src="assets/images/main/find-novita-06.png" alt="">
                            </div>
                            <div class="swiper-slide">
                                <img src="assets/images/main/find-novita-07.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-best-seller">
                    <div class="tit-area">
                        <strong class="tit" data-animation='{
						"from": {"y": 50, "opacity": 0},
						"to": {"y": 0, "opacity": 1}
					}'>베스트 셀러</strong>
                    </div>
                    <div class="swiper-container" data-animation='{
					"from": {"y": 50, "opacity": 0},
					"to": {"y": 0, "opacity": 1, "delay": 0.3}
				}'>
                        <div class="swiper-wrapper">


                            <div class="swiper-slide" style="background-image: url(public/2022/08/4/13/44/4/10082fac-5afb-41a8-aae6-baffee94d7ea.png)">
                                <div class="inner visible">
                                    <div class="prd-info" data-animate="fade-up" data-animate-delay="0.2">
                                        <em class="prd-info-code">BD-C510E0</em>
                                        <strong class="prd-info-name">노즐교체비데</strong>
                                        <span class="prd-info-desc">★쿠폰 다운로드 필수★자동 알림과 손쉬운 교체로 노즐 전체를 바꿔 비데 위생 걱정 끝!</span>
                                    </div>
                                    <div class="prd-etc" data-animate="fade-up" data-animate-delay="0.4">
                                        <div class="prd-review">
                                            <div class="prd-review-txt">새 노즐로 새 비데처럼, 노비타 노즐교체비데</div>
                                            <div class="prd-review-id">새로운 비데 생활의 시작!</div>
                                        </div>
                                        <div class="prd-price">
                                            <strong>279,000</strong>원
                                        </div>
                                        <div class="prd-util">
                                            <div class="prd-util-link">
                                                <a href="#none" onclick="onViewPrduct('20000000061' , 'best');">자세히보기</a>
                                            </div>
                                            <div class="prd-util-fn">
                                                <label class="fn-zzim-toggle size-24">
                                                    <input type="checkbox" onclick="onchangeIntrstYn('20000000061' , 'best')" name="intrstYn_20000000061" id="IntrstYn_20000000061" value="Y">
                                                    <!-- 찜하기버튼 활성화시 checked 속성추가-->
                                                    <span>찜하기</span>
                                                </label>
                                                <label class="fn-cart size-24">
                                                    <input type="checkbox" onclick="onClickCart('20000000061' , 'best')">
                                                    <span>장바구니</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="swiper-slide" style="background-image: url(public/2022/08/4/13/45/6/6a761f14-87c0-4fbe-a450-8d34c33850ef.jpg)">
                                <div class="inner visible">
                                    <div class="prd-info" data-animate="fade-up" data-animate-delay="0.2">
                                        <em class="prd-info-code">BD-C310A0</em>
                                        <strong class="prd-info-name">클린비데</strong>
                                        <span class="prd-info-desc">두 가지 타입의 프리미엄 물살에 IPX5 방수 등급 인증으로 청소 걱정까지 덜었다</span>
                                    </div>
                                    <div class="prd-etc" data-animate="fade-up" data-animate-delay="0.4">
                                        <div class="prd-review">
                                            <div class="prd-review-txt">두 가지 타입의 프리미엄 물살에 청소 걱정까지 덜었다</div>
                                            <div class="prd-review-id">방수니까 구석구석 깨끗하게</div>
                                        </div>
                                        <div class="prd-price">
                                            <strong>225,000</strong>원
                                        </div>
                                        <div class="prd-util">
                                            <div class="prd-util-link">
                                                <a href="#none" onclick="onViewPrduct('20000000028' , 'best');">자세히보기</a>
                                            </div>
                                            <div class="prd-util-fn">
                                                <label class="fn-zzim-toggle size-24">
                                                    <input type="checkbox" onclick="onchangeIntrstYn('20000000028' , 'best')" name="intrstYn_20000000028" id="IntrstYn_20000000028" value="Y">
                                                    <!-- 찜하기버튼 활성화시 checked 속성추가-->
                                                    <span>찜하기</span>
                                                </label>
                                                <label class="fn-cart size-24">
                                                    <input type="checkbox" onclick="onClickCart('20000000028' , 'best')">
                                                    <span>장바구니</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="swiper-slide" style="background-image: url(public/2022/08/4/13/45/18/fd35f374-ec34-41b4-abde-52145a7ec4d1.jpg)">
                                <div class="inner visible">
                                    <div class="prd-info" data-animate="fade-up" data-animate-delay="0.2">
                                        <em class="prd-info-code">BD-H710H0</em>
                                        <strong class="prd-info-name">살균비데 리모컨형</strong>
                                        <span class="prd-info-desc">노즐 내부, 외부부터 도기까지 따로 신경쓰지 않아도 하루 한 번 자동으로 살균!</span>
                                    </div>
                                    <div class="prd-etc" data-animate="fade-up" data-animate-delay="0.4">
                                        <div class="prd-review">
                                            <div class="prd-review-txt">배송도 너무 빠르고 CS도 정말 친절하세요 ^^</div>
                                            <div class="prd-review-id">@gdsf1***</div>
                                        </div>
                                        <div class="prd-price">
                                            <strong>399,000</strong>원
                                        </div>
                                        <div class="prd-util">
                                            <div class="prd-util-link">
                                                <a href="#none" onclick="onViewPrduct('20000000011' , 'best');">자세히보기</a>
                                            </div>
                                            <div class="prd-util-fn">
                                                <label class="fn-zzim-toggle size-24">
                                                    <input type="checkbox" onclick="onchangeIntrstYn('20000000011' , 'best')" name="intrstYn_20000000011" id="IntrstYn_20000000011" value="Y">
                                                    <!-- 찜하기버튼 활성화시 checked 속성추가-->
                                                    <span>찜하기</span>
                                                </label>
                                                <label class="fn-cart size-24">
                                                    <input type="checkbox" onclick="onClickCart('20000000011' , 'best')">
                                                    <span>장바구니</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="swiper-control">
                            <div class="swiper-autoplay-pagination">
                                <div class="swiper-pagination"></div>
                                <div class="swiper-autoplay-progressbar">
                                    <span class="swiper-autoplay-progressbar-fill"></span>
                                </div>
                            </div>
                            <div class="swiper-control-direction">
                                <div class="swiper-button-prev"></div>
                                <div class="swiper-button-next"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-product-month">
                    <div class="tit-area">
                        <strong class="tit" data-animation='{
					"from": {"y": 50, "opacity": 0},
					"to": {"y": 0, "opacity": 1}
				}'>이달의 행사 제품</strong>
                    </div>
                    <div class="product-month-list inner visible">
                        <div class="swiper-container" data-animation='{
					"from": {"x": 300, "opacity": 0},
					"to": {"x": 0, "opacity": 1, "delay": 0.3}
				}'>
                            <ul class="swiper-wrapper">


                                <li class="swiper-slide">
                                    <div class="prd-img">
                                        <img src="public/2022/08/4/13/50/31/ba2b483e-9045-4213-b481-a1e9079d49f5.jpg" alt="제품 이미지">

                                        <div class="prd-txt">
                                            <div class="prd-info">
                                                <strong class="prd-name">노즐교체비데</strong>
                                                <span class="prd-code">BD-C510E0</span>
                                            </div>
                                            <div class="prd-desc">★쿠폰 다운로드 필수★자동 알림과 손쉬운 교체로 노즐 전체를 바꿔 비데 위생 걱정 끝!</div>
                                            <div class="prd-price">
                                                <span class="price-txt">할인혜택가</span>
                                                <span class="price-sel"><strong>279,000</strong>원</span>

                                            </div>
                                            <div class="prd-link">
                                                <a href="#none;" onclick="onViewPrduct('20000000061' , 'promotion');">행사제품 보러가기</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="prd-util-fn">
                                        <label class="fn-zzim-toggle size-24">
                                            <input type="checkbox" onclick="onchangeIntrstYn('20000000061', 'promotion')" name="intrstYn_20000000061" id="IntrstYn_20000000061" value="Y">
                                            <!-- 찜하기버튼 활성화시 checked 속성추가-->
                                            <span>찜하기</span>
                                        </label>
                                        <label class="fn-cart size-24">
                                            <input type="checkbox" onclick="onClickCart('20000000061', 'promotion')">
                                            <span>장바구니</span>
                                        </label>
                                    </div>
                                </li>

                                <li class="swiper-slide">
                                    <div class="prd-img">
                                        <img src="public/2022/08/5/13/46/36/f5ed4a24-b730-4a05-892d-3c7d9daa39c6.jpg" alt="제품 이미지">

                                        <div class="prd-txt">
                                            <div class="prd-info">
                                                <strong class="prd-name">클린비데</strong>
                                                <span class="prd-code">BD-C310A0</span>
                                            </div>
                                            <div class="prd-desc">두 가지 타입의 프리미엄 물살에 IPX5 방수 등급 인증으로 청소 걱정까지 덜었다</div>
                                            <div class="prd-price">
                                                <span class="price-txt">할인혜택가</span>
                                                <span class="price-sel"><strong>225,000</strong>원</span>

                                            </div>
                                            <div class="prd-link">
                                                <a href="#none;" onclick="onViewPrduct('20000000028' , 'promotion');">행사제품 보러가기</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="prd-util-fn">
                                        <label class="fn-zzim-toggle size-24">
                                            <input type="checkbox" onclick="onchangeIntrstYn('20000000028', 'promotion')" name="intrstYn_20000000028" id="IntrstYn_20000000028" value="Y">
                                            <!-- 찜하기버튼 활성화시 checked 속성추가-->
                                            <span>찜하기</span>
                                        </label>
                                        <label class="fn-cart size-24">
                                            <input type="checkbox" onclick="onClickCart('20000000028', 'promotion')">
                                            <span>장바구니</span>
                                        </label>
                                    </div>
                                </li>


                            </ul>
                            <div class="swiper-control">
                                <div class="swiper-progress-pagination">
                                    <span class="swiper-pagination-current"></span>
                                    <div class="swiper-pagination"></div>
                                    <span class="swiper-pagination-total"></span>
                                </div>
                                <div class="swiper-control-direction">
                                    <div class="swiper-button-prev"></div>
                                    <div class="swiper-button-next"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-event-news">
                    <div class="tit-area">
                        <strong class="tit" data-animation='{
				"from": {"y": 50, "opacity": 0},
				"to": {"y": 0, "opacity": 1}
			}'>노비타 이벤트 소식</strong>
                        <span class="desc" data-animation='{
				"from": {"y": 50, "opacity": 0},
				"to": {"y": 0, "opacity": 1, "delay": 0.2}
			}'>오직 노비타 공식 홈페이지에만 있는 다양한 이벤트를 만나 보세요.</span>
                    </div>
                    <div class="news-list" data-animation='{
			"offset": 600, "duration": 0, "to": {}
		}'>
                        <div class="inner">
                            <ul>
                                <li class="event-swiper" data-animation='{
					"anchor": ".main-event-news .news-list",
					"offset": 600,
					"from": {"y": 50, "opacity": 0},
					"to": {"y": 0, "opacity": 1, "delay": 0.8}
				}'>
                                    <span class="news-cate">노비타 이벤트</span>
                                    <div class="swiper-container">
                                        <div class="swiper-wrapper">

                                            <div class="swiper-slide">
                                                <a href="event/view/20000000252.html" onclick="setEventPixel();">
                                                    <div class="news-img">
                                                        <img src="public/2022/09/19/12/29/7/0352dba8-c7bf-4761-b565-78afa7522629.jpg" alt="">
                                                    </div>
                                                    <div class="news-txt" data-swiper-parallax-duration="700" data-swiper-parallax-x="-300" data-swiper-parallax-opacity="0">
                                                        <em>노비타 노즐교체비데 출시기념 이벤트</em>
                                                        <span>신제품 출시기념으로 준비한 노즐교체비데 할인쿠폰!</span>
                                                    </div>
                                                </a>
                                            </div>

                                            <div class="swiper-slide">
                                                <a href="event/view/20000000251.html" onclick="setEventPixel();">
                                                    <div class="news-img">
                                                        <img src="public/2022/09/22/9/20/6/6b5cb7ab-80b4-43d9-84da-5cd8077c2cfb.png" alt="">
                                                    </div>
                                                    <div class="news-txt" data-swiper-parallax-duration="700" data-swiper-parallax-x="-300" data-swiper-parallax-opacity="0">
                                                        <em>노비타 공식 홈페이지 단독 이벤트</em>
                                                        <span>갖고 싶었던 비데 사고 후기 남기면 네이버 페이 쿠폰 증정!</span>
                                                    </div>
                                                </a>
                                            </div>


                                        </div>
                                        <div class="swiper-control">

                                            <div class="swiper-control-direction">
                                                <div class="swiper-button-prev"></div>
                                                <div class="swiper-button-next"></div>
                                            </div>
                                            <div class="swiper-progress-pagination">
                                                <span class="swiper-pagination-current"></span>
                                                <div class="swiper-pagination"></div>
                                                <span class="swiper-pagination-total"></span>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                                <li data-animation='{
				"anchor": ".main-event-news .news-list",
				"offset": 600,
				"from": {"y": 50, "opacity": 0},
				"to": {"y": 0, "opacity": 1, "delay": 1}
			}'>
                                    <span class="news-cate">노비타 LIVE</span>
                                    <a href="event/live/list.html" onclick="setEventPixel();">
                                        <div class="news-img">
                                            <img src="public/2022/07/1/15/20/10/11baf7ee-6b25-4b31-aecf-056514fada50.jpg" alt="">
                                        </div>
                                        <div class="news-txt">
                                            <em>딱 한시간! 노비타 비데의 특별한 혜택을 만날 시간</em>
                                            <span>라이브 커머스 단독 특가 찬스!!</span>
                                        </div>
                                    </a>
                                </li>
                                <li data-animation='{
			"anchor": ".main-event-news .news-list",
			"offset": 600,
			"from": {"y": 50, "opacity": 0},
			"to": {"y": 0, "opacity": 1, "delay": 1.2}
		}'>
                                    <span class="news-cate">노비타 클럽</span>
                                    <a href="event/vip.html" onclick="setEventPixel();">
                                        <div class="news-img">
                                            <img src="public/2022/07/1/12/1/53/750b14c2-5d16-4038-b4a6-5233d5abb6df.jpg" alt="">
                                        </div>
                                        <div class="news-txt">
                                            <em>노비타 클럽 회원이 되어보세요</em>
                                            <span>특별한 혜택이 기다리고 있습니다!</span>
                                        </div>
                                    </a>
                                </li>
                                <li data-animation='{
		"anchor": ".main-event-news .news-list",
		"offset": 600,
		"from": {"y": 50, "opacity": 0},
		"to": {"y": 0, "opacity": 1, "delay": 1.4}
	}'>
                                    <span class="news-cate">노비타 제품등록</span>
                                    <a href="customer-center/productRegist-main.html" onclick="setEventPixel();">
                                        <div class="news-img">
                                            <img src="public/2022/07/1/12/1/59/acda255a-0c22-45c2-a8ac-1bb1b7d76c03.jpg" alt="">
                                        </div>
                                        <div class="news-txt">
                                            <em>제품 등록하고 다양한 혜택을 만나보세요</em>
                                            <span>닥터클린 서비스 할인 쿠폰을 드립니다!</span>
                                        </div>
                                    </a>
                                </li>
                                <li data-animation='{
	"anchor": ".main-event-news .news-list",
	"offset": 600,
	"from": {"y": 50, "opacity": 0},
	"to": {"y": 0, "opacity": 1, "delay": 1.6}
}'>
                                    <span class="news-cate">1:1문의</span>
                                    <a href="customer-center/inquiry-main.html" onclick="setEventPixel();">
                                        <div class="news-img">
                                            <img src="public/2022/07/1/12/2/5/a3b1bca6-f0c9-4fc6-a0b8-ebbfae8aceb2.jpg" alt="">
                                        </div>
                                        <div class="news-txt">
                                            <em>노비타에 관한 궁금증이 있다면 무엇이든 물어보세요</em>
                                            <span>빠르고 친절하게 답변 드리겠습니다!</span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="main-review">
                    <div class="tit-area">
                        <strong class="tit" data-animation='{
			"from": {"y": 50, "opacity": 0},
			"to": {"y": 0, "opacity": 1}
		}'>사용후기</strong>
                    </div>
                    <div class="review-list">
                        <ul>

                            <li>
                                <div class="review-img">
                                    <img src="public/2022/07/1/21/39/2/5c78d3cb-cbc5-4f4a-850f-afacec2a7bc8.png" alt="">
                                </div>
                                <div class="review-txt">
                                    <p class="review">배송빠르고 간단하게 직접 설치할 수 있었습니다. 작동도 잘되는거 확인했어요~ 방수에 살균 기능까지 있어 더 좋아요~ 믿고 쓰는 노비타 비데~~! [출처: 네이버] </p>
                                </div>
                                <div class="review-prd">
                                    <a href="product/20000000011.html" onclick="setReviewPixel();">
                                        <div class="prd-img">
                                            <img src="public/2022/08/22/17/29/48/6df3bc6a-1c22-48e6-a58d-a31a29f3e007.jpg" alt="">
                                        </div>
                                        <div class="prd-info">
                                            <strong>살균비데 리모컨형</strong>
                                            <span>BD-H710H0</span>
                                        </div>
                                        <button type="button" class="fn-detail">제품 상세보기</button>
                                    </a>
                                </div>
                            </li>

                            <li>
                                <div class="review-img">
                                    <img src="public/2022/07/1/21/39/11/0b2de5af-7ddf-4871-bf15-c98d05e7a923.png" alt="">
                                </div>
                                <div class="review-txt">
                                    <p class="review">10~20만원대 비데도 많았지만 편의성과 특히 3단으로 살균되어 언제나 새것처럼 쓸 수 있는 위생적인 기능이 가장 마음에 들었습니다. 비데는 한번 사면 관리만 잘해준다면 꽤 오래 쓸 수 있는 제품이니 약간 더 투자하는 것도 나쁘지 않은 선택이 될 듯 합니다. [출처: 인터파크] </p>
                                </div>
                                <div class="review-prd">
                                    <a href="product/20000000039.html" onclick="setReviewPixel();">
                                        <div class="prd-img">
                                            <img src="public/2022/06/30/21/10/37/2c42caac-3c24-4f3f-a870-0ed3a7bcc4f8.jpg" alt="">
                                        </div>
                                        <div class="prd-info">
                                            <strong>살균비데 일반형</strong>
                                            <span>BD-H510E0</span>
                                        </div>
                                        <button type="button" class="fn-detail">제품 상세보기</button>
                                    </a>
                                </div>
                            </li>

                            <li>
                                <div class="review-img">
                                    <img src="public/2022/07/1/21/39/20/27b26847-5f51-455b-a98e-b974ddb69032.png" alt="">
                                </div>
                                <div class="review-txt">
                                    <p class="review">렌탈만하다가 드디어 노비타를 경험하네요. 일부러 살균기능있는제품을 선택했어요. 금액대가 좀 있긴하지만 더 깔끔해지는것 같아 안심이 되네요. </p>
                                </div>
                                <div class="review-prd">
                                    <a href="product/20000000011.html" onclick="setReviewPixel();">
                                        <div class="prd-img">
                                            <img src="public/2022/08/22/17/29/48/6df3bc6a-1c22-48e6-a58d-a31a29f3e007.jpg" alt="">
                                        </div>
                                        <div class="prd-info">
                                            <strong>살균비데 리모컨형</strong>
                                            <span>BD-H710H0</span>
                                        </div>
                                        <button type="button" class="fn-detail">제품 상세보기</button>
                                    </a>
                                </div>
                            </li>


                        </ul>
                    </div>
                </div>
                <div class="main-service">
                    <div class="tit-area">
                        <strong class="tit en" data-animation='{
			"anchor": ".main-service .tit-area",
			"from": {"y": 50, "opacity": 0},
			"to": {"y": 0, "opacity": 1}
		}'>NOVITA SERVICE</strong>
                        <span class="desc" data-animation='{
			"anchor": ".main-service .tit-area",
			"from": {"y": 50, "opacity": 0},
			"to": {"y": 0, "opacity": 1, "delay": 0.2}
		}'>전문가의 관리로 더 깨끗하고 믿을 수 있도록, <br>안전하고 편리하게 이용할 수 있도록 노비타가 도와드립니다.</span>
                    </div>
                    <div class="service-list">
                        <ul>
                            <li class="list-dclean" data-animation='{
				"anchor": ".main-service .service-list",
				"from": {"y": 50, "opacity": 0},
				"to": {"y": 0, "opacity": 1}
			}'>
                                <div class="service-img">
                                    <img src="assets/images/main/service-img-dclean.png" alt="">
                                </div>
                                <div class="service-txt">
                                    <strong>비데 종합 전문 관리 서비스</strong>
                                    <span>Dr. Clean 서비스는 서비스 전문 기술자가 직접 제품을 유지보수 해주는 종합관리 서비스입니다.</span>
                                    <a href="doctorclean-service.html" onclick="setServicePixel();">Dr. Clean 서비스 바로가기</a>
                                </div>
                            </li>
                            <li class="list-install" data-animation='{
			"anchor": ".main-service .service-list",
			"from": {"y": 50, "opacity": 0},
			"to": {"y": 0, "opacity": 1, "delay": 0.3}
		}'>
                                <div class="service-img">
                                    <img src="assets/images/main/service-img-install.png" alt="">
                                </div>
                                <div class="service-txt">
                                    <strong>우리 집 문 앞까지 찾아오는 비데</strong>
                                    <span>노비타는 예약만 하시면 원하시는 날짜, 시간에 맞춰 <br>설치서비스를 받으실 수 있습니다.</span>
                                    <a href="service-install.html" onclick="setServicePixel();">설치 서비스 바로가기</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="main-brandstory">
                    <div class="brandstory-media">
                        <video loop="" muted="" autoplay="">
                            <source src="https://cdn-www.novita.co.kr/main/INNOVATION_main.mp4" type="video/mp4">
                        </video>
                    </div>
                    <div class="brandstory-txt">
                        <strong data-animation='{
				"anchor": ".main-brandstory .brandstory-txt",
				"from": {"y": 50, "opacity": 0},
				"to": {"y": 0, "opacity": 1}
			}'>THINK BETTER</strong>
                        <span data-animation='{
				"anchor": ".main-brandstory .brandstory-txt",
				"from": {"y": 50, "opacity": 0},
				"to": {"y": 0, "opacity": 1, "delay": 0.2}
			}'>노비타는 우리의 일상 곳곳에 더 나은 가치를 더해 <br>고객의 만족도 높은 생활을 만들어 갑니다.</span>
                        <a href="novita/innovation.html" class="href" data-animation='{
				"anchor": ".main-brandstory .brandstory-txt",
				"from": {"y": 50, "opacity": 0},
				"to": {"y": 0, "opacity": 1, "delay": 0.4}
			}'>NOVITA INNOVATION</a>
                    </div>
                </div>
                <div class="main-customer" data-animation='{
		"from": {"y": 50, "opacity": 0},
		"to": {"y": 0, "opacity": 1}
	}'>
                    <div class="inner">
                        <div class="customer-link">
                            <a href="customer-center/faq-bbs-list.html" class="link-faq">
                                <strong>FAQ</strong>
                                <span>자주묻는 질문에서 <br>궁금하신 사항을 확인하세요</span>
                            </a>
                            <a href="customer-center/inquiry-main.html" class="link-inquiry">
                                <strong>1:1문의</strong>
                                <span>도움이 필요하시면 언제든지 <br>물어보세요.</span>
                            </a>
                            <a href="customer-center/as-application-main.html" class="link-as">
                                <strong>AS신청</strong>
                                <span>제품에 문제가 생기셨나요? <br>AS를 신청해주세요.</span>
                            </a>
                            <a href="customer-center/productRegist-main.html" class="link-regist">
                                <strong>제품등록</strong>
                                <span>구매하신 제품을 등록하시면 <br>다양한 혜택을 드립니다.</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <?php include "_inc/footer.php"; ?>


    </div>

    <script src="js/app/Main.js"></script>
    <script>
        var swiper = new Swiper(".popSwiper", {
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            loop: true,
            spaceBetween: 30,
        });

        $(function() {
            var listVo = {};
            var options = {
                listVo: listVo
            };
            Main.init(options);
        });

        $(function() {
            if (getCookie("closeMainPopup")) {
                $("#main-popup").removeClass('active');
            }
        });

        function closePopup() {
            if ($("#todayClose").prop("checked")) {
                setCookie("closeMainPopup", "closeMainPopup", 1);
            }
            $("#main-popup").removeClass('active');
        }

        function getCookie(cookieName) {
            var search = cookieName + "=";
            var cookie = document.cookie; /* 현재 쿠키가 존재할 경우 */
            if (cookie.length > 0) {
                /* 해당 쿠키명이 존재하는지 검색한 후 존재하면 위치를 리턴. */
                startIndex = cookie.indexOf(cookieName);
                /* 만약 존재한다면 */
                if (startIndex != -1) {
                    /* 값을 얻어내기 위해 시작 인덱스 조절 */
                    startIndex += cookieName.length;
                    /* 값을 얻어내기 위해 종료 인덱스 추출 */
                    endIndex = cookie.indexOf(";", startIndex);
                    /* 만약 종료 인덱스를 못찾게 되면 쿠키 전체길이로 설정 */
                    if (endIndex == -1) endIndex = cookie.length;
                    /* 쿠키값을 추출하여 리턴 */
                    return unescape(cookie.substring(startIndex + 1, endIndex));
                } else {
                    /* 쿠키 내에 해당 쿠키가 존재하지 않을 경우 */
                    return false;
                }
            } else {
                /* 쿠키 자체가 없을 경우 */
                return false;
            }
        }

        function setCookie(name, value, expiredays) {
            var todayDate = new Date();
            todayDate.setDate(todayDate.getDate() + expiredays);
            document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
        }

        function onViewPrduct(prductSn, type) {
            if (type === "best") {
                this.setBestPixel();
            } else {
                this.setPromotionPixel();
            }
            location.href = "/product/" + prductSn;
        }


        function onClickCart(prductSn, type) {

            if (type === "best") {
                this.setBestPixel();
            } else {
                this.setPromotionPixel();
            }

            var vm = this;
            $.ajax({
                dataType: 'json',
                type: 'post',
                contentType: 'application/json',
                url: '/cart/add',
                data: JSON.stringify({
                    prductSn: prductSn,
                    prductQy: 1,
                    price: 0,
                    cartAditList: [],
                }),
            }).done(function(data) {
                if (confirm('상품이 장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?')) {
                    location.href = 'cart.html';
                } else {

                }
            }).fail(function(data) {});
        }

        function onchangeIntrstYn(prductSn, type) {
            authencated(
                function() {

                    if (type === "best") {
                        this.setBestPixel();
                    } else {
                        this.setPromotionPixel();
                    }

                    // onAuthencated
                    $.ajax({
                        dataType: 'json',
                        type: 'post',
                        contentType: 'application/json',
                        url: '/mypage/interest-product/toggle',
                        data: JSON.stringify({
                            prductSn: prductSn
                        })
                    }).done(function(data) {

                        if (data.result == 'insert') {
                            alert("제품을 찜 하였습니다.");
                        }

                    }).fail(function(data) {

                    });
                },
                function() {
                    // onUnauthencated
                    //if(confirm("로그인이 필요 합니다. 로그인 페이지 이동하시겠습니가?")){
                    $("#IntrstYn_" + prductSn).val("N");
                    location.href = '/login?returnUrl=' + encodeURI(location.pathname);
                    //}

                }
            )
        }

        function setBestPixel() {
            var js = document.createElement('script');
            js.src = "http://pixel.mathtag.com/event/js?mt_id=1604047&amp;mt_adid=256128&amp;mt_exem=&amp;mt_excl=&amp;v1=&amp;v2=&amp;v3=&amp;s1=&amp;s2=&amp;s3=";
            document.body.appendChild(js);

            var axel = Math.random() + "";
            var a = axel * 10000000000000;
            //document.write('<img src="https://ad.doubleclick.net/ddm/activity/src=12299233;type=invmedia;cat=bests0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=;gdpr_consent=;ord=' + a + '?" width="1" height="1" alt=""/>');
            //document.write('<noscript><img src="https://ad.doubleclick.net/ddm/activity/src=12299233;type=invmedia;cat=bests0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=;gdpr_consent=;ord=1?" width="1" height="1" alt=""/></noscript>');
        }

        function setPromotionPixel() {
            var js = document.createElement('script');
            js.src = "http://pixel.mathtag.com/event/js?mt_id=1604048&amp;mt_adid=256128&amp;mt_exem=&amp;mt_excl=&amp;v1=&amp;v2=&amp;v3=&amp;s1=&amp;s2=&amp;s3=";
            document.body.appendChild(js);

            var axel = Math.random() + "";
            var a = axel * 10000000000000;
            //document.write('<img src="https://ad.doubleclick.net/ddm/activity/src=12299233;type=invmedia;cat=month0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=;gdpr_consent=;ord=' + a + '?" width="1" height="1" alt=""/>');
            //document.write('<noscript><img src="https://ad.doubleclick.net/ddm/activity/src=12299233;type=invmedia;cat=month0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=;gdpr_consent=;ord=1?" width="1" height="1" alt=""/></noscript>');
        }

        function setEventPixel() {
            var js = document.createElement('script');
            js.src = "http://pixel.mathtag.com/event/js?mt_id=1604049&amp;mt_adid=256128&amp;mt_exem=&amp;mt_excl=&amp;v1=&amp;v2=&amp;v3=&amp;s1=&amp;s2=&amp;s3=";
            document.body.appendChild(js);

            var axel = Math.random() + "";
            var a = axel * 10000000000000;
            document.write('<img src="https://ad.doubleclick.net/ddm/activity/src=12299233;type=invmedia;cat=event0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=;gdpr_consent=;ord=' + a + '?" width="1" height="1" alt=""/>');
            document.write('<noscript><img src="https://ad.doubleclick.net/ddm/activity/src=12299233;type=invmedia;cat=event0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=;gdpr_consent=;ord=1?" width="1" height="1" alt=""/></noscript>');
        }

        function setReviewPixel() {
            var js = document.createElement('script');
            js.src = "http://pixel.mathtag.com/event/js?mt_id=1604050&amp;mt_adid=256128&amp;mt_exem=&amp;mt_excl=&amp;v1=&amp;v2=&amp;v3=&amp;s1=&amp;s2=&amp;s3=";
            document.body.appendChild(js);

            var axel = Math.random() + "";
            var a = axel * 10000000000000;
            document.write('<img src="https://ad.doubleclick.net/ddm/activity/src=12299233;type=invmedia;cat=revie0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=;gdpr_consent=;ord=' + a + '?" width="1" height="1" alt=""/>');
            document.write('<noscript><img src="https://ad.doubleclick.net/ddm/activity/src=12299233;type=invmedia;cat=revie0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=;gdpr_consent=;ord=1?" width="1" height="1" alt=""/></noscript>');
        }

        function setServicePixel() {
            var js = document.createElement('script');
            js.src = "http://pixel.mathtag.com/event/js?mt_id=1604051&amp;mt_adid=256128&amp;mt_exem=&amp;mt_excl=&amp;v1=&amp;v2=&amp;v3=&amp;s1=&amp;s2=&amp;s3=";
            document.body.appendChild(js);

            var axel = Math.random() + "";
            var a = axel * 10000000000000;
            document.write('<img src="https://ad.doubleclick.net/ddm/activity/src=12299233;type=invmedia;cat=servi000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=;gdpr_consent=;ord=' + a + '?" width="1" height="1" alt=""/>');
            document.write('<noscript><img src="https://ad.doubleclick.net/ddm/activity/src=12299233;type=invmedia;cat=servi000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=;gdpr_consent=;ord=1?" width="1" height="1" alt=""/></noscript>');

        }
    </script>
</body>

</html>