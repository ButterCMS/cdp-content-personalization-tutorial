// ./pages/_app.js

// import Script from "next/script";
// import "../styles/globals.css";
// import * as snippet from "@segment/snippet";
// import Router from "next/router";
// import {
//   AppProvider,
//   useUserDispatch,
//   useUserState,
// } from "../modules/AppContext";
// import SiteHeader from "../components/SiteHeader";
// import { useEffect, useState } from "react";
// import Layout from "../layouts/default";

// const renderSnippet = () => {
//   const SEGMENT_KEY = process.env.SEGMENT_KEY;
//   const opts = {
//     apiKey: "2y4aNogwiGWW1Xo80FNer3GYnRTwTqD3",
//     // note: the page option only covers SSR tracking.
//     page: true,
//   };

//   if (process.env.NODE_ENV === "development") return snippet.max(opts);
//   return snippet.min(opts);
// };

// const personyzeSnippet = () => {
//   return `window._S_T ||
//   (function(d){
//     var s = d.createElement('script'),
//       u = s.onload===undefined && s.onreadystatechange===undefined,
//       i = 0,
//       f = function() {window._S_T ? (_S_T.async=true) && _S_T.setup(6668, "localhost:3000 d462-197-210-76-198.eu.ngrok.io 37bf-197-210-76-167.eu.ngrok.io") : i++<120 && setTimeout(f, 600)},
//       h = d.getElementsByTagName('head');
//     s.async = true;
//     s.src = '\/\/counter.personyze.com\/stat-track-lib.js';
//     s.onload = s.onreadystatechange = f;
//     (h && h[0] || d.documentElement).appendChild(s);
//     if (u) f();
//   })(document);`;
// };

// // Track client-side page views with Segment
// Router.events.on("routeChangeComplete", (url) => {
//   console.log({ url });
//   window.analytics.page(url);
// });

// function MyApp({ Component, pageProps }) {
//   return (
//     <AppProvider>
//       <Script
//         id="segment-script"
//         dangerouslySetInnerHTML={{ __html: renderSnippet() }}
//       />
//       <Script
//         id="personyze-script"
//         dangerouslySetInnerHTML={{ __html: personyzeSnippet() }}
//       />
//       <Layout>
//         <Component {...pageProps} />
//       </Layout>
//     </AppProvider>
//   );
// }

// export default MyApp;

// ./pages/_app.js

import "../styles/globals.css";
import { AppProvider } from "../modules/AppContext";
import Layout from "../layouts/default";

import Script from "next/script";
import * as snippet from "@segment/snippet";
import Router from "next/router";

const renderSnippet = () => {
  const SEGMENT_KEY = process.env.SEGMENT_KEY;
  const opts = {
    apiKey: SEGMENT_KEY,
    // note: the page option only covers SSR tracking.
    page: true,
  };

  if (process.env.NODE_ENV === "development") return snippet.max(opts);
  return snippet.min(opts);
};

// personyze tracking code
const personyzeSnippet = () => {
  return `window._S_T ||
  (function(d){
    var s = d.createElement('script'),
      u = s.onload===undefined && s.onreadystatechange===undefined,
      i = 0,
      f = function() {window._S_T ? (_S_T.async=true) && _S_T.setup(6668, "localhost:3000 personalized-app.netlify.app 0a51-197-210-227-11.eu.ngrok.io") : i++<120 && setTimeout(f, 600)},
      h = d.getElementsByTagName('head');
    s.async = true;
    s.src = '\/\/counter.personyze.com\/stat-track-lib.js';
    s.onload = s.onreadystatechange = f;
    (h && h[0] || d.documentElement).appendChild(s);
    if (u) f();
  })(document);`;
};

// Track client-side page views with Segment
Router.events.on("routeChangeComplete", (url) => {
  window.analytics.page(url);
});

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Script
        id="segment-script"
        dangerouslySetInnerHTML={{ __html: renderSnippet() }}
      />
      {/* add personyze script */}
      <Script
        id="personyze-script"
        dangerouslySetInnerHTML={{ __html: personyzeSnippet() }}
      />
      <Layout>
        {/*  */}
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}
export default MyApp;
