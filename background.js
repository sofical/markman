/*chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([
            {
                // 注册规则，当且仅当列出的所有条件都满足时，PageStateMatcher 才会匹配网页,即当url为https://www.zybang.com ，即触发执行某个操作（目前只有 ShowPageAction）。
                // That fires when a page's URL contains a 'g' ...
                conditions: [
                    /!*new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { urlContains: 'https://www.zybang.com' },
                    })*!/
                ],
                // And shows the extension's page action.
                actions: [ new chrome.declarativeContent.ShowPageAction() ]
            }
        ]);
    });
});*/

function sendMessageToContentScript(message, callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response)
        {
            if(callback) callback(response);
        });
    });
}

//菜单定义
function clickalert(info,tab) {
    sendMessageToContentScript({cmd:'mark'}, function(response)
    {
        alert('你点击的座标是：'+response.x + ":" + response.y);
    });
}
//订阅
function setRss(info, tabs) {
    alert("start=================");
    alert(JSON.stringify(info));
    alert(JSON.stringify(tabs));
    alert("end====================");
}
//关于我们
function aboutUs() {
    //location.href="http://wiki.ymhrj.com/index.php?title=MarkMan";
    chrome.tabs.create({
        url : "http://wiki.ymhrj.com/index.php?title=MarkMan"
    });
}

//主菜单入口
var parent = chrome.contextMenus.create({
    "title":"Mark Man - 标注先锋",
    "contexts":["all"]
});
//标注
chrome.contextMenus.create({
    "title":"添加标注",
    "parentId":parent,
    "onclick":clickalert,
    "contexts":["all"]
});
//订阅
chrome.contextMenus.create({
    "title":"订阅此页",
    "parentId":parent,
    "onclick":setRss,
    "contexts":["all"]
});
//关注我们！
chrome.contextMenus.create({
    "title":"关于我们",
    "parentId":parent,
    "onclick":aboutUs,
    "contexts":["all"]
});