<template>
  <section>
    <CommentComponent v-for="comment in comments" :key='comment._id' :comment='comment' :id='comment._id' :findAllComment="findAllComment"></CommentComponent>
    <form @submit.prevent="addCommment">
      <div class="mt-5 ms-5 me-5">
        <h4>Leave a Comment</h4> <hr>
      </div>
      <div class="mt-4 ms-5 me-5">
        <label class="form-label">Name</label>
        <input type="text" class="form-control" v-model="name">
      </div>
      <div class="mt-4 ms-5 me-5 mb-4">
        <label class="form-label">Comment</label>
        <textarea class="form-control" rows="3" v-model="comment"></textarea>
      </div>
      <button type="submit" class="btn btn-primary ms-5">Add Comment</button>
    </form>
    <div class="mt-4 ms-5 me-5" style="color:red">
      {{errorMsg}}
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import CommentComponent from '../components/comment'
import Swal from 'sweetalert2'
import moment from 'moment'

export default {
  name: 'Home',

  data () {
    return {
      comments: [],
      name: '',
      comment: '',
      errorMsg: ''
    }
  },

  components: {
    CommentComponent
  },

  methods: {
    findAllComment () {
      axios({
        url: 'http://localhost:3000/comments',
        method: 'get'
      })
        .then(response => {
          this.comments = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    addCommment () {
      if (!this.name || !this.comment) {
        Swal.fire({
          icon: 'error',
          title: 'FAIL',
          text: 'Name or Comment cannot be empty'
        })
      } else {
        axios({
          url: 'http://localhost:3000/comments',
          method: 'post',
          data: {
            name: this.name,
            comment: this.comment,
            date: moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')
          }
        })
          .then(response => {
            this.comments.push(response.data[0])
            this.errorMsg = ''
            this.name = ''
            this.comment = ''
            Swal.fire({
              icon: 'success',
              title: 'SUCCESS',
              text: 'Successfully added Comment'
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },

  created () {
    this.findAllComment()
  }
}
</script>

<style>

</style>
