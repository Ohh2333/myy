//点击去登录
$("#goToLogin").on("click", function () {
  //登录form显示,注册form隐藏
  $("#loginForm").show();
  $("#regiForm").hide();
});
//点击去注册
$("#goToRegi").on("click", function () {
  //注册form显示,登录form隐藏
  $("#regiForm").show();
  $("#loginForm").hide();
});

let form = layui.form;
form.verify({
  repass: function (value, item) {
    //value：表单的值、item：表单的DOM对象
    // console.log($("#iptPwd").val());
    // console.log(value);
    if (value !== $("#iptPwd").val()) {
      return "两次密码不一致";
    }
  },
  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
});

let layer = layui.layer;
//注册表单提交
$("#regiForm").on("submit", function (e) {
  e.preventDefault();
  //获取表单数据
  let data = $("#regiForm").serialize();
  $.ajax({
    type: "POST",
    url: "/api/reguser",
    data,
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg("注册成功");
      $("#regiForm")[0].reset();
    },
  });
});

//登录表单提交
$("#loginForm").on("submit", function (e) {
  e.preventDefault();
  let data = $("#loginForm").serialize();
  $.ajax({
    type: "POST",
    url: "/api/login",
    data,
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }

      //把token存储到本地存储中
      localStorage.setItem("token", res.token);

      layer.msg(
        "登陆成功",
        {
          time: 2000, //2秒关闭（如果不配置，默认是3秒）
        },
        function () {
          location.href = "/home/index.html";
        }
      );
    },
  });
});
