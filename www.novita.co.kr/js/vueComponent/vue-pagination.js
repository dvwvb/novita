/*
 * Paging template
 * 	- methods : parent Vue method pageMove 선언 필수
 */
Vue.component('vue-pagination',{
	props: ['pagination'],
	data : function () {
		return {
		}
	},
	methods : {
		pageMove : function (page){
			page = page <= 0 ? 1 : page ;
			page = page > this.pagination.totalPageCount ? this.pagination.totalPageCount : page ;
			console.log("pageMove", page);
			/*this.currentPageNo = page;
			this.fetchData();*/
			if (this.pageMove) {
				this.$emit('page-move', page);
			} else {
				console.log("pagination componect parent 'pagemove(page)' method undefined!!!!");
			}
		}
	},
	template : '\
		<div class="paging">\
			<!--<template v-if="pagination.totalPageCount > pagination.pageSize">-->\
				<a v-if="pagination.currentPageNo > 1" href="javascript:;" v-on:click="pageMove(pagination.currentPageNo - 1)" class="prev">PREV</a>\
				<a v-if="pagination.currentPageNo <= 1" href="javascript:;" class="prev disabled">PREV</a>\
			<!--</template>-->\
			<p class="num">\
			<template v-for="pg in (pagination.firstPageNoOnPageList, pagination.lastPageNoOnPageList)" v-if="pg >= pagination.firstPageNoOnPageList">\
				<template v-if="pagination.currentPageNo === pg">\
					<a v-on:click="pageMove(pg)" href="javascript:;" class="active">{{pg}}</a>\
				</template>\
				<template v-if="pagination.currentPageNo != pg">\
					<a v-on:click="pageMove(pg)" href="javascript:;">{{pg}}</a>\
				</template>\
			</template>\
			</p>\
			<!--<template v-if="pagination.totalPageCount > pagination.pageSize">-->\
				<a v-if="pagination.currentPageNo < pagination.lastPageNo" href="javascript:;" v-on:click="pageMove(pagination.currentPageNo + 1)" class="next">NEXT</a>\
				<a v-else href="javascript:;" class="next disabled">NEXT</a>\
			<!--</template>-->\
		</div>'
});
