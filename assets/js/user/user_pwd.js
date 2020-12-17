//新密码两次要一致
let form = layui.form;
verify();
function verify() {
  form.verify({
    //新旧密码不能相同
    newPass: function (value) {
      //value：表单的值、item：表单的DOM对象
      if ($("#oldPwd").val() === value) {
        return "新密码和原密码不能一样";
      }
    },

    rePwd: (value) => {
      let newPwd = $("[name=newPwd]").val();
      if (newPwd !== value) {
        return "两次输入的新密码不相同";
      }
    },
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  });
}
$(".layui-form").on("submit", function (e) {
  e.preventDefault();
  let data = $(this).serialize();
  $.ajax({
    type: "POST",
    url: "/my/updatepwd",
    data,
    success: function (res) {
      //   console.log(res);
      if (res.status !== 0) {
        return layer.msg("更新密码失败！" + res.message);
      }
      layer.msg("密码修改成功！");
      //清空表单元素的内容
      $(".layui-form")[0].reset();
    },
  });
});
