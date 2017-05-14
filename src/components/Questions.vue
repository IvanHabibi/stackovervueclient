<template lang="html">
  <div class="container">
    <h2>All Questions</h2>
    <table class="table table-hover">
      <thead >
          <tr>
            <th>Question title</th>
            <th>created by</th>
            <th>vote</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="(question,index) in questionslist">
            <td><a href="javascript:void(0)"@click='redirectQuestion(question._id,index)'>{{question.question_title}}</a></td>
            <td><a href="javascript:void(0)">{{question.question_creator}}</a></td>
            <td><a href="#">{{question.up_vote}}</a></td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'questions',
  computed: {
    questionslist() {
      return this.$store.state.questions;
    }
  },
  methods: {
    redirectQuestion(param,index) {
      let self = this
      // console.log(param);
      self.$router.push({
        path: '/showquestion',
        query: {
          id: `${param}`,
          index: index
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
