<template>
  <div class="table-case">
    <table class="my-table">
      <thead>
        <tr>
          <th>编号</th>
          <th>名称</th>
          <th>图片</th>
          <th width="100px">标签</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index ) in goods" :key="index">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>
            <img :src="item.picture"/>
          </td>
          <MyTag :fatherprop="item.tag"></MyTag>
                  

        </tr>
        
      </tbody>
    </table>
  </div>
</template>

<script>
import  MyTag  from "./components/MyTag.vue";
export default {
  
  name: 'TableCase',
  components: {MyTag,},
  data() {
    return {
      goods: [
        {
          id: 101,
          picture:
            'https://yanxuan-item.nosdn.127.net/f8c37ffa41ab1eb84bff499e1f6acfc7.jpg',
          name: '梨皮朱泥三绝清代小品壶经典款紫砂壶',
          tag: '茶具',
        },
        {
          id: 102,
          picture:
            'https://yanxuan-item.nosdn.127.net/221317c85274a188174352474b859d7b.jpg',
          name: '全防水HABU旋钮牛皮户外徒步鞋山宁泰抗菌',
          tag: '男鞋',
        },
        {
          id: 103,
          picture:
            'https://yanxuan-item.nosdn.127.net/cd4b840751ef4f7505c85004f0bebcb5.png',
          name: '毛茸茸小熊出没，儿童羊羔绒背心73-90cm',
          tag: '儿童服饰',
        },
        {
          id: 104,
          picture:
            'https://yanxuan-item.nosdn.127.net/56eb25a38d7a630e76a608a9360eec6b.jpg',
          name: '基础百搭，儿童套头针织毛衣1-9岁',
          tag: '儿童服饰',
        },
      ],
    }
  },
}
</script>

<style  scoped>
.table-case {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
  background-color: #fff;
}

/* 表格样式 */
.my-table {
  width: 100%;
  border-collapse: collapse;
}

/* 表头样式 */
.my-table thead th {
  text-align: left;
  font-weight: bold;
  color: #333;
  padding: 10px;
  border-bottom: 2px solid #ccc;
}

/* 表格内容样式 */
.my-table tbody td {
  padding: 10px;
  vertical-align: top;
}

/* 图片样式 */
.my-table img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}


</style>