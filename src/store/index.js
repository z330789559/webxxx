import Vue from 'vue'
import Vuex from 'vuex'
import router, {resetRouter} from "@/router";

import { createStore } from 'vuex'
 
export default createStore({

    state:{
        currentPathName: ''
    },
    mutations: {
        setPath(state){
            state.currentPathName = localStorage.getItem("currentPathName")
        },
        logout(){
            //清空缓存
            //console.log(localStorage.getItem("user"))
            localStorage.removeItem("user")
            router.push("/")
            resetRouter()
        }

    }
})







