<template>
    <div class="not-found">
      <img src="../../assets/404.gif" alt="" />
    </div> 
  </template>
  
  <script>
  
  
  
  export default {
    name: "Reflash",
    data(){
  
    },
    created(){
  this.$router.replace({ path:'/MyAppointment' })
    },
    methods:{
    }
  }

  
  </script>
  
  <style scoped>
  .not-found {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .not-found img {
    width: 100%;
    height: 100%;
  }
  
  </style>