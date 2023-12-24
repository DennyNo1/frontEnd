
<template>
  <div>
    <van-nav-bar
  title="登录页"
  left-text="返回"

  left-arrow
  @click-left="$router.go(-1)"/><!--这个方法就是能返回上一页-->

  <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="phonenumber"  class="inp" maxlength="11" placeholder="请输入手机号码" type="text"><!--手机号的验证和提示-->
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img  :src="picUrl" @click="getPicCode">
        </div>
        <div class="form-item">
          <input v-model="message" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="startCountdown">{{ currentSecond === second ? '获取验证码' : `${currentSecond}s 后重新获取` }}</button>
          
        </div>
        <div >
          <button class=login-btn @click="login">登录</button>
        </div>
      </div>
  </div>
</div>
  
</template>

<script>

import {getPicCode,getMessage,login} from '@/api/login.js'
import Vue from 'vue';
import { Toast } from 'vant';
import {setData} from '@/utils/storage'

Vue.use(Toast);
export default {
  name: 'LoginPage',
  async created () {
    
    this.getPicCode()
  },
  data(){
    return{
      picUrl:'',
      picKey:'',
      second:60,
      currentSecond:60,
      timer:'',//这个timer更多的作用用于离开页面时
      picCode:'',
      phonenumber:'',
      message:'',
    }

  },
  methods:{
    async getPicCode(){
      const res = await getPicCode()
      this.picUrl=res.data.base64
      this.picKey=res.data.key
      
    },
    //验证码发送倒计时：这里有2个处理点：一是不能多次触发二是不能小于0
    async startCountdown(){
      if(this.verify())
      {
        await getMessage(this.picCode,this.picKey,this.phonenumber);
        Toast('短信发送成功，请注意查收')
        if(this.currentSecond===60)//只有60才能启动
      
      this.timer=setInterval(
        () => {
          this.currentSecond--;
          if(this.currentSecond<=0)
          {
            this.currentSecond=60
          }
        },1000
      )//setInterval可以理解成一个在一段时间内持续作用的函数,每一秒都会执行一遍里面的代码。可以理解成循环代码，只不过条件是1s。

      }
      
    },


    async login(){
      if(this.verify())
      {
        if(!/^\d{6}$/.test(this.message))
        {
          Toast('请输入正确的短信验证码');
          return false
        }
        else{
          const res=await login(false,this.phonenumber,{},this.message)
          //登录成功
          if(res.status===200)
          {
            Toast('登录成功');
            //往vuex存入数据
            this.$store.state.user.userInfo=res.data
            setData(res.data)//往本地存入数据
            //页面跳转
            this.$router.push("/LayOut")
          }
          else{
            Toast('验证码输入错误');
            return;
          }

        }
      }
    },


    verify(){
      if(!/^1[3-9]\d{9}$/.test(this.phonenumber)){
        Toast('请输入正确的手机号');
        
        return false
      }
      if(!/^\w{4}$/.test(this.picCode)){
        Toast('您输入的短信验证码有误');//这里仅仅是代表格式正确，而不是数值符合
        return false
      }
      return true
    }

  },  
  destroyed(){
    clearInterval(this.timer);
  }

}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    
  }


.login button {
  background-color: #008CBA; /* 蓝色 */
  border: none; /* 无边框 */
  color: white; /* 白色字体 */
  padding: 15px 32px; /* 内边距 */
  text-align: center; /* 居中对齐 */
  text-decoration: none; /* 无下划线 */
  display: inline-block; /* 行内块元素 */
  font-size: 16px; /* 字体大小 */
  border-radius: 8px; /* 圆角 */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); /* 阴影 */
  transition-duration: 0.4s; /* 过渡效果 */
}

.login button:hover {
  background-color: #04AA6D; /* 绿色 */
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24); /* 阴影 */
}
}
</style>