const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
const hashMap = xObject || [
    {
        logo: 'A',
        url: 'https://www.acfun.cn'
    },
    {
        logo: 'B',
        url: 'https://www.bilibili.com'
    }, 
];
const simplifyUrl = (url)=>{
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '') //  删除/开头得内容
    ;
};
const render = ()=>{
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index)=>{
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo[0]}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class = 'close'>
                <svg class="icon" >
                    <use xlink:href="#icon-guanbi"></use>
                </svg>
                </div>
            </div>
    </li>`).insertBefore($lastLi);
        $li.click(()=>{
            window.open(node.url);
        });
        $li.on('click', '.close', (e)=>{
            console.log(1);
            e.stopPropagation(); //阻止事件冒泡
            console.log(hashMap);
            hashMap.splice(index, 1);
            render();
        });
    });
};
render();
$('.addButton').click(()=>{
    let webPath = window.prompt("请输入要添加的网址");
    if (webPath.indexOf('http') != 0) webPath = 'https://' + webPath;
    console.log(webPath);
    hashMap.push({
        logo: simplifyUrl(webPath)[0].toUpperCase(),
        url: webPath
    });
    render();
});
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap);
    localStorage.setItem('x', string);
};
$(document).on('keypress', (e)=>{
    let key = e.key;
    for(let i = 0; i < hashMap.length; i++)if (hashMap[i].logo.toLowerCase() === key) window.open(hashMap[i].url);
});

//# sourceMappingURL=index.de158e3a.js.map
