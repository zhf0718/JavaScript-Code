import {load} from "/admin/util/LoadView.js"

load("sidemenu-addUser")

let photo = ""

addUserForm.onsubmit = async function(evt){
    evt.preventDefault()//取消默认事件


    await fetch("http://localhost:3000/users",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            username:username.value,
            password:password.value,
            introduction:introduction.value,
            photo
        })
    }).then(res=>res.json())

    location.href = "/admin/views/user-mange/usersList/index.html"
}



photoFile.onchange = function(evt){
    // console.log(evt.target.files[0])

    let reader = new FileReader()

    reader.readAsDataURL(evt.target.files[0])//头像转换格式

    reader.onload = function(ev){
        // console.log(ev.target.result)
        photo = ev.target.result
    }

}