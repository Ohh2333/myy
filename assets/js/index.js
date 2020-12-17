//发送ajax请求来获取到用户的基本信息(头像和昵称)
$(".textAvatar").css("display", "none");
getUserInfo();
let layer = layui.layer;
function getUserInfo() {
  $.ajax({
    //注意，以下写法的前提条件是在页面中引入ajax
    url: "/my/userinfo",
    //请求头的配置
    // headers: {
    //   //token的值存储在本地存储中，需要从本地存储中来获取到
    //   Authorization: localStorage.getItem("token"),
    // },
    success: function (res) {
      //   console.log(res);

      if (res.status !== 0) {
        return layer.msg("获取用户信息失败");
      }
      //渲染处理头像和昵称
      //1.如果有头像，展示头像，没有则展示文字头像
      //2.如果有nickname，优先展示nickname，否则才展示username

      //优先展示nickname
      let name = res.data.nickname || res.data.username;
      $("#welcome").text("欢迎，" + name);

      //根据user_pic来做判断
      if (res.data.user_pic) {
        //有图片，展示图片,隐藏文字头像
        $(".layui-nav-img").attr("src", res.data.user_pic).show();
        $(".textAvatar").hide();
      } else {
        //没有图片
        //展示文字头像，还需改变文字头像的文字（name的第一个字）
        //隐藏头像
        $(".textAvatar").show().text(name[0].toUpperCase());
        $(".layui-nav-img").hide();
      }
    },
    //请求完成(不论成功还是失败，都会执行)
    //若判断
    //用户没有权限进入index页面，需要回到login页面重新登录
    complete: function (res) {
      //  console.log(res);
      //  通过res.responseJSON可以获取到服务器响应回来的数据
      let data = res.responseJSON;
      if (data.status !== 0 || data.message != "获取用户基本信息成功！") {
        location.href = "/home/login.html";
        localStorage.removeItem("token");
      }
    },
  });
}

$("#exit").on("click", function () {
  layer.confirm("确定退出登录?", { icon: 3, title: "提示" }, function (index) {
    //点击确定后执行的回调函数
    location.href = "/home/login.html";
    localStorage.removeItem("token");
    //想要关闭当前页的某个层时，由于每一种弹层调用方式都会返回一个index，只要把获得的index，赋予layer.close即可
    layer.close(index); //关闭当前询问框
  });
});
