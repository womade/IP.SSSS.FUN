"use strict";
var $$ = document,
random = parseInt(1e8 * Math.random()),
IP = {
    get: function(t, e) {
        return fetch(t, {
            method: "GET"
        }).then(function(t) {
            return "text" === e ? Promise.all([t.ok, t.status, t.text(), t.headers]) : Promise.all([t.ok, t.status, t.json(), t.headers])
        }).then(function(t) {
            var e = t[0],
            n = t[1],
            i = t[2],
            r = t[3];
            if (e) return {
                ok: e,
                status: n,
                data: i,
                headers: r
            };
            throw new Error([e, n, i, r])
        }).
        catch(function(t) {
            throw t
        })
    },
    getIP_A: function() {
        IP.get("https://forge.speedtest.cn/api/location/info?z=" + random, "json").then(function(t) {
            var e = t.data,
            n = function(t) {
                return Boolean(t) ? t + " ": " "
            };
            $$.getElementById("ip-A").innerHTML = e.ip,
            $$.getElementById("ip-A-geo").innerHTML = "" + n(e.country) + n(e.province) + n(e.city) + n(e.isp)
        })
    },
    getIP_B: function() {
        IP.get("https://pubstatic.b0.upaiyun.com/?_upnode&z=" + random, "json").then(function(t) {
            var e = t.data,
            n = function(t) {
                return Boolean(t) ? t + " ": " "
            };
            $$.getElementById("ip-B").innerHTML = e.remote_addr,
            $$.getElementById("ip-B-geo").innerHTML = "" + n(e.remote_addr_location.country) + n(e.remote_addr_location.province) + n(e.remote_addr_location.city) + n(e.remote_addr_location.isp)
        })
    },
    getIP_X: function() {
        IP.get("https://api.ip.sb/geoip?z=" + random, "json").then(function(t) {
            var e = t.data,
            n = function(t) {
                return Boolean(t) ? t + " ": " "
            };
            $$.getElementById("ip-X").innerHTML = e.ip,
            $$.getElementById("ip-X-geo").innerHTML = "" + n(e.country) + n(e.region) + n(e.city) + n(e.organization)
        })
    },
    getIP_Y: function() {
        IP.get("https://ip.ssss.fun/cdn-cgi/trace?z=" + random, "text").then(function(t) {
            var e = {},
            n = t.data.split("\n"),
            i = Array.isArray(n),
            r = 0;
            for (n = i ? n: n[Symbol.iterator]();;) {
                var a;
                if (i) {
                    if (r >= n.length) break;
                    a = n[r++]
                } else {
                    if ((r = n.next()).done) break;
                    a = r.value
                }
                var o = a.split("=");
                e[o[0]] = o[1]
            }
            $$.getElementById("ip-Y").innerHTML = e.ip,
            $$.getElementById("ip-Y-geo").innerHTML = e.loc
        })
    }
},
HTTP = {
    checker: function(t, e) {
        var n = new Image,
        i = setTimeout(function() {
            n.onerror = n.onload = null,
            $$.getElementById(e).innerHTML = '<span class="ssss-text-error">连接超时</span>',
            n.src = null
        },
        6e3);
        n.onerror = function() {
            clearTimeout(i),
            $$.getElementById(e).innerHTML = '<span class="ssss-text-error">无法访问</span>'
        },
        n.onload = function() {
            clearTimeout(i),
            $$.getElementById(e).innerHTML = '<span class="ssss-text-success">连接正常</span>'
        },
        n.src = "https://" + t + "/favicon.ico?" + +new Date
    },
    runcheck: function() {
        HTTP.checker("www.baidu.com", "http-baidu"),
        HTTP.checker("s1.music.126.net/style", "http-cloudmusic"),
        HTTP.checker("www.youku.com", "http-youku"),
        HTTP.checker("www.taobao.com", "http-taobao"),
        HTTP.checker("www.google.com", "http-google"),
        HTTP.checker("www.youtube.com", "http-youtube"),
        HTTP.checker("www.github.com", "http-github"),
        HTTP.checker("www.amazon.com", "http-amazon"),
        HTTP.checker("www.facebook.com", "http-facebook"),
        HTTP.checker("twitter.com", "http-twitter"),
        HTTP.checker("www.instagram.com", "http-instagram"),
        HTTP.checker("telegram.org", "http-telegram")
    }
};
HTTP.runcheck(),
IP.getIP_A(),
IP.getIP_B(),
IP.getIP_X(),
IP.getIP_Y();
