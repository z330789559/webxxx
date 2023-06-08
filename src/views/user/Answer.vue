<template>
    <el-button color="#626aef" @click="gotoReport">点击这里查看分析报告</el-button>
    <div class="second">
        
 
        <!-- 问卷题 -->
        <div v-for="(item,index) in questionList" :key="item.id">    
            <!-- 测试 -->
            <div class="test-content" v-if="index== page">
                
         <el-card style="width: 100%">
               <template #header>
                <div class="card-header">
                  <span><div class="content-title">{{index+1}}.{{item.question.content}}</div></span>
                  </div>
                </template>
             
                <el-radio-group v-model="radio" size="large">
                 
                <el-space direction="vertical">
               
                  <el-radio :label="0" v-if="item.answerList[0]" border>{{item.answerList[0].content}}</el-radio>
                  <el-radio :label="1" v-if="item.answerList[1]" border>{{item.answerList[1].content}}</el-radio>
                  <el-radio :label="2" v-if="item.answerList[2]" border>{{item.answerList[2].content}}</el-radio>
                  <el-radio :label="3" v-if="item.answerList[3]" border>{{item.answerList[3].content}}</el-radio>               
                  
                 </el-space>

                </el-radio-group>
          </el-card>

                     <el-button type="primary" @click="toBack(index)" v-if="index != 0" :class="index == 0 ? 'before-back' : 'back' ">上一题</el-button>
                     <el-button type="warning"  @click="toNext(index,item.id)" v-if="isShow"  :class="index == 0 ? 'next' : 'before-next'" >下一题</el-button>
                     <el-button type="success" v-if="!isShow" @click="submit(item)" :class="index == 0 ? 'next' : 'before-next'"   round>提交</el-button>
               
            </div>
            
        </div>
 
 
    </div>

