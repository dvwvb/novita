$(function(){

	/*$(document).ajaxStart(function(){
		showLoadingBar();
	}).ajaxStop(function(){
		closeLoadingBar();
	});*/

	// 달력 정의

	$.datepicker.setDefaults({
		dateFormat: 'yy-mm-dd',
		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		dayNames: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		showMonthAfterYear: true,
		changeYear	: true,
		changeMonth	: true,
		showButtonPanel: true,
		closeText: "닫기",
		yearSuffix: ' ',
		showAnim: "fadeIn",
		buttonImage: "/images/calendar.png",
		showOn: 'both',
		buttonImageOnly: true,
	});

	// 시작일,종료일 체크
	$.datepickerConfig	=	function(sdate,edate){
		$(sdate).datepicker();
	    $(sdate).datepicker("option", "maxDate", $(edate).val());
	    $(sdate).datepicker("option", "onClose", function ( selectedDate ) {
	        $(edate).datepicker( "option", "minDate", selectedDate );
	    });

	    $(edate).datepicker();
	    $(edate).datepicker("option", "minDate", $(sdate).val());
	    $(edate).datepicker("option", "onClose", function ( selectedDate ) {
	        $(sdate).datepicker( "option", "maxDate", selectedDate );
	    });

	};

	// 현재일 이전 선택 안됨 이후 만 가능
	$.datepickerConfig2	=	function(sdate,edate){
	    $(edate).datepicker();
	    $(edate).datepicker("option", "minDate", $(sdate).val());
	    $(edate).datepicker("option", "onClose", function ( selectedDate ) {
	        $(sdate).datepicker( "option", "maxDate", selectedDate );
	    });

	};


	$(".gnb_logout").click(function(){
		location.href = "/mgr/logout.do";
	});

	// 이미지 크게 보기
	$(".showFreeView").click(function(e){
		e.preventDefault();
		var filePath	= $(this).attr("src");

		$('#pop_up_banner').bPopup({
			content	:	"image",
			contentContainer	:".content",
			loadUrl	:	filePath
		});

		// 큰 사이즈 이미지 방지
		$(".content img").css({
			"maxWidth"	:"600px","maxHeight"	:"400px"
		});


	});

});


function ready(){
	alert("준비중입니다.");
}

/* Null Chk*/
function fnb_null(obj, msg) {
	//if(obj.val().replace(/^\s*/,'') == 0) {
	if(!obj.val()) {
		if(msg) alert(msg);obj.focus();
		return true;
	}
	return false;
}

/* Null Chk Jquery*/
function fnb_null_jquery(obj, msg) {
	//if(obj.val().replace(/^\s*/,'') == 0) {
	if(!obj.val()) {
		if(msg) alert(msg);obj.focus();
		return true;
	}
	return false;
}

function checkNumber(check_form){
    var numPattern = /([^0-9])/;
    var numPattern = check_form.value.match(numPattern);
    if(numPattern != null){
        alert("숫자만 입력해 주세요!");
        check_form.value = "";
        check_form.focus();
        return false;
    }
}

/*숫자만 입력 가능하게 하는 함수 */
function fn_stripcharval(obj){
	var validstr = "0123456789";
	var ReturnVal = "";
	for (var i = 0; i < obj.value.length; i++){
		if(validstr.indexOf(obj.value.substring(i, i+1)) >= 0){
			ReturnVal=ReturnVal+obj.value.substring(i, i+1);
		}
	}
	obj.value = ReturnVal;
}

//올바른 이메일 형식인지 체크 함수
function checkEmail(inputString) {
	//var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
	var format = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
	if (inputString.indexOf(";")>0) {
		var arrayEmail = inputString.split(";");
		var checkResult = true;
		for (var i=0; i<arrayEmail.length; i++) {
			checkResult = checkFormat(arrayEmail[i],format);
		}
		return checkResult;
	} else {
		return checkFormat(inputString,format);
	}
}


//입력한 정규식과 일치하는 포맷인지 체크 함수
function checkFormat(inputString,format) {
	if (inputString.search(format) != -1) {
		return true;
	}
	return false;
}


