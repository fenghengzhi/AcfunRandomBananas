// ==UserScript==
// @name         Acfun随机送香蕉
// @namespace    https://greasyfork.org/users/63665
// @homepage     https://greasyfork.org/scripts/22845
// @version      0.0.9
// @description  Acfun随机送香蕉500次
// @author       You
// @match        http://www.acfun.tv
// @match        http://www.aixifan.com
// @grant        none
// @icon         http://cdn.aixifan.com/ico/favicon.ico
// @note         github更新测试
// @run-at       document-idle
// ==/UserScript==
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + '=');
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(';', c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return '';
}
function acPostBananas(_cid, _uid) {
    $.post("/banana/throwBanana.aspx", {
        count: "5",
        contentId: _cid,
        userId: _uid
    },
           function(data, status) {
        if (status == "success") {
            console.log(data.result);
        } else {
            console.log("自动5蕉：网络错误");
        }

    });
}
(function(){
    if (getCookie('auth_key') !== '') {
        if(confirm('检测到已登录，是否执行一键随机送蕉500次？')){
            userId=getCookie('auth_key');
            for(i=1;i<500;i++){
                contentid=Math.ceil(Math.random()*(3100000-1)+1);
                console.log(contentid);
                acPostBananas(contentid,userId);
            }
        }
    }
}());
