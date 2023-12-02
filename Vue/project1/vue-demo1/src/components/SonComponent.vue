<template>
  <div>
    {{childprops}}
    <button @click="change"><!--0.用按钮来触发这次emit。@即监听。-->通过子组件向父组件传数据来修改</button>
</div>
  
</template>

<script>
export default {
    props:{
        childprops:String
    },
    methods:{
        //这里是emit的逻辑，newEvent是组件自定义的新事件，因为只有事件才能被监听。后面是数据。
        change(){
            this.$emit('newEvent','这是子组件传递给父组件的数据');
            console.log('test');
        }
    }
    
}

</script>

<style>

</style>