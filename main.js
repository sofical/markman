var pointX, pointY, windowX, windowY, page;
$(function () {
    windowX = $(window).width() ;
    windowY = $(window).height();
    //捕捉鼠标点击座标
    $(document).bind('mousedown', function (e) {
        pointX = e.pageX || e.clientX + document.body.scrollLeft;
        pointY = e.pageY || e.clientY + document.body.scrollTop;
        page = -1;
    });

    //窗口变化事件
    $(window).resize(function () {
        windowX = $(window).width();
        windowY = $(window).height();
    });
});

function getXy() {
    var html = "<div id=\"mark-man-container-mark\" style=\"position: absolute; left:" + pointX + "px; top:" + pointY + "px; " +
        "background-color: aquamarine; z-index: 10000\">测试</div>";
    $(document.body).append(html);
    return {
        x : pointX,
        y : pointY
    }
}

//事件分发
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    if(request.cmd == 'mark') {
        sendResponse(getXy());
    } else {
        console.log("undefined cmd: " + request.cmd);
    }
});