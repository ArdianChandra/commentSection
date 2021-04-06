<template>
<section>
  <div class="mt-4 me-3">
    <hr class="ms-5 me-5">
    <div class="row">
      <div class="col ms-5">
        <img src="https://www.cornwallbusinessawards.co.uk/wp-content/uploads/2017/11/dummy450x450.jpg" alt="profilePic" style="width:70px">
      </div>
      <div class="col-10">
        <h3> {{comment.name}} </h3>
        <p style="color:#d17a28"> {{comment.date}} </p>
      </div>
      <div class="col d-flex flex-row bd-highlight me-4">
        <h6 @click.prevent="changeIsEdit" style="color:blue" class="me-3">edit</h6>
      </div>
    </div>
    <p v-if="isEdit === false" class="ms-5">{{initialComment}}</p>
    <div v-if="isEdit === true" class="mb-2 ms-5">
      <textarea class="form-control" rows="3" v-model="comment.comment"></textarea>
      <button type="submit" class="btn btn-primary mt-3" @click.prevent="updateComment(id)">Edit Comment</button>
      <button type="submit" class="btn btn-outline-danger mt-3 ms-2" @click.prevent="changeIsEdit">Cancel</button>
    </div>
    <p @click.prevent="changeIsReply" style="color:#d17a28" class="ms-5">Reply</p>
  </div>
  <div class="mt-4 ms-5 me-5 mb-4" v-if="isReply === true">
    <div class="mb-3">
      <label class="form-label">Name</label>
      <input type="text" class="form-control" v-model="name">
    </div>
    <label class="form-label">Reply</label>
    <textarea class="form-control" rows="3" v-model="newReply"></textarea>
    <div>
      <button type="submit" class="btn btn-primary mt-3" @click.prevent="addReply(id)">Add Reply</button>
      <button type="submit" class="btn btn-outline-danger mt-3 ms-2" @click.prevent="changeIsReply">Cancel</button>
    </div>
  </div>
  <div v-for="reply in initialReplies" :key="reply._id">
    <RepliesComponent v-if="id === reply.commentId" :reply='reply' :commentId='id'></RepliesComponent>
  </div>
</section>
</template>

<script>
import axios from 'axios'
import RepliesComponent from './replies'
import Swal from 'sweetalert2'

export default {
  components: {
    RepliesComponent
  },

  data () {
    return {
      isReply: false,
      isEdit: false,
      initialComment: this.comment.comment,
      name: '',
      newReply: '',
      initialReplies: [],
      errorReply: ''
    }
  },
  props: [
    'comment',
    'id',
    'findAllComment'
  ],
  methods: {
    changeIsReply () {
      if (this.isReply === false) {
        this.isReply = true
      } else {
        this.isReply = false
        this.name = ''
        this.newReply = ''
        this.errorMsg = ''
      }
    },

    changeIsEdit () {
      if (this.isEdit === false) {
        this.isEdit = true
      } else {
        this.isEdit = false
        this.comment.comment = this.initialComment
        this.errorUpdate = ''
      }
    },

    updateComment (id) {
      if (this.comment.comment === '') {
        Swal.fire({
          icon: 'error',
          title: 'FAIL',
          text: 'Comment cannot be empty'
        })
      } else {
        axios({
          url: 'http://localhost:3000/comments/' + id,
          method: 'put',
          data: {
            comment: this.comment.comment
          }
        })
          .then(response => {
            this.isEdit = false
            this.initialComment = this.comment.comment
            this.errorUpdate = ''
            Swal.fire({
              icon: 'success',
              title: 'SUCCESS',
              text: 'Successfully update Comment'
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    },

    findAllReply () {
      axios({
        url: 'http://localhost:3000/replies',
        method: 'get'
      })
        .then(response => {
          this.initialReplies = response.data
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },

    addReply (commentId) {
      if (this.name === '') {
        Swal.fire({
          icon: 'error',
          title: 'FAIL',
          text: 'Name cannot be empty'
        })
      } else if (this.newReply === '') {
        Swal.fire({
          icon: 'error',
          title: 'FAIL',
          text: 'Reply cannot be empty'
        })
      } else {
        axios({
          url: 'http://localhost:3000/replies/' + commentId,
          method: 'post',
          data: {
            name: this.name,
            reply: this.newReply
          }
        })
          .then(response => {
            this.initialReplies.push(response.data[0])
            this.changeIsReply()
            this.name = ''
            this.newReply = ''
            this.errorMsg = ''
            Swal.fire({
              icon: 'success',
              title: 'SUCCESS',
              text: 'Successfully added Reply'
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },

  created () {
    this.findAllReply()
  }
}
</script>

<style>

</style>
