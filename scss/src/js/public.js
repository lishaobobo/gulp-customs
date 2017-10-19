/**
 * tab 切换
 * @param {tab} arg tab 切换处标题的dom
 * @param {tabCt} arg tab 切换处 内容 包裹 处 的dom
 */
function ChangeTab(arg) {
    this.config = {
        tab: $(".tab-nav"),
        tabCt: $(".tab-ct")
    };
    if (arg && $.isPlainObject(arg)) {
        $.extend(this.config, arg);
    } else {
        return;
    }
}

ChangeTab.prototype = {
    index: 0,
    switchTab: function () {
        var that = this;
        this.config.tab.children("li").on("click", function () {
            that.index = $(this).index();
            $(this).addClass("active").siblings("li").removeClass("active");
            // 切换内容
            that.switchCt(that.index);
        });
    },
    switchCt: function (i) {
        this.config.tabCt.children().eq(i).removeClass("din")
            .siblings().addClass("din");
    }
};

new ChangeTab().switchTab();

/**
 * 平滑滚动
 */
$(".stat-ct").on("click", "a", function(){
    // 激活态
    $(".stat-ct ul a").removeClass("active");
    $(this).addClass("active");

    // var href = $(this).attr("href");
    // if (href.substring(href.length - 1) != "#") {
    //     var pos = $(href).offset().top;
    //     $("html,body").animate({scrollTop: pos}, 300);
    //     return false;
    // }
});

$(".stat").on("click", "h3", function () {
    $(this).closest("li").addClass("active")
        .siblings("li").removeClass("active");
});
