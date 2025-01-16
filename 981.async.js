"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[981],{9981:function(pe,Z,h){h.d(Z,{Z:function(){return le}});var K=h(64599),Q=h.n(K),L=h(15009),d=h.n(L),V=h(99289),g=h.n(V),X=h(12444),x=h.n(X),q=h(72004),_=h.n(q),ee=h(25098),z=h.n(ee),te=h(31996),ae=h.n(te),se=h(26037),ne=h.n(se),re=h(12665),ie=h.n(re),he=h(9783),R=h.n(he),v=h(88001),O={titleGeneratorModel:"gpt-4o-mini",titleGeneratorPrompt:"You are a conversation management robot. What the user will send to you is the details of the conversation between the user and an AI. You need to generate a short title that can summarize the content based on the content of the conversation. Output only text, without quotes and markdown format"},ue=h(57632),u=h(41467),oe=function(de){ae()(I,de);var ce=ne()(I);function I(o){var a;return x()(this,I),a=ce.call(this),R()(z()(a),"id",void 0),R()(z()(a),"chat",void 0),R()(z()(a),"botId",void 0),R()(z()(a),"messages",[]),o?a.id=o:a.id=(0,ue.Z)(),a}return _()(I,[{key:"setId",value:function(a){this.id=a}},{key:"setBot",value:function(a){this.botId=a}},{key:"init",value:function(){var o=g()(d()().mark(function l(s,e){var n,r,c;return d()().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,u.db.getData("Chats",this.id);case 2:if(this.chat=i.sent,!(this.chat===null||this.chat===void 0)){i.next=15;break}if(this.chat={id:this.id,title:s===u.z.GenerateBot?"Generate Bot":"",createdAt:new Date,systemPrompt:s===u.z.GenerateBot?v.Qj:"",type:s||u.z.Chat,model:s===u.z.GenerateBot?e||v.K4:e||v.pk,maxDisplayRounds:s===u.z.GenerateBot?100:v.xf,maxMemoryRounds:s===u.z.GenerateBot?100:v.DI},!(this.botId&&this.chat.type===u.z.Chat)){i.next=11;break}return this.chat.botId=this.botId,i.next=9,u.db.getData("Bots",this.botId);case 9:n=i.sent,n&&(this.chat.systemPrompt=n.systemPrompt,this.chat.model=n.model,this.chat.maxDisplayRounds=n.maxDisplayRounds,this.chat.maxMemoryRounds=n.maxMemoryRounds);case 11:return i.next=13,u.db.addData("Chats",this.chat);case 13:i.next=20;break;case 15:return this.chat.maxDisplayRounds=((r=this.chat)===null||r===void 0?void 0:r.maxDisplayRounds)||v.xf,this.chat.maxMemoryRounds=((c=this.chat)===null||c===void 0?void 0:c.maxMemoryRounds)||v.DI,i.next=19,u.db.getAllDataByIndex("Messages","chatId",this.id);case 19:this.messages=i.sent.slice(-this.chat.maxDisplayRounds*2);case 20:case"end":return i.stop()}},l,this)}));function a(l,s){return o.apply(this,arguments)}return a}()},{key:"changeModel",value:function(){var o=g()(d()().mark(function l(s){return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(this.chat){n.next=2;break}throw new Error("Chat is not initialized");case 2:return this.chat.model=s,n.next=5,u.db.updateData("Chats",this.chat);case 5:case"end":return n.stop()}},l,this)}));function a(l){return o.apply(this,arguments)}return a}()},{key:"renameChat",value:function(){var o=g()(d()().mark(function l(s){return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(this.chat){n.next=2;break}throw new Error("Chat is not initialized");case 2:return this.chat.title=s,n.next=5,u.db.updateData("Chats",this.chat);case 5:case"end":return n.stop()}},l,this)}));function a(l){return o.apply(this,arguments)}return a}()},{key:"deleteChat",value:function(){var o=g()(d()().mark(function l(){return d()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.chat){e.next=2;break}throw new Error("Chat is not initialized");case 2:return e.next=4,u.db.deleteData("Chats",this.chat.id);case 4:return e.next=6,u.db.deleteDataByIndex("Messages","chatId",this.chat.id);case 6:case"end":return e.stop()}},l,this)}));function a(){return o.apply(this,arguments)}return a}()},{key:"sendMessage",value:function(){var o=g()(d()().mark(function l(s){var e,n,r,c=this,y,i,k,p,C,m,A,$,J,E,T,j,U,Y,F,D,H,W,B,P;return d()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(i=JSON.parse(localStorage.getItem("openai_config")||"{}"),this.chat){t.next=3;break}throw new Error("Chat is not initialized");case 3:return k={chatId:this.chat.id,content:s,createdAt:new Date,isUser:!0},t.next=6,u.db.addData("Messages",k);case 6:return p=t.sent,k.id=parseInt(p.toString()),this.messages.push(k),this.messages.length>(((e=this.chat)===null||e===void 0?void 0:e.maxMemoryRounds)||v.DI)*2&&this.messages.shift(),this.dispatchEvent(new CustomEvent("userMessageId",{detail:p})),C=[],this.chat.systemPrompt&&C.push({role:"system",content:this.chat.systemPrompt}),this.messages.slice(-(((n=this.chat)===null||n===void 0?void 0:n.maxMemoryRounds)||v.DI)*2).forEach(function(G){var M={role:G.isUser?"user":"assistant",content:G.content};C.push(M)}),m={url:"".concat(i.end_point,"/v1/chat/completions"),method:"POST",headers:{},body:JSON.stringify({model:this.chat.model,messages:C,stream:!0,stream_options:{include_usage:!0}})},m.url.match("azure")?(m.url=i.end_point,m.headers={"Content-Type":"application/json","api-key":i.api_key}):m.url.match("cloudsway")?(m.url="".concat(i.end_point,"/chat/completions"),m.headers={"Content-Type":"application/json",Authorization:"Bearer ".concat(i.api_key)}):m.headers={"Content-Type":"application/json",Authorization:"Bearer ".concat(i.api_key)},t.next=18,fetch(m.url,{method:m.method,headers:m.headers,body:m.body});case 18:A=t.sent,$=(r=A.body)===null||r===void 0?void 0:r.getReader(),J=new TextDecoder("utf-8"),E="";case 22:return t.next=25,$.read();case 25:if(T=t.sent,j=T.done,U=T.value,!j){t.next=30;break}return t.abrupt("break",52);case 30:Y=J.decode(U,{stream:!0}),F=Y.split(`
`),D=Q()(F),t.prev=33,W=d()().mark(function G(){var M,N,f,S;return d()().wrap(function(w){for(;;)switch(w.prev=w.next){case 0:if(M=H.value,!M.startsWith("data: ")){w.next=9;break}if(N=M.slice(6),N!=="[DONE]"){w.next=6;break}return c.dispatchEvent(new CustomEvent("messageReceivedDone",{detail:E})),w.abrupt("return",1);case 6:f=function(){try{return JSON.parse(N)}catch(b){return{}}}(),S=function(){if(f!=null&&f.usage&&c.dispatchEvent(new CustomEvent("usageReceived",{detail:f.usage})),f!=null&&f.choices){var b;return f==null||(b=f.choices[0])===null||b===void 0||(b=b.delta)===null||b===void 0?void 0:b.content}return null}(),S&&(E+=S,c.dispatchEvent(new CustomEvent("messageReceived",{detail:S})));case 9:case"end":return w.stop()}},G)}),D.s();case 36:if((H=D.n()).done){t.next=42;break}return t.delegateYield(W(),"t0",38);case 38:if(!t.t0){t.next=40;break}return t.abrupt("break",42);case 40:t.next=36;break;case 42:t.next=47;break;case 44:t.prev=44,t.t1=t.catch(33),D.e(t.t1);case 47:return t.prev=47,D.f(),t.finish(47);case 50:t.next=22;break;case 52:return B={chatId:this.chat.id,content:E,createdAt:new Date,isUser:!1},t.next=55,u.db.addData("Messages",B);case 55:P=t.sent,B.id=parseInt(P.toString()),this.messages.push(B),this.messages.length>(((y=this.chat)===null||y===void 0?void 0:y.maxMemoryRounds)||v.DI)*2&&this.messages.shift(),this.dispatchEvent(new CustomEvent("assistantMessageId",{detail:P}));case 60:case"end":return t.stop()}},l,this,[[33,44,47,50]])}));function a(l){return o.apply(this,arguments)}return a}()},{key:"deleteMessage",value:function(){var o=g()(d()().mark(function l(s){var e;return d()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(e=this.messages.find(function(c){return c.id===s}),e){r.next=3;break}return r.abrupt("return");case 3:return r.next=5,u.db.deleteData("Messages",s);case 5:this.messages=this.messages.filter(function(c){return c.id!==s});case 6:case"end":return r.stop()}},l,this)}));function a(l){return o.apply(this,arguments)}return a}()},{key:"generateChatName",value:function(){var o=g()(d()().mark(function l(){var s,e,n,r,c,y,i;return d()().wrap(function(p){for(;;)switch(p.prev=p.next){case 0:if(s=JSON.parse(localStorage.getItem("openai_config")||"{}"),this.chat){p.next=3;break}throw new Error("Chat is not initialized");case 3:return e=[{role:"system",content:O.titleGeneratorPrompt}],n="system: ".concat(this.chat.systemPrompt,`
`),this.messages.forEach(function(C){n+="".concat(C.isUser?"user":"assistant",": ").concat(C.content,`
`)}),e.push({role:"user",content:n}),r={url:"".concat(s.end_point,"/v1/chat/completions"),method:"POST",headers:{},body:JSON.stringify({model:O.titleGeneratorModel,messages:e,stream:!1})},r.url.match("azure")?(r.url=s.end_point,r.headers={"Content-Type":"application/json","api-key":s.api_key}):r.url.match("cloudsway")?(r.url="".concat(s.end_point,"/chat/completions"),r.headers={"Content-Type":"application/json",Authorization:"Bearer ".concat(s.api_key)}):r.headers={"Content-Type":"application/json",Authorization:"Bearer ".concat(s.api_key)},p.next=11,fetch(r.url,{method:r.method,headers:r.headers,body:r.body});case 11:return c=p.sent,p.next=14,c.json();case 14:return y=p.sent,i=y.choices[0].message.content,this.chat.title=i,p.next=19,u.db.updateData("Chats",this.chat);case 19:return p.abrupt("return",i);case 20:case"end":return p.stop()}},l,this)}));function a(){return o.apply(this,arguments)}return a}()}],[{key:"getChats",value:function(){var o=g()(d()().mark(function l(){return d()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.db.getAllDataByIndex("Chats","type",u.z.Chat);case 3:return e.abrupt("return",e.sent);case 6:return e.prev=6,e.t0=e.catch(0),console.error("Error getting chats",e.t0),e.abrupt("return",[]);case 10:case"end":return e.stop()}},l,null,[[0,6]])}));function a(){return o.apply(this,arguments)}return a}()}]),I}(ie()(EventTarget)),le=oe}}]);
