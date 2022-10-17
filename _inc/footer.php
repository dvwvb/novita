<footer>
    <!-- @수정 0516 -->
    <div class="inner">
        <a href="#" class="brand">NOVITA A KOHLER COMPANY</a>
        <div class="columns">
            <div class="info">
                <nav class="link">
                    <a href="/info/privacy-policy.html">개인정보처리방침</a>
                    <a href="/info/terms-of-use.html">이용약관</a>
                    <a href="/info/cookie_disclosure.html">쿠키수집고지문</a>
                    <a href="/info/privacy-policy2.html">개인정보 보호정책</a>
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
                            <a href="/info/company.html">회사소개</a>
                            <a href="/info/fs-list.html">재무 정보</a>
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
                        <a href="/customer-center/inquiry-main.html" class="more-inquiry">1:1문의 작성하기</a>
                    </div>

                </div>
            </div>
            <div class="util-area">
                <button type="button" class="btn-top">화면 상단으로 이동</button>
            </div>
        </div>
    </aside>

    <script src="/js/app/Footer.js"></script>
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