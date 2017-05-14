<template lang="html">
<h1>UYEE</h1>
</template>

<script>
export default {
  name: 'showquestion',
  data(){
    return{

    }
  },

  methods: {
    fetchandLoad: function() {
      let self=this
      var y = self.$router.currentRoute
      console.log(y.query.id);
      self.axios.get('http://localhost:3000/questions')
      .then((response) => {
        console.log(response.data)
        this.$store.state.questions=response.data
    }
  },
  created() {
    let self=this
    self.fetchandLoad();

  }
}
</script>

<style lang="css">
</style>
