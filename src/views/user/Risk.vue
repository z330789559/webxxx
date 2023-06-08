<template>
    <el-card style="width: 100%">
      <template #header>
       <div class="card-header">
         <span style="size:25px">风险分析</span>
       </div>
       <el-tag effect="dark" type="success" size="large" round>来查看各种货币的风险分析报告吧</el-tag>
       <el-tag effect="dark" type="success" size="large" round>请先选择货币种类</el-tag>
      </template>

      <el-checkbox-group v-model="checkedKinds" :min="1" :max="2">
         <el-checkbox v-for="kind in kinds" :key="kind" :label="kind">{{kind}}</el-checkbox>
  </el-checkbox-group>
      
    </el-card>


    <el-card style="width: 100%">
      <template #header>
       <div class="card-header">
         <span style="size:25px">协方差矩阵</span>
       </div>
      </template>
      
      <el-radio-group v-model="radio" size="large">
                 
              
 
      </el-radio-group>
      <el-table :data="tableData" style="width: 100%"  border stripe header-cell-class-name="headerBg">
        <el-table-column prop="username" label="用户名" width="120" />
      </el-table>

    </el-card>

    <el-card style="width: 100%">
      <template #header>
       <div class="card-header">
         <span style="size:25px">数据显示</span>
       </div>
      </template>
      
      <el-radio-group v-model="radio" size="large">
                 
              
 
      </el-radio-group>
      <el-table :data="tableData" style="width: 100%"  border stripe header-cell-class-name="headerBg">
        <el-table-column prop="username" label="风险组合最优夏普比率" width="180" />
        <el-table-column prop="date" label="风险组合最优收益率" width="180" />
        <el-table-column prop="maxCount" label="风险组合最优方差" width="180" />
        <el-table-column prop="leftCount" label="币种1权重" width="120" />
        <el-table-column prop="leftCount" label="币种2权重" width="120" />
      </el-table>

    </el-card>
   
    </template>
    
    <script scope>
    import httpHelper from '@/utils/httpHelper'
  
    export default {
      name: "ReleasedMusic",
      data(){
          const tableData = [],
          checkedKinds = ['比特币', '狗狗币'],
          kinds = ['比特币', '狗狗币', '泰达币', '以太坊',"波场币"]
        return{
          tableData:tableData,
          radio: '', //币种选择
          kinds:kinds,
          checkedKinds:checkedKinds
            
        }
      },

      created() {
     
      },

      methods:{
       
  
      SeeMusic(row) {
        if(localStorage.getItem("music")){
            localStorage.removeItem("music")
        }
        localStorage.setItem("music",JSON.stringify(row))  //存储信息到浏览器
        this.$router.push('/SingleMusic');
      },
        
     }
    };
    
    </script>
    