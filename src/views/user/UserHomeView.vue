<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside width="200px">
      <el-scrollbar>
        
        <el-menu :router="true" :default-openeds="['1', '2','3','4','5','6','7']">
          <el-sub-menu background-color="" index="1">
            <template #title>
              <el-icon><el-icon><Document /></el-icon></el-icon>用户主界面
            </template>
            <el-menu-item-group>
              <el-menu-item index="/ManAndAsset"><el-icon><DocumentAdd /></el-icon>个人资产与数据</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          
          <el-sub-menu index="2">
            <template #title>
              <el-icon><el-icon><Bell /></el-icon></el-icon>订单系统
            </template>
            <el-menu-item index="/Order"><el-icon><Help /></el-icon>所有订单</el-menu-item>
          </el-sub-menu>
          
          <el-sub-menu index="3">
            <template #title>
              <el-icon><el-icon><Calendar /></el-icon></el-icon>风险分析
            </template>
            <el-menu-item index="/Risk"><el-icon><Comment /></el-icon>分析详情</el-menu-item>
            <el-menu-item index="/Answer"><el-icon><Comment /></el-icon>填写调查问卷查看具体分析</el-menu-item>
          </el-sub-menu>
          
          <!-- <el-sub-menu index="4">
            <template #title>
              <el-icon><el-icon><House /></el-icon></el-icon>资产组合界面
            </template>
            <el-menu-item-group>
              <el-menu-item index="/"><el-icon><Film /></el-icon>我的资产</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu> -->
        </el-menu>

      </el-scrollbar>

      
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 70px height:150px ">

        <el-image :src="require('@/assets/back1.gif')" 
          style="position:absolute;top:0;bottom:0;left:0;right:0;width:500px;height: 100%; margin:auto;" >
        </el-image>

        <div class="toolbar">
          <div>
               <el-avatar :size="50" :src="avatarUrl" />
            </div>
            <span>{{"你好!"+user.name}}</span>
          <el-dropdown>
            <el-icon style="margin-right: 20px;  font-size: 25px; margin-top: 5px"><setting/></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout"><el-icon><TurnOff /></el-icon>退出</el-dropdown-item>
                <el-dropdown-item @click="personal"><el-icon><UserFilled /></el-icon>个人中心</el-dropdown-item>
                <el-dropdown-item @click="password"><el-icon><Lock /></el-icon>修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

       
      </el-header>

      <el-main>
        <div style="opacity: 1; z-index: 999;">
          <router-view @refreshUser="getUser"/>
        </div>
        
        <div ref="vantaRef" style="width: 100%; height: 100%; z-index:-1;"></div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script scope>
import * as THREE from "three";
import BIRDS from "vanta/src/vanta.birds";
import httpHelper from '@/utils/httpHelper'

      export default {
          name: 'UserHomeView',
          data() {
            return { 
              user:localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):{},
              avatarUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            }
          },
  
          created() {
          //从后台获取最新的User数据
           this.getUser()
        
          },

          mounted() {
            this.vantaEffect = BIRDS({
            el: this.$refs.vantaRef,
            THREE: THREE,
            });
            // 修改颜色时 cells 需要全大写字母 可生效
             VANTA.BIRDS({
             el: this.$refs.vantaRef,
             mouseControls: true,
             touchControls: true,
             gyroControls: false,
             minHeight: 200.0,
             minWidth: 200.0,
             scale: 1.0,
             backgroundColor: 0x26b9f2, //背景颜色 需十进制
             color1: 14381274,
             color2: 16443110,
           });

          },
          beforeDestroy() {
              if (this.vantaEffect) {
              this.vantaEffect.destroy();
           }
         },

          methods:{

     

            getUser(){
              let id = localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")).id:""
              //从后台获取User数据
              var that=this;
             httpHelper.get("/api/user/"+id).then(res =>{
             //重新赋值后台最新User的数据
             that.user = res.data
              })
            },
            
            logout(){
                this.$store.commit("logout") 
            },
            
            personal(){
                this.$router.push('/UserPerson');
            },
            
            password(){
                this.$router.push('/UserPassword');
              }
              

          }
      };
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  height: 150px;
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu:not(.el-menu--collapse) {
  border-right: none;
  width: 200px;
  min-height: 400px;
  background-color: #9fc6e4;
}
.layout-container-demo .el-menu .el-menu-item {
    background-color: #6daee0;
  }


.layout-container-demo .el-main {
  padding: 0;
  background-color: rgb(248, 248, 248);
  background-color: #bdd8f5cb;
}
.layout-container-demo .toolbar {
  z-index: 999;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
