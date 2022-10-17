<!DOCTYPE html>
<html>

<head>
    <title>재무정보 | 노비타(NOVITA)</title>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
    <meta name="robots" content="index,follow" />
    <meta name="keywords" content="노비타 재무정보, 노비타 재무, 재무정보 " />
    <meta name="description" content="노비타의 재무정보를 확인하실 수 있습니다. " />
    <meta property="og:type" content="website">
    <meta property="og:title" content="재무정보 | 노비타(NOVITA)" />
    <meta property="og:description" content="노비타의 재무정보를 확인하실 수 있습니다. ">
    <meta property="og:url" content="fs-list.html">
    <link rel="stylesheet" href="../assets/css/default.css">
    <script type="text/javascript" src="../assets/js/jquery-1.12.4.min.js"></script>
    <script type="text/javascript" src="../assets/js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="../assets/js/common_front.js"></script>
    <script type="text/javascript" src="../assets/js/ui.js"></script>

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
            background: url('../images/loading.svg') no-repeat 0 0;
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
    <script src="../common/js/jquery.form.min.js"></script>
    <script src="../common/js/jquery.validate.min.js"></script>
    <script src="../common/js/vue.js"></script>
    <script src="../common/js/jquery.cookie.js"></script>
    <script src="../common/js/jstree.js"></script>
    <script src="../common/js/moment.min.js"></script>
    <script src="../common/js/moment-timezone-with-data.min.js"></script>
    <script src="../js/vueComponent/vue-filter.js"></script>
    <script src="../js/vueComponent/vue-datepicker.js"></script>
    <script src="../js/vueComponent/vue-telno.js"></script>
    <script src="../js/app/App.js"></script>
    <script src="../js/app/Authencation.js"></script>
    <script>
        $(function() {
            var option = {};
            option.locale = 'en';
            App.init(option);
        });
    </script>
</head>