//새 창을 화면 한가운데 띄워줌
function openWinCenter(url, wname, wopt) {
	var newopt = "", wHeight = 0, wWidth = 0;
	if (wopt != undefined) {
		var woptlist = wopt.replace(/ /g, "").split(",");
		for (var i in woptlist) {
			if (woptlist[i].match(/^height=/i)) {
				wHeight = parseInt(woptlist[i].substr(7),10);
				if (!isNaN(wHeight)) newopt += "top=" + Math.floor((screen.availHeight - wHeight) / 2) + ",";
			}
			if (woptlist[i].match(/^width=/i)) {
				wWidth = parseInt(woptlist[i].substr(6),10);
				if (!isNaN(wWidth)) newopt += "left=" + Math.floor((screen.availWidth - wWidth) / 2) + ",";
			}
		}
	}
	return window.open(url, wname, newopt + wopt);
}

//Null 체크 함수 (Null 이거나 "" 이면 true)
function checkNull(inputString) {
	if (inputString == null || inputString == "") {
		return true;
	}
	return false;
}

//공백 체크 함수 (공백 포함시 true)
function checkSpace(inputString){
	if (inputString.indexOf(" ")>=0) {
		return true;
	}
	return false;
}

//-- 첨부파일 확장자
function fileExtCheck(fileNm,ext){

	var result = true;
	var allow_format = replaceAll( ext,",","|");
	var fileNm = fileNm.toLowerCase();

	if(fileNm != ''){
		if(!(new RegExp(allow_format, "i")).test(fileNm)){
			result = false;
		}
	}
	return result;
}


/* javascript : html 제거
사용법 : strip_tags("문자열","<i><b>:제거안할 TAG")
*/
function strip_tags (input, allowed) {
  allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
      commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
  });
}

//replaceAll 구현
function replaceAll(str,searchStr,replaceStr){
	return str.split(searchStr).join(replaceStr);
}

//-- 첨부파일 경로 제거 후 파일명만 추출
function fn_clearFilePath(val){
  var tmpStr = val;

  var cnt = 0;
  while(true){
      cnt = tmpStr.indexOf("/");
      if(cnt == -1) break;
      tmpStr = tmpStr.substring(cnt+1);
  }
  while(true){
      cnt = tmpStr.indexOf("\\");
      if(cnt == -1) break;
      tmpStr = tmpStr.substring(cnt+1);
  }

  return tmpStr;
}

//자동 ROWSPAN(줄수,테그(td,th)
function fnbTableRowsPan(index,tagnm){
	var RowspanTd = false;
	var RowspanText = false;
	var RowspanCount = 0;
	var Rows = $('tbody  tr', '.tbl');

	jQuery.each(Rows, function() {
		var This = $(tagnm, this)[index];
		//var text = $(This).text();

		var text = $(This).find("input").val();

		if(RowspanTd == false) {

			RowspanTd = This;
			RowspanText = text;
			RowspanCount = 1;
		}else if(RowspanText != text) {
			$(RowspanTd).attr('rowSpan', RowspanCount);
			$(RowspanTd).css("border" , "1px solid #d0d0d0");
			RowspanTd = This;
			RowspanText = text;
			RowspanCount = 1;

		}else{
			$(This).remove();
			$(RowspanTd).css("border","1px solid #d0d0d0");
			RowspanCount++;
		}
	});

	// 반복 종료 후 마지막 rowspan 적용
	$(RowspanTd).attr('rowSpan', RowspanCount);
}

/* AJAX 호출
var args [] = ""
var args = [];
args['url'] = '넘길주소';
args['dataType'] = 'json';
args['type'] = 'POST,GET';

form = $("#form")
callback = 성공후 보내줄 함수명
*/
function ajaxFunction(args, form, callback) {
	jQuery.ajax({
		method: args['method'],
		url : args['url'],
		dataType : args['dataType'],
		enctype: args['enctype'],
		type : args['type'],
		data : $(form).serialize(),
		error : function (xhr, status, e) {
			console.info("status==>>"+status);
			console.info("xhr==>>"+xhr);
		},
		success : callback
	});
}

/* byte 숫자 체크 */
function calculate_msglen(message) {
	var nbytes = 0;
	for (i=0; i<message.length; i++) {
		var ch = message.charAt(i);
		if (escape(ch).length > 4) {
			nbytes += 2;
		}else if (ch != '\r') {
			nbytes++;
		}
}
return nbytes;
}

//로딩바 시작
function showLoadingBar(){
	$('.pop-loading').bPopup({
		modalClose: false
	});
}
//로딩바 끝
function closeLoadingBar(){
	$('.pop-loading').bPopup().close();
}

