<template>
	<div class="wrapper">
	<div class="login_register">
        <!-- 表情图部分 -->
        <div class="pic">
			<el-carousel :interval="2000" height="200px" width="300px">
         <el-carousel-item v-for="url in urls" :key="url" >
            <el-image style="width: 200px; height: 100%" :src="url"  >
                <template #error>
                  <div class="image-slot">
                  <el-icon><icon-picture /></el-icon>
                  </div>
                  </template>
            </el-image>

           </el-carousel-item>
         </el-carousel>
		</div>
		

		<div class="contain">
			<div class="big-box" :class="{active:isLogin}">
				<div class="big-contain" key="bigContainLogin" v-if="isLogin">
					<div class="btitle">账户登录</div>

					<el-form :rules="rules" :model="user" ref="userForm">
                           <el-form-item prop="email">
                           <el-input placeholder="请输入用户名" size="default" style="margin: 10px 0" prefix-icon="User" v-model="user.name"></el-input>
                          </el-form-item>
                       <el-form-item prop="password">
                       <el-input placeholder="请输入密码" size="default" style="margin: 10px 0" prefix-icon="Lock" show-password v-model="user.password"></el-input>
                        </el-form-item>
                    </el-form>
					
					<div style="padding: 20px;">
						<button class="bbutton" @click="login1">登录</button>
					</div>
					
				</div>
				<div class="big-contain" key="bigContainRegister" v-else>
					<div class="btitle">创建账户</div>
				<el-form :rules="rules" :model="user" ref="userForm1">
                      <el-form-item prop="name">
                        <el-input placeholder="请输入账号" size="default" style="margin: 5px 0" prefix-icon="User" v-model="user.name"></el-input>
                      </el-form-item>
                      <el-form-item prop="password">
                       <el-input placeholder="请输入密码" size="default" style="margin: 5px 0" prefix-icon="Lock" show-password v-model="user.password"></el-input>
                      </el-form-item>
                      <el-form-item prop="confirmPassword">
                       <el-input placeholder="请确认密码" size="default" style="margin: 5px 0" prefix-icon="Lock" show-password v-model="user.confirmPassword"></el-input>
                      </el-form-item>

                    </el-form>
					
					<div style="padding: 20px;">
						<button class="bbutton" @click="register1">注册</button>
					</div>
					
				</div>
			</div>
			<div class="small-box" :class="{active:isLogin}">
				<div class="small-contain" key="smallContainRegister" v-if="isLogin">
					<div class="stitle">你好，欢迎来到HH!</div>
					<p class="scontent">开始注册，体验不一样的分析助手</p>
					<button class="sbutton" @click="changeType">注册</button>
				</div>
				<div class="small-contain" key="smallContainLogin" v-else>
					<div class="stitle">欢迎回来!</div>
					<p class="scontent">请登录^_^</p>
					<button class="sbutton" @click="changeType">登录</button>
				</div>
			</div>
		</div>

		<!-- 星空效果部分 -->
		<div class="two">
			<div
              class="three"
              v-for="(item, index) in items"
              :key="index"
              ref="three"
              ></div>
              </div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'
import httpHelper from '@/utils/httpHelper'

	export default{
		name:'LoginRegisterView',
		data(){
			const urls = [
        require('@/assets/images/login1.png'),
        require('@/assets/images/login2.png'),
        require('@/assets/images/login3.png'),
         ];
             return{
				adminKey:'',
				urls:urls,
				isLogin:false,
				nameError: false,
				passwordError: false,
				existed: false,
                role:"user",
                //星空效果div循环生成800个
                items: 800,
                distance: 800,
                loginSrc: require("@/assets/images/login1.png"),
			 user:{},
			 rules:{
                name:[
                 {required:true,message:"请输入用户名",trigger:'blur'},
               {min:3,max:10,message: '长度在 3 到 10 个字符',trigger: 'blur'}
               ],
                password:[
                 {required:true,message:"请输入密码",trigger:'blur'},
                 {min:3,max:20,message: '长度在 3 到 20 个字符',trigger: 'blur'}
                   ],
                },
				
			}
			
		},

     mounted() {
      //星空效果
      //获取dom 800个div
      const starArr = this.$refs.three;
      //循环div
      starArr.forEach((item) => {
        //随机数
        const speed = 0.2 + Math.random() * 1;
        const thisDistance = this.distance + Math.random() * 360;
        //每一项的样式
        item.style.transformOrigin = `0 0 ${thisDistance}px`;
        item.style.transform = `translate3d(0, 0, -${thisDistance}px) rotateY(${
          Math.random() * 360
        }deg) rotateX(${Math.random() * -50}deg) scale(${speed})`;
      });

      },
		methods:{
			changeType() {
				this.isLogin = !this.isLogin
				this.user.name = ''
				this.user.confirmPassword = ''
				this.user.password = ''
			},


            //静态的跳转函数，调用后端接口后可删除
			login(){
				this.$router.push('/user/home');
			},

			register(){
				this.$router.push('/');
			},

			login1(){
                  httpHelper.post("/api/login",this.user).then(res=>{
					console.log(this.user)
				     console.log(res);
                    if(res.statusCode === 200){
					  localStorage.setItem("user",JSON.stringify(res.data))  //存储用户信息到浏览器
                      this.$message.success("登录成功")
				        this.$router.push('/user/home');
                    }
			        else{
                      this.$message.error(res.msg)
                      }
                 })
              
            },
			
		 
			register1() {
			console.log(this.user)
			 const self = this;
			 self.$refs['userForm1'].validate((valid) => {
              if (valid) {  //表单校验合法
				if(self.user.password!=self.user.confirmPassword)
				{
					alert("两次密码不相同");
				}
				else
				{
					var that = this;
					httpHelper.post("/api/register",this.user).then(res=>{
	
				     console.log(res);
                     if(res.statusCode === 200){
                        this.$message.success("注册成功，请登录");
					    that.$router.push('/');
                       }
				     else{
                     this.$message.error(res.msg)
                       }
                    })
				}
			  }
              });
				
            },

        }
	}


