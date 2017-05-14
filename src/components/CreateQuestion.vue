<template lang="html">
  <div class="row">
  <div class="col-sm-3"></div>
  <div class="col-sm-6">
    <form class="form-horizontal">
      <fieldset>
        <legend>Create Question</legend>
        <div class="form-group">
          <label for="inputEmail" class="col-lg-2 control-label">Question Title </label>
          <div class="col-lg-10">
            <input type="text" class="form-control" id="question" placeholder="question title" v-model='title_text'>
          </div>
        </div>
        <div class="form-group">
          <label for="textArea" class="col-lg-2 control-label">Question Detail</label>
          <div class="col-lg-10">
            <textarea class="form-control" rows="3" id="textArea" v-model='detail_text' ></textarea>
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-10 col-lg-offset-2">
            <button type="submit" class="btn btn-primary" @click='questioning'>Submit</button>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</div>

</template>

<script>
export default {
  name:'createquestion',
  data(){
    return{
      title_text:'',
      detail_text:''
    }
  },
  methods:{
    questioning(){
      let self = this
      if(self.$store.state.username!==''){
        this.axios.post(`http://localhost:3000/questions`,{
          question_title: self.title_text,
          question_text: self.detail_text,
          question_creator: self.$store.state.username,
          creator_id:self.$store.state.id
        }).then(function(response){
          self.$store.state.questions.push(response.data)
          console.log('questioning');
          self.$router.push('/')
        })
      }else{
        console.log('login dlu');
      }



    },
  }
}
</script>

<style lang="css">
</style>
