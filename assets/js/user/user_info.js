$(function () {
  let layer = layui.layer;
  let form = layui.form;
  getUserInfo();
  function getUserInfo() {
    //发送ajax请求来获取到用户的基本信息
    $.ajax({
      url: "/my/userinfo",
      //请求成功，将响应得到的对应数据赋值给表单
      success: function (res) {
        // console.log(res);
        //为表单赋值 语法：form.val('filter', object);
        //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
        //第二个参数是个对象，将里面的值根据表单的name来对应赋值
        form.val("form", res.data);
      },
    });
  }

  //重置，reset按钮可以实现表单清空效果
  //点击重置按钮时，重新发送ajax请求将数据重显示在页面上
  $("#resetBtn").on("click", function (e) {
    //阻止默认行为，即清空效果
    e.preventDefault();
    // 重新发送ajax请求将数据重显示在页面上;
    getUserInfo();
  });
});

//提交修改
$(".layui-form").on("submit", function (e) {
  //阻止默认行为
  e.preventDefault();
  let data = $(this).serialize();
  //   console.log(data);
  $.ajax({
    type: "POST",
    url: "/my/userinfo",
    data,
    success: function (res) {
      //   console.log(res);

      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg("更新用户信息成功！");

      //更改index页面左侧的名字
      //window.parent来获取父页面(index页面)
      //注意点：父页面的getUserInfo函数需要时全局的
      window.parent.getUserInfo();
    },
  });
});
