import {load,isLogin} from "/admin/util/LoadView.js"

load("sidemenu-newsList")


//获取传过来的ID

let upDataID = new URL(location.href).searchParams.get("id")


let content =""//接受富文本返回值
let cover = ""//接受图片信息

const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
    placeholder: 'Type here...',
    onChange(editor) {
      const html = editor.getHtml()
      console.log('editor content', html)
      // 也可以同步到 <textarea>

      content = html
    }
}

const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'default', // or 'simple'
})

const toolbarConfig = {}

const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})


coverFile.onchange = function(evt){
    // console.log(evt.target.files[0])

    let reader = new FileReader()

    reader.readAsDataURL(evt.target.files[0])//头像转换格式

    reader.onload = function(ev){
        // console.log(ev.target.result)
        cover = ev.target.result
    }

}


editNewsForm.onsubmit = async function(evt){
    evt.preventDefault()
    await fetch(`http://localhost:3000/news/${upDataID}`,{
        headers:{
            "content-type":"application/json"
        },
        method:"PATCH",
        body:JSON.stringify({
            title:newsTitle.value,
            content,
            category:category.value,
            cover,

        })
    }).then(res=>res.json())


    location.href = "/admin/views/news-mange/newsList/index.html"

}

async function render (){
    let {title,category,content:mycontent,cover:mycover} = await fetch(`http://localhost:3000/news/${upDataID}`)
    .then(res=>res.json())
    document.querySelector("#newsTitle").value = title
    document.querySelector("#category").value = category


    editor.setHtml(mycontent)//富文本设置内容API
    content = mycontent

    cover = mycover
    
}
render()