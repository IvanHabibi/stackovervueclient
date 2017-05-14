<template lang="html">
  <div class="row">
  <div class="col-sm-3"></div>
  <div class="col-sm-6">
    <form class="form-horizontal">
      <fieldset>
        <legend>Create Question</legend>
        <div class="form-group">
          <label for="username" class="col-lg-2 control-label">username </label>
          <div class="col-lg-10">
            <input type="text" class="form-control" id="username" placeholder="username" v-model='username'>
          </div>
        </div>
        <div class="form-group">
          <label for="password" class="col-lg-2 control-label">password </label>
          <div class="col-lg-10">
            <input type="password" class="form-control" id="password" placeholder="password" v-model='password'>
          </div>
        </div>
        <div class="form-group">
          <label for="name" class="col-lg-2 control-label">name </label>
          <div class="col-lg-10">
            <input type="tet" class="form-control" id="name" placeholder="name" v-model='name'>
          </div>
        </div>

        <div class="form-group">
          <div class="col-lg-10 col-lg-offset-2">
            <button type="submit" class="btn btn-primary" @click='register'>Submit</button>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</div>
</template>

<script>
export default {
  name:'register',
  data(){
    return{
      username:'',
      password:'',
      name:''
    }
  },
  methods:{
    register(){
      let self=this
      this.axios.post('http://localhost:3000/users/signup',{
        username: self.username,
        password: self.password,
        name: self.name,
      }).then(function(response){
        self.$router.push('/')
      })
    }
  },
created(){
  let self=this
  if(self.$store.state.username!==''){
    self.$router.push('/')
  }
}

}
</script>

<style lang="css">
</style>
