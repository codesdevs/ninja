var e=Object.defineProperty,a=Object.defineProperties,t=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,c=(a,t,s)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[t]=s,n=(e,a)=>{for(var t in a||(a={}))o.call(a,t)&&c(e,t,a[t]);if(s)for(var t of s(a))r.call(a,t)&&c(e,t,a[t]);return e},l=(e,s)=>a(e,t(s));import{p as d,a as i,o as u,c as m,r as p,b as g,d as y,F as v,k as f,e as k,u as b,f as h,g as w,h as j,t as P,i as C,w as _,j as x,_ as I,l as A,m as L,n as R,q,s as O,v as S,x as V}from"./vendor.3769d230.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver((e=>{for(const t of e)if("childList"===t.type)for(const e of t.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&a(e)})).observe(document,{childList:!0,subtree:!0})}function a(e){if(e.ep)return;e.ep=!0;const a=function(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerpolicy&&(a.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?a.credentials="include":"anonymous"===e.crossorigin?a.credentials="omit":a.credentials="same-origin",a}(e);fetch(e.href,a)}}();d("data-v-4b23e37a"),i();const Q={},N={class:"JDLogo",src:"/assets/logo.5b9d501c.png",alt:"logo"};Q.render=function(e,a){return u(),m("img",N)};const U={components:{Logo:Q}};d("data-v-0ddd6d0a");const E={class:"header"},z={class:"header-wrapper"},D={class:"flex items-center"},J=g("p",{class:"pl-3 select-none"},"京东代挂-1号车",-1);i(),U.render=function(e,a,t,s,o,r){const c=p("Logo");return u(),m("div",E,[g("div",z,[g("div",D,[y(c,{class:"h-10 w-10"}),J])])])},U.__scopeId="data-v-0ddd6d0a";const K={class:"main"},T={setup:e=>(e,a)=>{const t=p("router-view");return u(),m(v,null,[y(U),g("div",K,[y(t)])],64)}};const $=f.create({prefixUrl:"/api",retry:{limit:0}});const F={setup(){const e=k("http://jd.qbquery.com/qun.png"),a=b();h();const t=k([]);let s=w({nickName:void 0,timestamp:void 0,todayIncome:0,yesterdayIncome:0,yesterdayExpenditure:0,currentJingdou:0,currentRedenvelope:0,jingxiRedenvelope:0,speedRedenvelope:0,jdRedenvelope:0});const o=k(["https://jd.qbquery.com/qun.png"]),r=async()=>{try{const e=localStorage.getItem("eid");if(!e)return void c();const a=await function(e){const a=new URLSearchParams;return a.set("eid",e),$.get("userinfo",{searchParams:a}).json()}(e);if(!a)return I.error("获取用户信息失败，请重重新登录"),void c();s.nickName=a.data.nickName,s.timestamp=new Date(a.data.timestamp).toLocaleString(),t.value=a.data.remark}catch(e){console.error(e)}};j((()=>{r()}));const c=()=>{localStorage.removeItem("eid"),a.push("/login")};return l(n({},P(s)),{activity:[{name:"玩一玩（可找到大多数活动）",address:"京东 APP 首页-频道-边玩边赚"},{name:"宠汪汪",address:"京东APP-首页/玩一玩/我的-宠汪汪"},{name:"东东萌宠",address:"京东APP-首页/玩一玩/我的-东东萌宠"},{name:"东东农场",address:"京东APP-首页/玩一玩/我的-东东农场"},{name:"东东工厂",address:"京东APP-首页/玩一玩/我的-东东工厂"},{name:"东东超市",address:"京东APP-首页/玩一玩/我的-东东超市"},{name:"领现金",address:"京东APP-首页/玩一玩/我的-领现金"},{name:"东东健康社区",address:"京东APP-首页/玩一玩/我的-东东健康社区"},{name:"京喜农场",address:"京喜APP-我的-京喜农场"},{name:"京喜牧场",address:"京喜APP-我的-京喜牧场"},{name:"京喜工厂",address:"京喜APP-我的-京喜工厂"},{name:"京喜财富岛",address:"京喜APP-我的-京喜财富岛"},{name:"京东极速版红包",address:"京东极速版APP-我的-红包"}],imgUrl:e,srcList:o,getInfo:r,logout:c,delAccount:async()=>{try{const e=localStorage.getItem("eid"),a=await function(e){return $.post("delaccount",{json:e}).json()}({eid:e});"账户已移除"!==a.message?I.error(a.message):(I.success(a.message),setTimeout((()=>{c()}),1e3))}catch(e){console.error(e)}},openUrlWithJD:e=>{const a=encodeURIComponent(`{"category":"jump","des":"m","action":"to","url":"${e}"}`);window.location.href=`openapp.jdmobile://virtual?params=${a}`,console.log(window.location.href)},updateRemark:async()=>{try{const e=localStorage.getItem("eid"),a=await function(e){return $.post("update/remark",{json:e}).json()}({eid:e,remark:t.value});"更新/上传备注成功"!==a.message?I.error(a.message):I.success(a.message)}catch(e){console.error(e)}},remark:t})}},M={class:"content"},W={class:"card"},B=g("div",{class:"card-header"},[g("p",{class:"card-title"},"个人中心")],-1),G={class:"card-body"},H={class:"card-footer"},X=A("退出登录"),Y=A("删除账号"),Z={class:"card"},ee=g("div",{class:"card-header"},[g("p",{class:"card-title"},"资产明细")],-1),ae={class:"card-body text-center"},te={class:"card"},se=g("div",{class:"card-header"},[g("p",{class:"card-title"},"备注"),g("span",{class:"card-subtitle"},"备注用于识别用户，强烈建议配置")],-1),oe={class:"card-body"},re={class:"card-footer"},ce=A("保存"),ne=g("div",{class:"card"},[g("div",{class:"card-header"},[g("p",{class:"card-title"},"通知群"),g("span",{class:"card-subtitle"},"进群关注资产变动")]),g("div",{class:"card-body"},[g("img",{class:"flex flex-col w-48 m-auto mt-4",src:"/assets/qun.3373728c.png",width:"200",height:"200",alt:"qun"})])],-1),le={class:"card"},de=g("div",{class:"card-header"},[g("p",{class:"card-title"},"常见活动位置"),g("span",{class:"card-subtitle"},"下面是一些常见活动的位置")],-1),ie={class:"card-body"},ue={class:"pr-2"};F.render=function(e,a,t,s,o,r){const c=p("el-button"),n=p("el-input");return u(),m("div",M,[g("div",W,[B,g("div",G,[g("p",null,"昵称："+C(e.nickName),1),g("p",null,"更新时间："+C(e.timestamp),1)]),g("div",H,[y(c,{size:"small",auto:"",onClick:s.logout},{default:_((()=>[X])),_:1},8,["onClick"]),y(c,{type:"danger",size:"small",auto:"",onClick:s.delAccount},{default:_((()=>[Y])),_:1},8,["onClick"])])]),g("div",Z,[ee,g("div",ae,[g("p",null,"今日收入："+C(e.todayIncome),1),g("p",null,"昨日收入："+C(e.yesterdayIncome),1),g("p",null,"昨日支出："+C(e.yesterdayExpenditure),1),g("p",null,"当前京🐶："+C(e.currentJingdou),1),g("p",null,"当前🧧："+C(e.currentRedenvelope),1),g("p",null,"京喜🧧："+C(e.jingxiRedenvelope),1),g("p",null,"极速🧧："+C(e.speedRedenvelope),1),g("p",null,"京东🧧："+C(e.jdRedenvelope),1)])]),g("div",te,[se,g("div",oe,[y(n,{modelValue:s.remark,"onUpdate:modelValue":a[0]||(a[0]=e=>s.remark=e),placeholder:"请输入内容"},null,8,["modelValue"])]),g("div",re,[y(c,{size:"small",type:"success",onClick:s.updateRemark,auto:""},{default:_((()=>[ce])),_:1},8,["onClick"])])]),ne,g("div",le,[de,g("div",ie,[g("ul",null,[(u(!0),m(v,null,x(s.activity,((e,a)=>(u(),m("li",{key:a,class:"leading-normal"},[g("span",null,C(e.name)+"：",1),g("span",ue,C(e.address),1)])))),128))])])])])};const me={setup(){const e=b();h();let a=w({marginCount:0,allowAdd:!0,cookie:"",QRCode:void 0,qrCodeVisibility:!1,token:void 0,okl_token:void 0,cookies:void 0,timer:void 0,waitLogin:!1});const t=async()=>{try{const e=(await $.get("info").json()).data;a.marginCount=e.marginCount,a.allowAdd=e.allowAdd}catch(e){console.error(e)}},s=async()=>{console.log(a.ua);try{const t=await function(e){return $.post("check",{json:e}).json()}({token:a.token,okl_token:a.okl_token,ua:a.ua,cookies:a.cookies});switch(null==t?void 0:t.data.errcode){case 0:localStorage.setItem("eid",t.data.eid),I.success(t.message),clearInterval(a.timer),e.push("/");break;case 176:break;default:I.error(t.message),a.waitLogin=!1,clearInterval(a.timer)}}catch(t){clearInterval(a.timer),a.waitLogin=!1}};return j((()=>{t()})),l(n({},P(a)),{getInfo:t,getQrcode:async()=>{try{const e=await $.get("qrcode").json();a.token=e.data.token,a.okl_token=e.data.okl_token,a.cookies=e.data.cookies,a.QRCode=e.data.QRCode,a.ua=e.data.ua,a.QRCode&&(a.qrCodeVisibility=!0,a.waitLogin=!0,clearInterval(a.timer),a.timer=setInterval(s,3e3))}catch(e){console.error(e),I.error("生成二维码失败！请重试或放弃")}},showQrcode:async()=>{a.qrCodeVisibility=!0},ckeckLogin:s,jumpLogin:async()=>{const e=`openapp.jdmobile://virtual/ad?params={"category":"jump","des":"ThirdPartyLogin","action":"to","onekeylogin":"return","url":"https://plogin.m.jd.com/cgi-bin/m/tmauth?appid=300&client_type=m&token=${a.token}","authlogin_returnurl":"weixin://","browserlogin_fromurl":"${window.location.host}"}`;window.location.href=e},CKLogin:async()=>{try{const e=a.cookie.match(/pt_key=(.*?);/)&&a.cookie.match(/pt_key=(.*?);/)[1],t=a.cookie.match(/pt_pin=(.*?);/)&&a.cookie.match(/pt_pin=(.*?);/)[1];if(e&&t){const a=await function(e){return $.post("cklogin",{json:e}).json()}({pt_key:e,pt_pin:t});200===a.code&&a.data.eid?(localStorage.setItem("eid",a.data.eid),I.success(a.message)):I.error(a.message||"cookie 解析失败，请检查后重试！")}else I.error("cookie 解析失败，请检查后重试！")}catch(e){console.error(e)}},jumpTwoCar:async()=>{window.location.href="http://www.baidu.com"}})}};d("data-v-abc0beee");const pe={class:"content"},ge=L('<div class="card" data-v-abc0beee><div class="card-header" data-v-abc0beee><div class="flex items-center justify-between" data-v-abc0beee><p class="card-title" data-v-abc0beee>发车须知</p></div><span class="card-subtitle" data-v-abc0beee> 欢迎上车，请系好安装全带，请按照教程打开所有活动 <a href="https://www.yuque.com/docs/share/5c3542b8-6fad-4503-a62d-d296f475c5ae" class="jc" data-v-abc0beee>教程地址</a></span></div></div>',1),ye={class:"card"},ve={class:"card-header"},fe={class:"flex items-center justify-between"},ke=g("p",{class:"card-title"},"扫码登录",-1),be={class:"ml-2 px-2 py-1 bg-gray-200 rounded-full font-normal text-xs"},he=g("span",{class:"card-subtitle"}," 请点击下方按钮登录，点击按钮后回到本网站查看是否登录成功，京东的升级提示不用管。 ",-1),we={class:"card-body text-center"},je={key:0,class:"flex flex-col w-48 m-auto mt-4"},Pe=A("切换二号车"),Ce=A("扫描二维码登录"),_e=A("跳转到京东 App 登录"),xe=["src"],Ie=g("div",{class:"card-footer"},null,-1),Ae={class:"card hidden"},Le={class:"card-header"},Re={class:"flex items-center justify-between"},qe=g("p",{class:"card-title"},"CK 登录",-1),Oe={class:"ml-2 px-2 py-1 bg-gray-200 rounded-full font-normal text-xs"},Se=g("span",{class:"card-subtitle"}," 请在下方输入您的 cookie 登录。 ",-1),Ve={class:"card-body text-center"},Qe=A("登录"),Ne=g("div",{class:"card-footet"},null,-1);i(),me.render=function(e,a,t,s,o,r){const c=p("el-button"),n=p("el-input");return u(),m("div",pe,[ge,g("div",ye,[g("div",ve,[g("div",fe,[ke,g("span",be,"余量："+C(e.marginCount),1)]),he]),g("div",we,[e.qrCodeVisibility?(u(),m("img",{key:1,src:e.QRCode,width:256,class:"m-auto"},null,8,xe)):(u(),m("div",je,[y(c,{class:"mt-4 ml-0",type:"primary",round:"",onClick:s.jumpTwoCar},{default:_((()=>[Pe])),_:1},8,["onClick"]),y(c,{class:"mt-4 ml-0",type:"primary",round:"",onClick:s.getQrcode},{default:_((()=>[Ce])),_:1},8,["onClick"]),y(c,{class:"mt-4 ml-0",type:"primary",round:"",onClick:s.jumpLogin},{default:_((()=>[_e])),_:1},8,["onClick"])]))]),Ie]),g("div",Ae,[g("div",Le,[g("div",Re,[qe,g("span",Oe,"余量："+C(e.marginCount),1)]),Se]),g("div",Ve,[y(n,{modelValue:e.cookie,"onUpdate:modelValue":a[0]||(a[0]=a=>e.cookie=a),size:"small",clearable:"",class:"my-4 w-full"},null,8,["modelValue"]),y(c,{type:"primary",size:"small",round:"",onClick:s.CKLogin},{default:_((()=>[Qe])),_:1},8,["onClick"])]),Ne])])},me.__scopeId="data-v-abc0beee";const Ue=[{path:"/",component:F},{path:"/login",component:me}],Ee=R({history:q(),routes:Ue}),ze=[S,V,I],De=[I],Je=O(T);ze.forEach((e=>{Je.component(e.name,e)})),De.forEach((e=>{Je.use(e)})),Je.use(Ee),Je.mount("#app");
