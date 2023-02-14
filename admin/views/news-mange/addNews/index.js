import {load,isLogin} from "/admin/util/LoadView.js"

load("sidemenu-addNews")


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


addNewsForm.onsubmit = async function(evt){
    evt.preventDefault()
    await fetch("http://localhost:3000/news",{
        headers:{
            "content-type":"application/json"
        },
        method:"POST",
        body:JSON.stringify({
            title:newsTitle.value,
            content,
            category:category.value,
            cover,
            author:JSON.parse(isLogin()).username

        })
    }).then(res=>res.json())


    location.href = "/admin/views/news-mange/newsList/index.html"

}