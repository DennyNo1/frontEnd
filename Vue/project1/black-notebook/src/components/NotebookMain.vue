<template>
      <!-- 列表区域 -->
      <section class="main">
      <ul class="todo-list">
        <li class="todo" v-for="li in list" :key="li.id">
          <div  class="view" >
            <span class="index" >{{li.id}}</span> <label>{{li.name}}</label>
            <button @click='handleDelete(li.id)' class="destroy"></button>
          </div>
        </li>
      </ul>
    </section>
</template>

<script>
export default {
  props:{
    list:Array
  },
  methods:
  {
    handleDelete(id)
    {
      this.$emit('delete',id)
    }
  }

}
</script>

<style>

</style>