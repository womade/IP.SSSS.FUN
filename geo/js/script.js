function parse_edns(e) {
    updateElement("preOutputEdns", syntaxHighlight(JSON.stringify(e, void 0, 4))),
    byId("preOutputEdns").style.display = "block"
}
function ajax(e, t, n) {
    e = proto + e,
    this.getRequest = function() {
        return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : window.XMLHttpRequest ? new XMLHttpRequest: !1
    };
    var a = getRequest();
    a.onreadystatechange = function() {
        4 == a.readyState && (200 == a.status ? t(jsonParse(a.responseText)) : n && updateElement("codeOutput", "error, HTTP code " + a.status + " " + a.statusText + "<br>" + a.responseText))
    },
    a.open("GET", e, !0),
    a.send()
}
function jsonParse(e) {
    try {
        return JSON.parse(e)
    } catch(t) {
        return ! 1
    }
}
function byId(e) {
    return document.getElementById(e)
}
function updateElement(e, t) {
    byId(e).innerHTML = t
}
function orderResponse(e) {
    out = {};
    for (var t = ["query", "message", "status", "continent", "continentCode", "country", "countryCode", "region", "regionName", "city", "district", "zip", "lat", "lon", "timezone", "offset", "currency", "isp", "org", "as", "asname", "reverse", "mobile", "proxy", "hosting"], n = 0; n < t.length; n++) t[n] in e && (out[t[n]] = e[t[n]]);
    return out
}
function setMap(e, t, n) {
    var a = 'url("' + proto + "cache.ip-api.com/" + t + "," + e + "," + n + '")';
    byId("map").style.backgroundImage !== a && (byId("map").style.backgroundImage = a),
    byId("mapOuter").style.display = "block",
    MapOpacity(1)
}
function unSetMap() {
    byId("map").style.backgroundImage = "",
    byId("mapOuter").style.display = "none",
    MapOpacity(1)
}
function MapOpacity(e) {
    byId("map").style.opacity = e
}
function query(e) {
    if (MapOpacity(.6), "undefined" == typeof e && (e = location.hash.substring(1), 0 !== e.length && byId("sc").scrollIntoView()), e = decodeURIComponent(e).trim(), (isUrl = e.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i)) && (e = isUrl[1]), "" == e ? (history.replaceState(null, null, " "), currentQuery = document.forms[0].ip.value = e) : currentQuery = location.hash = document.forms[0].ip.value = e, "" == e) {
        cache = [],
        myIp = "";
        for (var t = ""; 32 > t.length; t += Math.random().toString(36).substr(2));
        ajax(t.substr(0, 32) + ".edns.ip-api.com/json?lang=" + currentLanguage,
        function(e) {
            "" == myIp ? cache.edns = e: parse_edns(e)
        },
        !1)
    } else byId("preOutputEdns").style.display = "none";
    ajax(APIendpoint + "/json/" + e + "?fields=66842623&lang=" + currentLanguage,
    function(t) {
        updateElement("codeOutput", ""),
        "success" == t.status ? (setMap(t.lat, t.lon, "" == t.city ? 6 : 10), updateElement("codeOutput", syntaxHighlight(JSON.stringify(orderResponse(t), void 0, 4))), "" == e && (document.forms[0].ip.value = myIp = t.query, "object" == typeof cache.edns && parse_edns(cache.edns))) : (unSetMap(), updateElement("codeOutput", syntaxHighlight(JSON.stringify(t, void 0, 4))))
    },
    !0)
}
function syntaxHighlight(e) {
    return e = e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"),
    e.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function(e) {
        var t = "number";
        return /^"/.test(e) ? t = /:$/.test(e) ? "key": "string": /true|false/.test(e) ? t = "boolean": /null/.test(e) && (t = "null"),
        '<span class="' + t + '">' + e + "</span>"
    })
}
var APIendpoint = "cors.eu.org/demo.ip-api.com",
currentLanguage = "zh-CN",
proto = "https:" == document.location.protocol ? "https://": "http://";
query(),
window.onhashchange = function() {
    location.hash.substring(1) !== currentQuery && query()
};
