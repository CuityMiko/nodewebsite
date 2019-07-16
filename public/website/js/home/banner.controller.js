var laytpl;
var form;

// 首页轮播图
$('.owl-carousel').owlCarousel({
    autoplay: true,
    loop: true,
    items: 1,
    dotsContainer: false,
    navContainer: false,
    mouseDrag: true,
//        nav: true,
    dots: true
})

//首页行业解决方案动态切换
$('.tag').each(function (index, item) {
    $(item).hover(function () {
        $(".tag-hover").removeClass("tag-hover");
        $(".sol-show").removeClass("sol-show");
        $(this).addClass("tag-hover");
        $($('.solution')[index]).addClass('sol-show');
    }, function () {
    })
})


//联系我们提交

layui.use(['form', 'laytpl'], function() {
    laytpl = layui.laytpl;
    form = layui.form;

    // 提交
    layui.use(['layer', 'form'], function(){
        var layer = layui.layer,
            $ = layui.jquery;
        $(function() {
            $("#submit").on("click", function() {
                var applyName = $("#applyName").val();
                var applyPhone = $("#applyPhone").val();
                if (!applyName) {
                    layer.alert('申请人姓名不能为空');
                    return false;
                }
                if (!applyPhone) {
                    layer.alert('申请人手机号不能为空');
                    return false;
                }
                if (/^1[34578]\d{9}$/.test(applyPhone)) {
                    $.post('/agent/save', {
                        applyName: applyName,
                        applyPhone: applyPhone,
                        selprovince: '',
                        selcity: '',
                        selarea: '',
                        companyName: $("#companyName").val(),
                        companyAddress: '',
                        companySituation: '',
                        aim: '1代理商'
                    }, function(res) {
                        if (res && res.success) {
                            layer.open({
                                type: 1,
                                skin: 'popup', //样式类名
                                closeBtn: 0, //不显示关闭按钮
                                area: ['420px', '320px'], //宽高
                                // anim: 2,
                                shadeClose: true, //开启遮罩关闭
                                content: '<div class="sc-icon"></div>' +
                                '<div class="sc-text">提交成功</div>' +
                                '<div class="sc-desc">我们将在<span>7</span>个工作日内联系您，请耐心等待</div>' +
                                '<div class="confirm layui-layer-close layui-layer-close1">确定</div>',
                            });
                        } else {
                            layer.alert('新增失败');
                        }
                    })
                } else {
                    layer.alert('手机号格式不正确，请重新输入');
                    return false;
                }
            })
        })
    })
});