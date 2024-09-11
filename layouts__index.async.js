"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[717],{73700:function(se,$,e){e.d($,{Z:function(){return o}});var K=e(5574),D=e.n(K),Y=e(15009),c=e.n(Y),q=e(99289),M=e.n(q),_=e(12444),U=e.n(_),ee=e(72004),W=e.n(ee),X=e(41467),G=function(){function m(){U()(this,m)}return W()(m,[{key:"import",value:function(){var v=M()(c()().mark(function x(O){return c()().wrap(function(y){for(;;)switch(y.prev=y.next){case 0:return y.next=2,X.db.importData(O.db);case 2:return localStorage.clear(),Object.keys(O.localStorage).forEach(function(f){localStorage.setItem(f,O.localStorage[f])}),y.abrupt("return",!0);case 5:case"end":return y.stop()}},x)}));function R(x){return v.apply(this,arguments)}return R}()},{key:"export",value:function(){var v=M()(c()().mark(function x(){var O,g,y,f;return c()().wrap(function(k){for(;;)switch(k.prev=k.next){case 0:return k.next=2,X.db.exportData();case 2:return k.t0=k.sent,k.t1=localStorage,O={db:k.t0,localStorage:k.t1},g=new Blob([JSON.stringify(O,null,4)],{type:"application/json"}),y=URL.createObjectURL(g),f=document.createElement("a"),f.href=y,f.download="gpt_playground_export_".concat(new Date().getTime(),".json"),document.body.appendChild(f),f.click(),document.body.removeChild(f),URL.revokeObjectURL(y),k.abrupt("return",O);case 15:case"end":return k.stop()}},x)}));function R(){return v.apply(this,arguments)}return R}()}]),m}(),z=G,Q=e(64082),te=e(65170),H=e(23323),J=e(25278),S=e(14726),u=e(96311),p=e(28558),i=e(67294),l={settingModalContent:"settingModalContent___n5Msb",settingModalMenu:"settingModalMenu___XTpKy",modelItem:"modelItem___k8hgT"},t=e(85893),s=te.Z.Dragger,a=function(v){var R=v.isSettingModalOpen,x=v.handleSettingOk,O=v.handleSettingCancel,g=(0,i.useState)("token"),y=D()(g,2),f=y[0],w=y[1],k=JSON.parse(localStorage.getItem("openai_config")||"{}"),E=(0,i.useState)((k==null?void 0:k.api_key)||""),B=D()(E,2),T=B[0],F=B[1],N=(0,i.useState)((k==null?void 0:k.end_point)||""),ie=D()(N,2),ae=ie[0],me=ie[1];(0,i.useEffect)(function(){var L=JSON.parse(localStorage.getItem("openai_config")||"{}");L.api_key=T,L.end_point=ae||"https://api.openai.com",localStorage.setItem("openai_config",JSON.stringify(L))},[T,ae]);var I=function(A){w(A.key)},ne=function(){var L=M()(c()().mark(function A(){var Z;return c()().wrap(function(le){for(;;)switch(le.prev=le.next){case 0:return Z=new z,le.next=3,Z.export();case 3:case"end":return le.stop()}},A)}));return function(){return L.apply(this,arguments)}}(),oe=function(){var L=M()(c()().mark(function A(Z){var ce;return c()().wrap(function(he){for(;;)switch(he.prev=he.next){case 0:ce=new FileReader,ce.onload=function(){var Ce=M()(c()().mark(function ve(fe){var pe,ge,ye;return c()().wrap(function(de){for(;;)switch(de.prev=de.next){case 0:return ge=JSON.parse(fe==null||(pe=fe.target)===null||pe===void 0?void 0:pe.result),ye=new z,de.next=4,ye.import(ge);case 4:window.location.reload();case 5:case"end":return de.stop()}},ve)}));return function(ve){return Ce.apply(this,arguments)}}(),ce.readAsText(Z);case 3:case"end":return he.stop()}},A)}));return function(Z){return L.apply(this,arguments)}}(),ue=function(A){F(A.api_key),me(A.end_point)},V=function(){return f==="token"?(0,t.jsxs)(H.Z,{name:"basic",labelCol:{span:18},wrapperCol:{span:18},initialValues:{api_key:T,end_point:ae},onFinish:ue,autoComplete:"off",layout:"vertical",children:[(0,t.jsx)("h2",{children:"API KEY Settings"}),(0,t.jsx)("br",{}),(0,t.jsx)(H.Z.Item,{label:"API KEY",name:"api_key",rules:[{required:!0,message:""}],children:(0,t.jsx)(J.Z,{})}),(0,t.jsx)(H.Z.Item,{label:"End Point",name:"end_point",rules:[{required:!1,message:""}],children:(0,t.jsx)(J.Z,{})}),(0,t.jsx)(H.Z.Item,{wrapperCol:{offset:0,span:24},children:(0,t.jsx)(S.ZP,{type:"primary",htmlType:"submit",children:"Save"})})]}):f==="import_export"?(0,t.jsxs)("div",{children:[(0,t.jsx)("h2",{children:"Import & Export"}),(0,t.jsx)("br",{}),(0,t.jsx)("h3",{children:"Export"}),(0,t.jsx)(S.ZP,{type:"primary",onClick:ne,children:"Export"}),(0,t.jsx)("br",{}),(0,t.jsx)("br",{}),(0,t.jsx)("h3",{children:"Import"}),(0,t.jsxs)(s,{multiple:!1,customRequest:function(Z){oe(Z.file),console.log(Z.file)},children:[(0,t.jsx)("p",{className:"ant-upload-drag-icon",children:(0,t.jsx)(Q.Z,{})}),(0,t.jsx)("p",{className:"ant-upload-text",children:"Click or drag file to this area to upload"})]})]}):null},re=[{key:"token",label:"API KEY"},{key:"import_export",label:"Import & Export"}];return(0,t.jsx)(u.Z,{title:"",open:R,onOk:x,onCancel:O,footer:null,closeIcon:null,classNames:{content:l.settingModalContent},width:"65%",children:(0,t.jsxs)("div",{style:{display:"flex",height:"60vh",padding:0},children:[(0,t.jsx)(p.Z,{mode:"inline",className:l.settingModalMenu,selectedKeys:[f],onClick:I,items:re}),(0,t.jsx)("div",{style:{padding:"20px",flex:1,overflowY:"auto"},children:V()})]})})},j=a,n=j,P=e(42952),b=e(50228),d=e(38545),r=e(35312),h={mainMenuFooter:"mainMenuFooter___dbT6T"},C=function(v){var R=v.page,x=JSON.parse(localStorage.getItem("openai_config")||"{}"),O=(0,i.useState)(!x.api_key),g=D()(O,2),y=g[0],f=g[1],w=[{key:"setting",icon:(0,t.jsx)(P.Z,{}),label:"Setting"}];R==="chat"&&w.unshift({key:"bot",icon:(0,t.jsx)(b.Z,{}),label:"Bots"}),R==="bot"&&w.unshift({key:"chat",icon:(0,t.jsx)(d.Z,{}),label:"Chats"});var k=function(F){F&&F.key==="setting"?f(!0):r.history.push("/".concat(F==null?void 0:F.key))},E=function(){JSON.parse(localStorage.getItem("openai_config")||"{}").api_key&&f(!1)},B=function(){f(!1)};return(0,t.jsxs)("div",{className:h.mainMenuFooter,children:[(0,t.jsx)(p.Z,{items:w,onClick:k,selectable:!1}),(0,t.jsx)(n,{isSettingModalOpen:y,handleSettingOk:E,handleSettingCancel:B})]})},o=C},88001:function(se,$,e){e.d($,{DI:function(){return c},aH:function(){return K},pk:function(){return D},xf:function(){return Y}});var K=[{key:"gpt-4o-mini",label:"GPT-4o mini"},{key:"chatgpt-4o-latest",label:"GPT-4o"},{key:"gpt-4",label:"GPT-4"},{key:"gpt-3.5-turbo-0125",label:"GPT-3.5 Turbo"}],D="gpt-4o-mini",Y=10,c=3},26222:function(se,$,e){e.r($),e.d($,{default:function(){return b}});var K=e(19632),D=e.n(K),Y=e(97857),c=e.n(Y),q=e(15009),M=e.n(q),_=e(99289),U=e.n(_),ee=e(5574),W=e.n(ee),X=e(9981),G=e(89705),z=e(35312),Q=e(86250),te=e(25278),H=e(47988),J=e(14726),S=e(67294),u=e(85893);function p(d){var r=d.item,h=d.onRename,C=d.onDelete,o=(0,S.useState)(!1),m=W()(o,2),v=m[0],R=m[1],x=(0,S.useState)(r.name),O=W()(x,2),g=O[0],y=O[1],f=new X.Z(r.key),w=function(){var B=U()(M()().mark(function T(){return M()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return console.log(r.key,g),N.next=3,f.init();case 3:return N.next=5,f.renameChat(g);case 5:h&&h(r.key,g),R(!1);case 7:case"end":return N.stop()}},T)}));return function(){return B.apply(this,arguments)}}(),k=function(){var B=U()(M()().mark(function T(){return M()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return N.next=2,f.init();case 2:return N.next=4,f.deleteChat();case 4:C&&C(r.key);case 5:case"end":return N.stop()}},T)}));return function(){return B.apply(this,arguments)}}(),E=[{key:"rename",label:(0,u.jsx)("span",{onClick:function(){return R(!0)},children:"Rename"})},{key:"delete",danger:!0,label:(0,u.jsx)("span",{onClick:function(){return k()},children:"Delete"})}];return(0,u.jsxs)(Q.Z,{gap:"0",className:"main-menu-item",justify:"space-between",align:"center",style:{width:"100%"},children:[(0,u.jsx)(z.Link,{to:r.path,className:"main-menu-link",children:v?(0,u.jsx)(te.Z,{value:g,onChange:function(T){return y(T.target.value)},onPressEnter:w,onBlur:w}):(0,u.jsx)("span",{children:g})}),v?null:(0,u.jsx)(H.Z,{menu:{items:E},trigger:["click"],className:"main-menu-action",children:(0,u.jsx)(J.ZP,{icon:(0,u.jsx)(G.Z,{}),size:"small",type:"text"})})]})}var i=p,l=e(73700),t=e(24969),s=e(64917),a=e(30381),j=e.n(a),n=e(80410),P=function(r){var h=j()().startOf("day"),C={\u4ECA\u5929:[],\u524D\u51E0\u5929:[],\u524D30\u5929:[],\u66F4\u65E9:[]};return r.sort(function(o,m){return new Date(m.createdAt).getTime()-new Date(o.createdAt).getTime()}),r.forEach(function(o){var m=j()(o.createdAt);m.isSame(h,"day")?C.\u4ECA\u5929.push(o):m.isAfter(h.clone().subtract(7,"days"))?C.\u524D\u51E0\u5929.push(o):m.isAfter(h.clone().subtract(30,"days"))?C.\u524D30\u5929.push(o):C.\u66F4\u65E9.push(o)}),C},b=function(){var d=(0,S.useState)({}),r=W()(d,2),h=r[0],C=r[1],o=function(){var g=U()(M()().mark(function y(){var f,w;return M()().wrap(function(E){for(;;)switch(E.prev=E.next){case 0:return E.next=2,X.Z.getChats();case 2:f=E.sent,w=P(f),C(w);case 5:case"end":return E.stop()}},y)}));return function(){return g.apply(this,arguments)}}();(0,S.useEffect)(function(){o()},[]);var m=function(){var g=U()(M()().mark(function y(f){var w;return M()().wrap(function(E){for(;;)switch(E.prev=E.next){case 0:w=c()({},h),Object.keys(w).forEach(function(B){w[B]=w[B].filter(function(T){return T.id!==f})}),C(w),location.pathname.match(f)&&z.history.push("/");case 4:case"end":return E.stop()}},y)}));return function(f){return g.apply(this,arguments)}}(),v=function(){var y=function(){z.history.push("/chat")};return(0,u.jsx)(Q.Z,{className:n.Z.mainMenuHeader,gap:"small",justify:"space-between",style:{width:"100%"},children:(0,u.jsx)(J.ZP,{icon:(0,u.jsx)(t.Z,{}),shape:"circle",size:"small",onClick:y})})},R=function(){var y=[],f=[];return Object.keys(h).forEach(function(w){f.push({name:w,path:"/group/"+w,disabled:!0,type:"group",className:n.Z.mainMenuGroup}),f.push.apply(f,D()(h[w].map(function(k){return{path:"/chat/".concat(k.id),name:k.title||"Untitled Chat",type:"chat",key:k.id}})))}),[].concat(y,f)},x=function(y,f){return y.type==="group"?(0,u.jsx)("div",{className:n.Z.mainMenuGroupTitle,children:y.name}):y.type==="chat"?(0,u.jsx)(i,{item:y,onDelete:m}):f},O=function(){return(0,l.Z)({page:"chat"})};return(0,u.jsx)(s.f,{siderWidth:240,contentStyle:{padding:0},menuHeaderRender:v,menuDataRender:R,menuItemRender:x,menuFooterRender:O,menuProps:{selectable:!1},collapsedButtonRender:function(){return(0,u.jsx)("div",{})},children:(0,u.jsx)(z.Outlet,{})})}},41467:function(se,$,e){e.d($,{db:function(){return H}});var K=e(15009),D=e.n(K),Y=e(99289),c=e.n(Y),q=e(97857),M=e.n(q),_=e(12444),U=e.n(_),ee=e(72004),W=e.n(ee),X=e(9783),G=e.n(X),z=function(){function J(S){U()(this,J),G()(this,"db",null),G()(this,"dbName",void 0),G()(this,"version",void 0),G()(this,"stores",void 0),G()(this,"_initPromise",void 0),this.dbName=S.dbName,this.version=S.version,this.stores=S.stores,this._initPromise=this.initDB()}return W()(J,[{key:"initDB",value:function(){var u=this;return new Promise(function(p,i){var l=indexedDB.open(u.dbName,u.version);l.onupgradeneeded=function(){var t=l.result;u.stores.forEach(function(s){if(!t.objectStoreNames.contains(s.name)){var a,j=t.createObjectStore(s.name,M()({keyPath:s.keyPath,autoIncrement:s.autoIncrement},s.options));(a=s.indexes)===null||a===void 0||a.forEach(function(n){j.createIndex(n.name,n.keyPath,n.options)})}})},l.onsuccess=function(){u.db=l.result,p()},l.onerror=function(t){console.error("Database error:",t.target.error),i(t.target.error)}})}},{key:"waitForDb",value:function(){return this._initPromise}},{key:"addData",value:function(){var S=c()(D()().mark(function p(i,l){var t,s,a;return D()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.waitForDb();case 2:return t=this.db.transaction(i,"readwrite"),s=t.objectStore(i),a=s.add(l),n.abrupt("return",new Promise(function(P,b){a.onsuccess=function(){P(a.result)},a.onerror=function(){b(a.error)}}));case 6:case"end":return n.stop()}},p,this)}));function u(p,i){return S.apply(this,arguments)}return u}()},{key:"getData",value:function(){var S=c()(D()().mark(function p(i,l){var t,s,a;return D()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.waitForDb();case 2:return t=this.db.transaction(i,"readonly"),s=t.objectStore(i),a=s.get(l),n.abrupt("return",new Promise(function(P,b){a.onsuccess=function(){var d;P((d=a.result)!==null&&d!==void 0?d:null)},a.onerror=function(){b(a.error)}}));case 6:case"end":return n.stop()}},p,this)}));function u(p,i){return S.apply(this,arguments)}return u}()},{key:"importData",value:function(){var S=c()(D()().mark(function p(i){var l,t,s,a,j,n,P,b;return D()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,this.waitForDb();case 2:l=0;case 3:if(!(l<i.length)){r.next=17;break}t=i[l],s=t.storeName,a=t.data,j=this.db.transaction(s,"readwrite"),n=j.objectStore(s),P=D()().mark(function h(){var C;return D()().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return C=n.add(a[b]),m.next=3,new Promise(function(v,R){C.onsuccess=function(){v(!0)},C.onerror=function(){R(C.error)}});case 3:case"end":return m.stop()}},h)}),b=0;case 9:if(!(b<a.length)){r.next=14;break}return r.delegateYield(P(),"t0",11);case 11:b++,r.next=9;break;case 14:l++,r.next=3;break;case 17:case"end":return r.stop()}},p,this)}));function u(p){return S.apply(this,arguments)}return u}()},{key:"exportData",value:function(){var S=c()(D()().mark(function p(){var i,l,t;return D()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return i=[],a.next=3,this.waitForDb();case 3:l=0;case 4:if(!(l<this.stores.length)){a.next=16;break}return t=this.stores[l],a.t0=i,a.t1=t.name,a.next=10,this.getAllData(t.name);case 10:a.t2=a.sent,a.t3={storeName:a.t1,data:a.t2},a.t0.push.call(a.t0,a.t3);case 13:l++,a.next=4;break;case 16:return a.abrupt("return",i);case 17:case"end":return a.stop()}},p,this)}));function u(){return S.apply(this,arguments)}return u}()},{key:"getAllData",value:function(){var S=c()(D()().mark(function p(i){var l,t,s;return D()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.next=2,this.waitForDb();case 2:return l=this.db.transaction(i,"readonly"),t=l.objectStore(i),s=t.getAll(),j.abrupt("return",new Promise(function(n,P){s.onsuccess=function(){n(s.result)},s.onerror=function(){P(s.error)}}));case 6:case"end":return j.stop()}},p,this)}));function u(p){return S.apply(this,arguments)}return u}()},{key:"getDataByIndex",value:function(){var S=c()(D()().mark(function p(i,l,t){var s,a,j,n;return D()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,this.waitForDb();case 2:return s=this.db.transaction(i,"readonly"),a=s.objectStore(i),j=a.index(l),n=j.get(t),b.abrupt("return",new Promise(function(d,r){n.onsuccess=function(){var h;d((h=n.result)!==null&&h!==void 0?h:null)},n.onerror=function(){r(n.error)}}));case 7:case"end":return b.stop()}},p,this)}));function u(p,i,l){return S.apply(this,arguments)}return u}()},{key:"getAllDataByIndex",value:function(){var S=c()(D()().mark(function p(i,l,t){var s,a,j,n,P;return D()().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,this.waitForDb();case 2:return s=this.db.transaction(i,"readonly"),a=s.objectStore(i),j=a.index(l),n=j.openCursor(IDBKeyRange.only(t)),P=[],d.abrupt("return",new Promise(function(r,h){n.onsuccess=function(){var C=n.result;C?(P.push(C.value),C.continue()):r(P)},n.onerror=function(){h(n.error)}}));case 8:case"end":return d.stop()}},p,this)}));function u(p,i,l){return S.apply(this,arguments)}return u}()},{key:"updateData",value:function(){var S=c()(D()().mark(function p(i,l){var t,s,a;return D()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.waitForDb();case 2:return t=this.db.transaction(i,"readwrite"),s=t.objectStore(i),a=s.put(l),n.abrupt("return",new Promise(function(P,b){a.onsuccess=function(){P()},a.onerror=function(){b(a.error)}}));case 6:case"end":return n.stop()}},p,this)}));function u(p,i){return S.apply(this,arguments)}return u}()},{key:"deleteData",value:function(){var S=c()(D()().mark(function p(i,l){var t,s,a;return D()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.waitForDb();case 2:return t=this.db.transaction(i,"readwrite"),s=t.objectStore(i),a=s.delete(l),n.abrupt("return",new Promise(function(P,b){a.onsuccess=function(){P()},a.onerror=function(){b(a.error)}}));case 6:case"end":return n.stop()}},p,this)}));function u(p,i){return S.apply(this,arguments)}return u}()},{key:"deleteDataByIndex",value:function(){var S=c()(D()().mark(function p(i,l,t){var s,a,j,n;return D()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,this.waitForDb();case 2:return s=this.db.transaction(i,"readwrite"),a=s.objectStore(i),j=a.index(l),n=j.openCursor(IDBKeyRange.only(t)),b.abrupt("return",new Promise(function(d,r){n.onsuccess=function(){var h=n.result;h?(h.delete(),h.continue()):d()},n.onerror=function(){r(n.error)}}));case 7:case"end":return b.stop()}},p,this)}));function u(p,i,l){return S.apply(this,arguments)}return u}()}]),J}(),Q=z,te={dbName:"GptPlayground",version:4,stores:[{name:"Chats",keyPath:"id",options:{autoIncrement:!1}},{name:"Messages",keyPath:"id",options:{autoIncrement:!0},indexes:[{name:"chatId",keyPath:"chatId"}]},{name:"Bots",keyPath:"id",options:{autoIncrement:!0}},{name:"BotHistories",keyPath:"id",options:{autoIncrement:!0},indexes:[{name:"botId",keyPath:"botId"}]}]},H=new Q(te)},9981:function(se,$,e){e.d($,{Z:function(){return j}});var K=e(64599),D=e.n(K),Y=e(15009),c=e.n(Y),q=e(99289),M=e.n(q),_=e(12444),U=e.n(_),ee=e(72004),W=e.n(ee),X=e(25098),G=e.n(X),z=e(31996),Q=e.n(z),te=e(26037),H=e.n(te),J=e(12665),S=e.n(J),u=e(9783),p=e.n(u),i=e(88001),l={titleGeneratorModel:"gpt-4o-mini",titleGeneratorPrompt:"You are a conversation management robot. What the user will send to you is the details of the conversation between the user and an AI. You need to generate a short title that can summarize the content based on the content of the conversation. Output only text, without quotes and markdown format"},t=e(57632),s=e(41467),a=function(n){Q()(b,n);var P=H()(b);function b(d){var r;return U()(this,b),r=P.call(this),p()(G()(r),"id",void 0),p()(G()(r),"chat",void 0),p()(G()(r),"botId",void 0),p()(G()(r),"messages",[]),d?r.id=d:r.id=(0,t.Z)(),r}return W()(b,[{key:"setId",value:function(r){this.id=r}},{key:"setBot",value:function(r){this.botId=r}},{key:"init",value:function(){var d=M()(c()().mark(function h(C){var o;return c()().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return v.next=2,s.db.getData("Chats",this.id);case 2:if(this.chat=v.sent,this.chat!==null){v.next=15;break}if(this.chat={id:this.id,title:"",createdAt:new Date,systemPrompt:"",model:C||i.pk},!this.botId){v.next=11;break}return this.chat.botId=this.botId,v.next=9,s.db.getData("Bots",this.botId);case 9:o=v.sent,o&&(this.chat.systemPrompt=o.systemPrompt,this.chat.model=o.model);case 11:return v.next=13,s.db.addData("Chats",this.chat);case 13:v.next=18;break;case 15:return v.next=17,s.db.getAllDataByIndex("Messages","chatId",this.id);case 17:this.messages=v.sent.slice(-i.xf*2);case 18:case"end":return v.stop()}},h,this)}));function r(h){return d.apply(this,arguments)}return r}()},{key:"changeModel",value:function(){var d=M()(c()().mark(function h(C){return c()().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:if(this.chat){m.next=2;break}throw new Error("Chat is not initialized");case 2:return this.chat.model=C,m.next=5,s.db.updateData("Chats",this.chat);case 5:case"end":return m.stop()}},h,this)}));function r(h){return d.apply(this,arguments)}return r}()},{key:"renameChat",value:function(){var d=M()(c()().mark(function h(C){return c()().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:if(this.chat){m.next=2;break}throw new Error("Chat is not initialized");case 2:return this.chat.title=C,m.next=5,s.db.updateData("Chats",this.chat);case 5:case"end":return m.stop()}},h,this)}));function r(h){return d.apply(this,arguments)}return r}()},{key:"deleteChat",value:function(){var d=M()(c()().mark(function h(){return c()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:if(this.chat){o.next=2;break}throw new Error("Chat is not initialized");case 2:return o.next=4,s.db.deleteData("Chats",this.chat.id);case 4:return o.next=6,s.db.deleteDataByIndex("Messages","chatId",this.chat.id);case 6:case"end":return o.stop()}},h,this)}));function r(){return d.apply(this,arguments)}return r}()},{key:"sendMessage",value:function(){var d=M()(c()().mark(function h(C){var o,m=this,v,R,x,O,g,y,f,w,k,E,B,T,F,N,ie,ae;return c()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:if(v=JSON.parse(localStorage.getItem("openai_config")||"{}"),this.chat){I.next=3;break}throw new Error("Chat is not initialized");case 3:return R={chatId:this.chat.id,content:C,createdAt:new Date,isUser:!0},this.messages.push(R),this.messages.length>i.DI*2&&this.messages.shift(),I.next=8,s.db.addData("Messages",R);case 8:return x=[{role:"system",content:this.chat.systemPrompt}],this.messages.slice(-i.DI*2).forEach(function(ne){x.push({role:ne.isUser?"user":"assistant",content:ne.content})}),I.next=12,fetch("".concat(v.end_point,"/v1/chat/completions"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(v.api_key)},body:JSON.stringify({model:this.chat.model,messages:x,stream:!0})});case 12:O=I.sent,g=(o=O.body)===null||o===void 0?void 0:o.getReader(),y=new TextDecoder("utf-8"),f="";case 16:return I.next=19,g.read();case 19:if(w=I.sent,k=w.done,E=w.value,!k){I.next=24;break}return I.abrupt("break",46);case 24:B=y.decode(E,{stream:!0}),T=B.split(`
`),F=D()(T),I.prev=27,ie=c()().mark(function ne(){var oe,ue,V,re;return c()().wrap(function(A){for(;;)switch(A.prev=A.next){case 0:if(oe=N.value,!oe.startsWith("data: ")){A.next=8;break}if(ue=oe.slice(6),ue!=="[DONE]"){A.next=5;break}return A.abrupt("return",1);case 5:V=function(){try{return JSON.parse(ue)}catch(Z){return{}}}(),re=function(){if(V!=null&&V.choices){var Z;return V==null||(Z=V.choices[0])===null||Z===void 0||(Z=Z.delta)===null||Z===void 0?void 0:Z.content}return null}(),re&&(f+=re,m.dispatchEvent(new CustomEvent("messageReceived",{detail:re})));case 8:case"end":return A.stop()}},ne)}),F.s();case 30:if((N=F.n()).done){I.next=36;break}return I.delegateYield(ie(),"t0",32);case 32:if(!I.t0){I.next=34;break}return I.abrupt("break",36);case 34:I.next=30;break;case 36:I.next=41;break;case 38:I.prev=38,I.t1=I.catch(27),F.e(I.t1);case 41:return I.prev=41,F.f(),I.finish(41);case 44:I.next=16;break;case 46:return ae={chatId:this.chat.id,content:f,createdAt:new Date,isUser:!1},this.messages.push(ae),this.messages.length>i.DI*2&&this.messages.shift(),I.next=51,s.db.addData("Messages",ae);case 51:case"end":return I.stop()}},h,this,[[27,38,41,44]])}));function r(h){return d.apply(this,arguments)}return r}()},{key:"generateChatName",value:function(){var d=M()(c()().mark(function h(){var C,o,m,v,R,x;return c()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:if(C=JSON.parse(localStorage.getItem("openai_config")||"{}"),this.chat){g.next=3;break}throw new Error("Chat is not initialized");case 3:return o=[{role:"system",content:l.titleGeneratorPrompt}],m="system: ".concat(this.chat.systemPrompt,`
`),this.messages.forEach(function(y){m+="".concat(y.isUser?"user":"assistant",": ").concat(y.content,`
`)}),o.push({role:"user",content:m}),g.next=9,fetch("".concat(C.end_point,"/v1/chat/completions"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(C.api_key)},body:JSON.stringify({model:l.titleGeneratorModel,messages:o,stream:!1})});case 9:return v=g.sent,g.next=12,v.json();case 12:return R=g.sent,x=R.choices[0].message.content,this.chat.title=x,g.next=17,s.db.updateData("Chats",this.chat);case 17:return g.abrupt("return",x);case 18:case"end":return g.stop()}},h,this)}));function r(){return d.apply(this,arguments)}return r}()}],[{key:"getChats",value:function(){var d=M()(c()().mark(function h(){return c()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,s.db.getAllData("Chats");case 3:return o.abrupt("return",o.sent);case 6:return o.prev=6,o.t0=o.catch(0),console.error("Error getting chats",o.t0),o.abrupt("return",[]);case 10:case"end":return o.stop()}},h,null,[[0,6]])}));function r(){return d.apply(this,arguments)}return r}()}]),b}(S()(EventTarget)),j=a},80410:function(se,$){$.Z={mainMenuGroupTitle:"mainMenuGroupTitle___hweHk","ant-menu":"ant-menu___y2T4k","ant-menu-item-disabled":"ant-menu-item-disabled___DfiXc","ant-pro-sider-menu":"ant-pro-sider-menu___L9jfK","ant-menu-item":"ant-menu-item___eeuhi","main-menu-item":"main-menu-item___LtHgB","main-menu-link":"main-menu-link___frrYk","main-menu-action":"main-menu-action___nUvpj","ant-menu-item-selected":"ant-menu-item-selected___erhGe"}}}]);
