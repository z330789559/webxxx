<template>
 <el-card style="width: 100%">
      <template #header>
       <div class="card-header">
         <span>请查看你的分析报告</span>
       </div>
      </template>
      
      <div style="width: auto;height: 400px;background-color: beige;" id="main">
      </div>
      <div style="width: auto;height: 400px;background-color: aliceblue;" id="left">
      </div>
    </el-card>
    
    <el-card style="width: 100%">
      <template #header>
       <div class="card-header">
         <span>你的最终总得分为：{{ this.score }}分</span>
       </div>
      </template>
      <div>下面是你的心理分析结论：</div>
      <div style="width: auto;height: auto; background-color:aqua">
        <el-text tag="b" size="large">{{ this.result }}</el-text>
      </div>
    </el-card>
</template>
  
  <script>
    import * as echarts from 'echarts';
    import httpHelper from '@/utils/httpHelper'

    export default {
      name: "echarts",
      data() {
        return {
        userquestionnaire: localStorage.getItem("userquestionnaire")?JSON.parse(localStorage.getItem("userquestionnaire")):{},    
        x:[],
        y:[],
        score:'',
        result:''

        }

      },

      mounted() {
        this.echartsInit()
      },
      methods:{
        echartsInit() {           
            let chart1=echarts.init(document.getElementById('main'))
            httpHelper.get("/echarts/"+this.userquestionnaire.id).then(res =>{
             //获取后台的数据
            this.x=res.data.x
            this.y=res.data.y
            this.score=res.data.score
            this.result=res.data.result
            console.log(res)
            console.log(this.x)
            console.log(this.y)
            chart1.setOption({
              title: {
              text: '问卷各项得分条形图'
             },
            tooltip: {
            },
            legend: {
              data: ['各项得分']
            },
            xAxis: {
              name:'项目名称',
              type: 'category',
              data: this.x
            },
            yAxis: {
              name:'得分',
              type: 'value'
            },
            series: [{
              data: this.y,
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)'
              }
             }]
            })

          var label=[]
          for(var i=0;i<res.data.x.length;i++){
            label[i]={'name':res.data.x[i],"value":res.data.y[i]}
          }

          var chartDom = document.getElementById('left');
          var myChart = echarts.init(chartDom);
          var option;

          console.log(label)
          option = {
          color: [ '#FFE434'],
          title: {
           text: '问卷各项得分雷达图'
           },
          legend: {
            data:['得分情况']
          },
          tooltip: {
          },
          radar: [
           {
           indicator: label,
           center: ['50%', '50%'],
           shape: 'circle',
           axisName: {
             color: '#428BD4'
            },
          splitArea: {
          areaStyle: {
           color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
           shadowColor: 'rgba(0, 0, 0, 0.2)',
           shadowBlur: 10
           }
           },
          axisLine: {
           lineStyle: {
            color: 'rgba(211, 253, 250, 0.8)'
           }
          },
         splitLine: {
         lineStyle: {
           color: 'rgba(211, 253, 250, 0.8)'
           }
          }
        },
       
      ],
  
       series: [
        {
        type: 'radar',
        emphasis: {
          lineStyle: {
            width: 4
          }
        },
        data: [
        
         {
           value: this.y,
           name: '具体得分',
           areaStyle: {
           color: 'rgba(255, 228, 52, 0.6)'
           }
         }
        ]
      },
      
     ]
     };

      option && myChart.setOption(option);

      })    
    },




    }

}
  </script>