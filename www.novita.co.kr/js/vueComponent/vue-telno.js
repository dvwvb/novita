Vue.component('vue-telno', {
	props: ['value', 'prefixlist'],
	data: function() {
		return {
		};
	},
	computed: {
		prefix: function() {
			if (!this.value) {
				return '010';
			}
			var values = this.value.split('-');
			if (values.length >= 1) {
				return values[0];
			} else {
				return '010';
			}
		},
		tel1: function() {
			if (!this.value) {
				return '';
			}
			var values = this.value.split('-');
			if (values.length >= 2) {
				return values[1];
			} else {
				return '';
			}
		},
		tel2: function() {
			if (!this.value) {
				return '';
			}
			var values = this.value.split('-');
			if (values.length >= 3) {
				return values[2];
			} else {
				return '';
			}
		},
	},
	methods: {
		emitInput : function(e) {
			var vm = this;
			var telno = vm.$refs.prefix.value + '-' + vm.$refs.tel1.value
				+ '-' + vm.$refs.tel2.value;
			vm.$emit('input', telno);
		},
		onchangeTel: function(e) {
			var vm = this;
			// 숫자 이외의 문자 삭제
			if (e.target.value) {
				var regex = /[^0-9]/g;
				e.target.value = e.target.value.replace(regex, '');
			}
			// 자리수 제한
			if(e.target.value && e.target.value.length > e.target.maxLength){
				e.target.value = e.target.value.slice(0, e.target.maxLength);
			}
			vm.emitInput();
		},
	},
	template : '\
		<div>\
		    <select ref="prefix" v-on:change="emitInput">\
		        <option v-for="(result, index) in prefixlist"\
					:value="result" :selected="result == prefix">{{ result }}</option>\
		    </select>\
			<input type="tel" :value="tel1" ref="tel1" maxlength="4" @keyup="onchangeTel" >\
		    <input type="tel" :value="tel2" ref="tel2" maxlength="4" @keyup="onchangeTel" >\
		</div>\
	',
});