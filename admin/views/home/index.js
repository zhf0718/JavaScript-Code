import {load ,isLogin} from "/admin/util/LoadView.js"

load("sidemenu-home")

let user = JSON.parse(isLogin())

let categoryList = ["最新动态","典型案例","通知公告"]


document.querySelector(".userprofile").innerHTML =  `
<img src="${user.photo}" stylt="width:100px;" />
<div>
    <div>${user.username}</div>
    <div><pre>${user.insroduction||"这人很懒。"}</pre></div>
</div>

`





      async function anyList (){
        let res = await fetch("http://localhost:3000/news?author="+user.username)
        .then(res=>res.json())
        console.log(res)

        let obj = _.groupBy(res,item=>item.category)

        let arr = []

        for(let i in obj){
            arr.push({
                name:categoryList[i],
                value:obj[i].length
            })
        }

        console.log(arr)

        renderEcharts(arr)



      }
function renderEcharts(arr){
    var myChart = echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '新闻发布',
          subtext: '类型占比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '类别：',
            type: 'pie',
            radius: '50%',
            data: arr,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
}
      anyList()
      