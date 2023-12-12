<template>
            <td>
            <div class="my-tag">
              <input @blur="isEditing=false"
                v-if="isEditing"
                
                @keyup.enter="handleEnter"
                ref="inp" 
                class="input"
                type="text"
                placeholder="输入标签"
                
              /> 
                <div  v-else @dblclick="doubleclick"   class="text" >
                {{tag}}
              </div>
            </div>
          </td>
</template>

<script>
export default {
    props:{
        fatherprop:String
    },
    data(){
        return{
            isEditing:false,
            tag:this.fatherprop
        }
    },
    methods:{
        doubleclick()
        {
            this.isEditing=true
        
            this.$nextTick(() => {this.$refs.inp.focus()})
            
        },
        handleEnter()
        {
            this.tag=this.$refs.inp.value
            this.isEditing=false
        }
    }
}
</script>

<style scoped>
/* 标签样式 */
.my-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 30px;
  border: 1px solid #333;
  border-radius: 15px;
  font-size: 14px;
  color: #333;
}

/* 输入框样式 */
.my-tag .input {
  width: 80px;
  height: 20px;
  border: none;
  outline: none;
  padding: 0 5px;
}

/* 文本样式 */
.my-tag .text {
  width: 80px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>