
/*
 * version 1.5.1
 --------------------------------------------------------------------
	core.DataSet Update 0.2 Object 2Depth Update
	core.ui 재호출시 기존이벤트 off 추가
	core.is Update 0.3 check value 
	core.scroll.maxScroll Update
	core.animation
	core.event
	core.debug
	core.method
	core.support
	core.ui return public
	core.event jQuery 3.x 대응
	core.scroll IOS 관련 수정
	
 --------------------------------------------------------------------
 * author HYUN
 */
 
(function (context, $, undefined) {
	"use strict";

	var APP_NAME = context.APP_NAME = "novita";
	var core = context[ APP_NAME ] || (context[ APP_NAME ] = {});

	core.$win = $(context);
	core.$doc = $(document);
	core.$html = $(document.documentElement);
	core.$html.addClass("js");
    ("ontouchstart" in context) && core.$html.addClass("touch");
    ("orientation" in context) && core.$html.addClass("mobile");
	
	/*	@@ core.is
	 *	Array
	 *	Object
	 *	Number
	 *	Empty
	 */
	core.is = {
		Array: function(v){
			return Array.isArray(v);
		},
		Object: function(v){
			return v.constructor === Object;
			//return (typeof v === "object" || typeof v === 'function') && (v !== null);
		},
		Number: function(v){
			return v.constructor === Number;
		},
		Empty: function(v){
			return ( v == "" || v == null || v == undefined || ( v != null && typeof v == "object" && !Object.keys(v).length ) ) ? true : false;
		},
		Function: function(v){
			return v.constructor === Function;
		},
		True: function(v){
			return v === true;
		},
		False: function(v){
			return v === false;
		}
	}
	
	core.support = {
		multiple : 'multiple' in document.createElement('input'),
		fileReader : (window.File && window.FileReader && window.FileList && window.Blob) ? true : false,
		touch: 'ontouchstart' in document.documentElement
	}
	
	/*	@@ core.debug
	 *	function : init(), 
				 : log(@@Object);
				 
		core.debug.log({
			string : data
		});
	 */ 
	core.debug = (function(){
		var $el = $("<div id='debug' style='position:fixed;left:0;top:0;background-color:rgba(0,0,0,0.5);color:#fff;z-index:9999'></div>");
		
		return {
			init: function(){
				$("body").append($el);
				this.init = null
			},
			log: function( msg ){
				var Message = this._getStringMessage(msg);
				$el.html(Message);
			},
			stack: function( msg ){
				var Message = this._getStringMessage(msg);
				$el.prepend(Message);
			},
			_getStringMessage: function( msg ){
				var output = "",
					date = new Date(),
					dateMS = "["+date.getMinutes()+":"+date.getSeconds()+"]";

				if(core.is.Object(msg)){
					for(var i in msg){
						output += i +" : " + msg[i] +" / ";
					}
				}else if(core.is.Array(msg)){
					output = msg.join(", ");
				}else output = msg;
				
				return "<span><em>"+ dateMS +"</em> "+ output + "</span>";
			},
		}
	})();
	
	/*	@@ core.observer
	 *	core.observer.on(eventName@@string, handler@@function, context);
	 *	core.observer.off(eventName@@string, handler@@function, context);
	 *	core.observer.notify(eventName@@string, data);
	 */
	core.observer = {
		handlers: {},
		on: function(eventName, fn, context, one){
			var events = eventName.split(" ");
			for(var eIdx = 0; eIdx < events.length; eIdx++){
				var handlerArray = this.handlers[events[eIdx]];
				if(undefined === handlerArray){
					handlerArray = this.handlers[events[eIdx]] = [];
				}
				handlerArray.push({ fn: fn, context: context, once: one});
			}
		},
		one: function(eventName, fn, context){
			this.on(eventName, fn, context, 1)
		},
		off: function(eventName, fn, context){
			var handlerArray = this.handlers[eventName];
			if(undefined === handlerArray) return;
			
			for(var hIdx = 0; hIdx < handlerArray.length; hIdx++){
				var currentHandler = handlerArray[hIdx];
				if (fn === currentHandler["fn"] && context === currentHandler["context"]){
					handlerArray.splice(hIdx, 1);
				}
			}
		},
		notify: function(eventName, data){
			var observer = this,
				handlerOffArray = [],
				handlerArray = this.handlers[eventName];
				
			if (undefined === handlerArray) return;

			for (var hIdx = 0; hIdx < handlerArray.length; hIdx++){
				var currentHandler = handlerArray[hIdx];
				currentHandler["fn"].call(currentHandler["context"], {type:eventName, data: data, fn:currentHandler["fn"]});
				
				if(currentHandler.once) handlerOffArray.push({type: eventName, fn: currentHandler["fn"]});
			}
			
			handlerOffArray.forEach(function(obj){
				observer.off(obj.type, obj.fn);
			})
		}
	};
	
	core.browser = (function(){
		var detect = {},
			win = context,
			na = win.navigator,
			ua = na.userAgent,
			lua = ua.toLowerCase(),
			match;
		
		detect.isMobile = typeof orientation !== "undefined";
		detect.isRetina = "devicePixelRatio" in window && window.devicePixelRatio > 1;
		detect.isAndroid = lua.indexOf("android") !== -1;
		detect.isOpera = win.opera && win.opera.buildNumber;
		detect.isWebKit = /WebKit/.test(ua);
		detect.isTouch = !!("ontouchstart" in window);

		match = /(msie) ([\w.]+)/.exec(lua) || /(trident)(?:.*rv.?([\w.]+))?/.exec(lua) || ["",null,-1];
		detect.isIE = !detect.isWebKit && !detect.isOpera && match[1] !== null;		//(/MSIE/gi).test(ua) && (/Explorer/gi).test(na.appName);
		detect.isIE6 = detect.isIE && /MSIE [56]/i.test(ua);
		detect.isIE7 = detect.isIE && /MSIE [567]/i.test(ua);
		detect.isOldIE = detect.isIE && /MSIE [5678]/i.test(ua);
		detect.ieVersion = parseInt(match[2], 10);		// 사용법: if (browser.isIE && browser.version > 8) { // 9이상인 ie브라우저

		detect.isWin = (na.appVersion.indexOf("Win")!=-1);
		detect.isMac = (ua.indexOf("Mac") !== -1);
		detect.isLinux = (na.appVersion.indexOf("Linux")!=-1);

		detect.isChrome = (ua.indexOf("Chrome") !== -1);
		detect.isGecko = (ua.indexOf("Firefox") !==-1);
		detect.isAir = ((/adobeair/i).test(ua));
		detect.isIOS = /(iPad|iPhone)/.test(ua);
		detect.isSafari = !detect.isChrome && (/Safari/).test(ua);
		detect.isIETri4 = (detect.isIE && ua.indexOf("Trident/4.0") !== -1);

		detect.msPointer = na.msPointerEnabled && na.msMaxTouchPoints && !win.PointerEvent;
		detect.pointer = (win.PointerEvent && na.pointerEnabled && na.maxTouchPoints) || detect.msPointer;

		detect.isNotSupporte3DTransform = /android 2/i.test(lua);
		detect.isGingerbread = /android 2.3/i.test(lua);
		detect.isIcecreamsandwith = /android 4.0/i.test(lua);
		detect.hash = window.location.hash;

		if(detect.isAndroid) {
			detect.androidVersion = (function(match){ if(match){ return match[1]|0; } else { return 0; } })(lua.match(/android ([\w.]+)/));
		} else if(detect.isIOS) {
			detect.iosVersion = (function(match){ if(match){ return match[1]|0; } else { return 0; } })(ua.match(/OS ([[0-9]+)/));
		}
		return detect;
	})();
	
	/*	@@ core.event
	 *	core.observer.notify("READY");
	 *	core.observer.notify("LOAD");
	 *	core.observer.notify("SCROLL);
	 *	core.observer.notify("RESIZE");
	 *	core.observer.notify("WHEEL_DOWN", "WHEEL_UP");
	 *	core.observer.notify("LOAD");
	 */
	 
	core.event = (function(){
		var evt = {
			init: function(){
				var Event = {
					screen: "scroll resize orientationchange",
					wheel: "wheel"
				}
				//core.$doc.ready(this.ready); // jquery 3.x 대응
				//core.$win.on('load', this.load);
				document.addEventListener("DOMContentLoaded", this.ready);
				window.addEventListener("load", this.load);
				core.$win.on(Event.screen, this.screen);
				core.$win.on(Event.wheel, this.wheel);
			},
			ready: function(){
				core.$body = $("body");
				evt.initUI();
				
				core.observer.notify("READY");
				core.observer.notify("SCROLL", false);
				core.observer.notify("RESIZE", false);
			},
			load: function(){
				//core.$body = $("body");
				core.observer.notify("LOAD");
			},
			screen: function(e){
				var e = (e.type).toUpperCase();
				core.observer.notify(e, true);
			},
			wheel: function(e){
				var delta = (e.originalEvent.deltaY < 0) ? 100 : -100;
				if(delta > 0){
					core.observer.notify("WHEEL_UP", {dir:-1});
				}else{
					core.observer.notify("WHEEL_DOWN", {dir:1});
				}

				
				if(core.browser.ieScrollBug){//if(core.browser.isIE){
					e.preventDefault();
					var left = context.pageXOffset;
					var top = context.pageYOffset - delta;
					
					context.scrollTo(left, top);
				}
			},
			initUI: function(){
				var ui = core.ui,
					ins = document.body._ui || {};
				
				for(var name in ui){
					if(ui[name].init && !ins[name]){
						ui[name].init();
						ins[name] = true;
					}
				}
			}
		}
		evt.init();
	})();
	
	/*	@@ core.screen
	 *	return { width, height, scrollTop}
	 *	callBack
	 *		$(window).ready(){}	core.observer.notify("READY");
	 *		$(window).load(){}		core.observer.notify("LOAD");
	 *		$(window).scroll(){}	core.observer.notify("SCROLL");
	 *		$(window).resize(){}	core.observer.notify("RESIZE");
	 */
	core.screen = (function(){
		var me = {
			data : {
				width : context.innerWidth,
				height : context.innerHeight,
				scrollTop : core.$win.scrollTop(),
				scrollLeft : document.documentElement.scrollLeft
			},
			init: function(){
				if(context.orientation > 0){
					core.$html.addClass("landscape");
				}else{
					core.$html.removeClass("landscape");
				}
				core.observer.on("READY LOAD RESIZE", $.proxy(this.detect.all, this.detect));
				core.observer.on("SCROLL", this.detect.scroll);
				core.observer.on("ORIENTATIONCHANGE", this.detect.orientation);
			},
			detect: {
				all: function(){
					this.size();
					this.scroll();
				},
				size: function(){
					me.data.width = context.innerWidth;
					me.data.height = context.innerHeight;
				},
				scroll: function(){
					me.data.scrollTop = core.$win.scrollTop();
					me.data.scrollLeft = document.documentElement.scrollLeft;
				},
				orientation: function(){
					if(context.orientation > 0){
						core.$html.addClass("landscape");
					}else{
						core.$html.removeClass("landscape");
					}
				}
			},
		}
		me.init();
		return me.data;
	})();
	
	/*	@@ core.scroll
	 *	event : SCROLL, SCROLL_DOWN, SCROLL_UP, SCROLL_FIRST, SCROLL_LAST
	 *	public : enable(), disable(), to(direction[string(first, last) || number], duration) 
	 */
	core.scroll = (function(){
		var me = {
			originTop : core.screen.scrollTop,
			originLeft: core.screen.scrollLeft,
			init: function(){
				core.observer.on("SCROLL", this._scroll);
			},
			_scroll: function(obj){
				core.screen.scrollTop = core.$win.scrollTop();
				core.screen.scrollMax = me.calc.MaxScroll();
				core.screen.scrollPer = me.calc.Percent();
				
				if(core.screen.scrollTop < me.originTop) core.observer.notify("SCROLL_UP", obj.data);
				if(core.screen.scrollTop > me.originTop) core.observer.notify("SCROLL_DOWN", obj.data);
				if(core.screen.scrollTop < me.originTop || core.screen.scrollTop > me.originTop) core.observer.notify("SCROLL_VER");
				
				if(core.screen.scrollLeft < me.originLeft) core.observer.notify("SCROLL_LEFT");
				if(core.screen.scrollLeft > me.originLeft) core.observer.notify("SCROLL_RIGHT");
				if(core.screen.scrollLeft > me.originLeft || core.screen.scrollLeft > me.originLeft) core.observer.notify("SCROLL_RIGHT");
				core.observer.notify("SCROLL_HOR");
				
				if(core.screen.scrollTop < 1) core.observer.notify("SCROLL_FIRST");
				if(core.screen.scrollTop > core.screen.scrollMax-1) core.observer.notify("SCROLL_LAST");
				
				me.originTop = core.screen.scrollTop;
				me.originLeft = core.screen.scrollLeft;
			},
			calc : {
				MaxScroll: function(){
					return document.documentElement.scrollHeight - core.screen.height;
				},
				Percent: function(){
					return parseInt(core.screen.scrollTop/core.screen.scrollMax * 100);
				},
				Direction: function(dir){
					switch(dir){
						case "first" : return 0;
						case "last" : return me.calc.MaxScroll();
						default : return dir;
					}
				},
				Duration: function(dur){
					return dur !== undefined ? dur : 700;
				}
			},
			public: {
				enable: function(){
					core.$body.css("overflow", "");
				},
				disable: function(){
					core.$body.css("overflow","hidden");
				},
				to: function(direction, duration, fn){
					if(me.isScroll) return;
					me.isScroll = true;
					
					var arg = arguments,
						argLast = arg[arg.length-1],
						dir = me.calc.Direction(direction),
						dur = me.calc.Duration(duration);
					
					if(core.screen.scrollTop == dir) return me.isScroll = false;
					
					//as-is: $("html, body")
					core.$html.stop().animate({
						"scrollTop" : dir
					}, dur, function(){ 
						//if(this.tagName == 'BODY'){}
						me.isScroll = false;
						if(core.is.Function(argLast)) argLast();
					});
				},
				toElem: function(el, dur){
					var $el = $(el);
					var pos = $el.offset().top;
					var $scrollParent = core.methods.ScrollParent($el);
					this.to(pos, dur);
					
					$scrollParent.stop().animate({
						scrollTop: pos,
					}, dur)
				},
				ieScrollBug: function(e){
					core.browser.ieScrollBug = true;
				}
			}
		}
		me.init();
		return me.public;
	})();
	
	/*	core.ui
	 *	@param {String} name
	 *	@param {String} selector
	 *	@paran {Object} option
	 
	 *	ui(name, selector);
	 *	return ui.events.public
	 */
	core.ui = function(name, container, option){
		if(!core.ui[name]) throw new Error("not ui "+name);
		var $container = $(container).filter(function(){
				return this.parentElement.nodeName !== "PRE";
			}),
			length = 0,
			supr = [];

		$container.each(function(){
			this._ui = this._ui || {};

			var	hasUI = this._ui[name];
			if(hasUI){
				//이미 UI 구성됐을경우 새로 선언한 변수에 기존에 있는 public 담아줌
				console.dir('already created UI : '+name);
				supr.push(hasUI);
			}else{
				var UI = new core.ui[name](this, option);
				UI.events._init();
				this._ui[name] = UI.events.public || "undefined public";
				supr.push(this._ui[name]);
			}
			++length;
		});

		if(length == 1) supr = supr[0];
		return supr;
	}
	
	/*	@@core.Selector
	 *	var selector = core.Selector(".layer",{
			body : ".body",
			close : ".btn_close"
		});
		selector.$container = $(".layer");
		selector.$body = $(".layer").find(".body");
		selector.$close = $(".layer").find(".btn_close");
	 */
	core.Selector = function(container, selector){
		function modeling(){
			for(var i in selector){
				selectors[i] = selectors.container.find(selector[i]);
			}
		}
		var selectors = { container : $(container) };
		modeling();
		
		selectors._dataSet = selectors.container.data();
		selectors.reInit = function(){
			modeling();
		}
		return selectors;
	}
	
	core.DataSet = function(dataSet, opts){
		function modeling(){
			for(var key in dataSet){
				if(dataSet[key].constructor === Object) {
					opts[key] = opts[key] || {};
					for(var i in dataSet[key]){
						opts[key][i] = dataSet[key][i];
					}
				}else{
					opts[key] = dataSet[key];
				}
			}
		}
		modeling();
		opts.reInit = function(){
			modeling();
		}
		return opts;
	}
	
	core.Data = function(_orgData, _data){
		// var options = _data || _orgData,
			// data = {};
		
		// Object.keys(_orgData).map(function(key, index){
			// data[key] = options[key] || _orgData[key];
		// });
		// var a = $.extend({}, _orgData, _data)
		
		// console.dir(_data);
		// console.dir(a);
		
		return $.extend({}, _orgData, _data);
	}
	
	core.OFFSET = {
		scrollParent: function($el, includeHidden){
			var position = $el.css( "position" ),
				excludeStaticParent = position === "absolute",
				overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
				scrollParent = $el.parents().filter( function() {
					var parent = $( this );
					if ( excludeStaticParent && parent.css( "position" ) === "static" ) {
						return false;
					}
					return overflowRegex.test( parent.css( "overflow" ) + parent.css( "overflow-y" ) +
						parent.css( "overflow-x" ) );
				} ).eq( 0 );

			return position === "fixed" || !scrollParent.length ? $( window ) : scrollParent;
		},
		DOMRect: function($el){
			return $el.get(0).getBoundingClientRect();
		},
		Viewport: function(obj){
			var totalHeight = obj.$wrap.outerHeight();
			var offTop = core.OFFSET.DOMRect(obj.$wrap).top;
			var limitHeight = window.innerHeight;
			var minusHeight = 0;
			
			if(obj.$plus){
				obj.$plus.each(function(){
					totalHeight += $(this).outerHeight(true);
				});
			}
			if(obj.$minus){
				obj.$minus.each(function(){
					minusHeight += $(this).outerHeight(true);
				});
			}

			return {
				show: offTop + totalHeight - minusHeight >= limitHeight ? false : true,
				spaceTop: totalHeight < offTop,
			}
		}
	}
	
	core.methods = {
		object2Array: function( value ){
			var arr = [];
			for(var i in value){
				arr.push(value[i])
			}
			return arr;
		},
		MinNumber: function(arr){
			arr = this.object2Array(arr);
			arr = arr.sort(function(a, b){
				return a-b;
			});
			return arr[0];
		},
		MaxNumber: function(arr){
			arr = this.object2Array(arr);
			arr = arr.sort(function(a, b){
				return b-a;
			});
			return arr[0];
		},
		Random: function(max, min){
			return Math.floor(Math.random() * max) + min;
		},
		RandomExceptValue: function(array, value){
			var max = array.length;
			var ran = core.methods.Random(max, 0);
			return array[ran] !== value
			? ran
			: max > 1 
				? core.methods.RandomExceptValue(array, value) 
				: ran;
		},
		RandomExceptIndex: function(array, idx){
			var max = array.length;
			var ran = core.methods.Random(max, 0);
			return array[ran] !== array[idx]
			? ran
			: max > 1 
				? core.methods.RandomExceptIndex(array, idx) 
				: ran;
		},
		Shuffle: function(array){
			var limit = array.length;
			var arr = array.slice();
			
			while(limit > 0){
				arr.length = limit;
				var randomIndex = core.methods.RandomExceptIndex(arr, --limit);
				//var randomIndex = core.methods.RandomExceptValue(arr, array[--limit]);
					
				var tempValue = array[limit];
				array[limit] = array[randomIndex];
				array[randomIndex] = tempValue;
			}
			return array;
		},
		Clone: function(value){
			return JSON.parse(JSON.stringify(value));
		},
		ScrollParent: function($el){
			var $parents = $el.parents().not('html, body'),
				scrollParent = [];
				
			$parents.each(function(i){
				var hasScroll = this.scrollHeight > this.clientHeight
				|| $(this).css('overflow').indexOf('scroll') > -1;
				
				scrollParent[i] = hasScroll ? $(this) : $('html, body');
			});
			
			return scrollParent[0];
		}
	}

	var ui = core.ui;

    ui.POPUP = {
		type: 'layer',
		//maxHeight: '95%',
		activeClass: 'active',
		disabledClass: 'disabled',
		disabled: false,
		scrollTop: null,
		opener: [],
		init: function(){
			this.bindEvent();
		},
		bindEvent: function(){
			var $body = $('body');
			$body.on('click', '.ui-popup-call, [data-popup-target]', this.detectTarget);
			$body.on('click', '.ui-popup .btn-close, [data-popup-close]', this.closePopup);
			$body.on('click.dim', '.ui-popup', this.detectClickDim);
			
			$body.on('POPUP_OPEN', '.ui-popup', this.openTrigger);
			$body.on('POPUP_CLOSE', '.ui-popup', this.closeTrigger);
		},
		detectTarget: function(){
			var $me = $(this);
			if($me.hasClass(ui.POPUP.disabledClass)) return;
			
			var data = $me.data(),
				$target = (data.document) ? $(data.popupTarget, parent.document) : $(data.popupTarget),
				popupInfo = data.popup || {type: 'layer'};

			if($target.length < 1) return;
			
			//memory opener => accessibility
			top[APP_NAME].ui.POPUP.opener.push({
				$call: $me, 
				$targetPopup: $target, 
				$parentPopup: frameElement ? $(frameElement).closest('.ui-popup') : $me.closest('.ui-popup')
			});
			ui.POPUP.detectPopup($target, popupInfo, data);
			return false;
		},
		detectClickDim: function(e){
			var $target = $(e.target),
			    isDim = $target.hasClass('ui-popup');
			
			if(isDim) $target.trigger('POPUP_CLOSE');
		},
		openTrigger: function(e, fn){
			//ui.POPUP.detectImage($(this));
			ui.POPUP.openPopup($(this));
		},
		closeTrigger: function(){
			ui.POPUP.closePopup.call(this);
		},
		detectPopup: function($target, popup, data){
			switch(popup.type){
				case 'layer' :
					//ui.POPUP.detectImage($target);
					ui.POPUP.openPopup($target, data);
				break;
				case 'link' :
					$target.load(popup.url, $.proxy(function(){
						//ui.POPUP.detectImage($target);
						ui.POPUP.openPopup($target, data);
					},this));
				break;
				case 'iframe' :
					//ui.POPUP.detectImage($target);
					ui.POPUP.openPopup($target, data);
				break;
				case 'window' :
					var left = (core.screen.width - popup.width) / 2 + window.screenX,
						top = (core.screen.height - popup.height) / 2 + window.screenY,
						option = "width=" + popup.width + ", height=" + popup.height + ", top=" + top + ", left=" + left + ", scrollbars=yes, toolbar=no, resizable=yes",
						newWin = window.open(popup.url, '', option);
					if(window.focus) newWin.focus();
				break;
			}
		},
		detectImage: function($target){
			var $img = $target.find('img');

			if($img.length > 0){
				var complete = 0;

				$img.each(function(){
					var img = new Image();
					img.onload = function(){
						complete++;
						if($img.length == complete){
							ui.POPUP.openPopup($target);
						}
					}
					img.onerror = function(){
						complete++;
						if($img.length == complete){
							ui.POPUP.openPopup($target);
						}
					}
					img.src = this.src;
				});
			}else{
				ui.POPUP.openPopup($target);
			}
		},
		openPopup: function($popup, data){
			$popup.addClass('active')
			.trigger('COMPLETE_POPUP_OPEN');

			ui.POPUP.detectHeight($popup);
			ui.POPUP.scrollDisable($popup);
			ui.POPUP.focusPopup($popup);
			if(data.targetPosition) ui.POPUP.setPosition($popup, data);

			return false;
		},
		closePopup: function(){
			var isIframe = false,//self !== top,
				$popup = isIframe ? $(frameElement).closest('.ui-popup') : $(this).closest('.ui-popup'),
				opener = top[APP_NAME].ui.POPUP.opener;
			
			$popup.removeClass('active')
			.trigger('COMPLETE_POPUP_CLOSE');

			if(opener.length < 1){
				ui.POPUP.scrollEnable(isIframe);
				return;
			}

			var last = opener.length - 1,
				$handleCall = opener[last].$call,
				$parentPopup = opener[last].$parentPopup;

			opener.splice(last, 1);
			
			$(document).off('keydown.accessibility');
			ui.POPUP.focusPopup($parentPopup);
			//$popup.children('.content').css('height', 'auto');

			if(opener.length < 1 /*$popups.filter('.active').length < 1*/){
				ui.POPUP.scrollEnable(isIframe);
				$handleCall.focus();
			}
		},
		focusPopup: function($popup){
			if($popup.length < 1) return;
			var $iframe = $popup.find('iframe'),
				isIframe = $iframe.length > 0,
				$content = $popup.children('.content'),
				$doc = !isIframe ? $(document) : $($iframe[0].contentDocument);
				
			$content.attr('tabindex', 0).focus();
			
			var focusElements = [
				'a:not([disabled]):visible',
				'button:not([disabled]):visible',
				'input:not([disabled]):visible',
				'select:not([disabled]):visible',
				'textarea:not([disabled]):visible',
				'[tabindex]:not([disabled]):not([tabindex="-1"]):visible'
			].join(',');
				
			$doc.off('keydown.accessibility').on('keydown.accessibility', function(e){
				var $focusable = !isIframe ? $content.find(focusElements) : $iframe.contents().find(focusElements),
					$group = $content.add($focusable),
					limit = $group.length - 1,
					activeIndex = $group.index(this.activeElement),
					prevFocus = e.shiftKey && e.keyCode == 9,
					nextFocus = !e.shiftKey && e.keyCode == 9,
					detectFirst = activeIndex <= 0,
					detectLast = activeIndex >= limit;

				if(prevFocus && detectFirst){
					$group.last().focus();
					return false;
				}
				if(nextFocus && detectLast){
					$group.first().focus();
					return false;
				}
			});
		},
		scrollDisable: function($popup){
			//if(ui.POPUP.disabled) return;
			if($('.ui-popup.active').length > 1) return;
			
			// ui.POPUP.scrollTop = window.pageYOffset;
			// core.$body.css({
			// 	overflow: 'hidden',
			// 	position: 'fixed',
			// 	top: -ui.POPUP.scrollTop+'px',
			// 	width: '100%'
			// }).attr('data-scroll', ui.POPUP.scrollTop);
			core.$html.addClass('scroll-hidden');
		},
		scrollEnable: function(iframe){
			var win = iframe ? parent : window,
				$html = iframe ? $('html', parent.document) : $('html'),
				scrollTop = iframe ? $body.attr('data-scroll') : ui.POPUP.scrollTop;

			// $html.css({
			// 	overflow: 'visible',
			// 	position: 'static',
			// 	top: 0,
			// 	width: 'auto'
			// });

			// win.scrollTo(0, scrollTop);
			$html.removeClass('scroll-hidden');
		},
		detectHeight: function($target){
			if(!ui.POPUP.maxHeight) return;

			var $content = $target.children('.content'),
				$header = $content.children('.header'),
				$body = $content.children('.body'),
				isOverScreen = $content.outerHeight(true) > window.innerHeight;

			if(isOverScreen){
				$content.css('height', ui.POPUP.maxHeight);
			}else{
				$content.css('height', 'auto');
			}
		},
		setPosition: function($popup, data){
			var $popContent = $popup.children('.content'),
				$posTarget = $(data.targetPosition),
				rect = $posTarget[0].getBoundingClientRect();
			
			$popContent.css({
				position: "absolute",
				left: rect.left,
				top: rect.top
			})
		},
		open: function(obj){
			var type = obj.type,
				$target = $(obj.target);
			
			ui.POPUP.detectPopup($target, obj);
		}
	}
	
	ui.TREE = {
		data: {
			duration: 400,
			sync: false,
		},
		duration: 400,
		sync: false,
		init: function(){
			this.bindEvent();
			this.set();
		},
		bindEvent: function(){
			core.$body.on('click', '.ui-tree.handle-top .top, .ui-tree .btn-toggle', this.toggleSub);
		},
		set: function(){
			this.activeSub();
			this.setPreview();
		},
		activeSub: function(){
			$('.ui-tree').find('.group.active').children('.sub').show();
		},
		setPreview: function(){
			$('.ui-tree').find('.sub.preview').each(function(){
				var $me = $(this),
					data = core.Data(ui.TREE.data, $me.data('tree'));

				$me.css({'height': data.height});
			});
		},
		toggleSub: function(e, syncTrigger){
			var $btn = $(this),
				$group = $btn.closest('.top').parent(),
				$groupUl = $group.parent(),
				$sub = $group.children('.sub'),
				isActive = $group.hasClass('active'),
				isPreview = $sub.data('tree'),
				data = core.Data(ui.TREE.data, $groupUl.data('tree'));

			var subInfo = {
				$group: $group,
				$target: $sub,
				duration: data.duration,
				preview: isPreview,
				sync: data.sync
			}

			if(isActive || syncTrigger){
				ui.TREE.closeSub(subInfo);
			}else{
				ui.TREE.openSub(subInfo);
			}
		},
		openSub: function(obj){
			obj.$group.addClass('active');
			obj.$group.closest('.ui-tree').trigger('open-start');

			if(obj.preview){
				var $clone = obj.$target.clone().css({'height':'auto','display':'none !important'});
				obj.$target.after($clone);
				var originHeight = $clone.outerHeight(true);
				$clone.remove();

				obj.$target.animate({
					height: originHeight
				}, obj.duration, function(){
					obj.$group.closest('.ui-tree').trigger('open-start');
				});
			}else{
				obj.$target.slideDown(obj.duration, function(){
					obj.$group.closest('.ui-tree').trigger('open-end');
				});
			}

			if(obj.sync){
				var $siblingsGroup = obj.$group.siblings();
				$siblingsGroup.children('.top').find('.btn-toggle').trigger('click', true);
			}
		},
		closeSub: function(obj){
			obj.$group.removeClass('active');

			if(obj.preview){
				obj.$target.animate({
					height: obj.preview.height
				}, obj.duration);
			}else{
				obj.$group.closest('.ui-tree').trigger('close-start');
				obj.$target.slideUp(obj.duration, function(){
					obj.$group.closest('.ui-tree').trigger('close-end');
				});
			}
		}
	}
	
	ui.SEARCH_HIGHLIGHT = {
		data: {
			equals: true,
		},
		listItem: [],
		init: function(){
			this.bindEvent();
		},
		bindEvent: function(){
			var $el = $('.ui-search');
			$el.on('focusin', '.input-wrap input', this.setData);
			$el.on('keyup', '.input-wrap input', this.filterValue);
		},
		setData: function(e){
			var $input = $(this),
				$container = $input.closest('.ui-search'),
				index = $('.ui-search').index($container);

			var items = {
				html: [],
				text: [],
				data: $.extend({}, ui.SEARCH_HIGHLIGHT.data, $container.data('search'))
			}

			items.html = $container.children('.list').children().get().map(function(el){
				items.text.push(el.innerText);
				return el.outerHTML;
			});

			ui.SEARCH_HIGHLIGHT.listItem[index] = ui.SEARCH_HIGHLIGHT.listItem[index] || items;
		},
		SplitTag: function(html){
			var idx = -1,
				strArr = [];
			
			html.split('').forEach(function(v){
				if(v == '<'){
					idx++;
					strArr[idx] = strArr[idx] || {};
					strArr[idx].tag = true;
					strArr[idx].html = v;
				}else if(v == '>'){
					strArr[idx].html += v;
					idx++;
				}else{
					strArr[idx] = strArr[idx] || {};
					strArr[idx].html = strArr[idx].html || '';
					strArr[idx].html += v;
				}
			});
			
			return strArr;
		},
		filterValue: function(){
			var $input = $(this),
				$container = $input.closest('.ui-search'),
				$list = $container.children('.list'),
				index = $('.ui-search').index($container),
				search = this.value,
				searchItem = ui.SEARCH_HIGHLIGHT.listItem[index],
				data = searchItem.data;

			if(search.trim().length < 1){
				return $list.html(searchItem.html);
			}

			var equals = data.equals ? 'g': 'gi',
				pattern = new RegExp(search, equals),
				searchText = '';
				
			searchItem.text.forEach(function(v, i){
				//정규식에 특수문자로 인해 걸림
				//var test = pattern.test(v);
				var test = data.equals ? 
				v.indexOf(search) > -1 :
				v.toUpperCase().indexOf(search.toUpperCase()) > -1;
				
				if(test){
					var tag = ui.SEARCH_HIGHLIGHT.SplitTag(searchItem.html[i]);
						
					var result = tag.map(function(splitValue){
						return splitValue.tag ? 
						splitValue.html : 
						splitValue.html.replace(pattern, function(o){
							return '<mark>'+ o +'</mark>';
						})
					}).join('');
						
					searchText += result;
				}
				/* old
				var isInclude = v.match(new RegExp(search, 'i'));

				if(isInclude){
					var html = searchItem.html[i],
						
						//ERROR						
						//	*device - safari,ios
						//tag = html.split(/(?<=>)([\w\s\ㄱ-힣]+)(?=<)/),
						//
						//tag = html.split(/(?!<=>)([\w\s\ㄱ-힣\~`!@#$%^&*();:'",.?]+)(?=<)/);
						tag = ui.SEARCH_HIGHLIGHT.SplitTag(searchItem.html[i]);
						//pattern = new RegExp(/search/, 'gi');
						
					var pattern = new RegExp(search, 'gi');
						
					var result = tag.map(function(v){
						return v.tag ? v.html : v.html.replace(pattern, '<mark>'+ search +'</mark>');
					}).join('');
						
					searchText += result;
				}
				*/
			});

			var $include = searchText.length > 0 ? $(searchText) : '<li class="none-result">검색 결과가 없습니다.</li>';
			$list.scrollTop(0).html($include);
		}
	}
	
	ui.STICKY = {
		init: function(){
			core.observer.on('LOAD', this.set);
			this.bindEvent();
		},
		set: function(){
			$('.ui-sticky-wrapper').not('.disabled').each(function(){
				this.style.height = this.offsetHeight+'px';
				$(this).addClass('sticky-init');
			});
		},
		reHeight: function(data){
			var $stickyWrapper = data.$item.parent();
			$stickyWrapper.css('height', data.$item[0].offsetHeight);
			var data = ui.STICKY.getData($stickyWrapper[0]);
			setTimeout(function(){
				ui.STICKY.detectContainer(data);
			}, 0)
		},
		bindEvent: function(){
			core.observer.on('SCROLL', this.detectScroll);
		},
		getData: function( tar ){
			var $me = $(tar),
				$item = $me.children(),
				$container = $me.closest('.ui-sticky-container'),
				$wrapper = $me.closest('.ui-sticky-wrapper'),
				standardPos = Object.keys($item.data('sticky'))[0],
				stickyValue = $item.data('sticky')[standardPos],
				stickyTargetValue = typeof stickyValue !== 'string' ? stickyValue : $(stickyValue)[0].getBoundingClientRect().bottom,
				offset = tar.getBoundingClientRect()[standardPos],
				isSticky = (standardPos == 'top') ? offset <= stickyTargetValue : offset <= core.screen.height - stickyTargetValue;
				
			return {
				$container: $container,
				$wrapper: $wrapper,
				$item: $item,
				standardPos: standardPos,
				stickyValue: stickyTargetValue,
				isSticky: isSticky,
				height: $me.outerHeight(true),
			}
		},
		detectScroll: function(){
			$('.ui-sticky-wrapper').not('.disabled').each(function(){
				var data = ui.STICKY.getData(this);
				ui.STICKY.detectSticky(data);
				ui.STICKY.detectContainer(data);
				ui.STICKY.detectHorizontal(data);
			});
		},
		detectHorizontal: function(data){
			var scrollLeft = data.isSticky ? -core.screen.scrollLeft : 0;
			data.$item.css({
				'transform': 'translateX('+ scrollLeft +'px)'
			})
		},
		detectSticky: function(data){
			if(data.isSticky){
				ui.STICKY.active(data);
			}else{
				ui.STICKY.deActive(data);
			}
		},
		detectContainer: function(data){
			if(data.$container.length > 0){
				var rectBottom = data.$container[0].getBoundingClientRect().bottom,
					gap = data.standardPos == 'top' ? rectBottom - data.height : rectBottom - core.screen.height,
					transY = data.stickyValue + gap;
				
				if(gap < 0){
					if(data.standardPos == 'bottom') transY *= -1;
					data.$item.css(data.standardPos, transY);
				}else{
					data.$item.css(data.standardPos, data.stickyValue);
				}
			}
		},
		active: function(o){
			if(o.$item.hasClass('sticky')) return;

			o.$item.css({
				position: 'fixed',
				//width: o.$wrapper.outerWidth(),
				//[o.pos]: o.stickyPos ,,,,,,,,, IE error
			});
			
			o.$item.css(o.standardPos, o.stickyValue)
			.addClass('sticky').parent().addClass('on');

			o.$wrapper.trigger('sticty-in');
			ui.STICKY.reHeight(o);
		},
		deActive: function(o){
			if(!o.$item.hasClass('sticky')) return;
			o.$item.css({
				position: 'static',
				//width: 'auto',
			})
			.removeClass('sticky').parent().removeClass('on');
			
			o.$wrapper.trigger('sticty-out');
			ui.STICKY.reHeight(o);
		}
	}
	
	ui.SELECT = {
		el: '.ui-select',
		data: {
			index: false,
		},
		activeClass: 'active',
		disabledClass: 'disabled',
		init: function(){
			this.bindEvent();
			this.set();
		},
		bindEvent: function(){
			core.$body.on("click", this.el+' >button', this.enterSelect);
			core.$body.on("click", this.el+' >input', this.enterSelect);
			core.$body.on("click", this.el+':not(".multi") >ul >li', this.clickOption);
			core.$body.on("click", this.el+'.multi >ul >li.all', this.clickMultiAllOption);
			core.$body.on("click", this.el+'.multi >ul >li:not(".all")', this.clickMultiOption);
			core.$doc.on("click.leaveSelect", this.leaveSelect);

			core.$body.on("SELECT", this.el, this.triggerSelect);
		},
		set: function(){
			$(ui.SELECT.el).each(function(){
				var $el = $(this),
					data = core.Data(ui.SELECT.data, $el.data('select'));
					
				if(data.index){
					$el.trigger('SELECT', data.index);
				}
			});
		},
		triggerSelect: function(){
			var selectIndex = [].slice.call(arguments, 1),
				$items = $(this).find('>ul >li');

			for(var i in selectIndex){
				var index = selectIndex[i]
				$items.eq(index).trigger('click');
			}
		},
		leaveSelect: function(e){
			var $select = $(ui.SELECT.el);

			if(!$(e.target).closest($select).length){
				$select.removeClass(ui.SELECT.activeClass);
			}
		},
		enterSelect: function(){
			var $select = $(this).closest(ui.SELECT.el),
				$selectSiblings = $(ui.SELECT.el).not($select);

			$selectSiblings.removeClass(ui.SELECT.activeClass);
			if($select.hasClass(ui.SELECT.disabledClass)) return;

			$select.toggleClass(ui.SELECT.activeClass);        
			ui.SELECT.setPosition($select);
		},
		clickOption: function(){
			var $item = $(this),
				$select = $item.closest(ui.SELECT.el),
				$btn = $select.children('button'),
				value = this.innerHTML,
				idx = $item.index();

			if($item.hasClass(ui.SELECT.disabledClass)) return;
			if($select.hasClass('parent')) ui.SELECT.setChildren($select.data('name'), idx);

			ui.SELECT.setActiveItem($item);
			ui.SELECT.setValue($btn, value);
			ui.SELECT.hideSelect($select);
		},
		clickMultiAllOption: function(){
			var $item = $(this),
				$items = $item.siblings(),
				$select = $item.closest(ui.SELECT.el),
				$btn = $select.children('button'),
				isActive = $item.hasClass(ui.SELECT.activeClass),
				limit = $select.data('limit') || $items.length;

			$item.toggleClass(ui.SELECT.activeClass);

			if(isActive) $items.removeClass(ui.SELECT.activeClass);
			else $items.addClass(ui.SELECT.activeClass);

			ui.SELECT.detectActiveItem($items, $btn)
		},
		clickMultiOption: function(){
			var $item = $(this),
				$items = $item.add($item.siblings()),
				$select = $item.closest(ui.SELECT.el),
				$btn = $select.children('button'),
				limit = $select.data('limit') || $items.length,
				isLimit = $items.filter('.active').length >= limit,
				isSelected = $item.hasClass(ui.SELECT.activeClass);
			
			if($item.hasClass(ui.SELECT.disabledClass)) return;
			if(!isSelected && isLimit) return alert('최대'+ limit+ '개 선택 가능합니다.')

			ui.SELECT.setActiveMultiItem($item, $items);
			ui.SELECT.detectActiveItem($items, $btn);
		},
		setActiveItem: function($item){
			$item.addClass(ui.SELECT.activeClass);
			$item.siblings().removeClass(ui.SELECT.activeClass);
		},
		setActiveMultiItem: function($item, $items){
			var $itemFilterAll = $items.filter('.all'),
				$itemsNotAll = $items.not($itemFilterAll);

			$item.toggleClass(ui.SELECT.activeClass);

			var isActive = $item.hasClass(ui.SELECT.activeClass),
				isAllActive = $itemsNotAll.filter('.'+ui.SELECT.activeClass).length == $itemsNotAll.length;

			if(!isActive){ //선택해제될 경우
				$itemFilterAll.removeClass(ui.SELECT.activeClass)
			}
			if(isAllActive){ //모두선택됐을 경우
				$itemFilterAll.addClass(ui.SELECT.activeClass)
			}
		},
		setValue: function($btn, value){
			$btn.html(value);
		},
		setChildren: function(name, idx){
			var $group = $(ui.SELECT.el).filter('[data-name='+ name +']'),
				$children = $group.not('.parent');

			$children.removeClass('enable')
			.eq(idx).addClass('enable');
		},
		detectActiveItem: function($items, $btn){
			var max = $items.length,
				value = [];

			$items.filter('.active').each(function(){
				value.push(this.innerHTML)
			});

			var allSelect = (max == value.length),
				noneSelect = value.length < 1;

			if(allSelect) value = ['모두선택'];
			if(noneSelect) value = [$btn.data('placeholder')];
			
			ui.SELECT.setValue($btn, value.join(', '));
		},
		setPosition: function($select){
			var $options = $select.children('ul'),
				selectHeight = $select.outerHeight(true),
				offTop = $select.get(0).getBoundingClientRect().top,
				totalHeight = selectHeight + $options.outerHeight(true),
				viewport = offTop + totalHeight >= innerHeight ? false : true;

			if(!viewport){
				$options.addClass("above");
			}else{
				$options.removeClass("above");
			}
		},
		showSelect: function($select){
			$select.addClass(ui.SELECT.activeClass);
		},
		hideSelect: function($select){
			$select.removeClass(ui.SELECT.activeClass);
		},
	}
	
	ui.AMOUNT = {
		data: {
			min: 1,
			max: 99,
			step: 1,
			disabledButton: true,
			alert: false,
			pressed: false,
		},
		init: function(){
			//this.set();
			//this.bindEvent();
		},
		set: function(){
			$('.ui-amount').each(function(){
				ui.AMOUNT.setDisabledButton.call(this);
			});
		},
		setDisabledButton: function(){
			var $el = $(this),
				value = ui.AMOUNT.Number($el.find('input[type="tel"]').val()),
				data = core.Data(ui.AMOUNT.data, $el.data('amount'));
				
			if(data.disabledButton) ui.AMOUNT.disabledButton($el, value, data);
		},
		bindEvent: function(){
			core.$body.on('click pressed', '.ui-amount button.minus', {value: -1}, this.clickButton);
			core.$body.on('click pressed', '.ui-amount button.plus', {value: 1}, this.clickButton);
			core.$body.on('mousedown', '.ui-amount button.minus, .ui-amount button.plus', this.downButton);
			core.$body.on('mouseup mouseleave', '.ui-amount button.minus, .ui-amount button.plus', this.upButton);
			
			core.$body.on('keyup', '.ui-amount input[type="tel"]', this.keyupInput);
			core.$body.on('focusout', '.ui-amount input[type="tel"]', this.focusOutInput);
		},
		keyupInput: function(e){
			var $input = $(this),
				$el = $input.closest('.ui-amount'),
				data = core.Data(ui.AMOUNT.data, $el.data('amount')),
				value = ui.AMOUNT.Number($input.val());
				
			if(!value) return; // 입력값이 없을경우
			
			var isCorrect = ui.AMOUNT.CorrectCalc(value, data);
			
			if(isCorrect){
				ui.AMOUNT.changeValue($input, value);
				if(data.disabledButton) ui.AMOUNT.disabledButton($el, value, data);
			}else{
				if(value < data.min) ui.AMOUNT.changeValue($input, data.min);
				if(value > data.max) ui.AMOUNT.changeValue($input, data.max);
				
				if(data.disabledButton) ui.AMOUNT.disabledButton($el, value, data);
			}
		},
		focusOutInput: function(){
			var $input = $(this),
				$el = $input.closest('.ui-amount'),
				data = core.Data(ui.AMOUNT.data, $el.data('amount')),
				value = ui.AMOUNT.Number($input.val());
				
			if(!value){
				ui.AMOUNT.changeValue($input, data.min);
				if(data.disabledButton) ui.AMOUNT.disabledButton($el, data.min, data);
			}
		},
		clickButton: function(e){
			var isClick = e.type !== 'pressed',
				$el = $(this).closest('.ui-amount'),
				$input = $el.find('input[type="tel"]'),
				nextValue = e.data.value,
				data = core.Data(ui.AMOUNT.data, $el.data('amount'));
				
			ui.AMOUNT.calcValue($el, $input, nextValue, data);
			if(isClick) ui.AMOUNT.upButton();
		},
		downButton: function(){
			var $btn = $(this),
				$el = $btn.closest('.ui-amount'),
				data = core.Data(ui.AMOUNT.data, $el.data('amount'));
			
			if(data.pressed){
				ui.AMOUNT.pressedReady = setTimeout(function(){
					ui.AMOUNT.pressedStart = setInterval(function(){
						$btn.trigger('pressed');
					}, data.pressed);
				}, 500);
			}
		},
		upButton: function(){
			clearTimeout(ui.AMOUNT.pressedReady);
			clearInterval(ui.AMOUNT.pressedStart);
		},
		calcValue: function($el, $input, nextValue, data){
			var value = ui.AMOUNT.Number($input.val()),
				nextStep = data.step * nextValue,
				changeValue =  value + nextStep,
				isCorrect = ui.AMOUNT.CorrectCalc(changeValue, data);
			
			if(isCorrect){
				ui.AMOUNT.changeValue($input, changeValue);
				if(data.disabledButton) ui.AMOUNT.disabledButton($el, changeValue, data);
			}
		},
		changeValue: function($input, value){
			var commaValue = ui.AMOUNT.Comma(value);
			$input.val(commaValue);
		},
		disabledButton: function($el, value, data){
			var $minus = $el.find('button.minus'),
				$plus = $el.find('button.plus');
			
			if(value - data.step < data.min){
				$minus.prop('disabled', true);
			}else{
				$minus.prop('disabled', false);
			}
			
			if(value + data.step > data.max){
				$plus.prop('disabled', true);
			}else{
				$plus.prop('disabled', false);
			}
		},
		Number: function(v){
			return parseInt(v.replace(/,/g, ''));
		},
		Comma: function(v){
			return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		CorrectCalc: function(value, data){
			if(value < data.min){
				if(data.alert) alert("최소 갯수는"+ data.min+"개 입니다.");
				return false;
			}else if(value > data.max){
				if(data.alert) alert("최대 갯수는"+ data.max+"개 입니다.");
				return false;                
			}else{
				return true;
			}
		},
	}
	
	ui.TAB = {
		data: {
			anchor: false,
			detectAnchor: false,
		},
		init: function(){
			this.bindEvent();
		},
		bindEvent: function(){
			core.$body.on('click', '[data-tab-trigger]', this.handleTriggerTab);
			core.$body.on('click', '[data-tab-target]', this.handleClickTab);
			core.observer.on('RESIZE SCROLL', this.detectScroll);
		},
		handleTriggerTab: function(){
			var target = $(this).data('tabTrigger'),
				$tab = $('[data-tab-target="'+ target +'"]');

			$tab.trigger('click');
			core.scroll.toElem($tab, 0);
		},
		handleClickTab: function(){
			var $tab = $(this);//.closest('li');
			//if($tab.hasClass('active')) return;
			
			var $container = $tab.closest('.ui-tab');
			var data = core.Data(ui.TAB.data, $container.data('tab'));
			
			if(data.anchor) ui.TAB.anchorTab($tab, data);
			else ui.TAB.changeTab($tab);
		},
		changeTab: function($tab){
			var $tabs = $tab.closest('.tab-nav').find('[data-tab-target]'),
				$target = $($tab.data('tab-target'));
			
			$tabs.removeClass('active');
			$tab.addClass('active');
			
			$target.addClass('active')
			.siblings().removeClass('active');
		},
		anchorTab: function($tab, data){
			var $target = $($tab.data('tab-target')),
				targetTop = Math.round(core.screen.scrollTop + $target[0].getBoundingClientRect().top),
				$navInner = $tab.parent(),
				$stickyItem = $navInner.closest('.ui-sticky');
				
			if($stickyItem.length > 0){
				var navHeight = $stickyItem.outerHeight(),
					stickyValue = $stickyItem.data('sticky').top,
					stickyTop = typeof stickyValue !== 'string' ? 
					stickyValue : 
					$(stickyValue).data('sticky').top + $(stickyValue).outerHeight(),
					stickyHeight = navHeight + stickyTop;
				
				targetTop -= stickyHeight;
			}
			
			if(!data.detectAnchor) ui.TAB.changeTab($tab);
			core.scroll.to(targetTop, data.anchor);
		},
		detectScroll: function(){
			$('.ui-tab[data-tab*="detectAnchor"]').each(ui.TAB.detectAnchorActive);
		},
		detectAnchorActive: function(){
			var $tab = $(this),
				$anchor = $tab.find(' >.tab-nav [data-tab-target]'),
				$content = $tab.children('.tab-content').children(),
				near = [];

			$content.each(function(i){
				var startY = this.getBoundingClientRect().top,
					endY = startY + this.clientHeight -1,
					startPer = (startY / innerHeight * 100).toFixed(2),
					endPer = (endY / innerHeight * 100).toFixed(2);

				near.push(
					{
						pos: Math.abs(startPer - 50),
						index: i
					},
					{
						pos: Math.abs(endPer - 50),
						index: i
					}
				);
			});

			near.sort(function(a, b){ return a.pos - b.pos })

			$anchor.eq(near[0].index).addClass('active')
			.siblings().removeClass('active');
			
			$content.eq(near[0].index).addClass('active')
			.siblings().removeClass('active');
		},
	}

	ui.TOOLTIP = {
		init: function(){
			this.bindEvent();
		},
		bindEvent: function(){
			core.$body.on('click.tooltip', '.tooltip .text', this.prevent);
			core.$body.on('change.tooltip', '.tooltip input', function(){
				$('.tooltip input').not(this).prop('checked', false);
			})
		},
		prevent: function(e){
			return false;
		}
	}

	ui.ANIMATION = function(){
		var $el = $(arguments[0]),
			defaults = {
				duration: 0.6,
				once: true,
				offset: 200,
				animate: false,
				anchor: false,
				from: {},
			},
			data = $.extend(defaults, $el.data('animation')),
			$anchor = data.anchor ? $(data.anchor) : $el;

		this.events = {
			_init: function(){
				this._set();
				this._bind();
			},
			_set: function(){
				TweenMax.set($el, data.from);
			},
			_bind: function(){
				core.observer.on('LOAD SCROLL', $.proxy(this._detectScroll, this));
			},
			_detectScroll: function(e){
				data.rect = $anchor[0].getBoundingClientRect();

				this._detectEnter(e);
				if(!data.once) this._detectLeave(e);
			},
			_detectEnter: function(e){
				var isEnter = data.rect.top + data.offset < core.screen.height;

				if(isEnter && !data.animate){
					data.animate = true;

					var tl = new TimelineMax({
						onComplete: function(){
							$el.addClass('animated')
							.triggerHandler('complete');
						}
					});
					tl.to($el, data.duration, data.to);

					if(data.once) core.observer.off('SCROLL', e['fn']);
				}
			},
			_detectLeave: function(){
				var isLeave = data.rect.top > core.screen.height;
				
				if(isLeave && data.animate){
					TweenMax.killTweensOf($el);
					TweenMax.set($el, data.from);
					data.animate = false;
				}
			},
		}
	}
})(this, jQuery);

