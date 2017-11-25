/**
 * Created with IntelliJ IDEA.
 * User: feiwen8772
 * Date: 13-4-2
 * Time: 下午5:01
 * To change this template use File | Settings | File Templates.
 */
/*
 //辅助输出
 function w(str) {
 document.write(str + "<br>");
 }
 var myURL = parseURL('http://abc.com:8080/dir/index.html?id=255&m=hello#top');
 w("myUrl.file = " + myURL.file)     // = 'index.html'
 w("myUrl.hash = " + myURL.hash)     // = 'top'
 w("myUrl.host = " + myURL.host)     // = 'abc.com'
 w("myUrl.query = " + myURL.query)    // = '?id=255&m=hello'
 w("myUrl.params = " + myURL.params)   // = Object = { id: 255, m: hello }
 w("myUrl.path = " + myURL.path)     // = '/dir/index.html'
 w("myUrl.segments = " + myURL.segments) // = Array = ['dir', 'index.html']
 w("myUrl.port = " + myURL.port)     // = '8080'
 w("myUrl.protocol = " + myURL.protocol) // = 'http'
 w("myUrl.source = " + myURL.source)   // = 'http://abc.com:8080/dir/index.html?id=255&m=hello#top'
 var _newUrl = replaceUrlParams(myURL, { id: 101, m: "World", page: 1, "page": 2 });
 w("<br>新url为：")
 w(_newUrl); //http://abc.com:8080/dir/index.html?id=101&m=World&page=2#top
 */
/* *
* 一些关于URL的方法
* 弃用；已经合并到SDU中--目录：module/utility
* */
define(function (require, exports, module) {
    var URLObj = exports;
    //来自：http://www.cnblogs.com/rubylouvre/archive/2010/06/09/1755051.html
    URLObj.getParam=function (name){
        var sUrl = window.location.search.substr(1);
        var r = sUrl.match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
        return (r == null ? null : unescape(r[2]));
    };
    URLObj.getUrlSearchParam = function(path){
        var result = {},param = /([^?=&]+)=([^&]+)/ig,match;
        while((match = param.exec(path)) != null){
            result[match[1]] = match[2];
        }
        return result;
    }
    //分析url
    URLObj.parseURL = function (url) {
        var a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function () {
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length, i = 0, s;
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue;
                    }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        };
    };

    //替换myUrl中的同名参数值
    URLObj.parseURL = function (myUrl, newParams) {
        /*
         for (var x in myUrl.params) {
         for (var y in newParams) {
         if (x.toLowerCase() == y.toLowerCase()) {
         myUrl.params[x] = newParams[y];
         }
         }
         }
         */
        for (var x in newParams) {
            var hasInMyUrlParams = false;
            for (var y in myUrl.params) {
                if (x.toLowerCase() == y.toLowerCase()) {
                    myUrl.params[y] = newParams[x];
                    hasInMyUrlParams = true;
                    break;
                }
            }
            //原来没有的参数则追加
            if (!hasInMyUrlParams) {
                myUrl.params[x] = newParams[x];
            }
        }
        var _result = myUrl.protocol + "://" + myUrl.host + ":" + myUrl.port + myUrl.path + "?";
        for (var p in myUrl.params) {
            _result += (p + "=" + myUrl.params[p] + "&");
        }
        if (_result.substr(_result.length - 1) == "&") {
            _result = _result.substr(0, _result.length - 1);
        }
        if (myUrl.hash != "") {
            _result += "#" + myUrl.hash;
        }
        return _result;
    }


});

