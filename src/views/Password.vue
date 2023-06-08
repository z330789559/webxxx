<template>
    <el-card style="width: 500px">
      <template #header>
        <div class="card-header">
          <span>修改密码</span>
        </div>
      </template>
      <el-form :rules="rules" :model="user" ref="userForm" label-width="80px" size="large">
        <el-form-item  prop="oldPassword" label="旧密码">
          <el-input placeholder="请输入旧密码"  autocomplete="off"  prefix-icon="Lock" show-password v-model="user.oldPassword"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码">
          <el-input placeholder="请输入新密码"  autocomplete="off"  prefix-icon="Lock" show-password v-model="user.newPassword"></el-input>
        </el-form-item>
        <el-form-item  prop="confirmPassword" label="确认密码">
          <el-input placeholder="请再次确认密码"  autocomplete="off"  prefix-icon="Lock" show-password v-model="user.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </template>
  
  <script scope>
  import httpHelper from '@/utils/httpHelper'
  export default {
    name: "Password",
    data(){
      return{
        user: localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
        newPassword:{},
        oldPassword:{},
        confirmPassword:{},

        rules:{
          oldPassword:[
                 {required:true,message:"请输入旧密码",trigger:'blur'},
               {min:3,max:10,message: '长度在 3 到 10 个字符',trigger: 'blur'}
               ],
               newPassword:[
                 {required:true,message:"请输入新密码",trigger:'blur'},
                 {min:3,max:20,message: '长度在 3 到 20 个字符',trigger: 'blur'}
                   ],
            confirmPassword: [
				 { required: true, message: '请再次确认', trigger: 'change' }
				   ]
                }
              };
    },
    methods:{
      save(){
        var that=this
			  that.$refs['userForm'].validate((valid) => {
          if (valid) {  //表单校验合法

               if(this.user.newPassword !== this.user.confirmPassword){
                  this.$message.error("两次输入的新密码不一致")
                return false
              }
                if(this.user.password !== this.user.oldPassword){
                this.$message.error("旧密码输入错误")
                  return false
              }
                this.user.password = this.user.newPassword
                httpHelper.post("/user",this.user).then(res=> {
           if (res.statusCode === 200) {
            alert("密码修改成功，请重新登录")
            this.$store.commit("logout")
            //this.$message.success("密码修改成功，请重新登录")
          } else {
            this.$message.error("保存失败")
          }
        })
        }
        })
      },
    }
  }
  </script>
  
  <style>
  
  </style>