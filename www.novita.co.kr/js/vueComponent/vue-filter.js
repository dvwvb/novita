/** Vue 값 콤마 처리 **/
Vue.filter('numberWithCommas' , function (value){
	return numberWithCommas(value);
});
/** Vue 날짜 타입 변경. **/
Vue.filter('timeToDate' , function (stmp, returnType){
	var str = formatDate(stmp, returnType);
	if (!str) {
		return null;
	} else {
		return str.toUpperCase();
	}
});
/** yyyymmdd to yyyy년 mm월 **/
Vue.filter('yyyymmToStr' , function (value){

	if (!value) return ''
	value = value.toString();
	return value.substring(0,4) + "년 " + value.substring(4,6) + "월";

});

Vue.filter('numberPlusCommas' , function (value){
	return numberPlusCommas(value);
});

// 3자리 마다 콤마
function numberWithCommas(x) {
	if(x == null ){
		return 0;
	} else {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

}
function numberPlusCommas(x){
	if(x == null ){
		return 0;
	} else {
		var num = Math.abs(x);
		return numberWithCommas(num);
	}
}