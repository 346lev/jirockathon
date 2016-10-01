$(function() {
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = chrome.extension.getURL('fukidashi.css');
    (document.head||document.documentElement).appendChild(style);
    
    $(".cassetteitem_object-item").each(function(){
        $(this).css('position','relative');
        $(this).append(
            '<div class="p-fukidashiWrapper"><div class="p-fukidashi"><p class="p-fukidashi__addicted">二郎依存度</p><p class="p-fukidashi__rate">98%</p><p class="p-fukidashi__walk">徒歩<span class="p-fukidashi__min">5分</span></p></div></div>'
        );
    });
});
