import{defineStore} from 'pinia'
import {ref} from 'vue'
import axios from 'axios'
//这个名字不要乱改，否则会无效
export const useChannelStore=defineStore(
    'channel',()=>{
        const channelList=ref([])
        const getList=async()=>{
            const {data:{data}}=await axios.get('https://geek.itheima.net/v1_0/channels')
            channelList.value=data.channels
            console.log(data.channels)
        }
        return{
            channelList,getList
        }

    }


)