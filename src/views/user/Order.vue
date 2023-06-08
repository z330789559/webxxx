<template>
    <el-card style="width: 100%">
      <template #header>
       <div class="card-header">
         <span>所有订单</span>
       </div>
      </template>
      
      <el-table :data="tableData" style="width: 100%"  border stripe header-cell-class-name="headerBg">
        <el-table-column prop="name" label="定单名称" width="120" />
        <el-table-column prop="tips" label="温馨提示" width="120" >
            <template #default="scope">
         <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>投资有风险</div>
            <div>买卖需谨慎</div>
          </template>
          <template #reference>
            <el-tag effect="dark" type="success" size="large" round>{{ scope.row.tips }}</el-tag>
          </template>
        </el-popover>
      </template>
        </el-table-column>


        <el-table-column prop="totalPriceValue" label="金额" width="120" />
        <el-table-column prop="payAssest" label="货币" width="120" />
        <el-table-column prop="createTime" label="订单日期" width="120" />
        <el-table-column prop="createTime" label="具体时间" width="120" />
       
  
        <el-table-column fixed="right" label="操作" width="180">
        

          <template #default="scope">
            
              
            <el-popconfirm
            confirm-button-text="是"
            cancel-button-text="否"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="你确定要删除该订单吗？"
            @confirm="Delete"
            @cancel="Cancel"
               >
          <template #reference>
             <el-button color="#626aef">删除订单</el-button>
          </template>     
            </el-popconfirm>
          </template>
          
         
        </el-table-column>
      </el-table>
      
    </el-card>
    </template>
    
    <script scope>
    import httpHelper from '@/utils/httpHelper'
        //**
        // * 
        // * *{
        //    "orderId": 1,
         //   "userId": 1,
         //   "status": 0,
         //   "type": 0,
         //   "payAssest": "",
         //   "totalPriceValue": 0,
        //    "user": null,
        //    "userName": "",
        //    "createTime": "2023-06-07T00:45:28+08:00",
        // ** /
  
    export default {
      name: "ReleasedNotice",
      
      data(){

      
          const tableData = [{name:"狗狗币定单",tips:"点我康康",price:"350",type:"0"
                               ,date:"2023-4-15",time:"23:23:33"},
                             {name:"比特币定单",tips:"点我康康",totalPriceValue:"250",type:"0"
                               ,date:"2023-4-16",time:"12:25:55"}]
        return{
          tableData:tableData
        }
      },
  
      created() {
        this.getNotice();
      },
  
      methods:{
        getNotice(){         
          var that =this;
            httpHelper.get("/api/orders").then(res =>{
             //获取后台的数据
            console.log(res)
            that.tableData = res.data
            })          
        
            },
  
     Delete(){

     },
     Cancel(){

     }
  
     
    }
    };
    
    </script>
    