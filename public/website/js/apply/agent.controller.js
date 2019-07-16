var laytpl;
var form;

// 加载省数据
function loadProvince(data) {
    data.unshift(['省', '0'])
    var provinceTpl = province.innerHTML;
    var selprovince = document.getElementById('selprovince');
    laytpl(provinceTpl).render(data, function (html) {
        $("#selprovince").append(html);
        getCityData(data[0][1]);
        form.render('select');
    });
}

// 加载市数据
function loadCity2(data) {
    $("#selcity").html("");
    if (data.length > 0) {
        var cityTpl = city.innerHTML;
        var selcity = document.getElementById('selcity');
        laytpl(cityTpl).render(data, function (html) {
            getAreaData(data[0][1]);
            $("#selcity").append(html);
        });
    } else {
        $("#selcity").append('<option value="0">市</option>');
    }
    form.render('select');
}

// 加载区县数据
function loadTown(data) {
    $("#selarea").html("");
    if (data.length > 0) {
        var areaTpl = area.innerHTML;
        var selarea = document.getElementById('selarea');
        laytpl(areaTpl).render(data, function (html) {
            $("#selarea").append(html);
        });
    } else {
        $("#selarea").append('<option value="0">区/县</option>');
    }
    form.render('select');
}

// 获取省数据
function getProvinceData() {
    $.getScript('https://cdn.weather.hao.360.cn/sed_api_area_query.php?grade=province&_jsonp=loadProvince&_=' + (new Date()).getTime());
}

// 获取市数据
function getCityData(pcode) {
    $.getScript('https://cdn.weather.hao.360.cn/sed_api_area_query.php?grade=city&_jsonp=loadCity2&code=' + pcode + '&_=' + (new Date()).getTime());
}

// 获取区/县数据
function getAreaData(ccode) {
    $.getScript('https://cdn.weather.hao.360.cn/sed_api_area_query.php?grade=town&_jsonp=loadTown&code=' + ccode + '&_=' + (new Date()).getTime());
}

layui.use(['form', 'laytpl'], function () {
    laytpl = layui.laytpl;
    form = layui.form;

    // 初始化加载省份
    getProvinceData();

    // 监听省的选择
    form.on('select(selectProvince)', function (data) {
        var _pdatas = data.value.split(',');
        getCityData(_pdatas[1]);
    });

    // 监听市的选择
    form.on('select(selectCity)', function (data) {
        var _cdatas = data.value.split(',');
        getAreaData(_cdatas[1]);
    });

    // 提交
    layui.use(['layer', 'form'], function () {
        var layer = layui.layer,
            $ = layui.jquery;
        $(function () {
            $("#btngetData").on("click", function () {
                    var applyName = $("#applyName").val();
                    var applyPhone = $("#applyPhone").val();
                    var selprovince = $("#selprovince").val().split(',')[0];
                    if (!applyName) {
                        layer.alert('申请人姓名不能为空');
                        return false;
                    }
                    if (!applyPhone) {
                        layer.alert('申请人手机号不能为空');
                        return false;
                    }
                    if (selprovince === '省') {
                        layer.alert('申请人区域不能为空');
                        return false;
                    }
                    if (/^1[34578]\d{9}$/.test(applyPhone)) {
                        $.post('/agent/save', {
                            applyName: applyName,
                            applyPhone: applyPhone,
                            selprovince: selprovince,
                            selcity: $("#selcity").val().split(',')[0],
                            selarea: $("#selarea").val().split(',')[0],
                            companyName: $("#companyName").val(),
                            companyAddress: $("#companyAddress").val(),
                            companySituation: $("#companySituation").val()
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