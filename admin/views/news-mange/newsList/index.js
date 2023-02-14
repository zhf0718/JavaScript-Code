import { load, isLogin } from "/admin/util/LoadView.js"

load("sidemenu-newsList")

let list = []
let upDataID = 0



const myPreviewModal = new bootstrap.Modal(document.getElementById('previewModal'))
const DelModal = new bootstrap.Modal(document.getElementById('exampleModal-del'))


let categoryList = ["最新动态","典型案例","通知公告"]

async function render() {
    let username = JSON.parse(isLogin()).username
    list = await fetch(`http://localhost:3000/news?author=${username}`)
        .then(res => res.json())
    console.log(list)

    listBody.innerHTML = list.map(item => `
    <tr>
        <th scope="row">${item.title}</th>
        <td>${categoryList[item.category]}</td>
        <td>
        <button type="button" class="btn-pre btn btn-success" data-id=${item.id}>预览</button>
        <button type="button" class="btn-edit btn btn-primary" data-id=${item.id}>更新</button>
        <button type="button" class="btn-del btn btn-danger" data-id=${item.id}>删除</button>
        </td>
     </tr>
    
    `).join("")
}

//按钮事件
listBody.onclick = function(evt){
    // console.log(evt.target.className)

    if(evt.target.className.includes("btn-pre")){
        
        myPreviewModal.toggle()
        let obj = list.filter(item=>item.id==evt.target.dataset.id)[0]
        console.log(obj)
        renderPreviewModal(obj)
        
    }
    else if(evt.target.className.includes("btn-edit")){
        console.log("edit")
        location.href = "/admin/views/news-mange/editNews/index.html?id="+evt.target.dataset.id
    }
    else if(evt.target.className.includes("btn-del")){
        console.log("del")
        upDataID = evt.target.dataset.id

        //显示删除modal
        DelModal.toggle()
    }
}

delConfirm.onclick = async function(){
    await fetch(`http://localhost:3000/news/${upDataID}`,{
        method:"DELETE"
    })
    DelModal.toggle()
    render()
}

//预览modal渲染
function renderPreviewModal(obj){
    previewModalTitle.innerHTML = obj.title
    previewModalContent.innerHTML = obj.content
}


render()