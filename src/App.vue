<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods:{
    seedQuestion(){
      this.axios.get('http://localhost:3000/questions')
      .then((response) => {
        console.log(response.data)
        this.$store.state.questions=response.data
      })
    },
    validateSession(){
      let self = this
      let token = window.localStorage.getItem('token')
      console.log(token);
      if(token!==null && token!==undefined){
        self.$store.state.username= window.localStorage.getItem('username')
        self.$store.state.id= window.localStorage.getItem('id')
        self.$store.state.login=true
        console.log(self.$store.state.username);
      }
    }
  },
  created(){
    this.seedQuestion()
    this.validateSession()
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
