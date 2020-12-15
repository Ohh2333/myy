$.ajaxPrefilter(function (options) {
  options.url = "http://ajax.frontend.itheima.net" + options.url;

  options.headers = {
    //token的值存储在本地存储中，需要从本地存储中来获取到
    Authorization: localStorage.getItem("token"),
  };
});
