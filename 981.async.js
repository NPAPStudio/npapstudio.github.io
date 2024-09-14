"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[981],{9981:function(oe,H,r){r.d(H,{Z:function(){return he}});var W=r(64599),Z=r.n(W),K=r(15009),l=r.n(K),Q=r(99289),v=r.n(Q),j=r(12444),L=r.n(j),V=r(72004),X=r.n(V),x=r(25098),I=r.n(x),q=r(31996),_=r.n(q),ee=r(26037),te=r.n(ee),ae=r(12665),se=r.n(ae),re=r(9783),k=r.n(re),m=r(88001),N={titleGeneratorModel:"gpt-4o-mini",titleGeneratorPrompt:"You are a conversation management robot. What the user will send to you is the details of the conversation between the user and an AI. You need to generate a short title that can summarize the content based on the content of the conversation. Output only text, without quotes and markdown format"},ne=r(57632),i=r(41467),ie=function(ue){_()(D,ue);var le=te()(D);function D(h){var t;return L()(this,D),t=le.call(this),k()(I()(t),"id",void 0),k()(I()(t),"chat",void 0),k()(I()(t),"botId",void 0),k()(I()(t),"messages",[]),h?t.id=h:t.id=(0,ne.Z)(),t}return X()(D,[{key:"setId",value:function(t){this.id=t}},{key:"setBot",value:function(t){this.botId=t}},{key:"init",value:function(){var h=v()(l()().mark(function u(n,e){var a,d,f;return l()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,i.db.getData("Chats",this.id);case 2:if(this.chat=o.sent,!(this.chat===null||this.chat===void 0)){o.next=15;break}if(this.chat={id:this.id,title:n===i.z.GenerateBot?"Generate Bot":"",createdAt:new Date,systemPrompt:n===i.z.GenerateBot?m.Qj:"",type:n||i.z.Chat,model:n===i.z.GenerateBot?e||m.K4:e||m.pk,maxDisplayRounds:n===i.z.GenerateBot?100:m.xf,maxMemoryRounds:n===i.z.GenerateBot?100:m.DI},!(this.botId&&this.chat.type===i.z.Chat)){o.next=11;break}return this.chat.botId=this.botId,o.next=9,i.db.getData("Bots",this.botId);case 9:a=o.sent,a&&(this.chat.systemPrompt=a.systemPrompt,this.chat.model=a.model,this.chat.maxDisplayRounds=a.maxDisplayRounds,this.chat.maxMemoryRounds=a.maxMemoryRounds);case 11:return o.next=13,i.db.addData("Chats",this.chat);case 13:o.next=20;break;case 15:return this.chat.maxDisplayRounds=((d=this.chat)===null||d===void 0?void 0:d.maxDisplayRounds)||m.xf,this.chat.maxMemoryRounds=((f=this.chat)===null||f===void 0?void 0:f.maxMemoryRounds)||m.DI,o.next=19,i.db.getAllDataByIndex("Messages","chatId",this.id);case 19:this.messages=o.sent.slice(-this.chat.maxDisplayRounds*2);case 20:case"end":return o.stop()}},u,this)}));function t(u,n){return h.apply(this,arguments)}return t}()},{key:"changeModel",value:function(){var h=v()(l()().mark(function u(n){return l()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(this.chat){a.next=2;break}throw new Error("Chat is not initialized");case 2:return this.chat.model=n,a.next=5,i.db.updateData("Chats",this.chat);case 5:case"end":return a.stop()}},u,this)}));function t(u){return h.apply(this,arguments)}return t}()},{key:"renameChat",value:function(){var h=v()(l()().mark(function u(n){return l()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(this.chat){a.next=2;break}throw new Error("Chat is not initialized");case 2:return this.chat.title=n,a.next=5,i.db.updateData("Chats",this.chat);case 5:case"end":return a.stop()}},u,this)}));function t(u){return h.apply(this,arguments)}return t}()},{key:"deleteChat",value:function(){var h=v()(l()().mark(function u(){return l()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.chat){e.next=2;break}throw new Error("Chat is not initialized");case 2:return e.next=4,i.db.deleteData("Chats",this.chat.id);case 4:return e.next=6,i.db.deleteDataByIndex("Messages","chatId",this.chat.id);case 6:case"end":return e.stop()}},u,this)}));function t(){return h.apply(this,arguments)}return t}()},{key:"sendMessage",value:function(){var h=v()(l()().mark(function u(n){var e,a,d,f=this,p,o,c,C,O,P,T,M,B,A,$,J,U,w,Y,F,E;return l()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(o=JSON.parse(localStorage.getItem("openai_config")||"{}"),this.chat){s.next=3;break}throw new Error("Chat is not initialized");case 3:return c={chatId:this.chat.id,content:n,createdAt:new Date,isUser:!0},this.messages.push(c),this.messages.length>(((e=this.chat)===null||e===void 0?void 0:e.maxMemoryRounds)||m.DI)*2&&this.messages.shift(),s.next=8,i.db.addData("Messages",c);case 8:return C=[{role:"system",content:this.chat.systemPrompt}],this.messages.slice(-(((a=this.chat)===null||a===void 0?void 0:a.maxMemoryRounds)||m.DI)*2).forEach(function(R){C.push({role:R.isUser?"user":"assistant",content:R.content})}),s.next=12,fetch("".concat(o.end_point,"/v1/chat/completions"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(o.api_key)},body:JSON.stringify({model:this.chat.model,messages:C,stream:!0})});case 12:O=s.sent,P=(d=O.body)===null||d===void 0?void 0:d.getReader(),T=new TextDecoder("utf-8"),M="";case 16:return s.next=19,P.read();case 19:if(B=s.sent,A=B.done,$=B.value,!A){s.next=24;break}return s.abrupt("break",46);case 24:J=T.decode($,{stream:!0}),U=J.split(`
`),w=Z()(U),s.prev=27,F=l()().mark(function R(){var G,S,g,z;return l()().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:if(G=Y.value,!G.startsWith("data: ")){b.next=9;break}if(S=G.slice(6),S!=="[DONE]"){b.next=6;break}return f.dispatchEvent(new CustomEvent("messageReceivedDone",{detail:M})),b.abrupt("return",1);case 6:g=function(){try{return JSON.parse(S)}catch(y){return{}}}(),z=function(){if(g!=null&&g.choices){var y;return g==null||(y=g.choices[0])===null||y===void 0||(y=y.delta)===null||y===void 0?void 0:y.content}return null}(),z&&(M+=z,f.dispatchEvent(new CustomEvent("messageReceived",{detail:z})));case 9:case"end":return b.stop()}},R)}),w.s();case 30:if((Y=w.n()).done){s.next=36;break}return s.delegateYield(F(),"t0",32);case 32:if(!s.t0){s.next=34;break}return s.abrupt("break",36);case 34:s.next=30;break;case 36:s.next=41;break;case 38:s.prev=38,s.t1=s.catch(27),w.e(s.t1);case 41:return s.prev=41,w.f(),s.finish(41);case 44:s.next=16;break;case 46:return E={chatId:this.chat.id,content:M,createdAt:new Date,isUser:!1},this.messages.push(E),this.messages.length>(((p=this.chat)===null||p===void 0?void 0:p.maxMemoryRounds)||m.DI)*2&&this.messages.shift(),s.next=51,i.db.addData("Messages",E);case 51:case"end":return s.stop()}},u,this,[[27,38,41,44]])}));function t(u){return h.apply(this,arguments)}return t}()},{key:"deleteMessage",value:function(){var h=v()(l()().mark(function u(n){var e;return l()().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:if(e=this.messages.find(function(f){return f.id===n}),e){d.next=3;break}return d.abrupt("return");case 3:return d.next=5,i.db.deleteData("Messages",n);case 5:this.messages=this.messages.filter(function(f){return f.id!==n});case 6:case"end":return d.stop()}},u,this)}));function t(u){return h.apply(this,arguments)}return t}()},{key:"generateChatName",value:function(){var h=v()(l()().mark(function u(){var n,e,a,d,f,p;return l()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:if(n=JSON.parse(localStorage.getItem("openai_config")||"{}"),this.chat){c.next=3;break}throw new Error("Chat is not initialized");case 3:return e=[{role:"system",content:N.titleGeneratorPrompt}],a="system: ".concat(this.chat.systemPrompt,`
`),this.messages.forEach(function(C){a+="".concat(C.isUser?"user":"assistant",": ").concat(C.content,`
`)}),e.push({role:"user",content:a}),c.next=9,fetch("".concat(n.end_point,"/v1/chat/completions"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(n.api_key)},body:JSON.stringify({model:N.titleGeneratorModel,messages:e,stream:!1})});case 9:return d=c.sent,c.next=12,d.json();case 12:return f=c.sent,p=f.choices[0].message.content,this.chat.title=p,c.next=17,i.db.updateData("Chats",this.chat);case 17:return c.abrupt("return",p);case 18:case"end":return c.stop()}},u,this)}));function t(){return h.apply(this,arguments)}return t}()}],[{key:"getChats",value:function(){var h=v()(l()().mark(function u(){return l()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.db.getAllDataByIndex("Chats","type",i.z.Chat);case 3:return e.abrupt("return",e.sent);case 6:return e.prev=6,e.t0=e.catch(0),console.error("Error getting chats",e.t0),e.abrupt("return",[]);case 10:case"end":return e.stop()}},u,null,[[0,6]])}));function t(){return h.apply(this,arguments)}return t}()}]),D}(se()(EventTarget)),he=ie}}]);
