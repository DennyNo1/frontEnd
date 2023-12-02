<template>
    <div class="app">
        <!--使用-->
        <myheader>
            
        </myheader>
        <SonComponent :childprops="fatherdata" @newEvent="replace"><!--2.监听子组件的事件，再触发自己的method--></SonComponent>
        <mymain>
        </mymain>
        <myfooter></myfooter>
    </div>
</template>
<script>
//导入
import myheader from './components/MyHeader.vue'
import mymain from './components/MyMain.vue'
import myfooter from './components/MyFooter.vue'
import SonComponent from './components/SonComponent.vue'
//注册
export default {
    components:{
        myheader:myheader,
        mymain:mymain,
        myfooter:myfooter,
        SonComponent:SonComponent
    },
    data(){
        return{
            fatherdata:"这是父组件传给子组件的数据"
        }
    },
    methods:{
        //3.newData就是子组件事件传过来的数据
        replace(newData){
            this.fatherdata=newData;
        }
    }

}
</script>

<style>
.app{
    width: 600px;
    height: 1000px;
    background-color: #87ceeb;
    margin: 0 auto;/*外边距上下为0，左右水平居中*/ 
    padding: 20px;
}

</style>