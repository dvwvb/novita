<h1 class="brand"><a href="/">NOTIVTA A KOHLER COMPANY</a></h1>
<nav>
    <ul>
        <li class="nav-item nav-novita">
            <a href="javascript:;" class="nav-standard active">NOVITA</a><!-- 활성화시 active 클래스 추가-->
            <div class="nav-sub">
                <ul>
                    <li><a href="/novita/innovation.php">노비타 이노베이션</a><!-- 활성화시 active 클래스 추가-->
                    </li>
                    <li><a href="/novita/ad-list.php">노비타 광고</a></li>
                    <li><a href="/info/company.php">회사소개</a></li>
                </ul>
            </div>
        </li>
        <li class="nav-item nav-product">
            <a href="javascript:;" class="nav-standard">PRODUCT</a>
            <div class="nav-sub">
                <ul>
                    <li>
                        <a href="product-category/20000000016.html">BEST & NEW</a>
                    </li>
                    <li>
                        <a href="product-category/20000000010.html">비데</a>
                        <ul class="nav-sub-link">
                            <li><a href="product-category/20000000010.html">살균비데</a></li>
                            <li><a href="product-category/20000000011.html">회전노즐 비데</a></li>
                            <li><a href="product-category/20000000004.html">방수 비데</a></li>
                            <li><a href="product-category/20000000015.html">실속형 비데</a></li>
                            <li><a href="product-category/20000000014.html">일체형 비데</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="product-category/20000000005.html">악세서리</a>
                    </li>
                    <li><a href="product-filter.html">내게 맞는 비데 찾기</a></li>
                </ul>
            </div>
        </li>
        <li class="nav-item nav-service">
            <a href="javascript:;" class="nav-standard">SERVICE</a>
            <div class="nav-sub">
                <ul>
                    <li><a href="doctorclean-service.html">닥터클린 서비스</a></li>
                    <li><a href="service-install.html">설치 서비스</a></li>
                </ul>
            </div>
        </li>
        <li class="nav-item nav-event">
            <a href="javascript:;" class="nav-standard">EVENT</a>
            <div class="nav-sub">
                <ul>
                    <li><a href="event/vip.html">노비타 클럽</a></li>
                    <li><a href="event/live/list.html">노비타 LIVE</a></li>
                    <li><a href="event/list.html">이벤트</a></li>
                </ul>
            </div>
        </li>
        <li class="nav-item nav-customer">
            <a href="javascript:;" class="nav-standard">CUSTOMER CENTER</a>
            <div class="nav-sub">
                <ul>
                    <li><a href="customer-center/as-application-main.html">AS신청</a></li>
                    <li><a href="customer-center/notice-bbs-list.html">공지사항</a></li>
                    <li><a href="customer-center/faq-bbs-list.html">FAQ</a></li>
                    <li><a href="customer-center/inquiry-main.html">1:1문의</a></li>
                    <li><a href="customer-center/productRegist-main.html">제품 등록</a></li>
                    <li><a href="customer-center/agent-bbs-list.html">대리점</a></li>
                    <li><a href="customer-center/user-manual-list.html">사용 설명서</a></li>
                </ul>
            </div>
        </li>
    </ul>
    <!-- <div class="nav-sub-layout"></div> -->
</nav>
<div class="util">

    <a href="login.html" class="util-login">Login</a>


    <a href="cart.html" class="util-cart">Cart <span class="num">0</span></a>
    <a href="search.html" class="util-finder">Search <i class="ico-search"></i></a> <!-- @수정 0428 -->
</div>


<script>
    $(function() {
        $('.btnLogout', '.util').on('click', function() {
            location.href = 'index.html?=';
        });
        $('.btnMyinfo', '.util').on('click', function() {
            location.href = 'myinfo/form.html';
        });
    });
</script>