var Popup = (function(){

	var win = window,doc = document;
	var popup = {};

	var prefix_confirm_id = "--popup-confirm";
	var prefix_alert_id = "--popup-alert";

	popup.alert = function(message,color) {

		var d = doc.getElementById(prefix_alert_id);
		if(d) doc.body.removeChild(d);

		var pop_width = 350;
		var left = (doc.body.clientWidth / 2) - (pop_width / 2);
		var body = doc.querySelector("body");
		var scrollY = getScrollOffsets().y;

		if(typeof color==undefined || !color) {
			color = "#545454";
		}

		function alert_close() {
			var dom = doc.getElementById(prefix_alert_id);
			doc.body.removeChild(dom);
		}

		var parent_div = elementFactory("div",{
			"position":"absolute",
			"top":scrollY+100+"px",
			"left":left+"px",
			"width":pop_width+"px",
			"background":"#fff",
			"border":"1px solid #D4D4D4",
			"box-shadow":"1px 2px 4px #676767",
			"text-align":"center",
			"opacity":0,
			"transition":"opacity 0.1s linear"
		});
		parent_div.id = prefix_alert_id;

		var child_message = elementFactory("div",{
			"text-align":"left",
			"margin":"32px 14px 14px 14px",
			"padding":"8px",
			"background":"#fff"
		});
		child_message.innerHTML = "<span style='color:"+color+"'>"+message+"</span>";

		var btnStyle = {
			"width":"100px",
			"padding":"4px",
			"margin":"8px",
			"border":"1px solid #D4D4D4",
			"font-size":"13px",
			"background":"#ECECEC",
			"color":"#555",
			"cursor":"pointer",
		};
		var child_btn = elementFactory("button",btnStyle);
		child_btn.innerHTML = "OK";

		addEvent(child_btn,"click",function(){
			alert_close();
		});

		parent_div.appendChild(child_message);
		parent_div.appendChild(child_btn);
		body.appendChild(parent_div);

		setTimeout(function(){
			parent_div.style.opacity = 1;
		},1);
	};

	popup.confirm = function(dom,message,callbackY,labelVal){

		var d = doc.getElementById(prefix_confirm_id);
		if(d) doc.body.removeChild(d);

		var pop_width = 400;
		var left = (doc.body.clientWidth / 2) - (pop_width / 2);
		var body = doc.querySelector("body");
		var scrollY = getScrollOffsets().y;

		if(typeof labelVal!="object") {
			labelVal = {};
			labelVal.yes = "はい";
			labelVal.no = "いいえ";
		}

		var parent_div = elementFactory("div",{
			"position":"absolute",
			"top":scrollY+100+"px",
			"left":left+"px",
			"width":pop_width+"px",
			"background":"#fff",
			"border":"1px solid #D4D4D4",
			"box-shadow":"1px 2px 4px #676767",
			"text-align":"center",
			"opacity":0,
			"transition":"opacity 0.1s linear"
		});
		parent_div.id = prefix_confirm_id;

		var child_close = elementFactory("span",{
			"position":"absolute",
			"top":"8px",
			"right":"8px",
			"cursor":"pointer",
			"font-size":"13px",
			"color":"#555",
		});
		child_close.innerHTML = "キャンセル";
		var child_message = elementFactory("div",{
			"text-align":"left",
			"margin":"32px 14px 14px 14px",
			"padding":"8px",
			"background":"#fff",
			"font-size":"13px"
		});
		child_message.innerHTML = "<span style='color:#545454'>"+message+"</span>";

		var btnStyle = {
			"position":"initial",
			"display":"inline-block",
			"box-shadow":"none",
			"width":"100px",
			"padding":"4px",
			"margin":"8px",
			"border":"1px solid #A4A4A5",
			"font-size":"13px",
			"background":"#ECECEC",
			"color":"#555",
			"border-radius":"0",
		};

		var child_yes_btn = elementFactory("button",btnStyle);
		child_yes_btn.innerHTML = (!labelVal.yes)?"はい":labelVal.yes;

		var child_no_btn = elementFactory("button",btnStyle);
		child_no_btn.innerHTML = (!labelVal.no)?"いいえ":labelVal.no;

		addEvent(child_close,"click",function(){
			popup_delete();
		});

		addEvent(child_yes_btn,"click",function(){
			callbackY(dom,"yes");
		});

		addEvent(child_no_btn,"click",function(){
			// callbackN(dom,"no");
			callbackY(dom,"no");
		});

		parent_div.appendChild(child_close);
		parent_div.appendChild(child_message);
		parent_div.appendChild(child_yes_btn);
		parent_div.appendChild(child_no_btn);
		body.appendChild(parent_div);

		setTimeout(function(){
			parent_div.style.opacity = 1;
		},1);

	};

	popup.close = function(){
		popup_delete();
	};

	var popup_delete = function(){

		var dom = doc.getElementById(prefix_confirm_id);
		if(dom) {
			doc.body.removeChild(dom);
		}

	};

	var elementFactory = function(domName, styleObj){

		var dom = doc.createElement(domName);
		var style = "";
		for(var key in styleObj) {
			style += key+":"+styleObj[key]+" !important;";
		}
		dom.setAttribute("style",style);

		return dom;
	};

	var addEvent = function(dom, event_name, func) {
		if (dom.addEventListener) {
			dom.addEventListener(event_name, func, false);
		}else if (dom.attachEvent) {
			dom.attachEvent('on' + event_name, func);
		}
	}

	var getScrollOffsets = function() {

		if (window.pageXOffset != null) {
			return { x: window.pageXOffset, y: window.pageYOffset };
		}
		if (document.compatMode == "CSS1Compat") {
			return {x: document.documentElement.scrollLeft, y: document.documentElement.scrollTop};
		}
		return { x: document.body.scrollLeft, y: document.body.scrollTop };
	};

	return popup;

})();