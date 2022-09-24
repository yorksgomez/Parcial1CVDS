!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Popper=t()}(this,function(){"use strict";for(var e="undefined"!=typeof window&&"undefined"!=typeof document,t=["Edge","Trident","Firefox"],n=0,r=0;r<t.length;r+=1)if(e&&0<=navigator.userAgent.indexOf(t[r])){n=1;break}var i=e&&window.Promise?function(e){var t=!1;return function(){t||(t=!0,window.Promise.resolve().then(function(){t=!1,e()}))}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1,e()},n))}};function a(e){return e&&"[object Function]"==={}.toString.call(e)}function y(e,t){if(1!==e.nodeType)return[];var n=getComputedStyle(e,null);return t?n[t]:n}function u(e){return"HTML"===e.nodeName?e:e.parentNode||e.host}function d(e){if(!e)return document.body;switch(e.nodeName){case"HTML":case"BODY":return e.ownerDocument.body;case"#document":return e.body}var t=y(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/(auto|scroll)/.test(n+o+r)?e:d(u(e))}function b(e){var t=e&&e.offsetParent,n=t&&t.nodeName;return n&&"BODY"!==n&&"HTML"!==n?-1!==["TD","TABLE"].indexOf(t.nodeName)&&"static"===y(t,"position")?b(t):t:e?e.ownerDocument.documentElement:document.documentElement}function s(e){return null!==e.parentNode?s(e.parentNode):e}function c(e,t){if(!(e&&e.nodeType&&t&&t.nodeType))return document.documentElement;var n=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,r=n?e:t,o=n?t:e,i=document.createRange();i.setStart(r,0),i.setEnd(o,0);var a=i.commonAncestorContainer;if(e!==a&&t!==a||r.contains(o))return function(e){var t=e.nodeName;return"BODY"!==t&&("HTML"===t||b(e.firstElementChild)===e)}(a)?a:b(a);var f=s(e);return f.host?c(f.host,t):c(e,s(t).host)}function h(e,t){var n="top"===(1<arguments.length&&void 0!==t?t:"top")?"scrollTop":"scrollLeft",r=e.nodeName;if("BODY"!==r&&"HTML"!==r)return e[n];var o=e.ownerDocument.documentElement;return(e.ownerDocument.scrollingElement||o)[n]}function m(e,t){var n="x"===t?"Left":"Top",r="Left"==n?"Right":"Bottom";return parseFloat(e["border"+n+"Width"],10)+parseFloat(e["border"+r+"Width"],10)}var o=void 0,g=function(){return void 0===o&&(o=-1!==navigator.appVersion.indexOf("MSIE 10")),o};function f(e,t,n,r){return Math.max(t["offset"+e],t["scroll"+e],n["client"+e],n["offset"+e],n["scroll"+e],g()?n["offset"+e]+r["margin"+("Height"===e?"Top":"Left")]+r["margin"+("Height"===e?"Bottom":"Right")]:0)}function v(){var e=document.body,t=document.documentElement,n=g()&&getComputedStyle(t);return{height:f("Height",e,t,n),width:f("Width",e,t,n)}}var p=function(e,t,n){return t&&l(e.prototype,t),n&&l(e,n),e};function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function E(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var O=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};function x(e){return O({},e,{right:e.left+e.width,bottom:e.top+e.height})}function w(e){var t={};if(g())try{t=e.getBoundingClientRect();var n=h(e,"top"),r=h(e,"left");t.top+=n,t.left+=r,t.bottom+=n,t.right+=r}catch(e){}else t=e.getBoundingClientRect();var o={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},i="HTML"===e.nodeName?v():{},a=i.width||e.clientWidth||o.right-o.left,f=i.height||e.clientHeight||o.bottom-o.top,s=e.offsetWidth-a,p=e.offsetHeight-f;if(s||p){var l=y(e);s-=m(l,"x"),p-=m(l,"y"),o.width-=s,o.height-=p}return x(o)}function L(e,t){var n=g(),r="HTML"===t.nodeName,o=w(e),i=w(t),a=d(e),f=y(t),s=parseFloat(f.borderTopWidth,10),p=parseFloat(f.borderLeftWidth,10),l=x({top:o.top-i.top-s,left:o.left-i.left-p,width:o.width,height:o.height});if(l.marginTop=0,l.marginLeft=0,!n&&r){var u=parseFloat(f.marginTop,10),c=parseFloat(f.marginLeft,10);l.top-=s-u,l.bottom-=s-u,l.left-=p-c,l.right-=p-c,l.marginTop=u,l.marginLeft=c}return(n?t.contains(a):t===a&&"BODY"!==a.nodeName)&&(l=function(e,t,n){var r=2<arguments.length&&void 0!==n&&n,o=h(t,"top"),i=h(t,"left"),a=r?-1:1;return e.top+=o*a,e.bottom+=o*a,e.left+=i*a,e.right+=i*a,e}(l,t)),l}function T(e,t,n,r){var o={top:0,left:0},i=c(e,t);if("viewport"===r)o=function(e){var t=e.ownerDocument.documentElement,n=L(e,t),r=Math.max(t.clientWidth,window.innerWidth||0),o=Math.max(t.clientHeight,window.innerHeight||0),i=h(t),a=h(t,"left");return x({top:i-n.top+n.marginTop,left:a-n.left+n.marginLeft,width:r,height:o})}(i);else{var a=void 0;"scrollParent"===r?"BODY"===(a=d(u(t))).nodeName&&(a=e.ownerDocument.documentElement):a="window"===r?e.ownerDocument.documentElement:r;var f=L(a,i);if("HTML"!==a.nodeName||function e(t){var n=t.nodeName;return"BODY"!==n&&"HTML"!==n&&("fixed"===y(t,"position")||e(u(t)))}(i))o=f;else{var s=v(),p=s.height,l=s.width;o.top+=f.top-f.marginTop,o.bottom=p+f.top,o.left+=f.left-f.marginLeft,o.right=l+f.left}}return o.left+=n,o.top+=n,o.right-=n,o.bottom-=n,o}function D(e,t,r,n,o,i){var a=5<arguments.length&&void 0!==i?i:0;if(-1===e.indexOf("auto"))return e;var f=T(r,n,a,o),s={top:{width:f.width,height:t.top-f.top},right:{width:f.right-t.right,height:f.height},bottom:{width:f.width,height:f.bottom-t.bottom},left:{width:t.left-f.left,height:f.height}},p=Object.keys(s).map(function(e){return O({key:e},s[e],{area:function(e){return e.width*e.height}(s[e])})}).sort(function(e,t){return t.area-e.area}),l=p.filter(function(e){var t=e.width,n=e.height;return t>=r.clientWidth&&n>=r.clientHeight}),u=0<l.length?l[0].key:p[0].key,c=e.split("-")[1];return u+(c?"-"+c:"")}function M(e,t,n){return L(n,c(t,n))}function k(e){var t=getComputedStyle(e),n=parseFloat(t.marginTop)+parseFloat(t.marginBottom),r=parseFloat(t.marginLeft)+parseFloat(t.marginRight);return{width:e.offsetWidth+r,height:e.offsetHeight+n}}function N(e){var t={left:"right",right:"left",bottom:"top",top:"bottom"};return e.replace(/left|right|bottom|top/g,function(e){return t[e]})}function B(e,t,n){n=n.split("-")[0];var r=k(e),o={width:r.width,height:r.height},i=-1!==["right","left"].indexOf(n),a=i?"top":"left",f=i?"left":"top",s=i?"height":"width",p=i?"width":"height";return o[a]=t[a]+t[s]/2-r[s]/2,o[f]=n===f?t[f]-r[p]:t[N(f)],o}function H(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function C(e,n,t){return(void 0===t?e:e.slice(0,function(e,t,n){if(Array.prototype.findIndex)return e.findIndex(function(e){return e[t]===n});var r=H(e,function(e){return e[t]===n});return e.indexOf(r)}(e,"name",t))).forEach(function(e){e.function;var t=e.function||e.fn;e.enabled&&a(t)&&(n.offsets.popper=x(n.offsets.popper),n.offsets.reference=x(n.offsets.reference),n=t(n,e))}),n}function F(e,n){return e.some(function(e){var t=e.name;return e.enabled&&t===n})}function P(e){for(var t=[!1,"ms","Webkit","Moz","O"],n=e.charAt(0).toUpperCase()+e.slice(1),r=0;r<t.length-1;r++){var o=t[r],i=o?""+o+n:e;if(void 0!==document.body.style[i])return i}return null}function W(e){var t=e.ownerDocument;return t?t.defaultView:window}function S(e,t,n,r){n.updateBound=r,W(e).addEventListener("resize",n.updateBound,{passive:!0});var o=d(e);return function e(t,n,r,o){var i="BODY"===t.nodeName,a=i?t.ownerDocument.defaultView:t;a.addEventListener(n,r,{passive:!0}),i||e(d(a.parentNode),n,r,o),o.push(a)}(o,"scroll",n.updateBound,n.scrollParents),n.scrollElement=o,n.eventsEnabled=!0,n}function A(){this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=function(e,t){return W(e).removeEventListener("resize",t.updateBound),t.scrollParents.forEach(function(e){e.removeEventListener("scroll",t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}(this.reference,this.state))}function j(e){return""!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function U(n,r){Object.keys(r).forEach(function(e){var t="";-1!==["width","height","top","right","bottom","left"].indexOf(e)&&j(r[e])&&(t="px"),n.style[e]=r[e]+t})}function Y(e,t,n){var r=H(e,function(e){return e.name===t}),o=!!r&&e.some(function(e){return e.name===n&&e.enabled&&e.order<r.order});if(!o);return o}var R=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],I=R.slice(3);function q(e,t){var n=1<arguments.length&&void 0!==t&&t,r=I.indexOf(e),o=I.slice(r+1).concat(I.slice(0,r));return n?o.reverse():o}var V="flip",z="clockwise",_="counterclockwise";function G(e,o,i,t){var a=[0,0],f=-1!==["right","left"].indexOf(t),n=e.split(/(\+|\-)/).map(function(e){return e.trim()}),r=n.indexOf(H(n,function(e){return-1!==e.search(/,|\s/)}));n[r]&&n[r].indexOf(",");var s=/\s*,\s*|\s+/,p=-1!==r?[n.slice(0,r).concat([n[r].split(s)[0]]),[n[r].split(s)[1]].concat(n.slice(r+1))]:[n];return(p=p.map(function(e,t){var n=(1===t?!f:f)?"height":"width",r=!1;return e.reduce(function(e,t){return""===e[e.length-1]&&-1!==["+","-"].indexOf(t)?(e[e.length-1]=t,r=!0,e):r?(e[e.length-1]+=t,r=!1,e):e.concat(t)},[]).map(function(e){return function(e,t,n,r){var o=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),i=+o[1],a=o[2];if(!i)return e;if(0!==a.indexOf("%"))return"vh"!==a&&"vw"!==a?i:("vh"===a?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*i;var f=void 0;switch(a){case"%p":f=n;break;case"%":case"%r":default:f=r}return x(f)[t]/100*i}(e,n,o,i)})})).forEach(function(n,r){n.forEach(function(e,t){j(e)&&(a[r]+=e*("-"===n[t-1]?-1:1))})}),a}var X={placement:"bottom",eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(e){var t=e.placement,n=t.split("-")[0],r=t.split("-")[1];if(r){var o=e.offsets,i=o.reference,a=o.popper,f=-1!==["bottom","top"].indexOf(n),s=f?"left":"top",p=f?"width":"height",l={start:E({},s,i[s]),end:E({},s,i[s]+i[p]-a[p])};e.offsets.popper=O({},a,l[r])}return e}},offset:{order:200,enabled:!0,fn:function(e,t){var n=t.offset,r=e.placement,o=e.offsets,i=o.popper,a=o.reference,f=r.split("-")[0],s=void 0;return s=j(+n)?[+n,0]:G(n,i,a,f),"left"===f?(i.top+=s[0],i.left-=s[1]):"right"===f?(i.top+=s[0],i.left+=s[1]):"top"===f?(i.left+=s[0],i.top-=s[1]):"bottom"===f&&(i.left+=s[0],i.top+=s[1]),e.popper=i,e},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(e,r){var t=r.boundariesElement||b(e.instance.popper);e.instance.reference===t&&(t=b(t));var o=T(e.instance.popper,e.instance.reference,r.padding,t);r.boundaries=o;var n=r.priority,i=e.offsets.popper,a={primary:function(e){var t=i[e];return i[e]<o[e]&&!r.escapeWithReference&&(t=Math.max(i[e],o[e])),E({},e,t)},secondary:function(e){var t="right"===e?"left":"top",n=i[t];return i[e]>o[e]&&!r.escapeWithReference&&(n=Math.min(i[t],o[e]-("right"===e?i.width:i.height))),E({},t,n)}};return n.forEach(function(e){var t=-1!==["left","top"].indexOf(e)?"primary":"secondary";i=O({},i,a[t](e))}),e.offsets.popper=i,e},priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:function(e){var t=e.offsets,n=t.popper,r=t.reference,o=e.placement.split("-")[0],i=Math.floor,a=-1!==["top","bottom"].indexOf(o),f=a?"right":"bottom",s=a?"left":"top",p=a?"width":"height";return n[f]<i(r[s])&&(e.offsets.popper[s]=i(r[s])-n[p]),n[s]>i(r[f])&&(e.offsets.popper[s]=i(r[f])),e}},arrow:{order:500,enabled:!0,fn:function(e,t){var n;if(!Y(e.instance.modifiers,"arrow","keepTogether"))return e;var r=t.element;if("string"==typeof r){if(!(r=e.instance.popper.querySelector(r)))return e}else if(!e.instance.popper.contains(r))return e;var o=e.placement.split("-")[0],i=e.offsets,a=i.popper,f=i.reference,s=-1!==["left","right"].indexOf(o),p=s?"height":"width",l=s?"Top":"Left",u=l.toLowerCase(),c=s?"left":"top",d=s?"bottom":"right",h=k(r)[p];f[d]-h<a[u]&&(e.offsets.popper[u]-=a[u]-(f[d]-h)),f[u]+h>a[d]&&(e.offsets.popper[u]+=f[u]+h-a[d]),e.offsets.popper=x(e.offsets.popper);var m=f[u]+f[p]/2-h/2,g=y(e.instance.popper),v=parseFloat(g["margin"+l],10),b=parseFloat(g["border"+l+"Width"],10),w=m-e.offsets.popper[u]-v-b;return w=Math.max(Math.min(a[p]-h,w),0),e.arrowElement=r,e.offsets.arrow=(E(n={},u,Math.round(w)),E(n,c,""),n),e},element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:function(d,h){if(F(d.instance.modifiers,"inner"))return d;if(d.flipped&&d.placement===d.originalPlacement)return d;var m=T(d.instance.popper,d.instance.reference,h.padding,h.boundariesElement),g=d.placement.split("-")[0],v=N(g),b=d.placement.split("-")[1]||"",w=[];switch(h.behavior){case V:w=[g,v];break;case z:w=q(g);break;case _:w=q(g,!0);break;default:w=h.behavior}return w.forEach(function(e,t){if(g!==e||w.length===t+1)return d;g=d.placement.split("-")[0],v=N(g);var n=d.offsets.popper,r=d.offsets.reference,o=Math.floor,i="left"===g&&o(n.right)>o(r.left)||"right"===g&&o(n.left)<o(r.right)||"top"===g&&o(n.bottom)>o(r.top)||"bottom"===g&&o(n.top)<o(r.bottom),a=o(n.left)<o(m.left),f=o(n.right)>o(m.right),s=o(n.top)<o(m.top),p=o(n.bottom)>o(m.bottom),l="left"===g&&a||"right"===g&&f||"top"===g&&s||"bottom"===g&&p,u=-1!==["top","bottom"].indexOf(g),c=!!h.flipVariations&&(u&&"start"===b&&a||u&&"end"===b&&f||!u&&"start"===b&&s||!u&&"end"===b&&p);(i||l||c)&&(d.flipped=!0,(i||l)&&(g=w[t+1]),c&&(b=function(e){return"end"===e?"start":"start"===e?"end":e}(b)),d.placement=g+(b?"-"+b:""),d.offsets.popper=O({},d.offsets.popper,B(d.instance.popper,d.offsets.reference,d.placement)),d=C(d.instance.modifiers,d,"flip"))}),d},behavior:"flip",padding:5,boundariesElement:"viewport"},inner:{order:700,enabled:!1,fn:function(e){var t=e.placement,n=t.split("-")[0],r=e.offsets,o=r.popper,i=r.reference,a=-1!==["left","right"].indexOf(n),f=-1===["top","left"].indexOf(n);return o[a?"left":"top"]=i[n]-(f?o[a?"width":"height"]:0),e.placement=N(t),e.offsets.popper=x(o),e}},hide:{order:800,enabled:!0,fn:function(e){if(!Y(e.instance.modifiers,"hide","preventOverflow"))return e;var t=e.offsets.reference,n=H(e.instance.modifiers,function(e){return"preventOverflow"===e.name}).boundaries;if(t.bottom<n.top||t.left>n.right||t.top>n.bottom||t.right<n.left){if(!0===e.hide)return e;e.hide=!0,e.attributes["x-out-of-boundaries"]=""}else{if(!1===e.hide)return e;e.hide=!1,e.attributes["x-out-of-boundaries"]=!1}return e}},computeStyle:{order:850,enabled:!0,fn:function(e,t){var n=t.x,r=t.y,o=e.offsets.popper,i=H(e.instance.modifiers,function(e){return"applyStyle"===e.name}).gpuAcceleration,a=void 0!==i?i:t.gpuAcceleration,f=w(b(e.instance.popper)),s={position:o.position},p={left:Math.floor(o.left),top:Math.floor(o.top),bottom:Math.floor(o.bottom),right:Math.floor(o.right)},l="bottom"===n?"top":"bottom",u="right"===r?"left":"right",c=P("transform"),d=void 0,h=void 0;if(h="bottom"==l?-f.height+p.bottom:p.top,d="right"==u?-f.width+p.right:p.left,a&&c)s[c]="translate3d("+d+"px, "+h+"px, 0)",s[l]=0,s[u]=0,s.willChange="transform";else{var m="bottom"==l?-1:1,g="right"==u?-1:1;s[l]=h*m,s[u]=d*g,s.willChange=l+", "+u}var v={"x-placement":e.placement};return e.attributes=O({},v,e.attributes),e.styles=O({},s,e.styles),e.arrowStyles=O({},e.offsets.arrow,e.arrowStyles),e},gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:function(e){return U(e.instance.popper,e.styles),function(t,n){Object.keys(n).forEach(function(e){!1!==n[e]?t.setAttribute(e,n[e]):t.removeAttribute(e)})}(e.instance.popper,e.attributes),e.arrowElement&&Object.keys(e.arrowStyles).length&&U(e.arrowElement,e.arrowStyles),e},onLoad:function(e,t,n,r,o){var i=M(0,t,e),a=D(n.placement,i,t,e,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return t.setAttribute("x-placement",a),U(t,{position:"absolute"}),n},gpuAcceleration:void 0}}},J=(p(K,[{key:"update",value:function(){return function(){if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=M(this.state,this.popper,this.reference),e.placement=D(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.offsets.popper=B(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position="absolute",e=C(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}.call(this)}},{key:"destroy",value:function(){return function(){return this.state.isDestroyed=!0,F(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.left="",this.popper.style.position="",this.popper.style.top="",this.popper.style[P("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}.call(this)}},{key:"enableEventListeners",value:function(){return function(){this.state.eventsEnabled||(this.state=S(this.reference,this.options,this.state,this.scheduleUpdate))}.call(this)}},{key:"disableEventListeners",value:function(){return A.call(this)}}]),K);function K(e,t){var n=this,r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,K),this.scheduleUpdate=function(){return requestAnimationFrame(n.update)},this.update=i(this.update.bind(this)),this.options=O({},K.Defaults,r),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=e&&e.jquery?e[0]:e,this.popper=t&&t.jquery?t[0]:t,this.options.modifiers={},Object.keys(O({},K.Defaults.modifiers,r.modifiers)).forEach(function(e){n.options.modifiers[e]=O({},K.Defaults.modifiers[e]||{},r.modifiers?r.modifiers[e]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(e){return O({name:e},n.options.modifiers[e])}).sort(function(e,t){return e.order-t.order}),this.modifiers.forEach(function(e){e.enabled&&a(e.onLoad)&&e.onLoad(n.reference,n.popper,n.options,e,n.state)}),this.update();var o=this.options.eventsEnabled;o&&this.enableEventListeners(),this.state.eventsEnabled=o}return J.Utils=("undefined"!=typeof window?window:global).PopperUtils,J.placements=R,J.Defaults=X,J});
//# sourceMappingURL=popper.min.js.map