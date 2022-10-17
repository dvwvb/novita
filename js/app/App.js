/**
 * global variable : 비동기 로딩 이미지 사용여부
 * 비동기 로딩이미지를 사용하지 않을 경우, false로 설정할 것
 */
var ajaxLoadImgUse = true;

var App = (function ($) {
  var init = function (option) {
    console.log("App.init()");

    /* ajax start , end Method
     */
    $(document).ajaxStart(function (e) {
      console.log("ajax start - " + ajaxLoadImgUse);
      if (ajaxLoadImgUse && $(".loading-dimed").length == 0) {
        loading_show();
      }
    });

    $(document).ajaxStop(function () {
      if ($(".loading-dimed").length > 0) {
        loading_remove();
      }
      ajaxLoadImgUse = true;
    });

    // 비동기 로그인 요청
    $(document).ajaxError(function (event, xhr, thr) {
      console.log(xhr);
      if (xhr.status == 401) {
        alert("로그인이 필요합니다.");
        location.href = "/login?returnUrl=" + encodeURI(location.pathname);
        return;
      } else {
        if (thr.url != "/inc/log") {
          alert("데이터 처리 도중 에러가 발생하였습니다.");
        }
      }
      ajaxLoadImgUse = true;
    });
  };

  return {
    init: init,
  };
})(jQuery);

/**
 * 전역함수
 **/
//loading
function loading_show() {
  console.log("loading_show");
  $("body").append('<div class="loading-dimed"></div>');
}
function loading_remove() {
  console.log("loading_remove");
  $(".loading-dimed").remove();
  /*setTimeout(function(){
		$(".ellipsis-muti").ellipsis();
		UI.customScroll.scrollY($('.perform-wrap.scroll-y'));
	},500);*/
}
// 일시포맷
function formatDate(date, format) {
  if (!format) {
    format = "YYYY.MM.DD";
  }
  moment.locale("ko", {
    meridiem: function (e) {
      if (e > 12) {
        return "오후";
      }
      return "오전";
    },
  });
  return date ? moment(date).format(format) : "";
}
// 레이어팝업 오픈
function openPopup(options) {
  if (options.event) {
    event.preventDefault();
  }
  $("body").append('<div id="popup_result" style="z-index: 10;"/>');
  $("html, body").addClass("body_hidden");
  //$('#popup_result').load(options.url + ' #popup_layer');
  $("#popup_result").load(options.url);
  if (options.callback) {
    $("#popup_result").data("callback", options.callback);
  }
}
//레이어팝업 클로즈
function closePopup(event) {
  if (event) {
    event.preventDefault();
  }
  $("#popup_result").remove();
  $("html, body").removeClass("body_hidden");
}
// 함수이름으로 함수정의 얻기
function getFunctionByNm(nm) {
  if (!nm || !nm.split(".")) {
    return null;
  }
  var ret = window;
  nm.split(".").forEach(function (item, index) {
    ret = ret[item];
  });

  if (!ret || typeof ret !== "function") {
    return null;
  }
  return ret;
}
// 이미지업로드
function uploadImage($form, $file, callback, callbackOptions) {
  if (!$file || !$file.val()) {
    return false;
  }

  var orgNm = $file.attr("name");
  $file.attr("name", "atchFile");

  $form.ajaxSubmit({
    type: "post",
    dataType: "json",
    url: "/upload/image",
    success: function (data) {
      $file.attr("name", orgNm);
      $file.val("");

      console.log("data:", JSON.stringify(data));
      if (data && typeof data !== "object") {
        data = $.parseJSON(data);
      }
      if (data && data.result === "success") {
        // 업로드 후처리
        if (typeof callback === "function") callback(data, callbackOptions);
      } else {
        if (data && data.message) {
          alert(data.message);
          return false;
        } else {
          alert("데이터 처리 도중 에러가 발생하였습니다");
          return false;
        }
      }
    },
  });
}
//파일업로드
function uploadFile($form, $file, callback) {
  if (!$file || !$file.val()) {
    return false;
  }

  var orgNm = $file.attr("name");
  $file.attr("name", "atchFile");

  $form.ajaxSubmit({
    type: "post",
    dataType: "json",
    url: "/upload/file",
    success: function (data) {
      $file.attr("name", orgNm);
      $file.val("");

      console.log("data:", JSON.stringify(data));
      if (data && typeof data !== "object") {
        data = $.parseJSON(data);
      }
      if (data && data.result === "success") {
        // 업로드 후처리
        if (typeof callback === "function") callback(data);
      } else {
        if (data && data.message) {
          alert(data.message);
          return false;
        } else {
          alert("데이터 처리 도중 에러가 발생하였습니다");
          return false;
        }
      }
    },
  });
}

function showLength() {
  $('input[type="text"].txtMaxlen').each(function (item) {
    var $txtMaxlen = $(this);
    // span 초기화
    $txtMaxlen.next(".lbMaxlen").remove();

    // span 추가
    var maxlen = $txtMaxlen.attr("maxlength");
    var len = $txtMaxlen.val().length;
    $txtMaxlen.after(
      '<span class="lbMaxlen">' + len + "/" + maxlen + "</span>"
    );

    // bind event : change
    $txtMaxlen.off("keyup").on("keyup", function () {
      var $this = $(this);

      // span 초기화
      $this.next(".lbMaxlen").remove();

      // span 추가
      var maxlen = $this.attr("maxlength");
      var len = $this.val().length;
      $this.after('<span class="lbMaxlen">' + len + "/" + maxlen + "</span>");
    });
  });

  $("textarea.txtMaxlen").each(function (item) {
    var $txtMaxlen = $(this);
    // span 초기화
    $txtMaxlen.next(".lbMaxlen_textarea").remove();

    // span 추가
    var maxlen = $txtMaxlen.attr("maxlength");
    var len = $txtMaxlen.val().length;
    $txtMaxlen.after(
      '<span class="lbMaxlen_textarea">' + len + "/" + maxlen + "</span>"
    );

    // bind event : change
    $txtMaxlen.off("keyup").on("keyup", function () {
      var $this = $(this);

      // span 초기화
      $this.next(".lbMaxlen_textarea").remove();

      // span 추가
      var maxlen = $this.attr("maxlength");
      var len = $this.val().length;
      $this.after(
        '<span class="lbMaxlen_textarea">' + len + "/" + maxlen + "</span>"
      );
    });
  });
}

// 로그인아이디 포맷체크
function checkLoginIdFormat(value) {
  var check = /^[A-Za-z0-9]{5,20}$/;
  return check.test(value);
}
// 로그인비밀번호 포맷체크
function checkPasswordFormat(value) {
  if (value.length < 8 || value.length > 20) return false;

  var check = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}$/;
  return check.test(value);
}
// 이메일 포맷체크
function checkEmailFormat(value) {
  if (!value) return false;

  var count = value.split("@").length - 1;
  return count == 1;
}

function daumPostCode(callback) {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var fullAddr = ""; // 최종 주소 변수
      var extraAddr = ""; // 조합형 주소 변수

      // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        fullAddr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        fullAddr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
      if (data.userSelectedType === "R") {
        //법정동명이 있을 경우 추가한다.
        if (data.bname !== "") {
          extraAddr += data.bname;
        }
        // 건물명이 있을 경우 추가한다.
        if (data.buildingName !== "") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
        fullAddr += extraAddr !== "" ? " (" + extraAddr + ")" : "";
      }

      if ("function" == typeof callback) {
        callback(data.zonecode, fullAddr, data.sigunguCode);
      }
    },
  }).open();
}
