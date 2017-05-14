<template lang="html">
  <div class="container">
    <h2>Hover Rows</h2>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>created by</th>
          <th>Question title</th>
          <th>vote</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="question in questionslist">
            <td><a href="#">{{question.question_title}}</a></td>
            <td><a href="javascript:void(0)"@click='redirectQuestion(question._id)'>{{question._id}}</a></td>
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
    redirectQuestion(param) {
      let self = this
      // console.log(param);
      self.$router.push({
        path: '/showquestion',
        query: {
          id: `${param}`
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
