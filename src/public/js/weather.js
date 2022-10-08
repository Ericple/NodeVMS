vaptcha({
    vid: '6333003cddd74f18e28e2e6e',
    mode: 'click',
    scene: 0,
    container: '#VAPTCHAContainer',
    area: 'auto',
    }).then(function (VAPTCHAObj) {
        // 将VAPTCHA验证实例保存到局部变量中
        obj = VAPTCHAObj;

        // 渲染验证组件
        VAPTCHAObj.render();

        // 验证成功进行后续操作
        VAPTCHAObj.listen('pass', function () {
            serverToken = VAPTCHAObj.getServerToken();
            $.ajax({
                url: `/api/weather`,
                type: 'POST',
                contentType: "application/json",
                dataType: "json",
                data:JSON.stringify({
                    "token": serverToken.token,
                    "server": serverToken.server,
                    "airCode": document.getElementById("floatingInput").value
                }),
                success: (result) => {
                    alert(result)
                },
                error: () => {
                    document.getElementById('alert').style.display = "block";
                    VAPTCHAObj.reset();
                }
            })
        })
    })