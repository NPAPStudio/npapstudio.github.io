"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[184],{88001:function(H,F,p){p.d(F,{DI:function(){return c},K4:function(){return O},Qj:function(){return C},aH:function(){return G},pk:function(){return E},xf:function(){return T}});var G=[{key:"gpt-4o-mini",label:"GPT-4o mini"},{key:"o1-mini",label:"O1 Mini"},{key:"o1-preview",label:"O1 Preview"},{key:"chatgpt-4o-latest",label:"GPT-4o"},{key:"gpt-4",label:"GPT-4"},{key:"gpt-3.5-turbo-0125",label:"GPT-3.5 Turbo"}],E="gpt-4o-mini",O="gpt-4o-mini",C=`
You are an assistant specialized in generating system prompts. Your task is to engage in detailed conversations with users to fully understand their objectives, context, and specific requirements. Based on this understanding, you will generate accurate, effective system prompts and corresponding titles. Your workflow should include the following steps:

1. **Ask detailed questions to clarify the user\u2019s purpose and needs**:
   - Explore various aspects (such as context, audience, goals, etc.) to ensure you fully understand what the user wants.
   - Probe the user\u2019s specific objectives, such as: What type of content do they want to generate? Who is the target audience? Are there any specific requirements for the content\u2019s format, style, or language?

2. **Confirm the details of the requirements**:
   - Verify that you have an accurate understanding of the user\u2019s needs. If anything is unclear, continue asking questions until you have a precise grasp of the user\u2019s expectations.
   - Help the user summarize their needs in a concise way to ensure that the prompt you generate fully aligns with their goals.

3. **Generate an appropriate system prompt**:
   - Once you have gathered all necessary information, create a detailed, clear, and precise system prompt that accurately guides the generator to produce content that meets the user\u2019s expectations.
   - If applicable, generate additional supporting prompts to guide the generator in handling more complex tasks.

4. **Generate a suitable title**:
   - Based on the system prompt, create a clear and **concise** title that is as brief as possible, summarizing the system prompt\u2019s purpose and theme.

5. **Explain and refine**:
   - Briefly explain the structure and design logic of the system prompt. If the user requests changes, optimize the prompt accordingly.

Use a friendly yet professional tone, ensuring that the system prompts are both usable and clear.

---

**Final Output:**
The final output should only contain a JSON structure like the one below:

\`\`\`json
{
  "prompt": "[Generated system prompt based on the user's requirements]",
    "title": "[Concise and clear title]"
}
\`\`\`
`,T=10,c=3},41467:function(H,F,p){p.d(F,{z:function(){return V},db:function(){return te}});var G=p(52677),E=p.n(G),O=p(5574),C=p.n(O),T=p(15009),c=p.n(T),K=p(99289),y=p.n(K),N=p(97857),J=p.n(N),Q=p(12444),q=p.n(Q),L=p(72004),U=p.n(L),X=p(9783),x=p.n(X),Z=function(){function D(d){q()(this,D),x()(this,"db",null),x()(this,"dbName",void 0),x()(this,"version",void 0),x()(this,"stores",void 0),x()(this,"_initPromise",void 0),this.dbName=d.dbName,this.version=d.version,this.stores=d.stores,this._initPromise=this.initDB()}return U()(D,[{key:"initDB",value:function(){var l=this;return new Promise(function(i,n){var r=indexedDB.open(l.dbName,l.version);r.onupgradeneeded=function(a){var s=r.result;l.stores.forEach(function(e){var o;if(s.objectStoreNames.contains(e.name))o=r.transaction.objectStore(e.name),e.defaultValues&&l.updateExistingDataWithDefaults(e.name,e.defaultValues,o),l.updateIndexes(e,o);else{var t;o=s.createObjectStore(e.name,J()({keyPath:e.keyPath},e.options)),(t=e.indexes)===null||t===void 0||t.forEach(function(h){o.createIndex(h.name,h.keyPath,h.options)})}})},r.onsuccess=function(){l.db=r.result,i()},r.onerror=function(a){console.error("Database error:",a.target.error),n(a.target.error)}})}},{key:"updateIndexes",value:function(l,i){var n,r=Array.from(i.indexNames);(n=l.indexes)===null||n===void 0||n.forEach(function(a){r.includes(a.name)||(i.createIndex(a.name,a.keyPath,a.options),console.log("Created new index ".concat(a.name," on store ").concat(l.name)))})}},{key:"updateExistingDataWithDefaults",value:function(){var d=y()(c()().mark(function i(n,r,a){var s,e;return c()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:s=a.transaction,e=a.openCursor(),e.onsuccess=function(h){var u=h.target.result;if(u){var f=!1,m=u.value;for(var v in r)m[v]===void 0&&(m[v]=r[v],f=!0);f&&u.update(m),u.continue()}},e.onerror=function(){console.error("Cursor error when updating default values.")};case 4:case"end":return t.stop()}},i)}));function l(i,n,r){return d.apply(this,arguments)}return l}()},{key:"waitForDb",value:function(){return this._initPromise}},{key:"addData",value:function(){var d=y()(c()().mark(function i(n,r){var a,s,e,o,t;return c()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,this.waitForDb();case 2:return s=this.db.transaction(n,"readwrite"),e=s.objectStore(n),o=(a=this.stores.find(function(f){return f.name===n}))===null||a===void 0?void 0:a.defaultValues,o&&r!==null&&Object.entries(o).forEach(function(f){var m=C()(f,2),v=m[0],g=m[1];r[v]===void 0&&(r[v]=g)}),t=e.add(r),u.abrupt("return",new Promise(function(f,m){t.onsuccess=function(){f(t.result)},t.onerror=function(){m(t.error)}}));case 8:case"end":return u.stop()}},i,this)}));function l(i,n){return d.apply(this,arguments)}return l}()},{key:"getData",value:function(){var d=y()(c()().mark(function i(n,r){var a,s,e;return c()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.waitForDb();case 2:return a=this.db.transaction(n,"readonly"),s=a.objectStore(n),e=s.get(r),t.abrupt("return",new Promise(function(h,u){e.onsuccess=function(){var f;h((f=e.result)!==null&&f!==void 0?f:null)},e.onerror=function(){u(e.error)}}));case 6:case"end":return t.stop()}},i,this)}));function l(i,n){return d.apply(this,arguments)}return l}()},{key:"importData",value:function(){var d=y()(c()().mark(function i(n){var r=this,a,s;return c()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,this.waitForDb();case 2:a=c()().mark(function t(){var h,u,f,m,v,g,M,R,$;return c()().wrap(function(k){for(;;)switch(k.prev=k.next){case 0:u=n[s],f=u.storeName,m=u.data,v=r.db.transaction(f,"readwrite"),g=v.objectStore(f),M=(h=r.stores.find(function(W){return W.name===f}))===null||h===void 0?void 0:h.defaultValues,R=c()().mark(function W(){var b,j,z,B;return c()().wrap(function(w){for(;;)switch(w.prev=w.next){case 0:if(b=m[$],M&&E()(b)==="object"&&b!==null&&Object.entries(M).forEach(function(P){var I=C()(P,2),A=I[0],S=I[1];b[A]===void 0&&(b[A]=S)}),j=g.keyPath,typeof j!="string"){w.next=7;break}z=b[j],w.next=12;break;case 7:if(!Array.isArray(j)){w.next=11;break}z=j.map(function(P){return b[P]}),w.next=12;break;case 11:throw new Error("Invalid keyPath for store ".concat(f));case 12:return B=g.get(z),w.next=15,new Promise(function(P,I){B.onsuccess=function(){var A=B.result;if(A){var S=g.put(b);S.onsuccess=function(){P()},S.onerror=function(){I(S.error)}}else{var Y=g.add(b);Y.onsuccess=function(){P()},Y.onerror=function(){I(Y.error)}}},B.onerror=function(){I(B.error)}});case 15:case"end":return w.stop()}},W)}),$=0;case 6:if(!($<m.length)){k.next=11;break}return k.delegateYield(R(),"t0",8);case 8:$++,k.next=6;break;case 11:case"end":return k.stop()}},t)}),s=0;case 4:if(!(s<n.length)){o.next=9;break}return o.delegateYield(a(),"t0",6);case 6:s++,o.next=4;break;case 9:case"end":return o.stop()}},i,this)}));function l(i){return d.apply(this,arguments)}return l}()},{key:"exportData",value:function(){var d=y()(c()().mark(function i(){var n,r,a;return c()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=[],e.next=3,this.waitForDb();case 3:r=0;case 4:if(!(r<this.stores.length)){e.next=16;break}return a=this.stores[r],e.t0=n,e.t1=a.name,e.next=10,this.getAllData(a.name);case 10:e.t2=e.sent,e.t3={storeName:e.t1,data:e.t2},e.t0.push.call(e.t0,e.t3);case 13:r++,e.next=4;break;case 16:return e.abrupt("return",n);case 17:case"end":return e.stop()}},i,this)}));function l(){return d.apply(this,arguments)}return l}()},{key:"getAllData",value:function(){var d=y()(c()().mark(function i(n){var r,a,s;return c()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,this.waitForDb();case 2:return r=this.db.transaction(n,"readonly"),a=r.objectStore(n),s=a.getAll(),o.abrupt("return",new Promise(function(t,h){s.onsuccess=function(){t(s.result)},s.onerror=function(){h(s.error)}}));case 6:case"end":return o.stop()}},i,this)}));function l(i){return d.apply(this,arguments)}return l}()},{key:"getDataByIndex",value:function(){var d=y()(c()().mark(function i(n,r,a){var s,e,o,t;return c()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,this.waitForDb();case 2:return s=this.db.transaction(n,"readonly"),e=s.objectStore(n),o=e.index(r),t=o.get(a),u.abrupt("return",new Promise(function(f,m){t.onsuccess=function(){var v;f((v=t.result)!==null&&v!==void 0?v:null)},t.onerror=function(){m(t.error)}}));case 7:case"end":return u.stop()}},i,this)}));function l(i,n,r){return d.apply(this,arguments)}return l}()},{key:"getAllDataByIndex",value:function(){var d=y()(c()().mark(function i(n,r,a){var s,e,o,t,h;return c()().wrap(function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,this.waitForDb();case 2:return s=this.db.transaction(n,"readonly"),e=s.objectStore(n),o=e.index(r),t=o.openCursor(IDBKeyRange.only(a)),h=[],f.abrupt("return",new Promise(function(m,v){t.onsuccess=function(){var g=t.result;g?(h.push(g.value),g.continue()):m(h)},t.onerror=function(){v(t.error)}}));case 8:case"end":return f.stop()}},i,this)}));function l(i,n,r){return d.apply(this,arguments)}return l}()},{key:"updateData",value:function(){var d=y()(c()().mark(function i(n,r){var a,s,e;return c()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.waitForDb();case 2:return a=this.db.transaction(n,"readwrite"),s=a.objectStore(n),e=s.put(r),t.abrupt("return",new Promise(function(h,u){e.onsuccess=function(){h()},e.onerror=function(){u(e.error)}}));case 6:case"end":return t.stop()}},i,this)}));function l(i,n){return d.apply(this,arguments)}return l}()},{key:"deleteData",value:function(){var d=y()(c()().mark(function i(n,r){var a,s,e;return c()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.waitForDb();case 2:return a=this.db.transaction(n,"readwrite"),s=a.objectStore(n),e=s.delete(r),t.abrupt("return",new Promise(function(h,u){e.onsuccess=function(){h()},e.onerror=function(){u(e.error)}}));case 6:case"end":return t.stop()}},i,this)}));function l(i,n){return d.apply(this,arguments)}return l}()},{key:"deleteDataByIndex",value:function(){var d=y()(c()().mark(function i(n,r,a){var s,e,o,t;return c()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,this.waitForDb();case 2:return s=this.db.transaction(n,"readwrite"),e=s.objectStore(n),o=e.index(r),t=o.openCursor(IDBKeyRange.only(a)),u.abrupt("return",new Promise(function(f,m){t.onsuccess=function(){var v=t.result;v?(v.delete(),v.continue()):f()},t.onerror=function(){m(t.error)}}));case 7:case"end":return u.stop()}},i,this)}));function l(i,n,r){return d.apply(this,arguments)}return l}()}]),D}(),_=Z,V=function(D){return D.Chat="Chat",D.GenerateBot="GenerateBot",D}(V||{}),ee={dbName:"GptPlayground",version:6,stores:[{name:"Chats",keyPath:"id",options:{autoIncrement:!1},defaultValues:{type:V.Chat},indexes:[{name:"type",keyPath:"type"}]},{name:"Messages",keyPath:"id",options:{autoIncrement:!0},indexes:[{name:"chatId",keyPath:"chatId"}]},{name:"Bots",keyPath:"id",options:{autoIncrement:!0}},{name:"BotHistories",keyPath:"id",options:{autoIncrement:!0},indexes:[{name:"botId",keyPath:"botId"}]}]},te=new _(ee)}}]);