//관리자 비밀번호 관리
function valiPass(pass, cb) {
	var pattern1 	= /[0-9]/;
	var pattern2 	= /[a-zA-Z]/;
	var pattern3 	= /[~!@\#$%<>^&*]/;     // 원하는 특수문자 추가 제거

	 // 공백여부 확인
	 if(pass.search(/₩s/) != -1) {
		 cb({errCd : 'VER02'}, null);
		 return false;
	 }

	 var checkPattrn1 = false;

	//영문+숫자 10자리 이상
	if (pattern1.test(pass) && pattern2.test(pass) && !pattern3.test(pass) && pass.length >=10) {
		checkPattrn1 = true;
	}

	//영문+숫자+특수문자 8자리 이상
	if (!checkPattrn1) {
		if(!pattern1.test(pass) || !pattern2.test(pass) || !pattern3.test(pass) || pass.length < 8 || pass.length > 50){
			cb({errCd : 'VER01'}, null);
			return false;
		}
	}

	// 동일한 문자/숫자 3이상
	if( /(\w)\1\1/.test(pass) == true || /([0-9])\1\1/.test(pass) == true ){

		cb({errCd : 'VER04'}, null);
		return false;

	}

	// 연속된 숫자
	for(i=0; i<pass.length; i++){
		var count = 3;
		var splitText = pass.substr(i,count);

		if( splitText.length > count-1 ){

			var tempText = splitText.charCodeAt(0);
			var incCharText = String.fromCharCode(tempText, tempText+1, tempText+2);
			var decCharText = String.fromCharCode(tempText, tempText-1, tempText-2);

			if( splitText == incCharText || splitText == decCharText ){

				cb({errCd : 'VER04'}, null);
				return false;
			}
		}
	}

	//아이디와 동일한 문자
	if (pass.lastIndexOf($('#adm_id').val()) > -1) {
		cb({errCd : 'VER05'}, null);
		return false;
	}
	 cb(null);
}

/* 날짜 형식 체크 */
function DateFormatCheck(str){
	var pattern = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
	if(pattern.test(str)){
		return true;
	} else {
		return false;
	}
}

/* 날짜 비교 */
function DateCompare(stdt, endt){
	var stArry = stdt.split('-');
	var enArry = endt.split('-');

	var startDate = new Date(stArry[0], stArry[1], stArry[2]);
	var endDate = new Date(enArry[0], enArry[1], enArry[2]);

	if(startDate.getTime() > endDate.getTime()){
		return false;
	} else {
		return true;
	}
}

/* 숫자만 입력받음 */
function onlyNum(obj){
	$(obj).keyup(function(){
		$(this).val($(this).val().replace(/[^0-9]/g,""));
	});
}

/* 숫자만 입력받음 */
function onlyNumComma(obj){
	$(obj).val(numberWithCommas($(obj).val()));

	$(obj).keyup(function(){
		$(this).val(numberWithCommas($(this).val().replace(/[^0-9]/g,"")));
	});
}

//관리자 비밀번호 유효성 검사 AS_IS 그대로 사용
function valiPass(pass) {
	var pattern1 	= /[0-9]/;
	var pattern2 	= /[a-zA-Z]/;
	var pattern3 	= /[~!@\#$%<>^&*]/;     // 원하는 특수문자 추가 제거

	 // 공백여부 확인
	 if(pass.search(/₩s/) != -1) {
		 alert("비밀번호는 공백없이 입력해주세요.");
		 return false;
	 }

	 var checkPattrn1 = false;

	//영문+숫자 10자리 이상
	if (pattern1.test(pass) && pattern2.test(pass) && !pattern3.test(pass) && pass.length >=10) {
		checkPattrn1 = true;
	}

	//영문+숫자+특수문자 8자리 이상
	if (!checkPattrn1) {
		if(!pattern1.test(pass) || !pattern2.test(pass) || !pattern3.test(pass) || pass.length < 8 || pass.length > 50){
			alert("비밀번호는 영문+숫자+특수문자 8자리 이상\r\n또는 영문+숫자 10자리 이상으로 구성하여야 합니다.\r\n다시 입력해 주세요.");
			return false;
		}
	}

	// 동일한 문자/숫자 3이상
	/*
	if( /(\w)\1\1/.test(pass) == true || /([0-9])\1\1/.test(pass) == true ){
		alert("비밀번호에 3자 이상의 연속 또는 반복 문자 및 숫자를 사용하실 수 없습니다.");
		return false;
	}
	*/

	// 연속된 숫자
	/*
	for(i=0; i<pass.length; i++){
		var count = 3;
		var splitText = pass.substr(i,count);

		if( splitText.length > count-1 ){

			var tempText = splitText.charCodeAt(0);
			var incCharText = String.fromCharCode(tempText, tempText+1, tempText+2);
			var decCharText = String.fromCharCode(tempText, tempText-1, tempText-2);

			if( splitText == incCharText || splitText == decCharText ){
				alert("비밀번호에 3자 이상의 연속 또는 반복 문자 및 숫자를 사용하실 수 없습니다.");
				return false;
			}
		}
	}
	*/

	//아이디와 동일한 문자
	if (pass.lastIndexOf($('#bu_admId').val()) > -1) {
		alert('비밀번호에 아이디와 동일한 문자를 사용하실 수 없습니다.');
		return false;
	}

	return true;
}

function resetFormElement(e) {
    e.wrap('<form>').closest('form').get(0).reset();
    e.unwrap();
}

// 날짜포맷 폼
function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

var time = {
	formHour	: function(selector,val){
		var item = "";
		for(var ii = 0;ii < 24 ;ii++){
			item = "";
			item += "<option value=\""+pad(ii, 2)+"\">";
			item += pad(ii, 2);
			item += "</option>";

			$(selector).append(item);

		}

		$(selector).val(val);
	},

	formMinute	: function(selector,val){
		var item = "";
		for(var ii = 0;ii < 60 ;ii++){
			item = "";
			item += "<option value=\""+pad(ii, 2)+"\">";
			item += pad(ii, 2);
			item += "</option>";

			$(selector).append(item);
		}
		$(selector).val(val);
	}

};


/* 레이어팝업스크립트*/
function layerPopListSearch(url){

	var forms = $('#layerListForm').serializeArray();
	$('.layerPop').empty();

	//옵션레이어 ajax호출
	$('.layerPop').load(url,forms, function(){
		if($('.layerPop').hasClass('active')){
			$('.layerPop').removeClass('active');
			$('.layerPop').addClass('active');
			$.fn.layerInner();
		}else{
			$('.layerPop').addClass('active');
			$.fn.layerInner();
		}

		$('.layerPop .close, .layerPop > span').on('click', function(){
			closeLayerPopListSearch();
		});
	});

	/* 레이어 팝업// */
	$.fn.layerInner = function(){
		var iHeight = $('.layerPop .inner').outerHeight() / 2;
		var iWidth = $('.layerPop .inner').outerWidth() / 2;
		var cHeight = iHeight*2 - ($('.layerPop .head').outerHeight() + $('.layerPop .btn_group').outerHeight() + 60);
		$('.layerPop .inner').css({
			'margin-top':-iHeight,
			'margin-left':-iWidth
		});
		$('.layerPop .layer_content').css({
			'height':cHeight
		});
	}
	/* //레이어 팝업 */

}

// 3자리 마다 콤마
function numberWithCommas(x) {
	if(x == null ){
		return 0;
	} else {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

}
// 콤마 풀기
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}


//콤마 풀기
function setUncomma(obj) {
	if(checkNull($(obj).val())){
		$(obj).val("0");
	}else{
		$(obj).val(uncomma($(obj).val()));
	}
}

function closeLayerPopListSearch(){
	$('.layerPop').removeClass('active');
	$('.layerPop').html("");
}


function setComma(obj){
	var val = obj.value;
	val = numberWithCommas(val);
	obj.value = val;
}

/* 레이어팝업스크립트 */

/* 입력글자수 체크 처리 */
function setViewInputLength(obj){

	$(obj).after('<span><em id="titleLen">'+$(obj).val().length+'</em>/'+$(obj).attr('maxlength')+'자</span>');

	$(obj).keyup(function(e){
		$(obj).next().find("#titleLen").text($(obj).val().length);
	});
}
/* 입력글자수 체크 처리 */

//금액계산. 금액,할일율(소숫점)
var setPrice = function(price,number){
	var number_format = function(number){
		if( String(number).length > 3 ) {
			var nArr = String(number).split('').join(',').split('');
			for( var i=nArr.length-1, j=1; i>=0; i--, j++)  if( j%6 != 0 && j%2 == 0) nArr[i] = '';
			return nArr.join('');
		}
		else return number;
	};
	// 금액, 타입, 절삭금액 단위
	var priceCutting	=	function(aprice, stype, n){
		 // 원단위처리(R:반올림, C:올림, F:버림)
	    var remove_price = 0;
	    stype = stype ? stype : "R";
	    remove_price = aprice / n;

	    if(stype == "F") {
	        remove_price = Math.floor(remove_price);
	    } else if (stype == "R") {
	        remove_price = Math.round(remove_price);
	    } else if (stype == "C") {
	        remove_price = Math.ceil(remove_price);
	    }

	    remove_price = remove_price * n;
	    return remove_price;
	};

	number = number_format(Math.round(number));
	number = number / 100;
	var value = (price-(price*number));
	var total = price;
	if(price != value){
		total = priceCutting(value, 'F', 1000);
	}

	return total;
};

/*
 * 날짜 계산 함수.
 * iYear : 연도 계산, 음수를 넣을 경우 마이너스 계산.
 * iDay : 월 계산, 음수를 넣을 경우 마이너스 계산.
 * iDay : 일 계산, 음수를 넣을 경우 마이너스 계산.
 * seperator : 연도를 표시할 구분자
*/
function getCalculatedDate(iYear, iMonth, iDay, seperator){
	 //현재 날짜 객체를 얻어옴.
	 var gdCurDate = new Date();
	 //현재 날짜에 날짜 게산.
	 gdCurDate.setYear( gdCurDate.getFullYear() + iYear );
	 gdCurDate.setMonth( gdCurDate.getMonth() + iMonth );
	 gdCurDate.setDate( gdCurDate.getDate() + iDay );

	 //실제 사용할 연, 월, 일 변수 받기.
	 var giYear = gdCurDate.getFullYear();
	 var giMonth = gdCurDate.getMonth()+1;
	 var giDay = gdCurDate.getDate();
	 //월, 일의 자릿수를 2자리로 맞춘다.
	 giMonth = "0" + giMonth;
	 giMonth = giMonth.substring(giMonth.length-2,giMonth.length);
	 giDay   = "0" + giDay;
	 giDay   = giDay.substring(giDay.length-2,giDay.length);
	 //display 형태 맞추기.
	 return giYear + seperator + giMonth + seperator +  giDay;
}

/*한글,영어 1바이트 계산 입력 값 확인(2018.02.26 추가됨)*/
function fnChkByte(obj, maxByte, typeNm){
	var str = obj.value;
	var str_len = str.length;
	var rbyte = 0;
	var rlen = 0;
	var one_char = "";
	var str2 = "";

	for(var i=0; i<str_len; i++){
		one_char = str.charAt(i);
		if(escape(one_char).length > 4){
			//rbyte += 2; 										//한글2Byte 계산시 사용 (아래 주석 후 사용가능)
		    rbyte += 1;                                         //글자 단위 (영문과 동일하게 한들도 1)
		}else{
		    rbyte++;                                            //영문 등 나머지 1Byte
		}
		if(rbyte <= maxByte){
		    rlen = i+1;                                          //return할 문자열 갯수
		}
	}
	if(rbyte > maxByte){
	    alert("한글/영문 포함 "+maxByte+"자를 초과 입력할 수 없습니다.");
	    str2 = str.substr(0,rlen);                                  //문자열 자르기
	    obj.value = str2;
	    fnChkByte(obj, maxByte);
	}else{
		if(typeNm == ""){
			document.getElementById('byteInfo').innerText = rbyte;
		}else{
			document.getElementById('byteInfoA').innerText = rbyte;
		}
	}
}
/*페이지 호출시 textarea 입력된 바이트 표기 해주기(2018.02.27 추가됨)*/
function readyByte(typeNm,nowVal){
	if(typeNm == ""){
		document.getElementById('byteInfo').innerText = nowVal;
	}else{
		document.getElementById('byteInfoA').innerText = nowVal;
	}
}
/*금액 옆에 3자리 단위로 콤마표시 및  원 단위 표기*/
function unit(ojt,type,on){
	var money = "";
	if(type != ""){
		fn_stripcharval(ojt);
		money = ojt.value;
	}else{
		money = ojt;
	}
	if(on != ""){
		$('#unitAmt'+on).val("/ "+money.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')+"원");
	}else{
		$('#unitAmt').val("/ "+money.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')+"원");
	}
}

/* 주소 GET Paramter 리턴  */
function getParamter(name){
	var href = location.href;
	var query = href.substr(href.indexOf("?") + 1);
	var params = query.split("&");
	if(params){
        for (var i = 0; i < params.length; i++) {
            var pair = params[i].split('=');
            if (decodeURIComponent(pair[0]) == name)
                return decodeURIComponent(pair[1]);
        }
        return null;
    }
}