</template>

 
<script scope>
  import httpHelper from '@/utils/httpHelper'

  export default {
    name: 'Answer',
 
    data() {
    
        return {
            questionnaire: localStorage.getItem("questionnaire")?JSON.parse(localStorage.getItem("questionnaire")):{},
            user: localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
            
            // 当前页
            page: 0,
            // 选项
            radio: '',
            // 题目的id
            ids: [],
            // 分数
            nums: [],

            questionInfos: [],
            // 当前题目的序号等于当前题目的条数
            isShow: true,
            // 获取问卷数据
            questionList: [],
            //提交的答案
            answerRecord:[],
             
            form:[],

            userQuestionnaireId:'',

        }
    },
    created() {
       
         // 获取问卷数据
        this.getQuestion()
    },
    methods: {

      gotoReport(){
        this.$router.push('/Report');    
      },
        // 获取问卷数据
         getQuestion() {
            //httpHelper.get("/question/"+this.questionnaire.id).then(res =>{
            this.questionList = [
              {
              answerList:[
                {id:"1",questionnaireId:"1",questionId:"1",content:"卖掉，以避免更大的担忧，并再试试其他项目",score:"1"},
                {id:"2",questionnaireId:"1",questionId:"1",content:"什么也不做，等待投资收回",score:"2"},
                {id:"3",questionnaireId:"1",questionId:"1",content:"继续买入，正是投资的好机会，同时现在它也是便宜的投资",score:"3"}
              ],
              question:
                {id:"1",questionnaireId:"1",content:"当资金投资60天后，其价格下跌了60%。假设其他基本情况都不变，你会怎么做?", number:"1"}
              }, 

              {
              answerList:[
                {id:"1",questionnaireId:"1",questionId:"1",content:"抛出",score:"1"},
                {id:"2",questionnaireId:"1",questionId:"1",content:"什么也不做",score:"2"},
                {id:"3",questionnaireId:"1",questionId:"1",content:"继续买入",score:"3"}
              ],
              question:
                {id:"1",questionnaireId:"1",content:"现在换一个角度看上面的问题。投资价格下跌了20%，但它是投资组合的一部分。用来在三个不同的时间段上达到投资目标。如果投资目标是五年后，你会怎么做？", number:"2"}
              }, 
              
              {
              answerList:[
                {id:"1",questionnaireId:"1",questionId:"1",content:"抛出",score:"1"},
                {id:"2",questionnaireId:"1",questionId:"1",content:"什么也不做",score:"2"},
                {id:"3",questionnaireId:"1",questionId:"1",content:"继续买入",score:"3"}
              ],
              question:
                {id:"1",questionnaireId:"1",content:"如果投资目标是15年后，你会怎么做？", number:"3"}
              }, 

              {
              answerList:[
                {id:"1",questionnaireId:"1",questionId:"1",content:"抛出",score:"1"},
                {id:"2",questionnaireId:"1",questionId:"1",content:"什么也不做",score:"2"},
                {id:"3",questionnaireId:"1",questionId:"1",content:"继续买入",score:"3"}
              ],
              question:
                {id:"1",questionnaireId:"1",content:"如果投资目标是30年后，你会怎么做？", number:"4"}
              }, 

              {
              answerList:[
                {id:"1",questionnaireId:"1",questionId:"1",content:"抛出，锁定收入",score:"1"},
                {id:"2",questionnaireId:"1",questionId:"1",content:"继续持有，期待更多收益",score:"2"},
                {id:"3",questionnaireId:"1",questionId:"1",content:"继续买入，可能还会涨",score:"3"}
              ],
              question:
                {id:"1",questionnaireId:"1",content:"你的退休金在买入1个月以后，价格上涨25%，而且基本条件没有变化。在你心满意足之后，你会怎么做?", number:"5"}
              }, 

              {
              answerList:[
                {id:"1",questionnaireId:"1",questionId:"1",content:"投资于货币市场基金或保证收益的投资合约，放弃可能得到的资本利得，重点保证资本金安全",score:"1"},
                {id:"2",questionnaireId:"1",questionId:"1",content:"一半债卷，一半股票基金，希望在有些增长的同时，也能成为自己拥有固定收入的保障",score:"2"},
                {id:"3",questionnaireId:"1",questionId:"1",content:"投资于激进型的共同基金，它的价值在年内可能有大幅波动，但在5年或10年后有巨额收益的潜力",score:"3"}
              ],
              question:
                {id:"1",questionnaireId:"1",content:"你投资了养老保险，期限在15年以上，你更愿意？", number:"6"}
              }, 

              {
              answerList:[
                {id:"1",questionnaireId:"1",questionId:"1",content:"2000美元现金",score:"1"},
                {id:"2",questionnaireId:"1",questionId:"1",content:"50 % 的机会获得5000美元",score:"2"},
                {id:"3",questionnaireId:"1",questionId:"1",content:"20 % 的机会获得15000美金",score:"3"}
              ],
              question:
                {id:"1",questionnaireId:"1",content:"你刚刚中了大奖，但具体哪一个由你决定？", number:"7"}
              }, 

              {
              answerList:[
                {id:"1",questionnaireId:"1",questionId:"1",content:"绝对不会",score:"1"},
                {id:"2",questionnaireId:"1",questionId:"1",content:"也许会",score:"2"},
                {id:"3",questionnaireId:"1",questionId:"1",content:"会的",score:"3"}
              ],
              question:
                {id:"1",questionnaireId:"1",content:"一个很好的投资机会来临，但你必须借款，你会贷款吗？", number:"8"}
              }, 

              {
              answerList:[
                {id:"1",questionnaireId:"1",questionId:"1",content:"抛出",score:"1"},
                {id:"2",questionnaireId:"1",questionId:"1",content:"什么也不做",score:"2"},
                {id:"3",questionnaireId:"1",questionId:"1",content:"继续买入",score:"3"}
              ],
              question:
                {id:"1",questionnaireId:"1",content:"你所在的公司要把股票卖给员工，公司管理层计划在三年后使公司上市，在上市之前，你不能抛售手中的股票，也没有分红，但上市时，你的投资可能会翻10倍，你会投资多少钱？", number:"9"}
              }, 
              
              ]
            
            
            //res.data 


            //console.log(res)
            //})          

           
        },
        
        sendQuestionaireStart(){
          this.form={
            id:'',
            userId:this.user.id,
            questionnaireId:this.questionnaire.id,
            questionnaireName:this.questionnaire.name,
            score:''
          }
        //console.log(this.form)
        httpHelper.post("/user-questionnaire",this.form).then(res=>{
        if (res.statusCode === 200) {
          this.$message.success("请开始你的作答吧！")
          console.log(res)
          console.log("niniiiiiiiiiiiiiiiiii")
          this.userQuestionnaireId=res.data.id
        } 
        else {
          this.$message.error(res.msg)
        }
      })

        },
        // 点击下一题
        toNext(index, id) {
            
            // 1. 判断是否答题，没有则无法跳转到下一题
           
         if((this.radio === '' || this.radio === undefined)) {
                    this.$message.warning("请选择本题答案")
                    return;
            }
         else {
           // 2. 保存答题数据
            let question = {'questionnaireId':this.questionnaire.id, 'userId': this.user.id,
                             'number':this.questionList[index].question.number,
                             'answerId':this.questionList[index].answerList[this.radio].id,
                             'radio':this.radio};

            this.questionInfos[index] = question;
            this.radio=''
            
            // 3. index ++；
            index ++;
            // 4. 判断已答题目列表是否包含下标为index的题目，有则回显
            if(this.questionInfos[index] !== undefined && this.questionInfos[index] !== '') {
                this.radio = this.questionInfos[index].radio
            }

            // 5. page ++
            this.page ++;
            // 6. 其他（如按钮隐藏）
           // 当前页等于最后一题 下一题按钮隐藏
            if(this.page == this.questionList.length-1) {
                return this.isShow = false
            } else {
                return this.isShow = true
            }

            }
                       
         
          
         
        },
 
        // 点击上一题
        toBack(index) {
            // 1. index --；
            index --;
            // 2. 从已回答列表中获取答题数据，回显
            this.radio = this.questionInfos[index].radio;
            // 3. 保存答题数据
            let question =  {'questionnaireId':this.questionnaire.id, 'userId': this.user.id,
                             'number':this.questionList[index].question.number,
                             'answerId':this.questionList[index].answerList[this.radio].id,
                             'radio':this.radio};

            this.questionInfos[index] = question;
 
            //显示下一题按钮
            this.isShow = true 
            // 4. page --
            this.page --;
     
        },
 
 
        // 点击提交
        submit() {

        // 1. 判断是否答题，没有则无法提交 
         if((this.radio === '' || this.radio === undefined)) {
                    this.$message.warning("请选择本题答案")
                    return;
            }
         else {
            for(var i = 0; i < this.questionInfos.length; i++) {
             this.answerRecord[i]={
                id:'',
                userQuestionnaireId:this.userQuestionnaireId,
                answerId:this.questionInfos[i].answerId
             }
            }
        httpHelper.post("/ans-record",this.answerRecord).then(res=>{
        if (res.statusCode === 200) {
          this.$message.success("答案上传成功，请到已作答页面查看分析报告")
          this.$router.push('/Report');                                    //跳转到报告界面
        }  
        else {
          this.$message.error("答案上传失败")
        }
      })

         }
 
        },
    }
  }

</script>

<style>

</style>