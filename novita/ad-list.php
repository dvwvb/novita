<!DOCTYPE html>
<html>

<head>
    <title>노비타 광고 | NOVITA | 노비타(NOVITA)</title>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
    <meta name="robots" content="index,follow" />
    <meta name="keywords" content="노비타 광고, 노비타 유튜브, 노비타 공식 광고 " />
    <meta name="description" content="노비타의 영상광고를 확인할 수 있습니다. " />
    <meta property="og:type" content="website">
    <meta property="og:title" content="노비타 광고 | NOVITA | 노비타(NOVITA)" />
    <meta property="og:description" content="노비타의 영상광고를 확인할 수 있습니다. ">
    <meta property="og:url" content="ad-list.html">
    <link rel="stylesheet" href="/assets/css/default.css">
    <script type="text/javascript" src="/assets/js/jquery-1.12.4.min.js"></script>
    <script type="text/javascript" src="/assets/js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/assets/js/common_front.js"></script>
    <script type="text/javascript" src="/assets/js/ui.js"></script>

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
    <script src="/common/js/jquery.form.min.js"></script>
    <script src="/common/js/jquery.validate.min.js"></script>
    <script src="/common/js/vue.js"></script>
    <script src="/common/js/jquery.cookie.js"></script>
    <script src="/common/js/jstree.js"></script>
    <script src="/common/js/moment.min.js"></script>
    <script src="/common/js/moment-timezone-with-data.min.js"></script>
    <script src="/js/vueComponent/vue-filter.js"></script>
    <script src="/js/vueComponent/vue-datepicker.js"></script>
    <script src="/js/vueComponent/vue-telno.js"></script>
    <script src="/js/app/App.js"></script>
    <script src="/js/app/Authencation.js"></script>
    <script>
        $(function() {
            var option = {};
            option.locale = 'en';
            App.init(option);
        });
    </script>
    <script type="text/javascript" src="/assets/js/swiper.min.js"></script>
    <script type="text/javascript" src="/assets/js/jquery.mCustomScrollbar.js"></script>
</head>

<body class="page-event page-novita" data-device-type="pc" data-language="en" data-layout="basic-pc">
    <div id="wrap" class="page-event page-novita">
        <header class="">
            <?php include "../_inc/nav.php"; ?>
        </header>

        <form id="listForm" name="listForm">
            <div id="container" class="frame-board vuelayer" v-cloak>
                <input type="hidden" name="pageIndex" :value="listVo.pageIndex" />
                <div class="inner">
                    <div class="top">
                        <div class="breadcrumb t-right">
                            <ul>
                                <li>Home</li>
                                <li>Novita</li>
                                <li class="kr">노비타 광고</li>
                            </ul>
                        </div>
                        <p class="page-title">
                            <strong>노비타 광고</strong>
                        </p>
                    </div>
                    <div class="contents event-list ad-list" v-if="resultList && resultList.length > 0">
                        <div class="video-wrap">
                            <iframe width="560" height="315" :src="'https://www.youtube.com/embed/'+viewVo.nttExpansVo.mvp+'?autoplay=1'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen name="yt"></iframe>
                        </div>
                        <div class="media-wrap">
                            <span class="date">{{viewVo.registDt | timeToDate}}</span>
                            <h2>{{viewVo.nttSj}}</h2>
                            <button type="button" class="btn-share" data-popup-target="#pop-share">공유하기</button>
                        </div>
                        <div class="board">
                            <div class="list thumbnail">
                                <ul class="column-03">

                                    <li v-for="(result, index) in resultList">
                                        <a href="#yt" v-on:click="onView(result)">
                                            <span class="img-area ">
                                                <img :src="result.atchList[0].physiclFlpth" />
                                            </span>
                                            <span class="txt-area">
                                                <span class="date">{{result.registDt | timeToDate}}</span>
                                                <strong>
                                                    {{result.nttSj}}
                                                </strong>
                                            </span>
                                        </a>
                                    </li>

                                </ul>
                                <vue-pagination v-if="resultList && resultList.length > 0" :pagination="paginationInfo" v-on:page-move="pageMove"></vue-pagination>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- [팝업] 공유하기 -->
                <div class="ui-popup" id="pop-share">
                    <div class="content" style="width: 384px">
                        <div class="header">
                            <p>공유하기</p>
                            <button type="button" class="btn-close">닫기</button>
                        </div>
                        <div class="body">
                            <div class="content-area">
                                <div class="btn-group">
                                    <button type="button" v-on:click="onCopyKakao()"><i class="ico-kakao-64"></i>카카오톡</button>
                                    <button type="button" v-on:click="onCopyFacebook()"><i class="ico-fb-64"></i>페이스북</button>
                                    <button type="button" v-on:click="onCopyUrl()"><i class="ico-url-64"></i>URL 복사</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </form>

        <script type="text/javascript" src="/js/vueComponent/vue-pagination.js"></script>
        <script src="/js/sns/kakao.js"></script>
        <script src="/js/app/NovitaAdList.js"></script>
        <script>
            $(function() {

                var options = {
                    listVo: {
                        pageIndex: 1,
                    },
                    kakao_appkey_script: '647394db695107a4a7c601afe975c6fc',
                    messages: {
                        copySuccess: '복사되었습니다.',
                    }
                };
                NovitaAdList.init(options);
            });
        </script>

        <?php include "../_inc/footer.php"; ?>
    </div>
</body>

</html>