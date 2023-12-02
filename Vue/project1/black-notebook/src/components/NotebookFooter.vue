<template>
    <footer class="footer">
      <!-- 统计 -->
      <span class="todo-count">合 计:<strong> {{count}} </strong></span>
      <!-- 清空 -->
      <button @click="deleteAll" class="clear-completed">
        清空任务
      </button>
    </footer>
</template>

<script>
export default {
  props:{
    count:Number
  },
  methods:{
    deleteAll(){
      this.$emit('dA')
    }
  }
}
</script>

<style>

</style>