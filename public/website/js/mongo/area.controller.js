var laytpl;
var form;

// 加载省数据
function loadProvince(data) {
    data.unshift(['省','0'])
    var provinceTpl = province.innerHTML;
    var selprovince = document.getElementById('selprovince');
    laytpl(provinceTpl).render(data, function(html) {
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
        laytpl(cityTpl).render(data, function(html) {
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
        laytpl(areaTpl).render(data, function(html) {
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
    $.getScript('https://cdn.weather.hao.360.cn/sed_api_area_query.php?grade=city&_jsonp=loadCity2&code='+ pcode +'&_=' + (new Date()).getTime());
}

// 获取区/县数据
function getAreaData(ccode) {
    $.getScript('https://cdn.weather.hao.360.cn/sed_api_area_query.php?grade=town&_jsonp=loadTown&code='+ ccode +'&_=' + (new Date()).getTime());
}
layui.use(['form', 'laytpl'], function() {
    laytpl = layui.laytpl;
    form = layui.form;
    
    // 初始化加载省份
    getProvinceData();

    // 监听省的选择
    form.on('select(selectProvince)', function(data) { 
        var _pdatas = data.value.split(',');
        getCityData(_pdatas[1]);
    });

    // 监听市的选择
    form.on('select(selectCity)', function(data) { 
        var _cdatas = data.value.split(',');
        getAreaData(_cdatas[1]);
    });

    // 提交
    $("#btngetData").on("click", function() {
        console.log($("#selprovince").val())
        console.log($("#selcity").val())
        console.log($("#selarea").val())
    })
});