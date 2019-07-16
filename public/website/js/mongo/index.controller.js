/**
 * mongodb演示js
 */
layui.use(['layer', 'form'], function(){
    var layer = layui.layer, 
            $ = layui.jquery;
    $(function() {
        $("#btnSubmit").on("click", function() {
            var _id = $("#cid").val() || '';
            $.post('/mongo/save', {
                id: _id,
                username: $("#username").val(),
                userphone: $("#userphone").val(),
                companyname: $("#companyname").val()
            }, function(res) {
                if (_id != '') {
                    if (res && res.success) {
                        layer.alert('修改成功');
                    } else {
                        layer.alert('修改失败');
                    }
                } else {
                    if (res && res.success) {
                        layer.alert('新增成功');
                    } else {
                        layer.alert('新增失败');
                    }
                }
            })
        })
    })
});

