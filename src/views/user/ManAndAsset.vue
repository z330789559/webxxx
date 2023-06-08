<template>
    <el-card style="width: 100%">
        <template #header>
          <div class="card-header">
            <span>欢迎来到用户主界面</span>
           </div>
        </template>
        <el-tag effect="dark" type="success" size="large" round>请查看您的基本信息与资产，注意关注当前各种货币数据喔</el-tag>
     
    
    </el-card>
    <el-card style="width: 100%">
      <template #header>
       <div class="card-header">
         <span>用户基本信息</span>
       </div>
      </template>
      
      <el-table :data="users" style="width: 100%"  border stripe header-cell-class-name="headerBg">
        <el-table-column prop="name" label="用户名" width="120" />
        <el-table-column prop="name" label="账号" width="160" />
        <el-table-column prop="asset" label="总资产" width="120" />

      </el-table>
    </el-card>

    <el-card style="width: 100%">
      <template #header>
       <div class="card-header">
         <span>各种货币信息</span>
       </div>
      </template>
      
      <el-table :data="tableData" style="width: 100%"  border stripe header-cell-class-name="headerBg">
        <el-table-column prop="name" label="货币名称" width="120" />
        <el-table-column prop="price" label="日价格" width="160" />
        <el-table-column prop="dayAverageReturn" label="日回报" width="120" />
        <el-table-column prop="yearReturn" label="年回报" width="120" />
        <el-table-column prop="variance" label="方差" width="120" />
    
        <el-table-column fixed="right" label="操作" width="180">
        
          
            <template #default="scope">
            
              
              <el-popconfirm
              confirm-button-text="是"
              cancel-button-text="否"
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="你确定要买入或卖出吗？"
              @confirm="Order(scope.row)"
              @cancel="cancelEvent"
                 >
            <template #reference>
               <el-button color="#626aef" >买入</el-button>
               <el-button color="#626aef">卖出</el-button>
            </template>     
              </el-popconfirm>
            </template>
            
         
        </el-table-column>
        



      </el-table>
    </el-card>
    <el-card style="width: 100%">
        <template #header>
          <div class="card-header">
            <span>风险分析</span>
           </div>
        </template>
        <el-tag effect="dark" type="success" size="large" round>来查看各种货币的风险分析报告吧</el-tag>
     
        <el-button color="#626aef" @click="gotorisk">点击这里查看风险分析</el-button>
    </el-card>



    </template>

    
    
    <script scope>
    import httpHelper from '@/utils/httpHelper'


    export default {
      name: "ReleasedAppointment",
      data(){
          const tableData = []

        return{
          users: [localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{}],
          form:{},
          tableData:tableData,      
        }
      },
  
      created() {
        this.getData()
       
        this.form = {          
          appRecord:{ 
         id:'',
         userId:'',
         date:'',
         appointmentId:''
           },

          appDate:{
          id:'',
          appointment:'',
          date:'',
          leftCount:''
           },
        
          appointment:{
            id:'',
            startTime:'',
            endTime:'',
            address:'',
            username:'',
            userId:'',
            maxCount:''
          },

          username:''
        
         }

     },
     

  
      methods:{
        gotorisk(){
          this.$router.push('/Risk');    
        },

        getData(){//获取数据
           //从后台获取表格数据
          httpHelper.get("api/VirtualToken").then(res =>{
              console.log("1111:"+res);
              this.tableData = res.data
              })

            },

            putOrder(id){
              console.log(id)
            },

        getAppointment(){  
         this.getAppdate();
        },
         getAppdate(){
          httpHelper.get("/appointment").then(res=>{

            for(var j=0;j<res.data.length;j++){
              console.log(j)
              this.tableData[j]={dateId:res.data[j].appDate.id,
                                appointmentId:res.data[j].appointment.id,
                                leftCount:res.data[j].appDate.leftCount,
                                date:res.data[j].appDate.date[0]+'年'+res.data[j].appDate.date[1]+'月'+res.data[j].appDate.date[2]+'日',
                                maxCount:res.data[j].appointment.maxCount,
                                startTime:res.data[j].appointment.startTime,
                                endTime:res.data[j].appointment.endTime,
                                address:res.data[j].appointment.address,
                                date1:res.data[j].appDate.date
                                      }
            }

          })
        },
        
     Order(row){
      this.form={}
          this.form.payAssest=row.name;
          this.form.goodIds=[
            {
      "id": 1,
      "price": 1000.0,
      "name": row.name,
      "quality": 110
    }
          ]
           
          console.log(this.form)
          httpHelper.post("/api/order/add",this.form).then(res=>{     //传递包装类去加record并且减date表里面的leftCount
             if (res.statusCode === 200) {
                this.$message.success("预约成功,请到个人预约页面查看")
                // this.getAppointment()
               }  
             else if(res.code=="600"){
              this.$message.error(res.msg)//预约已满
             }  
               
             else{
                 this.$message.error("出错了")
            }
      
         })

       },
  
       cancelEvent(){
       this.$message("你未预约")
       }

     }
    };
    
    </script>
    