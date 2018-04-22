!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=11)}([,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={suggestions_request:{URL:"https://give.me.suggestions.please",METHOD:"POST"}}},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t={};return function(n){if(n in t)return console.log('Showing suggestions for "'+n+'" from cache.'),Promise.resolve(t[n]);console.log('Requesting suggestions for "'+n+'" from backend.');var r=e(u.default.suggestions_request.METHOD,u.default.suggestions_request.URL,{input:n});return r.then(function(e){t[n]=e},function(e){}),r}};var r,a=n(1),u=(r=a)&&r.__esModule?r:{default:r}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e;this.processRequest=function(e){var n=e.body.input;return function(e){return e&&e.method&&e.method===u.default.suggestions_request.METHOD&&e.url&&e.url===u.default.suggestions_request.URL&&e.body&&"string"==typeof e.body.input}(e)?{data:t.filter(function(e){return n&&~e.toLowerCase().indexOf(n.toLowerCase())}),error:null}:{data:null,error:new Error("Invalid request")}},this.getDatabase=function(){return t.join(", ")}};var r,a=n(1),u=(r=a)&&r.__esModule?r:{default:r}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t,n,r){return new Promise(function(a,u){try{var o={method:t,url:n,body:r},s=e.processRequest(o);null!=s.error&&u(s.error),a(s.data)}catch(e){u(e)}})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o(n(5)),a=o(n(4)),u=o(n(3));function o(e){return e&&e.__esModule?e:{default:e}}t.default=function(){function e(e){var t=new a.default(e),n=(0,r.default)(t);return{getDatabase:t.getDatabase,requestSuggestions:(0,u.default)(n)}}var t=e(["cat","dog","apple","google","application"]),n=t.getDatabase,o={requestSuggestions:t.requestSuggestions,getDatabase:n,setDatabase:function(t){if("string"==typeof t&&t.length>0){var n=t.split(",").map(function(e){return e.trim()}).filter(function(e){return""!==e}),r=e(n),a=r.getDatabase,u=r.requestSuggestions;o.getDatabase=a,o.requestSuggestions=u,console.log("Database updated",n),console.log("Cache deleted.")}}};return o}()},,,,,function(e,t,n){"use strict";var r,a=n(6),u=(r=a)&&r.__esModule?r:{default:r};function o(e){for(var t=document.querySelectorAll("#suggestionsWrapper li"),n=0;n<t.length;n++)n===e?t[n].classList.add("hover"):t[n].classList.remove("hover")}function s(e){u.default.requestSuggestions(e.target.value).then(function(e){return function(e){var t=document.getElementById("suggestionsWrapper");l(),e.length>0&&(e.map(function(e,n){var r=document.createElement("li");r.innerText=e,r.addEventListener("mousedown",function(){i(e)}),t.appendChild(r)}),t.style.display="block",o(0))}(e)},function(e){return function(e){var t=document.getElementById("error");t.innerText=e,t.style.display="block"}(e.message)})}function i(e){void 0!==e&&(document.getElementById("inputField").value=e,l())}function l(){var e=document.getElementById("suggestionsWrapper");e.style.display="none",e.innerHTML=""}function d(){u.default.setDatabase(database.value)}window.onload=function(){document.body.innerHTML='<div class="container">  <h1>Autocomplete Vanilla</h1>  <div class="input_field_wrapper">    <input id="inputField" tabindex="1" class="input_field" type="text" placeholder="Start typing" value="">    <ul class="suggestions_list" id="suggestionsWrapper"></ul>  </div>  <div>    <h2>Database</h2>    <textarea tabindex="2" class="database" id="database"></textarea>    <button tabindex="3" class="update_database_button" id="updateDatabaseButton">Update database</button>  </div>  <div class="error" id="error"></div>  <a class="back_link" href="/" title="Back to index page">Back to index page</a></div>';var e=document.getElementById("inputField");document.getElementById("suggestionsWrapper").style.display="none",e.addEventListener("input",function(e){return s(e)}),e.addEventListener("focus",function(e){return s(e)});var t=function(){var e=0,t=document.getElementById("suggestionsWrapper");return function(n){var r=t.childElementCount;switch(n.keyCode){case 38:n.preventDefault(),e>0&&e--,o(e);break;case 40:n.preventDefault(),e<r-1&&e++,o(e);break;case 27:n.preventDefault(),e=0,l();break;case 13:n.preventDefault(),i(function(e){for(var n=t.getElementsByTagName("li"),r=0;r<n.length;r++)if(r===e)return n[r].innerText}(e=0))}}}();e.addEventListener("keydown",function(e){return t(e)}),e.addEventListener("blur",l);var n=document.getElementById("error");n.style.display="none",n.addEventListener("click",function(){n.style.display="none"}),document.getElementById("database").value=u.default.getDatabase(),document.getElementById("updateDatabaseButton").addEventListener("click",d)}}]);
//# sourceMappingURL=vanilla.js.map