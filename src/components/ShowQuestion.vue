<template lang="html">
<div class="showanswers">
  <div class="row">
  <div class="col-sm-3"></div>
  <div class="col-sm-6">
    <div class="panel panel-default">
      <div v-if="questionData.toggleEdit==true">
        <div class="panel-heading"><input type="text" v-model="update_title" name="" value=""></div>
      </div>
      <div v-else>
        <div class="panel-heading"> <h3>{{questionData.question_title}}</h3> <p align="left">by {{questionData.question_creator}}</p></div>
      </div>
      <div class="panel-body" align='left'>
        <div v-if="questionData.toggleEdit==true">
          <textarea name="name" rows="4" cols="60" v-model="update_text"></textarea>
          <button type="button" name="button"@click='submitUpdate()' >submit</button>
          <button type="button" name="button"@click='cancelUpdateQ()' >cancel</button>
        </div>
        <div v-else>
          {{questionData.question_text}}
        </div>
      </div>
      <div class="btn-group btn-small pull-right">
        <button class="btn btn-xs btn-success" href="#" type="button">Approve</button>
        <button class="btn btn-xs btn-danger" href="#" type="button">Deny</button>
    </div>
      <div v-if="buttonPriviledge===questionData.creator_id">
        <div class="panel-footer"> <a href="javascript:void(0)" class="btn btn-danger" @click='deletequestion()'>Delete</a> <a href="javascript:void(0)" @click='toggleupdatequestion()' class="btn btn-primary">Update</a></div>
      </div>
    </div>
  </div>
  <div class="col-sm-3"></div>
</div>
  <div class="row" v-for="(answer,index) in answerList">
  <div class="col-sm-3"></div>
  <div class="col-sm-6">
    <div class="panel panel-default">
      <div class="panel-heading " align="right">by {{answer.answer_creator}}</div>
      <div v-if='answer.isEdit==true'>
        <div class="panel-body" align="left">
          <textarea name="name" rows="2" cols="60" v-on:keypress.enter="submit($event.target.value,answer._id,index)">{{answer.answer_text}}</textarea>
          <button type="button" name="button"@click='cancel(index)' >cancel</button>
        </div>
      </div>
      <div v-else>
        <div class="panel-body" align="left">
          {{answer.answer_text}}
        </div>
        <div class="btn-group btn-small pull-right">
          <button class="btn btn-xs btn-success" href="#" type="button">Approve</button>
          <button class="btn btn-xs btn-danger" href="#" type="button">Deny</button>
      </div>
      </div>
      <div v-if="buttonPriviledge===answer.creator_id">
        <div class="panel-footer"> <a href="javascript:void(0)" class="btn btn-danger" @click='deleteanswer(answer._id,index)'>Delete</a> <a href="javascript:void(0)" @click='toggleupdateanswer(index)' class="btn btn-primary">Update</a></div>
      </div>
    </div>
  </div>
  <div class="col-sm-3"></div>
</div>
<div class="row" >
<div class="col-sm-3"></div>
<div class="col-sm-6">
  <div class="panel panel-default">
    <div class="panel-body">
      <textarea name="name" rows="8" cols="60" v-model="answerArea" ></textarea>
      <button type="button" name="button" @click='answering'>answer</button>
    </div>
  </div>
</div>
<div class="col-sm-3"></div>
</div>
</div>
</template>
<script>
export default {
  name: 'showquestion',
  computed: {
    answerList() {
      return this.$store.state.answers;
    },
    buttonPriviledge(){
      return this.$store.state.id
    }
  },
  data() {
    return {
      questionData: {
        toggleEdit:false,
        question_text: '',
        question_title: '',
        question_creator:'',
        creator_id:'',
        total_vote: '',
        up_vote: '',
        vote_id: '',
        id: '',
        question_creator:'',
        index:''
      },
      answerArea:'',
      update_title:'',
      update_text:''
    }
  },
  methods: {
    submitUpdate(){
      let self = this
      this.axios.put(`http://localhost:3000/questions/${self.questionData.id}`,{
        question_title:self.update_title,
        question_text:self.update_text
      }).then(function(response){
        self.questionData.question_title=self.update_title
        self.questionData.question_text=self.update_text
        self.$store.state.questions[self.questionData.index].question_title=self.questionData.question_title;
        self.$store.state.questions[self.questionData.index].question_text=self.questionData.question_text;
      })
      self.questionData.toggleEdit=false
    },
    cancelUpdateQ(){
      let self = this
      self.questionData.toggleEdit=false
    },
    toggleupdatequestion(){
      let self = this
      self.update_title = self.questionData.question_title
      self.update_text = self.questionData.question_text
      console.log(self.questionData.toggleEdit);
      self.questionData.toggleEdit=true
    },
    cancel(index){
      let self = this
      self.$store.state.answers[index].isEdit=false;

    },
    submit(data,id,index){
      let self = this
      this.axios.put(`http://localhost:3000/answers/${id}`,{
        answer_text:data
      }).then(function(response){
        console.log(response);
        self.$store.state.answers[index].answer_text=data;
        self.$store.state.answers[index].isEdit=false;
      })
    },
    toggleupdateanswer(index){
      let self = this
      self.$store.state.answers[index].isEdit=true;
    },
    deletequestion(){
      let self = this
      var result = confirm("Want to delete?");
      if (result) {
        this.axios.delete(`http://localhost:3000/questions/${self.questionData.id}`)
        .then(function(response){
          self.$store.state.questions.splice(self.questionData.index, 1);
          console.log(response);
          self.$router.push('/')
        })
      }
    },

    deleteanswer(id,index){
      let self = this
      var result = confirm("Want to delete?");
      if (result) {
        this.axios.delete(`http://localhost:3000/answers/${id}`)
        .then(function(response){
          self.$store.state.answers.splice(index, 1);
          console.log(response);

        })
      }
    },
    answering(){
      let self = this
      if(self.$store.state.username!==''){
        this.axios.post(`http://localhost:3000/answers`,{
          answer_text: self.answerArea,
          answer_creator: self.$store.state.username,
          creator_id:self.$store.state.id,
          id: self.questionData.id
        }).then(function(response){
          self.$store.state.answers.push(response.data)
          console.log('answering');
        })

      }else{
        console.log('login dlu');
      }
    },
    fetchandLoad: function() {
      let self = this
      var data = self.$router.currentRoute
      this.axios.get(`http://localhost:3000/answers/answerbyq/${data.query.id}`, {}).then(function(response) {
        console.log(response);
        self.questionData.index = data.query.index
        self.questionData.question_text = response.data.question_text
        self.questionData.question_title = response.data.question_title
        self.questionData.total_vote = response.data.total_vote
        self.questionData.question_creator = response.data.question_creator
        self.questionData.up_vote = response.data.up_vote
        self.questionData.creator_id = response.data.creator_id
        self.questionData.vote_id = response.data.vote_id
        self.questionData.id = response.data._id
        self.$store.state.answers = response.data.answer
        console.log('==============');
        console.log(response.data);
      })
    }
  },
  created() {
    let self = this
    self.fetchandLoad();

  }
}
</script>

<style lang="css">
</style>
