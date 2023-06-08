<template>
   <el-descriptions title="个人信息">
       <el-descriptions-item label="用户名:">{{user.username}}</el-descriptions-item>
      <el-descriptions-item label="邮箱:">{{user.email}}</el-descriptions-item>
      <el-descriptions-item label="角色:">{{user.role}}</el-descriptions-item>
      <el-descriptions-item label="Remarks:">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
    
    </el-descriptions>

    <el-card style="width: 500px">
      <template #header>
        <div class="card-header">
          <span>修改个人信息</span>
        </div>
      </template>
       <el-form label-width="80px" size="small">
      <el-upload
          class="avatar-uploader"
          :action="'http://' + serverIp + ':9090/upload/uploadImg'"
          :show-file-list="false"
          :headers="myHeaders"
          :on-success="handleAvatarSuccess">
        <img v-if="form.avatarUrl" :src="form.avatarUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"><Plus /></i>
      </el-upload>
      <el-form-item label="用户名">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>

<script>
import {serverIp} from "@/../public/config"
import httpHelper from '@/utils/httpHelper'

export default {
  name: "Person",
  data(){
    return{
      serverIp:serverIp,
      form:{},
      user: localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
      myHeaders: { 
      token: JSON.parse(localStorage.getItem("user")).token,

      
      } 
    }
  },
  created() {
    this.getUser().then(res =>{
      this.form = res
    })
  },
  methods:{
    async getUser(){
      return (await httpHelper.get("/user/"+this.user.id)).data
    },
    save(){
      console.log(this.form)
      httpHelper.post("/user",this.form).then(res=> {
        if (res.statusCode === 200) {
          this.$message.success("修改成功，请刷新页面查看")
          //触发父级方法
          this.$emit("refreshUser")
          //更新浏览器存储的用户信息
          this.getUser().then(res =>{
            res.token = JSON.parse(localStorage.getItem("user")).token
            localStorage.setItem("user",JSON.stringify(res))
          })
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    handleAvatarSuccess(res){
      if(res.code="200"){
        this.form.avatarUrl = res.data
      }
      else{
        this.$message.error("文件上传失败")
      }
    }
  }
}
</script>

<style>
.avatar-uploader{
  text-align: center;
  padding-bottom: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 138px;
  height: 138px;
  line-height: 138px;
  text-align: center;
}
.avatar {
  width: 138px;
  height: 138px;
  display: block;
}
</style>