if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>n(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/framework-7751730b10fa0f74.js",revision:"7751730b10fa0f74"},{url:"/_next/static/chunks/main-20e9e6a32c625538.js",revision:"20e9e6a32c625538"},{url:"/_next/static/chunks/pages/_app-a28af4cccbe72bf1.js",revision:"a28af4cccbe72bf1"},{url:"/_next/static/chunks/pages/_error-e4f561a102d9bb14.js",revision:"e4f561a102d9bb14"},{url:"/_next/static/chunks/pages/admin-01a5f2a0c0b496c8.js",revision:"01a5f2a0c0b496c8"},{url:"/_next/static/chunks/pages/admin/company/%5Buuid%5D-c108c31873452123.js",revision:"c108c31873452123"},{url:"/_next/static/chunks/pages/admin/create-company-e06ad3fd96399ad7.js",revision:"e06ad3fd96399ad7"},{url:"/_next/static/chunks/pages/admin/login-71e65281b5efe8c5.js",revision:"71e65281b5efe8c5"},{url:"/_next/static/chunks/pages/admin/participants-60c912901bcb1353.js",revision:"60c912901bcb1353"},{url:"/_next/static/chunks/pages/admin/statistics-cf4cf0ad0761d709.js",revision:"cf4cf0ad0761d709"},{url:"/_next/static/chunks/pages/admin/visitors-c0852b4ed35c2c9b.js",revision:"c0852b4ed35c2c9b"},{url:"/_next/static/chunks/pages/company/%5Buuid%5D-f2ac5fa720b90559.js",revision:"f2ac5fa720b90559"},{url:"/_next/static/chunks/pages/company/%5Buuid%5D/qrcode-8fe051cddaa4341b.js",revision:"8fe051cddaa4341b"},{url:"/_next/static/chunks/pages/index-3deb3f3be1cef05c.js",revision:"3deb3f3be1cef05c"},{url:"/_next/static/chunks/pages/user/register-f32b4284694e8721.js",revision:"f32b4284694e8721"},{url:"/_next/static/chunks/pages/user/ticket/%5Buuid%5D-622510a5a9db634c.js",revision:"622510a5a9db634c"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-6ef43a8d4a395f49.js",revision:"6ef43a8d4a395f49"},{url:"/_next/static/css/94e747b102acbb79.css",revision:"94e747b102acbb79"},{url:"/_next/static/m2nrGruXUr0nM2xVflasX/_buildManifest.js",revision:"e7a07f504d5866bc96486fece3939c3b"},{url:"/_next/static/m2nrGruXUr0nM2xVflasX/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/logo-digital-innovation-festival.09349810.svg",revision:"d06fdf6490cba0c77dfaff2932157b48"},{url:"/difLoginWrapperRight.jpg",revision:"2adf4f612a666704123d82f5bc8e7ee9"},{url:"/locales/en/common.json",revision:"3c10d99de470de3a9b0bd28765559e08"},{url:"/locales/fr/common.json",revision:"645a6965f333d491291794001ff2ac2c"},{url:"/logo-192.png",revision:"0a50b8ff0218affd70fde63b5be5c084"},{url:"/logo-256.png",revision:"b2756250c7293c6422fa342128b2d12e"},{url:"/logo-384.png",revision:"5b250ff8ad9475fc5cc630c1597a92f4"},{url:"/logo-512.png",revision:"65826e6b7542e39fe06133353217083f"},{url:"/logo-digital-innovation-festival.svg",revision:"d06fdf6490cba0c77dfaff2932157b48"},{url:"/manifest.json",revision:"d4be78401d91d1b4c2fceb7ddbf762f0"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
