document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
var deviceWidth = document.documentElement.clientWidth;
deviceWidth > 750 && (deviceWidth = 750), document.documentElement.style.fontSize = deviceWidth / 7.5 + "px", window.addEventListener("resize", function () {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
    var e = document.documentElement.clientWidth;
    e > 750 && (e = 750), document.documentElement.style.fontSize = e / 7.5 + "px"
}, !1), window.addEventListener("onload", function () {
    document.body.addEventListener("touchstart", function () {})
}, !1);