import {load} from "/admin/util/LoadView.js"

load("sidemenu-userList")

let list = []
let upDataID = 0
let photoData = ""


async function render(){
     list = await fetch("http://localhost:3000/users")
    .then(res=>res.json())

    console.log(list)

    listBody.innerHTML = list.map(item=>`
    <tr>
        <th scope="row">${item.username}</th>
        <td><img src="${item.photo}" style="width:50px;height:50px;border-radius:50%" /></td>
        <td>
        <button type="button" class="btn-edit btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal-edit" data-id=${item.id}>编辑</button>
        <button type="button" class="btn-del btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal-del"  ${item.default?"disabled":""} data-id=${item.id}>删除</button>
        </td>
     </tr>
    
    
    `).join("")
}

listBody.onclick = function(evt){
    //点击编辑按钮时
    if(evt.target.className.includes("btn-edit")){
        // console.log("点击编辑按钮")
        //显示编辑模块
        
        upDataID = evt.target.dataset.id
        console.log(evt.target.dataset.id)

        
        console.log(list.filter(item=>item.id==upDataID)[0])
        let {username,password,introduction,photo} = list.filter(item=>item.id==upDataID)[0]
        //解构赋值


        //编辑信息中预填

        document.querySelector("#username").value = username
        document.querySelector("#password").value = password
        document.querySelector("#introduction").value = introduction
        // document.querySelector("photo").value = photo
        photoData = photo

        //点击删除按钮时更改updataID
    }else if(evt.target.className.includes("btn-del")){
        console.log("点击删除按钮")
        upDataID = evt.target.dataset.id
        console.log(upDataID)
        //实例化modal使用toggle方法关闭modal
    }
}


editConfirm.onclick = async function(){
    // console.log(document.querySelector("#username").value)
    // console.log(document.querySelector("#password").value)
    // console.log(document.querySelector("#introduction").value)
    // console.log(photoData)

    await fetch(`http://localhost:3000/users/${upDataID}`,{
        method:"PATCH",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            username:document.querySelector("#username").value,
            password:document.querySelector("#password").value,
            introduction:document.querySelector("#introduction").value,
            photo:photoData
        })
    }).then(res=>{
        console.log("更新成功！")
        return res.json()
    })

    render()

}

//更新头像文件时的方法
photoFile.onchange = function(evt){
    let reader = new FileReader()

    reader.readAsDataURL(evt.target.files[0])//头像转换格式

    reader.onload = function(ev){
        // console.log(ev.target.result)
        photo = ev.target.result
    }
}




//删除用户事件
delConfirm.onclick = async function(){
    await fetch(`http://localhost:3000/users/${upDataID}`,{
        method:"DELETE"
    })
    .then(res=>res.json())
    render()
}


render()