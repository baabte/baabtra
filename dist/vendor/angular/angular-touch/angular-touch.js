!function(a,b){"use strict";function c(a,c,e){d.directive(a,["$parse","$swipe",function(d,f){var g=75,h=.3,i=30;return function(j,k,l){function m(a){if(!n)return!1;var b=Math.abs(a.y-n.y),d=(a.x-n.x)*c;return o&&g>b&&d>0&&d>i&&h>b/d}var n,o,p=d(l[a]),q=["touch"];b.isDefined(l.ngSwipeDisableMouse)||q.push("mouse"),f.bind(k,{start:function(a){n=a,o=!0},cancel:function(){o=!1},end:function(a,b){m(a)&&j.$apply(function(){k.triggerHandler(e),p(j,{$event:b})})}},q)}}])}var d=b.module("ngTouch",[]);d.factory("$swipe",[function(){function a(a){var b=a.touches&&a.touches.length?a.touches:[a],c=a.changedTouches&&a.changedTouches[0]||a.originalEvent&&a.originalEvent.changedTouches&&a.originalEvent.changedTouches[0]||b[0].originalEvent||b[0];return{x:c.clientX,y:c.clientY}}function c(a,c){var d=[];return b.forEach(a,function(a){var b=e[a][c];b&&d.push(b)}),d.join(" ")}var d=10,e={mouse:{start:"mousedown",move:"mousemove",end:"mouseup"},touch:{start:"touchstart",move:"touchmove",end:"touchend",cancel:"touchcancel"}};return{bind:function(b,e,f){var g,h,i,j,k=!1;f=f||["mouse","touch"],b.on(c(f,"start"),function(b){i=a(b),k=!0,g=0,h=0,j=i,e.start&&e.start(i,b)});var l=c(f,"cancel");l&&b.on(l,function(a){k=!1,e.cancel&&e.cancel(a)}),b.on(c(f,"move"),function(b){if(k&&i){var c=a(b);if(g+=Math.abs(c.x-j.x),h+=Math.abs(c.y-j.y),j=c,!(d>g&&d>h))return h>g?(k=!1,void(e.cancel&&e.cancel(b))):(b.preventDefault(),void(e.move&&e.move(c,b)))}}),b.on(c(f,"end"),function(b){k&&(k=!1,e.end&&e.end(a(b),b))})}}}]),d.config(["$provide",function(a){a.decorator("ngClickDirective",["$delegate",function(a){return a.shift(),a}])}]),d.directive("ngClick",["$parse","$timeout","$rootElement",function(a,c,d){function e(a,b,c,d){return Math.abs(a-c)<p&&Math.abs(b-d)<p}function f(a,b,c){for(var d=0;d<a.length;d+=2)if(e(a[d],a[d+1],b,c))return a.splice(d,d+2),!0;return!1}function g(a){if(!(Date.now()-j>o)){var b=a.touches&&a.touches.length?a.touches:[a],c=b[0].clientX,d=b[0].clientY;1>c&&1>d||l&&l[0]===c&&l[1]===d||(l&&(l=null),"label"===a.target.tagName.toLowerCase()&&(l=[c,d]),f(k,c,d)||(a.stopPropagation(),a.preventDefault(),a.target&&a.target.blur()))}}function h(a){var b=a.touches&&a.touches.length?a.touches:[a],d=b[0].clientX,e=b[0].clientY;k.push(d,e),c(function(){for(var a=0;a<k.length;a+=2)if(k[a]==d&&k[a+1]==e)return void k.splice(a,a+2)},o,!1)}function i(a,b){k||(d[0].addEventListener("click",g,!0),d[0].addEventListener("touchstart",h,!0),k=[]),j=Date.now(),f(k,a,b)}var j,k,l,m=750,n=12,o=2500,p=25,q="ng-click-active";return function(c,d,e){function f(){o=!1,d.removeClass(q)}var g,h,j,k,l=a(e.ngClick),o=!1;d.on("touchstart",function(a){o=!0,g=a.target?a.target:a.srcElement,3==g.nodeType&&(g=g.parentNode),d.addClass(q),h=Date.now();var b=a.touches&&a.touches.length?a.touches:[a],c=b[0].originalEvent||b[0];j=c.clientX,k=c.clientY}),d.on("touchmove",function(){f()}),d.on("touchcancel",function(){f()}),d.on("touchend",function(a){var c=Date.now()-h,l=a.changedTouches&&a.changedTouches.length?a.changedTouches:a.touches&&a.touches.length?a.touches:[a],p=l[0].originalEvent||l[0],q=p.clientX,r=p.clientY,s=Math.sqrt(Math.pow(q-j,2)+Math.pow(r-k,2));o&&m>c&&n>s&&(i(q,r),g&&g.blur(),b.isDefined(e.disabled)&&e.disabled!==!1||d.triggerHandler("click",[a])),f()}),d.onclick=function(){},d.on("click",function(a,b){c.$apply(function(){l(c,{$event:b||a})})}),d.on("mousedown",function(){d.addClass(q)}),d.on("mousemove mouseup",function(){d.removeClass(q)})}}]),c("ngSwipeLeft",-1,"swipeleft"),c("ngSwipeRight",1,"swiperight")}(window,window.angular);