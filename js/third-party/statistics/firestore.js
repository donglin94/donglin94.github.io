/* global CONFIG, firebase */
firebase.initializeApp({apiKey:CONFIG.firestore.apiKey,projectId:CONFIG.firestore.projectId}),function(){const e=(e,t)=>e.get().then(o=>{
// Has no data, initialize count
let r=o.exists?o.data().count:0;
// If first view this article
return t&&(
// Increase count
r++,e.set({count:r})),r}),t=e=>t=>{e.innerText=t},o=firebase.firestore().collection(CONFIG.firestore.collection);document.addEventListener("page:loaded",()=>{if(CONFIG.page.isPost){
// Fix issue #118
// https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
const r=document.querySelector(".post-title").textContent.trim(),n=o.doc(r);let i=CONFIG.hostname===location.hostname;localStorage.getItem(r)?i=!1:
// Mark as visited
localStorage.setItem(r,!0),e(n,i).then(t(document.querySelector(".firestore-visitors-count")))}else if(CONFIG.page.isHome){const r=[...document.querySelectorAll(".post-title")].map(t=>{const r=t.textContent.trim(),n=o.doc(r);return e(n)});Promise.all(r).then(e=>{const o=document.querySelectorAll(".firestore-visitors-count");e.forEach((e,r)=>{t(o[r])(e)})})}})}();