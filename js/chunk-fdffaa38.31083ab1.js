(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fdffaa38"],{"13ff":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"users-list user-profile-link"},[t._l(t.follows,(function(e){return a("div",{key:e.id,staticClass:"users-list-container"},[a("router-link",{staticClass:"profile-image",attrs:{to:{name:"user-profile",params:{id:e.id}}}},[a("img",{staticClass:"user-img",attrs:{src:t._f("emptyImage")(e.avatar),alt:""}})]),a("div",{staticClass:"user"},[a("div",{staticClass:"user-info"},[a("div",{staticClass:"user-name"},[a("router-link",{staticClass:"user-name-link",attrs:{to:{name:"user-profile",params:{id:e.id}}}},[a("div",{staticClass:"name"},[t._v(t._s(e.name))])]),a("div",{staticClass:"user-account"},[t._v(t._s(e.account))])],1),a("div",{staticClass:"follow-btn"},[e.isFollowed?a("button",{staticClass:"followed",attrs:{type:"button"},on:{click:function(a){return t.deleteFollow(e.id)}}},[t._v(" 正在跟隨 ")]):a("button",{staticClass:"follow",attrs:{type:"button"},on:{click:function(a){return t.addFollow(e.id)}}},[t._v(" 跟隨 ")])])]),a("div",{staticClass:"user-description"},[t._v(" "+t._s(e.introduction)+" ")])])],1)})),0===t.initialFollowData.length?a("div",{staticClass:"no-data-container"},[a("div",{staticClass:"no-data"},[t._v("沒有追蹤者或追蹤中的使用者...")])]):t._e()],2)},r=[],i=(a("d81d"),a("96cf"),a("1da1")),n=a("5530"),o=a("2708"),c=a("4cce"),l=a("2fa3"),u={mixins:[o["a"]],props:{initialFollowData:{type:Array,default:function(){return[]}}},data:function(){return{follows:this.initialFollowData}},watch:{initialFollowData:function(t){this.follows=Object(n["a"])(Object(n["a"])({},this.initialFollowData),t)}},methods:{addFollow:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var s,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,c["a"].addFollow({id:t});case 3:if(s=a.sent,r=s.data,"success"===r.status){a.next=7;break}throw new Error(r.message);case 7:l["a"].fire({icon:"success",title:"跟隨成功"}),e.follows.map((function(e){return e.id===t&&(e.isFollowed=!0),e})),console.log(t),a.next=16;break;case 12:a.prev=12,a.t0=a["catch"](0),console.log(a.t0),l["a"].fire({icon:"error",title:"無法追蹤，請稍後再試"});case 16:case"end":return a.stop()}}),a,null,[[0,12]])})))()},deleteFollow:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var s,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,c["a"].deleteFollow({followingId:t});case 3:if(s=a.sent,r=s.data,"success"===r.status){a.next=7;break}throw new Error(r.message);case 7:l["a"].fire({icon:"success",title:"成功取消跟隨"}),e.follows.map((function(e){return e.id===t&&(e.isFollowed=!1),e})),a.next=15;break;case 11:a.prev=11,a.t0=a["catch"](0),console.log(a.t0),l["a"].fire({icon:"error",title:"無法取消追蹤，請稍後再試"});case 15:case"end":return a.stop()}}),a,null,[[0,11]])})))()}}},d=u,f=(a("7183"),a("2877")),p=Object(f["a"])(d,s,r,!1,null,"efabf56a",null);e["a"]=p.exports},2375:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"wraper"},[a("div"),a("div"),a("div"),a("div"),a("div"),a("div"),a("div"),a("div"),a("div")])])}],i=(a("616f"),a("2877")),n={},o=Object(i["a"])(n,s,r,!1,null,"4548c6d4",null);e["a"]=o.exports},"2cf7":function(t,e,a){"use strict";var s=a("9832"),r=a.n(s);r.a},"354a":function(t,e,a){"use strict";var s=a("b218"),r=a.n(s);r.a},"50ff":function(t,e,a){},"616f":function(t,e,a){"use strict";var s=a("50ff"),r=a.n(s);r.a},6783:function(t,e,a){"use strict";a("a4d3"),a("e01a");var s=a("2fa3");e["a"]={getTweets:function(){return s["b"].get("/tweets")},createTweet:function(t){var e=t.description;return s["b"].post("/tweets",{description:e})},replyTweet:function(t){var e=t.tweetId,a=t.comment;return s["b"].post("/tweets/".concat(e,"/replies"),{comment:a})},getTweet:function(t){var e=t.tweetId;return s["b"].get("/tweets/".concat(e))},getTweetReplies:function(t){var e=t.tweetId;return s["b"].get("/tweets/".concat(e,"/replies"))},addLike:function(t){var e=t.tweetId;return s["b"].post("/tweets/".concat(e,"/like"),null)},deleteLike:function(t){var e=t.tweetId;return s["b"].post("/tweets/".concat(e,"/unlike"),null)}}},7183:function(t,e,a){"use strict";var s=a("b5aa"),r=a.n(s);r.a},"8d93":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tweet-create-modal"},[a("div",{staticClass:"modal-container"},[a("div",{staticClass:"modal-box"},[a("div",{staticClass:"cancel-create"},[a("img",{staticClass:"cancel-icon",attrs:{src:"https://i.imgur.com/qd4MrVa.png",alt:"cancel"},on:{click:t.clickToClose}})]),a("div",{staticClass:"tweet-create-container"},[a("div",{staticClass:"profile-image"},[a("img",{staticClass:"user-img",attrs:{src:t._f("emptyImage")(this.currentUserData.avatar),alt:""}})]),a("form",{staticClass:"tweet-input"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.description,expression:"description"}],staticClass:"tweet-input-content",attrs:{name:"tweet-input-area",id:"",cols:"30",rows:"10",placeholder:"有什麼新鮮事？"},domProps:{value:t.description},on:{keydown:t.autoTextAreaHeight,input:function(e){e.target.composing||(t.description=e.target.value)}}}),a("button",{staticClass:"tweet-create-btn",attrs:{type:"submit"},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.handleSubmit(e)}}},[t._v(" 推文 ")])])])])])])},r=[],i=(a("a4d3"),a("e01a"),a("5530")),n=a("2f62"),o=a("2708"),c={mixins:[o["a"]],props:{initialDescription:{type:String,required:!0},currentUserData:{type:Object,default:function(){}}},computed:Object(i["a"])({},Object(n["b"])(["currentUser"])),data:function(){return{description:this.initialDescription}},methods:{clickToClose:function(){this.$emit("after-click-close-create")},handleSubmit:function(){var t=this.description;console.log(t),this.$emit("afterSubmit",t)},finishCreate:function(){this.$emit("after-click-close-create")},autoTextAreaHeight:function(t){t.currentTarget.scrollHeight>t.currentTarget.clientHeight&&(t.currentTarget.style.height=t.currentTarget.scrollHeight+"px")}}},l=c,u=(a("f19b"),a("2877")),d=Object(u["a"])(l,s,r,!1,null,"73aee90c",null);e["a"]=d.exports},9832:function(t,e,a){},"9b49":function(t,e,a){},b218:function(t,e,a){},b5aa:function(t,e,a){},c553:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"follow-top-container"},[t._m(0),a("div",{staticClass:"follow-users-container"},t._l(t.topUsers,(function(e){return a("div",{key:e.key,staticClass:"follow-top-user"},[a("router-link",{staticClass:"user-avatar-link",attrs:{to:{name:"user-profile",params:{id:e.id}}}},[a("div",{staticClass:"profile-image top-user-image"},[a("img",{staticClass:"user-img top-user",attrs:{src:t._f("emptyImage")(e.avatar),alt:""}})])]),a("div",{staticClass:"top-user-info"},[a("router-link",{staticClass:"user-name-link",attrs:{to:{name:"user-profile",params:{id:e.id}}}},[a("div",{staticClass:"user-name"},[t._v(t._s(e.name))])]),a("div",{staticClass:"user-account"},[t._v("@"+t._s(e.account))])],1),a("div",{staticClass:"follow-btn"},[e.isFollowed?a("button",{staticClass:"followed",attrs:{type:"button",name:e.id},on:{click:function(a){return t.deleteFollow(e.id)}}},[t._v(" 正在跟隨 ")]):a("button",{staticClass:"follow",attrs:{type:"button",name:"id"},on:{click:function(a){return t.addFollow(e.id)}}},[t._v(" 跟隨 ")])])],1)})),0),t._m(1)])},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"follow-top-title"},[a("p",[t._v("跟隨誰")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"more"},[a("a",{staticClass:"readMore",attrs:{href:"#"}},[t._v("顯示更多")])])}],i=(a("d81d"),a("96cf"),a("1da1")),n=a("4cce"),o=a("2fa3"),c=a("2708"),l={mixins:[c["a"]],props:{initialIsFollowed:{type:Boolean,required:!0}},data:function(){return{topUsers:[],isFollowed:this.initialIsFollowed}},watch:{initialIsFollowed:function(t){this.isFollowed=t}},created:function(){this.fetchTopUsers()},methods:{fetchTopUsers:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n["a"].getTopUsers();case 3:a=e.sent,s=a.data,t.topUsers=s,e.next=12;break;case 8:e.prev=8,e.t0=e["catch"](0),console.log(e.t0),o["a"].fire({icon:"error",title:"無法取得人氣使用者名單"});case 12:case"end":return e.stop()}}),e,null,[[0,8]])})))()},addFollow:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var s,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,n["a"].addFollow({id:t});case 3:if(s=a.sent,r=s.data,"success"===r.status){a.next=7;break}throw new Error(r.message);case 7:o["a"].fire({icon:"success",title:"跟隨成功"}),e.topUsers.map((function(a){return a.id===t&&(a.isFollowed=!0,e.isFollowed=!0),a})),a.next=15;break;case 11:a.prev=11,a.t0=a["catch"](0),console.log(a.t0),o["a"].fire({icon:"error",title:"無法追蹤，請稍後再試"});case 15:case"end":return a.stop()}}),a,null,[[0,11]])})))()},deleteFollow:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var s,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,n["a"].deleteFollow({followingId:t});case 3:if(s=a.sent,r=s.data,"success"===r.status){a.next=7;break}throw new Error(r.message);case 7:o["a"].fire({icon:"success",title:"成功取消跟隨"}),e.topUsers.map((function(a){return a.id===t&&(a.isFollowed=!1,e.isFollowed=!1),a})),a.next=15;break;case 11:a.prev=11,a.t0=a["catch"](0),console.log(a.t0),o["a"].fire({icon:"error",title:"無法取消追蹤，請稍後再試"});case 15:case"end":return a.stop()}}),a,null,[[0,11]])})))()}}},u=l,d=(a("354a"),a("2877")),f=Object(d["a"])(u,s,r,!1,null,"3c8ffa50",null);e["a"]=f.exports},d5f8:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{staticClass:"tweets-nav-tab"},[t.isFollowPage?[a("li",{staticClass:"tab-item"},[a("router-link",{staticClass:"tab-link user-followers",attrs:{to:{name:"user-followers",params:t.$route.params.id}}},[t._v("追隨者")])],1),a("li",{staticClass:"tab-item"},[a("router-link",{staticClass:"tab-link user-followings",attrs:{to:{name:"user-followings",params:t.$route.params.id}}},[t._v("正在追蹤")])],1)]:[a("li",{staticClass:"tab-item"},[a("router-link",{staticClass:"tab-link user-tweets",attrs:{to:{name:"user-profile",params:t.$route.params.id}}},[t._v("推文")])],1),a("li",{staticClass:"tab-item"},[a("router-link",{staticClass:"tab-link user-replies",attrs:{to:{name:"user-replies",params:t.$route.params.id}}},[t._v("推文與回覆")])],1),a("li",{staticClass:"tab-item"},[a("router-link",{staticClass:"tab-link user-likes",attrs:{to:{name:"user-likes",params:t.$route.params.id}}},[t._v("喜歡的內容")])],1)]],2)},r=[],i=a("5530"),n={currentUser:{id:1,name:"dummy",email:"123@hhhh.com",avatar:"https://s3.amazonaws.com/uifaces/faces/twitter/chrisvanderkooi/128.jpg"},isAuthenticated:!0},o={props:{isFollowPage:{type:Boolean,require:!0}},data:function(){return{currentUser:{id:-1,name:" ",email:"",avatar:""},isAuthenticated:!1}},created:function(){this.fetchUser()},methods:{fetchUser:function(){this.currentUser=Object(i["a"])(Object(i["a"])({},this.currentUser),n.currentUser),this.isAuthenticated=n.isAuthenticated}}},c=o,l=(a("2cf7"),a("2877")),u=Object(l["a"])(c,s,r,!1,null,"a30bd308",null);e["a"]=u.exports},d81d:function(t,e,a){"use strict";var s=a("23e7"),r=a("b727").map,i=a("1dde"),n=a("ae40"),o=i("map"),c=n("map");s({target:"Array",proto:!0,forced:!o||!c},{map:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},e01a:function(t,e,a){"use strict";var s=a("23e7"),r=a("83ab"),i=a("da84"),n=a("5135"),o=a("861d"),c=a("9bf2").f,l=a("e893"),u=i.Symbol;if(r&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var d={},f=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof f?new u(t):void 0===t?u():u(t);return""===t&&(d[e]=!0),e};l(f,u);var p=f.prototype=u.prototype;p.constructor=f;var m=p.toString,v="Symbol(test)"==String(u("test")),w=/^Symbol\((.*)\)[^)]+$/;c(p,"description",{configurable:!0,get:function(){var t=o(this)?this.valueOf():this,e=m.call(t);if(n(d,t))return"";var a=v?e.slice(7,-1):e.replace(w,"$1");return""===a?void 0:a}}),s({global:!0,forced:!0},{Symbol:f})}},f19b:function(t,e,a){"use strict";var s=a("9b49"),r=a.n(s);r.a}}]);
//# sourceMappingURL=chunk-fdffaa38.31083ab1.js.map