<body class="" data-device-type="pc" data-language="en" data-layout="basic-pc">
    <div id="wrap" class="">
        <header class="">
            <h1 class="brand"><a href="../index.html">NOTIVTA A KOHLER COMPANY</a></h1>
            <nav>
                <ul>
                    <li class="nav-item nav-novita">
                        <a href="javascript:;" class="nav-standard active">NOVITA</a><!-- 활성화시 active 클래스 추가-->
                        <div class="nav-sub">
                            <ul>
                                <li><a href="../novita/innovation.html">노비타 이노베이션</a><!-- 활성화시 active 클래스 추가-->
                                </li>
                                <li><a href="../novita/ad-list.html">노비타 광고</a></li>
                                <li><a href="company.html">회사소개</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item nav-product">
                        <a href="javascript:;" class="nav-standard">PRODUCT</a>
                        <div class="nav-sub">
                            <ul>
                                <li>
                                    <a href="../product-category/20000000016.html">BEST & NEW</a>
                                </li>

                                <li>






                                    <a href="../product-category/20000000010.html">비데</a>

                                    <ul class="nav-sub-link">

                                        <li><a href="../product-category/20000000010.html">살균비데</a></li>

                                        <li><a href="../product-category/20000000011.html">회전노즐 비데</a></li>

                                        <li><a href="../product-category/20000000004.html">방수 비데</a></li>

                                        <li><a href="../product-category/20000000015.html">실속형 비데</a></li>

                                        <li><a href="../product-category/20000000014.html">일체형 비데</a></li>

                                    </ul>

                                </li>

                                <li>






                                    <a href="../product-category/20000000005.html">악세서리</a>

                                </li>


                                <li><a href="../product-filter.html">내게 맞는 비데 찾기</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item nav-service">
                        <a href="javascript:;" class="nav-standard">SERVICE</a>
                        <div class="nav-sub">
                            <ul>
                                <li><a href="../doctorclean-service.html">닥터클린 서비스</a></li>
                                <li><a href="../service-install.html">설치 서비스</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item nav-event">
                        <a href="javascript:;" class="nav-standard">EVENT</a>
                        <div class="nav-sub">
                            <ul>
                                <li><a href="../event/vip.html">노비타 클럽</a></li>
                                <li><a href="../event/live/list.html">노비타 LIVE</a></li>
                                <li><a href="../event/list.html">이벤트</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item nav-customer">
                        <a href="javascript:;" class="nav-standard">CUSTOMER CENTER</a>
                        <div class="nav-sub">
                            <ul>
                                <li><a href="../customer-center/as-application-main.html">AS신청</a></li>
                                <li><a href="../customer-center/notice-bbs-list.html">공지사항</a></li>
                                <li><a href="../customer-center/faq-bbs-list.html">FAQ</a></li>
                                <li><a href="../customer-center/inquiry-main.html">1:1문의</a></li>
                                <li><a href="../customer-center/productRegist-main.html">제품 등록</a></li>
                                <li><a href="../customer-center/agent-bbs-list.html">대리점</a></li>
                                <li><a href="../customer-center/user-manual-list.html">사용 설명서</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <!-- <div class="nav-sub-layout"></div> -->
            </nav>
            <div class="util">

                <a href="../login.html" class="util-login">Login</a>


                <a href="../cart.html" class="util-cart">Cart <span class="num">0</span></a>
                <a href="../search.html" class="util-finder">Search <i class="ico-search"></i></a> <!-- @수정 0428 -->
            </div>


            <script>
                $(function() {
                    $('.btnLogout', '.util').on('click', function() {
                        location.href = '../index.html?=';
                    });
                    $('.btnMyinfo', '.util').on('click', function() {
                        location.href = '../myinfo/form.html';
                    });
                });
            </script>


        </header>

        <div id="wrap" class="page-footer">

            <form id="listForm" name="listForm">
                <div id="container" class="company finance-info finance-list vuelayer" v-cloak>
                    <div class="top">
                        <div class="inner">
                            <h2>COMPANY</h2>
                        </div>
                    </div>
                    <div class="contents inner">
                        <div class="ui-tab">
                            <div class="tab-nav inner">
                                <a href="company.html" data-tab-target="#tab_01">회사소개</a>
                                <a href="fs-list.html" data-tab-target="#tab_02" class="active">재무정보</a>
                            </div>
                            <div v-if="!resultList || resultList.length < 1" class="tab-content finance-list-empty">
                                <div id="tab_02" class="active">
                                    <div class="board">
                                        <div class="list">
                                            <div class="empty-area">
                                                <span class="no-content">등록된 게시물이 없습니다.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="resultList && resultList.length > 0" class="tab-content">
                                <div id="tab_02" class="active">
                                    <div class="board">
                                        <div class="list">
                                            <ul class="column-01">
                                                <li v-for="(result, index) in resultList">
                                                    <a v-on:click="onViewLink(result.nttSn)">
                                                        <span class="txt-area">
                                                            <span class="date">{{result.nttRgsde | timeToDate}}</span>
                                                            <strong>{{result.nttSj}}</strong>
                                                        </span>
                                                    </a>
                                                </li>
                                            </ul>
                                            <vue-pagination v-if="resultList && resultList.length > 0" :pagination="paginationInfo" v-on:page-move="pageMove"></vue-pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <script type="text/javascript" src="../js/vueComponent/vue-pagination.js"></script>
        <script type="text/javascript" src="../js/app/FSList.js"></script>
        <script>
            $(function() {
                var listVo = {
                    pageIndex: 1
                };
                var options = {
                    listVo: listVo
                };
                FSList.init(options);
            });

            function vueUpdated(vm) {

            }
        </script>

        <footer>




            <!-- @수정 0516 -->
            <div class="inner">
                <a href="#" class="brand">NOVITA A KOHLER COMPANY</a>
                <div class="columns">
                    <div class="info">
                        <nav class="link">
                            <a href="privacy-policy.html">개인정보처리방침</a>
                            <a href="terms-of-use.html">이용약관</a>
                            <a href="cookie_disclosure.html">쿠키수집고지문</a>
                            <a href="privacy-policy2.html">개인정보 보호정책</a>
                        </nav>
                        <div class="copyright">
                            <span>대표자 : 칭양</span>
                            <span>충청남도 천안시 서북구 직산읍 부송 3길 61</span>
                            <span class="line">호스팅서비스 사업자 : MS Aure </span>
                            <span>사업자등록번호 : 312-81-13538</span>
                            <span>통신판매업 신고 : 2006-00144</span>
                            <span><a href="#none" onclick="openBizCommPop()">사업자 정보 확인</a></span>
                            <em>Copyright @ KOHLER NOVITA. All Rights Reserved.</em>
                        </div>
                        <!-- //@수정 0516 -->
                        <nav class="sns">
                            <a href="https://www.instagram.com/novitaofficial/" target="_blank" class="ico-insta">NOVITA 인스타그램 새창으로 열기</a>
                            <a href="https://www.facebook.com/new.novita" target="_blank" class="ico-fb">NOVITA 페이스북 새창으로 열기</a>
                            <a href="https://www.youtube.com/channel/UCLpw_4rubzEubAkHoMc_aVg" target="_blank" class="ico-yt">NOVITA 유튜브 새창으로 열기</a>
                            <a href="https://blog.naver.com/kohlernovitaofficial" target="_blank" class="ico-blog">NOVITA 블로그 새창으로 열기</a>
                        </nav>
                    </div>
                    <div class="company">
                        <div class="intro">
                            <dl>
                                <dt>COMPANY</dt>
                                <dd>
                                    <a href="company.html">회사소개</a>
                                    <a href="fs-list.html">재무 정보</a>
                                </dd>
                            </dl>
                        </div>
                        <div class="cs">
                            <dl>
                                <dt>고객상담센터</dt>
                                <dd>
                                    <a href="tel:1588-6560">1588-6560</a>
                                    <span>AM 09:00 - PM 18:00</span>
                                </dd>
                            </dl>
                            <dl>
                                <dt>구매문의</dt>
                                <dd><a href="tel:1566-9090">1566-9090</a></dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <!-- //@수정 0516 -->
            <!-- @수정 0603 -->
            <aside>
                <div class="aside-bot footerlayer">
                    <div class="chat-area">
                        <input type="checkbox" id="asideChat">
                        <label for="asideChat" class="btn-chat-toggle">
                            <i class="btn-chat"><span class="hidden-txt">더 보기</span></i>
                            <i class="btn-chat-close"><span class="hidden-txt">닫기</span></i>
                        </label>
                        <div class="chat-message">

                            <!-- 비로그인시 노출 -->
                            <a :href="footerVo.url" class="message-login"><span v-html="footerVo.message"></span></a>
                            <!-- //비로그인시 노출 -->
                            <div class="message-more">
                                <a class="more-tel">구매문의<em>1566-9090</em></a>
                                <a href="../customer-center/inquiry-main.html" class="more-inquiry">1:1문의 작성하기</a>
                            </div>

                        </div>
                    </div>
                    <div class="util-area">
                        <button type="button" class="btn-top">화면 상단으로 이동</button>
                    </div>
                </div>
            </aside>

            <script src="../js/app/Footer.js"></script>
            <script>
                $(function() {
                    var listVo = {}
                    var options = {
                        listVo: listVo
                    };
                    Footer.init(options);
                });

                function openBizCommPop() {
                    var url = "http://www.ftc.go.kr/bizCommPop.do?wrkr_no=3128113538";
                    window.open(url, "bizCommPop", "width=750, height=700;");
                }
            </script>



            <!-- 픽셀코드 추가 2022.07.22  시작 -->
            <script language='JavaScript1.1' async src='http://pixel.mathtag.com/event/js?mt_id=1603056&amp;mt_adid=256128&amp;mt_exem=&amp;mt_excl=&amp;v1=&amp;v2=&amp;v3=&amp;s1=&amp;s2=&amp;s3='></script>
            <script type="text/javascript">
                var axel = Math.random() + "";
                var a = axel * 10000000000000;
                document.write('<img src="https://ad.doubleclick.net/ddm/activity/src=12299233;type=invmedia;cat=mainl0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=;gdpr_consent=;ord=' + a + '?" width="1" height="1" alt=""/>');
            </script>
            <noscript>
                <img src="https://ad.doubleclick.net/ddm/activity/src=12299233;type=invmedia;cat=mainl0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=;gdpr_consent=;ord=1?" width="1" height="1" alt="" />
            </noscript>
            <!-- End of Floodlight Tag: Please do not remove -->
            <!-- 픽셀코드 추가 2022.07.22  끝 -->

        </footer>
    </div>

</body>

</html>