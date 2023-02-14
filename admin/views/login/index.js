
// const loginForm = document.querySelector("#loginForm")

loginForm.onsubmit = async function (evt) {
    evt.preventDefault()//阻止默认刷新

    console.log(username.value, password.value)

    //     fetch("http://localhost:3000/users",{
    //         method:"POST",
    //         headers:{
    //             "content-type":"application/json"
    //         },
    //         body:JSON.stringify({
    //             username:"Lily",
    //             password:112233
    //         })
    //     }).then(res=>res.json()).then(res=>{
    //         console.log(res)
    //     })
    //     json.server使用post只能添加数据，这边使用get方法
    let res = await fetch(`http://localhost:3000/users?username=${username.value}&password=${password.value}`, {

    }).then(res => res.json())

    console.log("返回结果",res[0],res)//async await同步得到返回值

    //验证判断
    if(res.length>0){
        location.href = "/admin/views/home/index.html"//跳转主页
        localStorage.setItem("token",JSON.stringify({
            ...res[0],
            password:"******"
        }))//利用展开运算符使密码加密显示
    
    
    
    
    }else{
        console.log("验证失败")
        loginWarning.style.display = "block"//显示提示账户密码错误
    }



}