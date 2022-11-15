// window._S_T ||
//   (function (d) {
//     var s = d.createElement("script"),
//       u = s.onload === undefined && s.onreadystatechange === undefined,
//       i = 0,
//       f = function () {
//         window._S_T
//           ? (_S_T.async = true) && _S_T.setup(6557, "localhost:3000")
//           : i++ < 120 && setTimeout(f, 600);
//       },
//       h = d.getElementsByTagName("head");
//     s.async = true;
//     s.src = "//counter.personyze.com/stat-track-lib.js";
//     s.onload = s.onreadystatechange = f;
//     ((h && h[0]) || d.documentElement).appendChild(s);
//     if (u) f();
//   })(document);

window._S_T ||
  (function (d) {
    var s = d.createElement("script"),
      u = s.onload === undefined && s.onreadystatechange === undefined,
      i = 0,
      f = function () {
        window._S_T
          ? (_S_T.async = true) &&
            _S_T.setup(6668, "localhost:3000 37bf-197-210-76-167.eu.ngrok.io")
          : i++ < 120 && setTimeout(f, 600);
      },
      h = d.getElementsByTagName("head");
    s.async = true;
    s.src = "//counter.personyze.com/stat-track-lib.js";
    s.onload = s.onreadystatechange = f;
    ((h && h[0]) || d.documentElement).appendChild(s);
    if (u) f();
  })(document);
