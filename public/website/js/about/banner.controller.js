//平台滑块动画
var content = document.getElementById('slide-wrap')
$('.arrow-right').click(
    function () {
        content.style.transform = 'translate(-1000px)';
    }
)
$('.arrow-left').click(
    function () {
        content.style.transform = 'translate(0px)';
    }
)