<template lang="html">

  <nav class="navbar navbar-default">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-2">

          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#"><router-link to="/">StackOverVue</router-link></a>
      </div>
      <div class="collapse navbar-collapse" id="navbar-collapse-2">
        <ul class="nav navbar-nav navbar-right">
          <li></li>
          <li></li>
          <li>
          <div v-if='isLogin'>
            <p >Welcome, {{displayName}}</p>
          </div>
          </li>
          <li><router-link to="/createquestion">Create Question</router-link></li>
          <li>
            <div v-if='isLogin'>
              <a class="btn btn-default btn-outline btn-circle collapsed"  data-toggle="collapse" href="#nav-collapse2" @click='singout'>Sign out</a>
            </div>
            <div v-else>
              <a class="btn btn-default btn-outline btn-circle collapsed"  data-toggle="collapse" href="#nav-collapse2" aria-expanded="false" aria-controls="nav-collapse2">Sign in</a>
              <router-link to='register' class="btn btn-default btn-outline btn-circle collapsed"  >Register</router-link>
            </div>
          </li>

        </ul>
        <div v-if='!isLogin'>
          <div class="collapse nav navbar-nav nav-collapse slide-down" id="nav-collapse2">
            <form class="navbar-form navbar-right form-inline" role="form">
              <div class="form-group">
                <label class="sr-only" for="Email">username</label>
                <input type="username" class="form-control" id="Email" placeholder="username" autofocus required v-model="username"/>
              </div>
              <div class="form-group">
                <label class="sr-only" for="Password">Password</label>
                <input type="password" class="form-control" id="Password" placeholder="Password" required v-model="password" />
              </div>
              <button type="submit" class="btn btn-success" @click="login">Sign in</button>
            </form>
          </div>
          </div>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container -->
  </nav><!-- /.navbar -->

</template>

<script>
export default {
  data(){
    return{
      username:'',
      password:'',
      displayname:''
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.login;
    },
    displayName() {
      return this.$store.state.username;
    }
  },
  name : 'navbar',
  methods:{
    login(){
      let self=this
      this.axios.post(`http://localhost:3000/users/signin`,{
        username:self.username,
        password:self.password
      }).then(function(response){
        console.log(response);
        if(!response.data.msg){
          self.$store.state.username=response.data.username
          self.$store.state.id=response.data.id
          self.$store.state.login=true
          window.localStorage.setItem('token', response.data.token)
          window.localStorage.setItem('username', response.data.username)
          window.localStorage.setItem('id', response.data.id)
          self.displayname= self.$store.state.username
          self.$router.push('/')
        }

      })
    },
    singout(){
      let self=this
      self.$store.state.login=false
      window.localStorage.clear()
      self.$store.state.username=''
      self.$store.state.id=''
    }
  }
}
</script>

<style lang="css" scoped>
.navbar-brand { position: relative; z-index: 2; }

.navbar-nav.navbar-right .btn { position: relative; z-index: 2; padding: 4px 20px; margin: 10px auto; transition: transform 0.3s; }

.navbar .navbar-collapse { position: relative; overflow: hidden !important; }
.navbar .navbar-collapse .navbar-right > li:last-child { padding-left: 22px; }

.navbar .nav-collapse { position: absolute; z-index: 1; top: 0; left: 0; right: 0; bottom: 0; margin: 0; padding-right: 200px; padding-left: 80px; width: 100%; }
.navbar.navbar-default .nav-collapse { background-color: #f8f8f8; }
.navbar.navbar-inverse .nav-collapse { background-color: #222; }
.navbar .nav-collapse .navbar-form { border-width: 0; box-shadow: none; }
.nav-collapse>li { float: right; }

.btn.btn-circle { border-radius: 50px; }
.btn.btn-outline { background-color: transparent; }

.navbar-nav.navbar-right .btn:not(.collapsed) {
    background-color: rgb(111, 84, 153);
    border-color: rgb(111, 84, 153);
    color: rgb(255, 255, 255);
}

.navbar.navbar-default .nav-collapse,
.navbar.navbar-inverse .nav-collapse {
    height: auto !important;
    transition: transform 0.3s;
    transform: translate(0px,-50px);
}
.navbar.navbar-default .nav-collapse.in,
.navbar.navbar-inverse .nav-collapse.in {
    transform: translate(0px,0px);
}


@media screen and (max-width: 767px) {
    .navbar .navbar-collapse .navbar-right > li:last-child { padding-left: 15px; padding-right: 15px; }

    .navbar .nav-collapse { margin: 7.5px auto; padding: 0; }
    .navbar .nav-collapse .navbar-form { margin: 0; }
    .nav-collapse>li { float: none; }

    .navbar.navbar-default .nav-collapse,
    .navbar.navbar-inverse .nav-collapse {
        transform: translate(-100%,0px);
    }
    .navbar.navbar-default .nav-collapse.in,
    .navbar.navbar-inverse .nav-collapse.in {
        transform: translate(0px,0px);
    }

    .navbar.navbar-default .nav-collapse.slide-down,
    .navbar.navbar-inverse .nav-collapse.slide-down {
        transform: translate(0px,-100%);
    }
    .navbar.navbar-default .nav-collapse.in.slide-down,
    .navbar.navbar-inverse .nav-collapse.in.slide-down {
        transform: translate(0px,0px);
    }
}
</style>
