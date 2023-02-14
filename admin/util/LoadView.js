function isLogin() {
    return localStorage.getItem("token")
}
    //导航栏渲染
function renderTopbar(user){
    console.log(user)
    let photo = document.querySelector("#topbar-photo")
    let currrentUsername = document.querySelector("#currentUsername")
    let exit = document.querySelector("#exit")

    photo.src = user.photo
    currrentUsername.innerHTML = user.username

    exit.onclick = function(){
        localStorage.removeItem("token")
        location.href = "/admin/views/login/index.html"
    }
}


function renderSidemenu(user,id){
//高亮显示当前页面的侧边栏颜色
document.querySelector("#"+ id).style.color = "#0a58ca"

if(JSON.parse(user).role!=="admin"){
    document.querySelector("#user-mange-item").remove()
}
}


async function load(id) {
    let user = isLogin()
    
    if (user) {
        //内容复用 
        let topbarText = await fetch("/admin/components/topbar/index.html")
            .then(res => res.text())
        document.querySelector(".topbar").innerHTML = topbarText //导航栏内容复用


        //渲染侧边栏
        let sidemenuText = await fetch("/admin/components/sidemenu/index.html")
            .then(res => res.text())
        document.querySelector(".sidemenu").innerHTML = sidemenuText //

        

        renderTopbar(JSON.parse(user))
        renderSidemenu(user,id)
    } else {
        location.href = "/admin/views/login/index.html"
    }



}

export { load ,isLogin}