</script>

<style scoped="scoped">

.pic{
	margin: auto;
	top:25%;
	left: 50%;
	width: 300px;
	height: 200px;
}

.contain{
		width: 60%;
		height: 70%;
		position:absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: #fff;
		border-radius: 20px;
		box-shadow: 0 0 3px #f0f0f0,
					0 0 6px #f0f0f0;
	}
	.big-box{
		width: 70%;
		height: 100%;
		position:absolute;
		top: 0;
		left: 30%;
		transform: translateX(0%);
		transition: all 1s;
	}
	.big-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.btitle{
		font-size: 1.5em;
		font-weight: bold;
		color: rgb(57,167,176);
	}
	.bform{
		width: 100%;
		height: 40%;
		padding: 2em 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.bform .errTips{
		display: block;
		width: 50%;
		text-align: left;
		color: red;
		font-size: 0.7em;
		margin-left: 1em;
	}
	.bform input{
		width: 50%;
		height: 30px;
		border: none;
		outline: none;
		border-radius: 10px;
		padding-left: 2em;
		background-color: #f0f0f0;
	}
	.bbutton{
		width: 100%;
		height: 30px;
		border-radius: 24px;
		border: none;
		outline: none;
		background-color: rgb(57,167,176);
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}
	.small-box{
		width: 30%;
		height: 100%;
		background: linear-gradient(135deg,rgb(57,167,176),rgb(56,183,145));
		position:absolute;
		top: 0;
		left: 0;
		transform: translateX(0%);
		transition: all 1s;
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
	}
	.small-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.stitle{
		font-size: 1.5em;
		font-weight: bold;
		color: #fff;
	}
	.scontent{
		font-size: 0.8em;
		color: #fff;
		text-align: center;
		padding: 2em 4em;
		line-height: 1.7em;
	}
	.sbutton{
		width: 60%;
		height: 40px;
		border-radius: 24px;
		border: 1px solid #fff;
		outline: none;
		background-color: transparent;
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
		margin-top:10px;
	    margin-bottom:10px;
	}

	.big-box.active{
		left: 0;
		transition: all 0.5s;
	}
	.small-box.active{
		left: 100%;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-top-right-radius: inherit;
		border-bottom-right-radius: inherit;
		transform: translateX(-100%);
		transition: all 1s;
	}


.loginImages {
  position:absolute;
  top: 5%;
  left: 50%;
  width: 180px;
  z-index: 2;
}
  
  .login_register{
    position: absolute;
    width: 100%;
    height: 100%;

        background: radial-gradient(
          260% 67% at bottom center,
          #32cbc6 10%,
          #63baaa 40%,
          #00838f 65%,
          #263238 130%
        );

    overflow: hidden;
  }
  .two {
    position:absolute;
    left: 50%;
    transform-style: preserve-3d;
    transition: perspective(500deg);
    perspective-origin: 50% 100%;
    -webkit-perspective-origin: 50% 100%;
    -moz-perspective-origin: 50% 100%;
    animation: xinkon 90s linear infinite;
    bottom: -100px;
    }

	.three {
      width: 2px;
      height: 2px;
      background: #fff9c4;
      position:absolute;
      top: 0;
      left: 0;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      -moz-backface-visibility: hidden;
      -ms-backface-visibility: hidden;
    }
  
  @keyframes xinkon {
    0% {
      transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
    }
    100% {
      transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
        rotateY(-360deg);
    }
  }

  .wrapper{
  height: 100vh;
  background-image: linear-gradient(to bottom right, #3f7bfb, #42b987);
  overflow: hidden;
}
</style>






