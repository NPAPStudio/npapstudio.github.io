"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[640],{73700:function(te,O,e){e.d(O,{Z:function(){return C}});var H=e(5574),i=e.n(H),F=e(15009),o=e.n(F),G=e(99289),f=e.n(G),w=e(12444),J=e.n(w),R=e(72004),A=e.n(R),Z=e(41467),d=function(){function x(){J()(this,x)}return A()(x,[{key:"import",value:function(){var _=f()(o()().mark(function S(j){return o()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,Z.db.importData(j.db);case 2:return localStorage.clear(),Object.keys(j.localStorage).forEach(function(h){localStorage.setItem(h,j.localStorage[h])}),g.abrupt("return",!0);case 5:case"end":return g.stop()}},S)}));function b(S){return _.apply(this,arguments)}return b}()},{key:"export",value:function(){var _=f()(o()().mark(function S(){var j,k,g,h;return o()().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.next=2,Z.db.exportData();case 2:return m.t0=m.sent,m.t1=localStorage,j={db:m.t0,localStorage:m.t1},k=new Blob([JSON.stringify(j,null,4)],{type:"application/json"}),g=URL.createObjectURL(k),h=document.createElement("a"),h.href=g,h.download="gpt_playground_export_".concat(new Date().getTime(),".json"),document.body.appendChild(h),h.click(),document.body.removeChild(h),URL.revokeObjectURL(g),m.abrupt("return",j);case 15:case"end":return m.stop()}},S)}));function b(){return _.apply(this,arguments)}return b}()}]),x}(),s=d,y=e(64082),Y=e(2058),D=e(23323),l=e(25278),p=e(14726),u=e(96311),t=e(28558),a=e(67294),r={settingModal:"settingModal___Z4BHM",settingModalMainContainer:"settingModalMainContainer___V8tIE",settingModalMenu:"settingModalMenu___XTpKy",modelItem:"modelItem___k8hgT"},n=e(85893),c=Y.Z.Dragger,L=function(_){var b=_.isSettingModalOpen,S=_.handleSettingOk,j=_.handleSettingCancel,k=(0,a.useState)("token"),g=i()(k,2),h=g[0],$=g[1],m=JSON.parse(localStorage.getItem("openai_config")||"{}"),ne=(0,a.useState)((m==null?void 0:m.api_key)||""),Q=i()(ne,2),W=Q[0],T=Q[1],me=(0,a.useState)((m==null?void 0:m.end_point)||""),oe=i()(me,2),ae=oe[0],pe=oe[1];(0,a.useEffect)(function(){var I=JSON.parse(localStorage.getItem("openai_config")||"{}");I.api_key=W,I.end_point=ae||"https://api.openai.com",localStorage.setItem("openai_config",JSON.stringify(I))},[W,ae]);var ce=function(M){$(M.key)},he=function(){var I=f()(o()().mark(function M(){var B;return o()().wrap(function(V){for(;;)switch(V.prev=V.next){case 0:return B=new s,V.next=3,B.export();case 3:case"end":return V.stop()}},M)}));return function(){return I.apply(this,arguments)}}(),ve=function(){var I=f()(o()().mark(function M(B){var q;return o()().wrap(function(re){for(;;)switch(re.prev=re.next){case 0:q=new FileReader,q.onload=function(){var ye=f()(o()().mark(function le(ie){var se,ue,de;return o()().wrap(function(ee){for(;;)switch(ee.prev=ee.next){case 0:return ue=JSON.parse(ie==null||(se=ie.target)===null||se===void 0?void 0:se.result),de=new s,ee.next=4,de.import(ue);case 4:window.location.reload();case 5:case"end":return ee.stop()}},le)}));return function(le){return ye.apply(this,arguments)}}(),q.readAsText(B);case 3:case"end":return re.stop()}},M)}));return function(B){return I.apply(this,arguments)}}(),_e=function(M){T(M.api_key),pe(M.end_point)},fe=function(){return h==="token"?(0,n.jsxs)(D.Z,{name:"basic",labelCol:{span:18},wrapperCol:{span:18},initialValues:{api_key:W,end_point:ae},onFinish:_e,autoComplete:"off",layout:"vertical",children:[(0,n.jsx)("h2",{children:"API KEY Settings"}),(0,n.jsx)("br",{}),(0,n.jsx)(D.Z.Item,{label:"API KEY",name:"api_key",rules:[{required:!0,message:""}],children:(0,n.jsx)(l.Z,{})}),(0,n.jsx)(D.Z.Item,{label:"End Point",name:"end_point",rules:[{required:!1,message:""}],children:(0,n.jsx)(l.Z,{})}),(0,n.jsx)(D.Z.Item,{wrapperCol:{offset:0,span:24},children:(0,n.jsx)(p.ZP,{type:"primary",htmlType:"submit",children:"Save"})})]}):h==="import_export"?(0,n.jsxs)("div",{children:[(0,n.jsx)("h2",{children:"Import & Export"}),(0,n.jsx)("br",{}),(0,n.jsx)("h3",{children:"Export"}),(0,n.jsx)(p.ZP,{type:"primary",onClick:he,children:"Export"}),(0,n.jsx)("br",{}),(0,n.jsx)("br",{}),(0,n.jsx)("h3",{children:"Import"}),(0,n.jsxs)(c,{multiple:!1,accept:".json, application/json",customRequest:function(B){ve(B.file),console.log(B.file)},children:[(0,n.jsx)("p",{className:"ant-upload-drag-icon",children:(0,n.jsx)(y.Z,{})}),(0,n.jsx)("p",{className:"ant-upload-text",children:"Click or drag file to this area to upload"})]})]}):null},ge=[{key:"token",label:"API KEY"},{key:"import_export",label:"Import & Export"}];return(0,n.jsx)(u.Z,{title:"",open:b,onOk:S,onCancel:j,footer:null,closeIcon:null,classNames:{content:r.settingModal},width:Math.min(750,window.innerWidth-20),children:(0,n.jsxs)("div",{className:r.settingModalMainContainer,children:[(0,n.jsx)(t.Z,{mode:"inline",className:r.settingModalMenu,selectedKeys:[h],onClick:ce,items:ge}),(0,n.jsx)("div",{style:{padding:"20px",flex:1,overflowY:"auto"},children:fe()})]})})},K=L,z=K,U=e(42952),N=e(50228),X=e(38545),P=e(88634),E={mainMenuFooter:"mainMenuFooter___dbT6T"},v=function(_){var b=_.page,S=JSON.parse(localStorage.getItem("openai_config")||"{}"),j=(0,a.useState)(!S.api_key),k=i()(j,2),g=k[0],h=k[1],$=[{key:"setting",icon:(0,n.jsx)(U.Z,{}),label:"Setting"}];b==="chat"&&$.unshift({key:"bot",icon:(0,n.jsx)(N.Z,{}),label:"Bots"}),b==="bot"&&$.unshift({key:"chat",icon:(0,n.jsx)(X.Z,{}),label:"Chats"});var m=function(T){T&&T.key==="setting"?h(!0):P.history.push("/".concat(T==null?void 0:T.key))},ne=function(){JSON.parse(localStorage.getItem("openai_config")||"{}").api_key&&h(!1)},Q=function(){h(!1)};return(0,n.jsxs)("div",{className:E.mainMenuFooter,children:[(0,n.jsx)(t.Z,{items:$,onClick:m,selectable:!1}),(0,n.jsx)(z,{isSettingModalOpen:g,handleSettingOk:ne,handleSettingCancel:Q})]})},C=v},36681:function(te,O,e){e.r(O),e.d(O,{default:function(){return a}});var H=e(15009),i=e.n(H),F=e(99289),o=e.n(F),G=e(5574),f=e.n(G),w=e(67984),J=e(89705),R=e(88634),A=e(86250),Z=e(47988),d=e(14726),s=e(85893);function y(r){var n=r.item,c=r.onDelete,L=new w.Z(n.botId),K=function(){var U=o()(i()().mark(function N(){return i()().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return P.next=2,L.delete();case 2:c&&c(n.botId);case 3:case"end":return P.stop()}},N)}));return function(){return U.apply(this,arguments)}}(),z=[{key:"delete",danger:!0,label:(0,s.jsx)("span",{onClick:function(){return K()},children:"Delete"})}];return(0,s.jsxs)(A.Z,{gap:"0",className:"main-menu-item",justify:"space-between",align:"center",style:{width:"100%"},children:[(0,s.jsx)(R.Link,{to:n.path,className:"main-menu-link",children:(0,s.jsx)("span",{children:n.name})}),(0,s.jsx)(Z.Z,{menu:{items:z},trigger:["click"],className:"main-menu-action",children:(0,s.jsx)(d.ZP,{icon:(0,s.jsx)(J.Z,{}),size:"small",type:"text"})})]})}var Y=y,D=e(73700),l=e(24969),p=e(64917),u=e(67294),t=e(80410),a=function(){var r=u.useState([]),n=f()(r,2),c=n[0],L=n[1],K=function(){var E=o()(i()().mark(function v(){var C;return i()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,w.Z.getAll();case 2:C=_.sent,L(C);case 4:case"end":return _.stop()}},v)}));return function(){return E.apply(this,arguments)}}();(0,u.useEffect)(function(){K()},[]),(0,u.useEffect)(function(){K()},[location.pathname]);var z=function(){var E=o()(i()().mark(function v(C){var x;return i()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:x=c.filter(function(S){return S.id!==C}),L(x),location.pathname.match(C.toString())&&R.history.push("/bot");case 3:case"end":return b.stop()}},v)}));return function(C){return E.apply(this,arguments)}}(),U=function(){var v=function(){R.history.push("/bot")};return(0,s.jsx)(A.Z,{className:t.Z.mainMenuHeader,gap:"small",justify:"space-between",style:{width:"100%"},children:(0,s.jsx)(d.ZP,{icon:(0,s.jsx)(l.Z,{}),shape:"circle",size:"small",onClick:v})})},N=function(){return c.map(function(v){return{botId:v.id,name:v.title,path:"/bot/"+v.id,key:"/bot/"+v.id}})},X=function(v,C){return(0,s.jsx)(Y,{item:v,onDelete:z})},P=function(){return(0,D.Z)({page:"bot"})};return(0,s.jsx)(p.f,{siderWidth:240,contentStyle:{padding:0,height:"100%",minHeight:"100%",display:"flex",flex:1},menuHeaderRender:U,menuDataRender:N,menuItemRender:X,menuFooterRender:P,menuProps:{selectable:!1},collapsedButtonRender:function(){return(0,s.jsx)("div",{})},children:(0,s.jsx)(R.Outlet,{})})}},67984:function(te,O,e){var H=e(15009),i=e.n(H),F=e(97857),o=e.n(F),G=e(99289),f=e.n(G),w=e(12444),J=e.n(w),R=e(72004),A=e.n(R),Z=e(9783),d=e.n(Z),s=e(88001),y=e(41467),Y=function(){function D(l){J()(this,D),d()(this,"id",void 0),d()(this,"title",void 0),d()(this,"createdAt",void 0),d()(this,"systemPrompt",void 0),d()(this,"model",void 0),d()(this,"helperChatId",void 0),d()(this,"frequency_penalty",void 0),d()(this,"presence_penalty",void 0),d()(this,"max_tokens",void 0),d()(this,"temperature",void 0),d()(this,"top_p",void 0),d()(this,"stop",void 0),d()(this,"maxDisplayRounds",void 0),d()(this,"maxMemoryRounds",void 0),l?this.id=parseInt(l):(this.title="",this.createdAt=new Date,this.systemPrompt="",this.model=s.pk,this.frequency_penalty=0,this.presence_penalty=0,this.temperature=1,this.top_p=1,this.stop=[],this.maxDisplayRounds=s.xf,this.maxMemoryRounds=s.DI)}return A()(D,[{key:"setId",value:function(p){this.id=parseInt(p)}},{key:"create",value:function(){var l=f()(i()().mark(function u(t){var a,r;return i()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,y.db.addData("Bots",t);case 2:return a=c.sent,this.id=a,r=o()(o()({},t),{},{botId:this.id,updateAt:new Date}),c.next=7,y.db.addData("BotHistories",r);case 7:return c.next=9,this.get();case 9:return c.abrupt("return",c.sent);case 10:case"end":return c.stop()}},u,this)}));function p(u){return l.apply(this,arguments)}return p}()},{key:"update",value:function(){var l=f()(i()().mark(function u(t){var a;return i()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(this.id){n.next=2;break}throw new Error("Bot id is required");case 2:return n.next=4,y.db.updateData("Bots",o()(o()({},t),{},{id:this.id}));case 4:return a=o()(o()({},t),{},{botId:this.id,updateAt:new Date}),n.next=7,y.db.addData("BotHistories",a);case 7:return n.next=9,this.get();case 9:return n.abrupt("return",n.sent);case 10:case"end":return n.stop()}},u,this)}));function p(u){return l.apply(this,arguments)}return p}()},{key:"delete",value:function(){var l=f()(i()().mark(function u(){return i()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(this.id){a.next=2;break}throw new Error("Bot id is required");case 2:return a.next=4,y.db.deleteData("Bots",this.id);case 4:return a.next=6,y.db.deleteDataByIndex("BotHistories","botId",this.id);case 6:case"end":return a.stop()}},u,this)}));function p(){return l.apply(this,arguments)}return p}()},{key:"get",value:function(){var l=f()(i()().mark(function u(){var t;return i()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(this.id){r.next=2;break}throw new Error("Bot id is required");case 2:return r.next=4,y.db.getData("Bots",this.id);case 4:return t=r.sent,this.title=(t==null?void 0:t.title)||"",this.createdAt=(t==null?void 0:t.createdAt)||new Date,this.systemPrompt=(t==null?void 0:t.systemPrompt)||"",this.model=(t==null?void 0:t.model)||s.pk,this.frequency_penalty=(t==null?void 0:t.frequency_penalty)||0,this.presence_penalty=(t==null?void 0:t.presence_penalty)||0,this.temperature=(t==null?void 0:t.temperature)||1,this.top_p=(t==null?void 0:t.top_p)||1,this.stop=(t==null?void 0:t.stop)||[],this.maxDisplayRounds=(t==null?void 0:t.maxDisplayRounds)||s.xf,this.maxMemoryRounds=(t==null?void 0:t.maxMemoryRounds)||s.DI,r.abrupt("return",t);case 17:case"end":return r.stop()}},u,this)}));function p(){return l.apply(this,arguments)}return p}()},{key:"getHistory",value:function(){var l=f()(i()().mark(function u(t){return i()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,y.db.getDataByIndex("BotHistories","botId",t);case 2:return r.abrupt("return",r.sent);case 3:case"end":return r.stop()}},u)}));function p(u){return l.apply(this,arguments)}return p}()}],[{key:"getAll",value:function(){var l=f()(i()().mark(function u(){return i()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,y.db.getAllData("Bots");case 2:return a.abrupt("return",a.sent);case 3:case"end":return a.stop()}},u)}));function p(){return l.apply(this,arguments)}return p}()}]),D}();O.Z=Y},80410:function(te,O){O.Z={mainLayout:"mainLayout___ENN4I",mainMenuGroupTitle:"mainMenuGroupTitle___hweHk","ant-menu":"ant-menu___y2T4k","ant-menu-item-disabled":"ant-menu-item-disabled___DfiXc","ant-pro-sider-menu":"ant-pro-sider-menu___L9jfK","ant-menu-item":"ant-menu-item___eeuhi","main-menu-item":"main-menu-item___LtHgB","main-menu-link":"main-menu-link___frrYk","main-menu-action":"main-menu-action___nUvpj","ant-menu-item-selected":"ant-menu-item-selected___erhGe"}}}]);